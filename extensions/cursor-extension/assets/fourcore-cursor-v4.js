(function () {
  const root = document.getElementById("fourcore-cursor-root");
  if (!root) return;

  const enabled = root.dataset.enabled !== "false";
  const disableOnMobile = root.dataset.disableOnMobile === "true";
  const excludeSelector = root.dataset.excludeSelector || "";
  const proxyUrl = root.dataset.proxyUrl || "";
  const defaultCursorKey = root.dataset.defaultCursor || "cartoon-bag";
  const hoverCursorKey =
    root.dataset.hoverCursor || `${defaultCursorKey}-hover`;

  const assetNode = document.getElementById("fourcore-cursor-assets");
  const assetMap = assetNode
    ? JSON.parse(assetNode.textContent || "{}")
    : root.dataset.assetMap
      ? JSON.parse(root.dataset.assetMap)
      : {};

  if (!enabled) return;
  if (disableOnMobile && window.matchMedia("(pointer: coarse)").matches) return;

  const defaultSettings = {
    enabled: true,
    imageUrl: defaultCursorKey,
    hoverImageUrl: hoverCursorKey,
    applyTo: "all",
    includeUrls: "",
    excludeUrls: "",
    disableOnMobile: true,
  };

  const loadSettings = async () => {
    if (!proxyUrl) return null;
    try {
      const shopDomain =
        window.Shopify && window.Shopify.shop ? window.Shopify.shop : "";
      const settingsUrl = shopDomain
        ? `${proxyUrl}?shop=${encodeURIComponent(shopDomain)}&format=json`
        : proxyUrl;
      const response = await fetch(settingsUrl, {
        credentials: "omit",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        if (data && typeof data === "object") return data;
        return null;
      }
      const html = await response.text();
      return parseSettingsFromHtml(html);
    } catch (error) {
      return null;
    }
  };

  const resolveAsset = (value) => {
    if (!value) return null;
    if (typeof value === "string") {
      if (value.startsWith("http") || value.startsWith("data:")) {
        return { url: value, set: null };
      }
      return resolveAsset(assetMap[value]);
    }
    if (typeof value === "object") {
      const one = value["1x"] || value["1"] || "";
      const two = value["2x"] || value["2"] || "";
      const three = value["3x"] || value["3"] || "";
      return {
        url: one || two || three || "",
        set: { one, two, three },
      };
    }
    return null;
  };

  const buildImageSet = (cursor, webkit) => {
    if (!cursor?.set) return "";
    const entries = [];
    if (cursor.set.one) entries.push(`url("${cursor.set.one}") 1x`);
    if (cursor.set.two) entries.push(`url("${cursor.set.two}") 2x`);
    if (cursor.set.three) entries.push(`url("${cursor.set.three}") 3x`);
    if (!entries.length) return "";
    const body = entries.join(", ");
    return webkit ? `-webkit-image-set(${body})` : `image-set(${body})`;
  };

  const applyCssCursor = (defaultCursor, hoverCursor) => {
    const styleId = "fourcore-cursor-style";
    const existing = document.getElementById(styleId);
    if (existing) existing.remove();
    const style = document.createElement("style");
    style.id = styleId;
    const resolvedDefault = defaultCursor;
    const resolvedHover = hoverCursor || defaultCursor;
    const defaultSet = buildImageSet(resolvedDefault, true);
    const hoverSet = buildImageSet(resolvedHover, true);
    const defaultImageSet = buildImageSet(resolvedDefault, false);
    const hoverImageSet = buildImageSet(resolvedHover, false);
    const defaultUrl = resolvedDefault?.url || "";
    const hoverUrl = resolvedHover?.url || defaultUrl;
    if (!defaultUrl) return;
    style.textContent = `
      * { cursor: inherit !important; }
      html, body, label {
        cursor: url("${defaultUrl}") 0 0, auto !important;
        ${defaultSet ? `cursor: ${defaultSet} 0 0, auto !important;` : ""}
        ${defaultImageSet ? `cursor: ${defaultImageSet} 0 0, auto !important;` : ""}
      }
      a:hover, textarea:hover, input:hover, select:hover, button:hover, summary:hover, [role='button']:hover {
        cursor: url("${hoverUrl}") 0 0, auto !important;
        ${hoverSet ? `cursor: ${hoverSet} 0 0, auto !important;` : ""}
        ${hoverImageSet ? `cursor: ${hoverImageSet} 0 0, auto !important;` : ""}
      }
      ${excludeSelector ? `${excludeSelector} { cursor: inherit !important; }` : ""}
    `;
    document.head.appendChild(style);
  };

  const shouldApplyCursor = (current) => {
    if (current.applyTo && current.applyTo !== "all") {
      const template = document.body.className || "";
      const map = {
        home: "template-index",
        product: "template-product",
        collection: "template-collection",
        page: "template-page",
        blog: "template-blog",
        cart: "template-cart",
      };
      const match = map[current.applyTo];
      if (match && !template.includes(match)) return false;
    }

    const includeMatches = parseList(current.includeUrls);
    if (includeMatches.length && !matchesPath(includeMatches)) return false;

    const excludeMatches = parseList(current.excludeUrls);
    if (excludeMatches.length && matchesPath(excludeMatches)) return false;

    return true;
  };

  const pickRule = (settings) => {
    if (!Array.isArray(settings.rules)) return null;
    for (const rule of settings.rules) {
      const scoped = {
        applyTo: rule.pageType || "all",
        includeUrls: rule.includeUrls || "",
        excludeUrls: rule.excludeUrls || "",
      };
      if (shouldApplyCursor(scoped)) return rule;
    }
    return null;
  };

  const initCursor = async (storedSettings) => {
    const settings = Object.assign({}, defaultSettings, storedSettings || {});
    if (!settings.enabled) return;
    const matchedRule = pickRule(settings);
    const activeSettings = matchedRule
      ? {
          ...settings,
          imageUrl: matchedRule.imageUrl || settings.imageUrl,
          hoverImageUrl: matchedRule.hoverImageUrl || settings.hoverImageUrl,
          applyTo: matchedRule.pageType || "all",
          includeUrls: matchedRule.includeUrls || "",
          excludeUrls: matchedRule.excludeUrls || "",
        }
      : settings;

    if (!shouldApplyCursor(activeSettings)) return;

    const defaultCursor = resolveAsset(activeSettings.imageUrl);
    const hoverCursor =
      resolveAsset(activeSettings.hoverImageUrl) || defaultCursor;
    if (!defaultCursor?.url) return;
    const rasterDefault = await rasterizeCursor(defaultCursor);
    const rasterHover = await rasterizeCursor(hoverCursor);
    applyCssCursor(rasterDefault, rasterHover);
  };

  const isPasswordPage =
    window.location.pathname === "/password" ||
    document.body.classList.contains("template-password");

  // Apply theme settings immediately for instant cursor response.
  initCursor(null);

  // Update from app proxy when available (non-password pages).
  if (!isPasswordPage) {
    loadSettings()
      .then((storedSettings) => {
        if (storedSettings) initCursor(storedSettings);
      })
      .catch(() => {});
  }

  function matchesPath(patterns) {
    const path = window.location.pathname;
    return patterns.some((pattern) => {
      const normalized = pattern.replace(/\*/g, "");
      return normalized && path.includes(normalized);
    });
  }

  function parseList(value) {
    if (!value) return [];
    return value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function rasterizeCursor(cursor) {
    if (!cursor?.url || !cursor.url.endsWith(".svg")) return cursor;
    try {
      const response = await fetch(cursor.url, { credentials: "omit" });
      if (!response.ok) return cursor;
      const svgText = await response.text();
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svgText,
      )}`;
      const sizes = [32, 64, 96];
      const results = {};

      for (const size of sizes) {
        const pngUrl = await svgToPng(svgDataUrl, size);
        if (size === 32) results.one = pngUrl;
        if (size === 64) results.two = pngUrl;
        if (size === 96) results.three = pngUrl;
      }

      return {
        url: results.one || cursor.url,
        set: results,
      };
    } catch {
      return cursor;
    }
  }

  function svgToPng(svgUrl, size) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No canvas context"));
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = () => reject(new Error("Failed to rasterize cursor"));
      img.src = svgUrl;
    });
  }

  function parseSettingsFromHtml(html) {
    if (!html) return null;
    const readString = (key) => {
      const escaped = new RegExp(
        `\\\\\\"${key}\\\\\\",\\\\\\"([^\\\\\\"]*)`,
        "i",
      );
      const plain = new RegExp(`"${key}","([^"]*)"`, "i");
      const match = html.match(escaped) || html.match(plain);
      return match ? match[1] : "";
    };
    const readBool = (key) => {
      const escaped = new RegExp(`\\\\\\"${key}\\\\\\",(true|false)`, "i");
      const plain = new RegExp(`"${key}",(true|false)`, "i");
      const match = html.match(escaped) || html.match(plain);
      return match ? match[1] === "true" : null;
    };

    const enabled = readBool("enabled");
    const disableOnMobile = readBool("disableOnMobile");
    const imageUrl = readString("imageUrl");
    const hoverImageUrl = readString("hoverImageUrl");
    const preset = readString("preset");

    const result = {
      ...(enabled === null ? {} : { enabled }),
      ...(disableOnMobile === null ? {} : { disableOnMobile }),
      ...(imageUrl ? { imageUrl } : {}),
      ...(hoverImageUrl ? { hoverImageUrl } : {}),
      ...(preset ? { preset } : {}),
    };

    return Object.keys(result).length ? result : null;
  }
})();
