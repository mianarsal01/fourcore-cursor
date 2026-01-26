import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
} from "react-router";
import { useFetcher, useLoaderData } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import styles from "../styles/cursor-studio.module.css";
import prisma from "../db.server";
import {
  buildCursorSvg,
  CURSOR_TEMPLATES,
} from "../cursor-templates";
import { CURSOR_LIBRARY, type CursorItem } from "../cursor-library";

type CursorSettings = {
  enabled: boolean;
  preset: string;
  size: number;
  hoverSize: number;
  defaultColor: string;
  defaultAccentColor: string;
  hoverColor: string;
  hoverAccentColor: string;
  imageUrl: string;
  hoverImageUrl: string;
  disableOnMobile: boolean;
  savedCursors: SavedCursor[];
};

type ShopSummary = {
  domain: string;
};

const DEFAULT_SETTINGS: CursorSettings = {
  enabled: true,
  preset: "cartoon-bag",
  size: 32,
  hoverSize: 48,
  defaultColor: "#ff7a59",
  defaultAccentColor: "#ffd166",
  hoverColor: "#ff4d4d",
  hoverAccentColor: "#ffe29a",
  imageUrl: "cartoon-bag",
  hoverImageUrl: "cartoon-bag-hover",
  disableOnMobile: true,
  savedCursors: [],
};

type SavedCursor = {
  id: string;
  name: string;
  imageUrl: string;
  hoverImageUrl: string;
  createdAt: string;
};

const findCursorItem = (presetId: string) => {
  for (const category of CURSOR_LIBRARY) {
    const match = category.items.find((item) => item.id === presetId);
    if (match) return match;
  }
  return null;
};

const normalizeSettings = (
  settings?: Partial<CursorSettings> | null,
): CursorSettings => {
  const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
  const normalizeHexColor = (value: unknown, fallback: string) => {
    if (typeof value !== "string") return fallback;
    const trimmed = value.trim();
    const normalized = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
  };
  const normalizeImageValue = (value: string | undefined) => {
    if (!value) return "";
    if (value.startsWith("data:image")) return "";
    return value;
  };
  const normalizedPreset = findCursorItem(merged.preset)
    ? merged.preset
    : DEFAULT_SETTINGS.preset;
  const presetItem = findCursorItem(normalizedPreset);
  const imageUrl = normalizeImageValue(merged.imageUrl);
  const hoverImageUrl = normalizeImageValue(merged.hoverImageUrl);
  const savedCursors = Array.isArray(merged.savedCursors)
    ? merged.savedCursors
    : [];

  return {
    ...merged,
    enabled: Boolean(merged.enabled),
    disableOnMobile: Boolean(merged.disableOnMobile),
    size: Number(merged.size),
    hoverSize: Number(merged.hoverSize ?? merged.size),
    defaultColor: normalizeHexColor(
      merged.defaultColor,
      presetItem?.defaultColor || DEFAULT_SETTINGS.defaultColor,
    ),
    defaultAccentColor: normalizeHexColor(
      merged.defaultAccentColor,
      presetItem?.defaultAccentColor || DEFAULT_SETTINGS.defaultAccentColor,
    ),
    hoverColor: normalizeHexColor(
      merged.hoverColor,
      presetItem?.hoverColor || DEFAULT_SETTINGS.hoverColor,
    ),
    hoverAccentColor: normalizeHexColor(
      merged.hoverAccentColor,
      presetItem?.hoverAccentColor || DEFAULT_SETTINGS.hoverAccentColor,
    ),
    preset: normalizedPreset,
    imageUrl: imageUrl || presetItem?.imageUrl || "",
    hoverImageUrl: hoverImageUrl || presetItem?.hoverImageUrl || "",
    savedCursors: savedCursors.map((cursor) => ({
      id: cursor.id || `saved-${Date.now()}`,
      name: cursor.name || "Saved cursor",
      imageUrl: normalizeImageValue(cursor.imageUrl) || "",
      hoverImageUrl: normalizeImageValue(cursor.hoverImageUrl) || "",
      createdAt: cursor.createdAt || new Date().toISOString(),
    })),
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const record = await prisma.cursorSettings.findUnique({
    where: { shop: session.shop },
  });
  const storedSettings =
    (record?.settings as Partial<CursorSettings> | null) ?? null;

  return {
    shop: { domain: session.shop },
    settings: normalizeSettings(storedSettings),
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session, admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const rawSettings = formData.get("settings");
  if (typeof rawSettings !== "string") {
    return { ok: false, error: "Missing settings payload." };
  }

  let parsedSettings: Partial<CursorSettings> | null = null;
  try {
    parsedSettings = JSON.parse(rawSettings);
  } catch {
    return { ok: false, error: "Invalid settings payload." };
  }

  const normalized = normalizeSettings(parsedSettings);
  await prisma.cursorSettings.upsert({
    where: { shop: session.shop },
    update: { settings: normalized },
    create: { shop: session.shop, settings: normalized },
  });

  try {
    const installationQuery = await admin.graphql(`
      query {
        currentAppInstallation {
          id
        }
      }
    `);
    const installationData = await installationQuery.json();
    const installationId = installationData?.data?.currentAppInstallation?.id;

    if (installationId) {
      const metafieldResult = await admin.graphql(
        `
        mutation CursorMetafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            userErrors {
              field
              message
            }
          }
        }
      `,
        {
          variables: {
            metafields: [
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "default_cursor",
                type: "single_line_text_field",
                value: normalized.imageUrl || "cartoon-bag",
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "hover_cursor",
                type: "single_line_text_field",
                value: normalized.hoverImageUrl || "cartoon-bag-hover",
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "enabled",
                type: "boolean",
                value: String(Boolean(normalized.enabled)),
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "disable_on_mobile",
                type: "boolean",
                value: String(Boolean(normalized.disableOnMobile)),
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "cursor_size",
                type: "number_integer",
                value: String(Math.round(normalized.size || 32)),
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "hover_cursor_size",
                type: "number_integer",
                value: String(
                  Math.round(normalized.hoverSize || normalized.size || 32),
                ),
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "default_color",
                type: "single_line_text_field",
                value: normalized.defaultColor,
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "default_accent_color",
                type: "single_line_text_field",
                value: normalized.defaultAccentColor,
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "hover_color",
                type: "single_line_text_field",
                value: normalized.hoverColor,
              },
              {
                ownerId: installationId,
                namespace: "fourcore_cursor",
                key: "hover_accent_color",
                type: "single_line_text_field",
                value: normalized.hoverAccentColor,
              },
            ],
          },
        },
      );
      const metafieldJson = await metafieldResult.json();
      const userErrors =
        metafieldJson?.data?.metafieldsSet?.userErrors || [];
      if (userErrors.length) {
        return {
          ok: false,
          error: userErrors.map((err) => err.message).join(", "),
        };
      }
    }
  } catch (error) {
    console.error("Failed to update cursor metafields", error);
    return { ok: false, error: "Failed to update cursor settings." };
  }

  return { ok: true };
};

export default function Index() {
  const shopify = useAppBridge();
  const fetcher = useFetcher<typeof action>();
  const { settings: initialSettings, shop } =
    useLoaderData<typeof loader>();
  const [settings, setSettings] =
    useState<CursorSettings>(initialSettings);
  const [activeTab, setActiveTab] =
    useState<"gallery" | "saved" | "upload">("gallery");
  const [activeCategory, setActiveCategory] = useState(CURSOR_LIBRARY[0].id);
  const [previewPos, setPreviewPos] = useState({ x: 120, y: 120 });
  const [previewHover, setPreviewHover] = useState(false);
  const [uploadName, setUploadName] = useState("");
  const previewStageRef = useRef<HTMLDivElement | null>(null);
  const previewButtonRef = useRef<HTMLButtonElement | null>(null);

  const previewStyle = useMemo(
    () =>
      ({
        "--cursor-color": settings.defaultColor,
        "--cursor-outline": settings.defaultAccentColor,
        "--cursor-size": `${
          previewHover ? settings.hoverSize : settings.size
        }px`,
        "--cursor-outline-width": "2px",
        "--cursor-glow": "0px",
      }) as CSSProperties,
    [settings, previewHover],
  );
  const previewCursorStyle = useMemo(
    () =>
      ({
        left: previewPos.x,
        top: previewPos.y,
      }) as CSSProperties,
    [previewPos],
  );
  const isCustomCursor =
    settings.preset === "custom" && settings.imageUrl.startsWith("http");
  const isBuiltInPreset = Boolean(CURSOR_TEMPLATES[settings.preset]);
  const previewPresetSvg = useMemo(() => {
    if (!isBuiltInPreset) return null;
    return buildCursorSvg(
      settings.preset,
      {
        fill: settings.defaultColor,
        accent: settings.defaultAccentColor,
        hoverFill: settings.hoverColor,
        hoverAccent: settings.hoverAccentColor,
      },
      previewHover,
    );
  }, [
    isBuiltInPreset,
    previewHover,
    settings.defaultAccentColor,
    settings.defaultColor,
    settings.hoverAccentColor,
    settings.hoverColor,
    settings.preset,
  ]);

  const isSaving =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {
    if (fetcher.data?.ok) {
      shopify.toast.show("Cursor settings saved");
    }
    if (fetcher.data?.error) {
      shopify.toast.show(fetcher.data.error);
    }
  }, [fetcher.data, shopify]);

  const updateSetting = <K extends keyof CursorSettings>(
    key: K,
    value: CursorSettings[K],
  ) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    fetcher.submit(
      { settings: JSON.stringify(settings) },
      { method: "POST" },
    );
  };

  const applyCursorItem = (item: CursorItem) => {
    setSettings((current) => ({
      ...current,
      imageUrl: item.imageUrl,
      hoverImageUrl: item.hoverImageUrl,
      defaultColor: item.defaultColor,
      defaultAccentColor: item.defaultAccentColor,
      hoverColor: item.hoverColor,
      hoverAccentColor: item.hoverAccentColor,
      preset: item.id,
    }));
  };

  const applySavedCursor = (saved: SavedCursor) => {
    setSettings((current) => ({
      ...current,
      imageUrl: saved.imageUrl,
      hoverImageUrl: saved.hoverImageUrl,
      preset: "custom",
    }));
  };

  const handleSaveCursor = () => {
    if (!settings.imageUrl || !settings.hoverImageUrl) {
      shopify.toast.show("Add both default and hover URLs first.");
      return;
    }
    const name =
      uploadName.trim() ||
      `Saved cursor ${settings.savedCursors.length + 1}`;
    const newSaved: SavedCursor = {
      id: `saved-${Date.now()}`,
      name,
      imageUrl: settings.imageUrl,
      hoverImageUrl: settings.hoverImageUrl,
      createdAt: new Date().toISOString(),
    };
    setSettings((current) => ({
      ...current,
      savedCursors: [newSaved, ...current.savedCursors],
    }));
    setUploadName("");
    shopify.toast.show("Saved cursor added");
  };

  const handleDeleteSaved = (id: string) => {
    setSettings((current) => ({
      ...current,
      savedCursors: current.savedCursors.filter((cursor) => cursor.id !== id),
    }));
  };

  const handlePreviewMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const targetRect = previewStageRef.current?.getBoundingClientRect();
    const isHoverTarget = targetRect
      ? event.clientX >= targetRect.left &&
        event.clientX <= targetRect.right &&
        event.clientY >= targetRect.top &&
        event.clientY <= targetRect.bottom
      : false;
    setPreviewPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    setPreviewHover(isHoverTarget);
  };

  return (
    <s-page heading="FourCore Cursor">
      <div className={styles.studio}>
        <div className={styles.pageHeader}>
          <div className={styles.headerTitle}>
            <p className={styles.kicker}>Cursor studio</p>
            <h2>Select custom cursor</h2>
          </div>
          <button className={styles.reviewButton} type="button">
            Leave a review
          </button>
        </div>

        <div className={styles.studioGrid}>
          <div className={styles.galleryPanel}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "gallery" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("gallery")}
            >
              Cursor gallery
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "saved" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("saved")}
            >
              Saved cursors
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${
                activeTab === "upload" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("upload")}
            >
              Upload your own
            </button>
          </div>
          {activeTab === "gallery" ? (
            <div className={styles.categoryRow}>
              {CURSOR_LIBRARY.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.categoryButton} ${
                    activeCategory === category.id
                      ? styles.categoryActive
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          ) : null}

          {activeTab === "gallery" ? (
            <>
              <div className={styles.cursorGrid}>
                {CURSOR_LIBRARY.find(
                  (category) => category.id === activeCategory,
                )?.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.cursorTile} ${
                      settings.preset === item.id ? styles.cursorActive : ""
                    }`}
                    onClick={() => applyCursorItem(item)}
                  >
                    <div className={styles.cursorIcons}>
                      <span
                        className={styles.cursorSvg}
                        dangerouslySetInnerHTML={{ __html: item.previewSvg }}
                      />
                      <span
                        className={styles.cursorSvg}
                        dangerouslySetInnerHTML={{
                          __html: item.previewHoverSvg,
                        }}
                      />
                    </div>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : activeTab === "saved" ? (
            <div className={styles.savedGrid}>
              {settings.savedCursors.length ? (
                settings.savedCursors.map((saved) => (
                  <div key={saved.id} className={styles.savedCard}>
                    <div className={styles.savedHeader}>
                      <span>{saved.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaved(saved.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className={styles.savedPreview}>
                      <img src={saved.imageUrl} alt={`${saved.name} default`} />
                      <img
                        src={saved.hoverImageUrl}
                        alt={`${saved.name} hover`}
                      />
                    </div>
                    <button
                      type="button"
                      className={styles.savedApply}
                      onClick={() => applySavedCursor(saved)}
                    >
                      Use this cursor
                    </button>
                  </div>
                ))
              ) : (
                <p className={styles.helperText}>
                  No saved cursors yet. Upload a cursor to build your library.
                </p>
              )}
            </div>
          ) : (
            <div className={styles.uploadPanel}>
              <div className={styles.uploadBox}>
                <p>Paste URLs for your cursor images (PNG recommended).</p>
                <div className={styles.uploadInputs}>
                  <input
                    type="text"
                    placeholder="Cursor name (optional)"
                    value={uploadName}
                    onChange={(event) => setUploadName(event.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Default cursor image URL"
                    value={settings.imageUrl}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        imageUrl: event.target.value,
                        preset: "custom",
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Hover cursor image URL"
                    value={settings.hoverImageUrl}
                    onChange={(event) =>
                      setSettings((current) => ({
                        ...current,
                        hoverImageUrl: event.target.value,
                        preset: "custom",
                      }))
                    }
                  />
                </div>
                <p className={styles.uploadNote}>
                  Tip: Use a 32px PNG with a transparent background.
                </p>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleSaveCursor}
                >
                  Save to library
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <span>Preview area</span>
            <span className={styles.previewBadge}>
              {settings.enabled ? "Enabled" : "Paused"}
            </span>
          </div>
          <div
            className={styles.previewCanvas}
            style={previewStyle}
            onMouseMove={handlePreviewMove}
            onMouseLeave={() => setPreviewHover(false)}
          >
            <div className={styles.previewNote}>
              Move your mouse here to preview
            </div>
            <div className={styles.previewStage} ref={previewStageRef}>
              <button type="button" ref={previewButtonRef}>
                Button
              </button>
            </div>
            {previewPresetSvg ? (
              <span
                className={styles.previewSvg}
                style={previewCursorStyle}
                dangerouslySetInnerHTML={{
                  __html: previewPresetSvg,
                }}
              />
            ) : settings.imageUrl ? (
              <img
                className={styles.previewImage}
                style={previewCursorStyle}
                src={
                  previewHover && settings.hoverImageUrl
                    ? settings.hoverImageUrl
                    : settings.imageUrl
                }
                alt="Cursor preview"
              />
            ) : (
              <>
                <div
                  className={styles.previewCursor}
                  style={previewCursorStyle}
                />
                <div
                  className={styles.previewRing}
                  style={previewCursorStyle}
                />
              </>
            )}
          </div>

          <div className={styles.controlBlock}>
            <div className={styles.toggleRow}>
              <label>
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(event) =>
                    updateSetting("enabled", event.target.checked)
                  }
                />
                Enable custom cursor
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.disableOnMobile}
                  onChange={(event) =>
                    updateSetting("disableOnMobile", event.target.checked)
                  }
                />
                Disable on mobile
              </label>
            </div>
            <div className={styles.sizeRow}>
              <label>
                Default cursor size
                <input
                  type="range"
                  min={24}
                  max={64}
                  step={4}
                  value={settings.size}
                  onChange={(event) =>
                    updateSetting("size", Number(event.target.value))
                  }
                />
              </label>
              <input
                type="number"
                min={24}
                max={64}
                step={4}
                value={settings.size}
                onChange={(event) =>
                  updateSetting("size", Number(event.target.value))
                }
              />
            </div>
            <div className={styles.sizeRow}>
              <label>
                Hover cursor size
                <input
                  type="range"
                  min={24}
                  max={64}
                  step={4}
                  value={settings.hoverSize}
                  onChange={(event) =>
                    updateSetting("hoverSize", Number(event.target.value))
                  }
                />
              </label>
              <input
                type="number"
                min={24}
                max={64}
                step={4}
                value={settings.hoverSize}
                onChange={(event) =>
                  updateSetting("hoverSize", Number(event.target.value))
                }
              />
            </div>
            <div className={styles.colorRow}>
              <label>
                Default color
                <input
                  type="color"
                  value={settings.defaultColor}
                  disabled={isCustomCursor}
                  onChange={(event) =>
                    updateSetting("defaultColor", event.target.value)
                  }
                />
              </label>
              <label>
                Default accent
                <input
                  type="color"
                  value={settings.defaultAccentColor}
                  disabled={isCustomCursor}
                  onChange={(event) =>
                    updateSetting("defaultAccentColor", event.target.value)
                  }
                />
              </label>
            </div>
            <div className={styles.colorRow}>
              <label>
                Hover color
                <input
                  type="color"
                  value={settings.hoverColor}
                  disabled={isCustomCursor}
                  onChange={(event) =>
                    updateSetting("hoverColor", event.target.value)
                  }
                />
              </label>
              <label>
                Hover accent
                <input
                  type="color"
                  value={settings.hoverAccentColor}
                  disabled={isCustomCursor}
                  onChange={(event) =>
                    updateSetting("hoverAccentColor", event.target.value)
                  }
                />
              </label>
            </div>
            {isCustomCursor ? (
              <p className={styles.helperText}>
                Color controls apply to built-in cursors only.
              </p>
            ) : null}
            <p className={styles.helperText}>
              Uses native CSS cursors for zero impact on page speed.
            </p>
          </div>
        </div>
      </div>

        <div className={styles.footerBar}>
          <button
            className={styles.resetButton}
            type="button"
            onClick={() =>
              setSettings((current) => ({
                ...DEFAULT_SETTINGS,
                savedCursors: current.savedCursors,
              }))
            }
          >
            Reset to default
          </button>
          <div className={styles.footerActions}>
            <span className={styles.storeBadge}>Store: {shop?.domain}</span>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={handleSave}
            >
              {isSaving ? "Saving..." : "Save & Publish"}
            </button>
          </div>
        </div>
      </div>
    </s-page>
  );
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};