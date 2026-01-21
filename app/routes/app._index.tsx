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

type CursorSettings = {
  enabled: boolean;
  preset: string;
  size: number;
  color: string;
  outlineColor: string;
  outlineWidth: number;
  glow: number;
  trail: number;
  clickScale: number;
  hoverScale: number;
  blendMode: string;
  imageUrl: string;
  hoverImageUrl: string;
  hideNative: boolean;
  applyTo: string;
  includeUrls: string;
  excludeUrls: string;
  disableOnMobile: boolean;
  savedCursors: SavedCursor[];
};

type ShopSummary = {
  domain: string;
};

const DEFAULT_SETTINGS: CursorSettings = {
  enabled: true,
  preset: "cartoon-bag",
  size: 24,
  color: "#00f5ff",
  outlineColor: "#baffff",
  outlineWidth: 2,
  glow: 18,
  trail: 70,
  clickScale: 0.85,
  hoverScale: 1.4,
  blendMode: "normal",
  imageUrl: "cartoon-bag",
  hoverImageUrl: "cartoon-bag-hover",
  hideNative: true,
  applyTo: "all",
  includeUrls: "",
  excludeUrls: "",
  disableOnMobile: true,
  savedCursors: [],
};

type CursorItem = {
  id: string;
  name: string;
  imageUrl: string;
  hoverImageUrl: string;
  previewSvg: string;
  previewHoverSvg: string;
  size?: number;
};

type SavedCursor = {
  id: string;
  name: string;
  imageUrl: string;
  hoverImageUrl: string;
  createdAt: string;
};

type CursorCategory = {
  id: string;
  name: string;
  items: CursorItem[];
};

const cursorSvg = (fill: string, accent: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M12 6l34 26-18 4 8 22-10 4-8-22-16 10z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="44" cy="46" r="6" fill="${accent}"/></svg>`;
  return {
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    markup: svg,
  };
};

const CURSOR_LIBRARY: CursorCategory[] = [
  {
    id: "cartoon",
    name: "Cartoon",
    items: [
      (() => {
        const base = cursorSvg("#ff7a59", "#ffd166");
        const hover = cursorSvg("#ff4d4d", "#ffe29a");
        return {
          id: "cartoon-bag",
          name: "Bag Pop",
          imageUrl: "cartoon-bag",
          hoverImageUrl: "cartoon-bag-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#2ec4b6", "#ffbf69");
        const hover = cursorSvg("#1f9d93", "#ffd6a5");
        return {
          id: "cartoon-sale",
          name: "Sale Tag",
          imageUrl: "cartoon-sale",
          hoverImageUrl: "cartoon-sale-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#f72585", "#ffcad4");
        const hover = cursorSvg("#b5179e", "#ffe5ec");
        return {
          id: "cartoon-heart",
          name: "Wish Heart",
          imageUrl: "cartoon-heart",
          hoverImageUrl: "cartoon-heart-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#4361ee", "#fca311");
        const hover = cursorSvg("#3a0ca3", "#ffd166");
        return {
          id: "cartoon-gift",
          name: "Gift Drop",
          imageUrl: "cartoon-gift",
          hoverImageUrl: "cartoon-gift-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#52b788", "#d8f3dc");
        const hover = cursorSvg("#40916c", "#e9f5db");
        return {
          id: "cartoon-green",
          name: "Minty",
          imageUrl: "cartoon-green",
          hoverImageUrl: "cartoon-green-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#ff8fab", "#ffc6ff");
        const hover = cursorSvg("#ff5d8f", "#ffd6ff");
        return {
          id: "cartoon-sweet",
          name: "Candy",
          imageUrl: "cartoon-sweet",
          hoverImageUrl: "cartoon-sweet-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    items: [
      (() => {
        const base = cursorSvg("#c9a24b", "#f1e2b6");
        const hover = cursorSvg("#b4892f", "#f8edc0");
        return {
          id: "commerce-luxe",
          name: "Luxe Gild",
          imageUrl: "commerce-luxe",
          hoverImageUrl: "commerce-luxe-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 22,
        };
      })(),
      (() => {
        const base = cursorSvg("#39c6ff", "#8b5cf6");
        const hover = cursorSvg("#0ea5e9", "#a78bfa");
        return {
          id: "commerce-tech",
          name: "Tech Glow",
          imageUrl: "commerce-tech",
          hoverImageUrl: "commerce-tech-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 22,
        };
      })(),
      (() => {
        const base = cursorSvg("#0f172a", "#94a3b8");
        const hover = cursorSvg("#1e293b", "#cbd5f5");
        return {
          id: "commerce-min",
          name: "Mono Pro",
          imageUrl: "commerce-min",
          hoverImageUrl: "commerce-min-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 22,
        };
      })(),
      (() => {
        const base = cursorSvg("#7aa387", "#e2d6c2");
        const hover = cursorSvg("#5f8f74", "#efe6d4");
        return {
          id: "commerce-organic",
          name: "Earthy",
          imageUrl: "commerce-organic",
          hoverImageUrl: "commerce-organic-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 22,
        };
      })(),
    ],
  },
  {
    id: "seasonal",
    name: "Seasonal",
    items: [
      (() => {
        const base = cursorSvg("#e11d48", "#fbbf24");
        const hover = cursorSvg("#be123c", "#fde68a");
        return {
          id: "season-holiday",
          name: "Holiday Spark",
          imageUrl: "season-holiday",
          hoverImageUrl: "season-holiday-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#ff5a3c", "#ffb65c");
        const hover = cursorSvg("#fb7185", "#fde68a");
        return {
          id: "season-sun",
          name: "Sunset Pop",
          imageUrl: "season-sun",
          hoverImageUrl: "season-sun-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
      (() => {
        const base = cursorSvg("#1d4ed8", "#93c5fd");
        const hover = cursorSvg("#2563eb", "#bfdbfe");
        return {
          id: "season-sport",
          name: "Sports Energy",
          imageUrl: "season-sport",
          hoverImageUrl: "season-sport-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
        };
      })(),
    ],
  },
];

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
    size: Number(merged.size),
    outlineWidth: Number(merged.outlineWidth),
    glow: Number(merged.glow),
    trail: Number(merged.trail),
    clickScale: Number(merged.clickScale),
    hoverScale: Number(merged.hoverScale),
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
                key: "cursor_size",
                type: "number_integer",
                value: String(Math.round(normalized.size || 32)),
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

  const previewStyle = useMemo(
    () =>
      ({
        "--cursor-color": settings.color,
        "--cursor-outline": settings.outlineColor,
        "--cursor-size": `${settings.size}px`,
        "--cursor-outline-width": `${settings.outlineWidth}px`,
        "--cursor-glow": `${settings.glow}px`,
      }) as CSSProperties,
    [settings],
  );
  const previewCursorStyle = useMemo(
    () =>
      ({
        left: previewPos.x,
        top: previewPos.y,
      }) as CSSProperties,
    [previewPos],
  );
  const selectedCursor = useMemo(() => {
    for (const category of CURSOR_LIBRARY) {
      const item = category.items.find(
        (cursor) => cursor.id === settings.preset,
      );
      if (item) return item;
    }
    return null;
  }, [settings.preset]);

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
      size: item.size || 24,
      outlineWidth: 0,
      glow: 0,
      blendMode: "normal",
      hideNative: true,
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
    const stage = previewStageRef.current;
    const stageRect = stage?.getBoundingClientRect();
    const isHoverTarget = stageRect
      ? event.clientX >= stageRect.left &&
        event.clientX <= stageRect.right &&
        event.clientY >= stageRect.top &&
        event.clientY <= stageRect.bottom
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
            <>
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
              <button type="button">Button</button>
            </div>
            {selectedCursor ? (
              <span
                className={styles.previewSvg}
                style={previewCursorStyle}
                dangerouslySetInnerHTML={{
                  __html:
                    previewHover && selectedCursor.previewHoverSvg
                      ? selectedCursor.previewHoverSvg
                      : selectedCursor.previewSvg,
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
                Cursor size
                <input
                  type="range"
                  min={20}
                  max={96}
                  step={4}
                  value={settings.size}
                  onChange={(event) =>
                    updateSetting("size", Number(event.target.value))
                  }
                />
              </label>
              <input
                type="number"
                min={20}
                max={96}
                step={4}
                value={settings.size}
                onChange={(event) =>
                  updateSetting("size", Number(event.target.value))
                }
              />
            </div>
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
