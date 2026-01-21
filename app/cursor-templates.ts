export type AccentType =
  | "dot"
  | "box"
  | "box-open"
  | "tag"
  | "tag-percent"
  | "heart"
  | "heart-double"
  | "leaf"
  | "leaf-spark"
  | "candy"
  | "candy-bite";

export type IconType =
  | "cart"
  | "tag"
  | "heart"
  | "star"
  | "bolt"
  | "leaf";

export type CursorTemplate =
  | {
      kind: "cursor";
      accent: AccentType;
      hoverAccent: AccentType;
    }
  | {
      kind: "icon";
      icon: IconType;
    };

export const CURSOR_TEMPLATES: Record<string, CursorTemplate> = {
  "cartoon-bag": { kind: "cursor", accent: "box", hoverAccent: "box-open" },
  "cartoon-sale": { kind: "cursor", accent: "tag", hoverAccent: "tag-percent" },
  "cartoon-heart": {
    kind: "cursor",
    accent: "heart",
    hoverAccent: "heart-double",
  },
  "cartoon-gift": { kind: "cursor", accent: "box", hoverAccent: "box-open" },
  "cartoon-green": { kind: "cursor", accent: "leaf", hoverAccent: "leaf-spark" },
  "cartoon-sweet": {
    kind: "cursor",
    accent: "candy",
    hoverAccent: "candy-bite",
  },
  "premium-cart": { kind: "icon", icon: "cart" },
  "premium-tag": { kind: "icon", icon: "tag" },
  "premium-heart": { kind: "icon", icon: "heart" },
  "premium-star": { kind: "icon", icon: "star" },
  "premium-leaf": { kind: "icon", icon: "leaf" },
  "premium-bolt": { kind: "icon", icon: "bolt" },
  "commerce-luxe": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-tech": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-min": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-organic": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "season-holiday": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "season-sun": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "season-sport": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
};

const accentSvg = (type: AccentType, color: string) => {
  switch (type) {
    case "box":
      return `<rect x="38" y="38" width="12" height="10" rx="2" fill="${color}" stroke="#111827" stroke-width="1.5"/>`;
    case "box-open":
      return `<rect x="38" y="40" width="12" height="8" rx="2" fill="${color}" stroke="#111827" stroke-width="1.5"/><path d="M38 40l6-4 6 4" fill="${color}" stroke="#111827" stroke-width="1.5" stroke-linejoin="round"/>`;
    case "tag":
      return `<path d="M38 38h10l4 4-10 10-6-6z" fill="${color}" stroke="#111827" stroke-width="1.5" stroke-linejoin="round"/>`;
    case "tag-percent":
      return `<path d="M38 38h10l4 4-10 10-6-6z" fill="${color}" stroke="#111827" stroke-width="1.5" stroke-linejoin="round"/><circle cx="45" cy="41.5" r="2" fill="#fff" stroke="#111827" stroke-width="1"/><path d="M44 48l6-6" stroke="#111827" stroke-width="1.4" stroke-linecap="round"/>`;
    case "heart":
      return `<path d="M44 50s-6-4-7-8c-1-4 4-6 7-3 3-3 8-1 7 3-1 4-7 8-7 8z" fill="${color}" stroke="#111827" stroke-width="1.4" stroke-linejoin="round"/>`;
    case "heart-double":
      return `<path d="M41 48s-4-3-5-6c-1-3 3-5 5-2 2-3 6-1 5 2-1 3-5 6-5 6z" fill="${color}" stroke="#111827" stroke-width="1.2" stroke-linejoin="round"/><path d="M48 52s-4-3-5-6c-1-3 3-5 5-2 2-3 6-1 5 2-1 3-5 6-5 6z" fill="${color}" stroke="#111827" stroke-width="1.2" stroke-linejoin="round"/>`;
    case "leaf":
      return `<path d="M38 46c0-5 5-9 12-9-1 8-5 14-12 14-3 0-5-2-5-5z" fill="${color}" stroke="#111827" stroke-width="1.4" stroke-linejoin="round"/><path d="M41 50c4-4 7-6 10-8" stroke="#111827" stroke-width="1.2" stroke-linecap="round"/>`;
    case "leaf-spark":
      return `<path d="M38 46c0-5 5-9 12-9-1 8-5 14-12 14-3 0-5-2-5-5z" fill="${color}" stroke="#111827" stroke-width="1.4" stroke-linejoin="round"/><path d="M50 38l1.2 2.6 2.6 1.2-2.6 1.2-1.2 2.6-1.2-2.6-2.6-1.2 2.6-1.2z" fill="#fff" stroke="#111827" stroke-width="0.9"/>`;
    case "candy":
      return `<rect x="41" y="42" width="10" height="6" rx="2" fill="${color}" stroke="#111827" stroke-width="1.4"/><path d="M41 45l-3-3 3-3M51 45l3-3-3-3" stroke="#111827" stroke-width="1.2" stroke-linecap="round"/>`;
    case "candy-bite":
      return `<rect x="41" y="42" width="10" height="6" rx="2" fill="${color}" stroke="#111827" stroke-width="1.4"/><path d="M41 45l-3-3 3-3M51 45l3-3-3-3" stroke="#111827" stroke-width="1.2" stroke-linecap="round"/><circle cx="52.5" cy="42.5" r="2" fill="#fff" stroke="#111827" stroke-width="0.9"/>`;
    case "dot":
    default:
      return `<circle cx="44" cy="46" r="6" fill="${color}"/>`;
  }
};

export const cursorSvg = (
  fill: string,
  accent: string,
  accentType: AccentType = "dot",
) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M12 6l34 26-18 4 8 22-10 4-8-22-16 10z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>${accentSvg(
    accentType,
    accent,
  )}</svg>`;

export const iconSvg = (type: IconType, fill: string, accent: string) => {
  let shape = "";
  if (type === "cart") {
    shape = `<rect x="14" y="18" width="30" height="18" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="22" cy="40" r="4" fill="${accent}"/><circle cx="38" cy="40" r="4" fill="${accent}"/><path d="M14 18h-6" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "tag") {
    shape = `<path d="M14 18h22l8 8-20 20-12-12z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="34" cy="26" r="3" fill="${accent}"/>`;
  } else if (type === "heart") {
    shape = `<path d="M32 44s-12-8-14-16c-2-8 8-14 14-6 6-8 16-2 14 6-2 8-14 16-14 16z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "star") {
    shape = `<path d="M32 16l4.5 9.5 10.5 1.5-7.5 7.3 1.8 10.4-9.3-4.9-9.3 4.9 1.8-10.4-7.5-7.3 10.5-1.5z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "bolt") {
    shape = `<path d="M30 14l-8 18h8l-4 18 16-24h-9l5-12z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "leaf") {
    shape = `<path d="M20 36c0-10 10-18 24-18-2 16-10 28-24 28-6 0-10-4-10-10z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M24 40c8-8 14-12 22-16" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">${shape}</svg>`;
};

export const buildCursorSvg = (
  preset: string,
  options: {
    fill: string;
    accent: string;
    hoverFill: string;
    hoverAccent: string;
  },
  hover: boolean,
) => {
  const template = CURSOR_TEMPLATES[preset];
  if (!template) {
    return null;
  }
  if (template.kind === "icon") {
    return hover
      ? iconSvg(template.icon, options.hoverFill, options.hoverAccent)
      : iconSvg(template.icon, options.fill, options.accent);
  }
  const accentType = hover ? template.hoverAccent : template.accent;
  const fill = hover ? options.hoverFill : options.fill;
  const accent = hover ? options.hoverAccent : options.accent;
  return cursorSvg(fill, accent, accentType);
};
