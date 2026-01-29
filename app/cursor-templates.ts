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
  | "candy-bite"
  | "spark"
  | "sun"
  | "ball";

export type IconType =
  | "cart"
  | "tag"
  | "heart"
  | "star"
  | "bolt"
  | "leaf"
  | "pixel-arrow"
  | "pixel-hand"
  | "snowflake"
  | "snowman"
  | "valentine-heart"
  | "valentine-rose"
  | "summer-sun"
  | "summer-sunglasses"
  | "halloween-pumpkin"
  | "halloween-ghost"
  | "cyber-chip"
  | "cyber-circuit"
  | "spring-flower"
  | "spring-tulip"
  | "autumn-leaf"
  | "autumn-acorn"
  | "newyear-firework"
  | "newyear-spark"
  | "holiday-candy"
  | "holiday-spark"
  | "sunset-sun"
  | "sunset-spark"
  | "sport-ball"
  | "sport-spark"
  | "electric-critter"
  | "electric-charge"
  | "explorer-hat"
  | "explorer-compass"
  | "ninja-fox"
  | "ninja-smoke"
  | "space-helmet"
  | "space-jet"
  | "slime"
  | "slime-wand"
  | "travel-plane"
  | "travel-bag"
  | "music-note"
  | "music-headphones"
  | "gaming-pad"
  | "gaming-joystick"
  | "bw-arrow-classic"
  | "bw-arrow-outline"
  | "bw-arrow-bold"
  | "bw-arrow-slim"
  | "bw-crosshair"
  | "bw-hand"
  | "bw-hand-solid"
  | "bw-hand-outline"
  | "bw-hand-click"
  | "bw-hand-spark"
  | "bw-hand-press"
  | "snowflake"
  | "mitten"
  | "valentine-heart"
  | "valentine-rose"
  | "summer-sun"
  | "summer-sunglasses"
  | "halloween-pumpkin"
  | "halloween-ghost"
  | "barber-clipper"
  | "barber-pole"
  | "coffee-bean"
  | "coffee-cup"
  | "bakery-croissant"
  | "bakery-cupcake"
  | "florist-bud"
  | "florist-bouquet"
  | "pet-paw"
  | "pet-bone"
  | "fitness-dumbbell"
  | "fitness-bottle"
  | "beauty-lipstick"
  | "beauty-mirror"
  | "apparel-shirt"
  | "apparel-hanger"
  | "bikini-top"
  | "flip-flop"
  | "surfboard"
  | "wave"
  | "jewelry-ring"
  | "jewelry-gem"
  | "home-lamp"
  | "home-plant"
  | "crewmate-cinema"
  | "crewmate-cinema-popcorn"
  | "crewmate-saboteur"
  | "crewmate-saboteur-alert"
  | "crewmate-medbay"
  | "crewmate-medbay-monitor"
  | "crewmate-engineer"
  | "crewmate-engineer-gear";

export type CursorTemplate =
  | {
      kind: "cursor";
      accent: AccentType;
      hoverAccent: AccentType;
    }
  | {
      kind: "icon";
      icon: IconType;
      hoverIcon?: IconType;
      fixedColors?: {
        fill: string;
        accent: string;
        hoverFill?: string;
        hoverAccent?: string;
      };
    };

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return { r: 0, g: 0, b: 0 };
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, Math.round(value))))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;

const mixHex = (from: string, to: string, ratio: number) => {
  const start = hexToRgb(from);
  const end = hexToRgb(to);
  return rgbToHex(
    start.r + (end.r - start.r) * ratio,
    start.g + (end.g - start.g) * ratio,
    start.b + (end.b - start.b) * ratio,
  );
};

let svgInstance = 0;

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
  "cartoon-cinema": {
    kind: "icon",
    icon: "crewmate-cinema",
    hoverIcon: "crewmate-cinema-popcorn",
  },
  "cartoon-saboteur": {
    kind: "icon",
    icon: "crewmate-saboteur",
    hoverIcon: "crewmate-saboteur-alert",
  },
  "cartoon-medbay": {
    kind: "icon",
    icon: "crewmate-medbay",
    hoverIcon: "crewmate-medbay-monitor",
  },
  "cartoon-engineer": {
    kind: "icon",
    icon: "crewmate-engineer",
    hoverIcon: "crewmate-engineer-gear",
  },
  "premium-cart": { kind: "icon", icon: "cart" },
  "premium-tag": { kind: "icon", icon: "tag" },
  "premium-heart": { kind: "icon", icon: "heart" },
  "premium-star": { kind: "icon", icon: "star" },
  "premium-leaf": { kind: "icon", icon: "leaf" },
  "premium-bolt": { kind: "icon", icon: "bolt" },
  "premium-pixel-sunset": {
    kind: "icon",
    icon: "pixel-arrow",
    hoverIcon: "pixel-hand",
  },
  "bw-classic": {
    kind: "icon",
    icon: "bw-arrow-classic",
    hoverIcon: "bw-hand-solid",
  },
  "bw-outline": {
    kind: "icon",
    icon: "bw-arrow-outline",
    hoverIcon: "bw-hand-outline",
  },
  "bw-bold": { kind: "icon", icon: "bw-arrow-bold", hoverIcon: "bw-hand-click" },
  "bw-slim": { kind: "icon", icon: "bw-arrow-slim", hoverIcon: "bw-hand-spark" },
  "bw-target": { kind: "icon", icon: "bw-crosshair", hoverIcon: "bw-hand-press" },
  "season-winter": { kind: "icon", icon: "snowflake", hoverIcon: "snowman" },
  "season-valentine": {
    kind: "icon",
    icon: "valentine-heart",
    hoverIcon: "valentine-rose",
  },
  "season-summer": { kind: "icon", icon: "summer-sun", hoverIcon: "summer-sunglasses" },
  "season-halloween": {
    kind: "icon",
    icon: "halloween-pumpkin",
    hoverIcon: "halloween-ghost",
  },
  "season-cyber": { kind: "icon", icon: "cyber-chip", hoverIcon: "cyber-circuit" },
  "season-spring": { kind: "icon", icon: "spring-flower", hoverIcon: "spring-tulip" },
  "season-autumn": { kind: "icon", icon: "autumn-leaf", hoverIcon: "autumn-acorn" },
  "season-newyear": { kind: "icon", icon: "newyear-firework", hoverIcon: "newyear-spark" },
  "commerce-travel": { kind: "icon", icon: "travel-plane", hoverIcon: "travel-bag" },
  "commerce-music": { kind: "icon", icon: "music-note", hoverIcon: "music-headphones" },
  "premium-gaming": { kind: "icon", icon: "gaming-pad", hoverIcon: "gaming-joystick" },
  "cartoon-electric": { kind: "icon", icon: "electric-critter", hoverIcon: "electric-charge" },
  "cartoon-explorer": { kind: "icon", icon: "explorer-hat", hoverIcon: "explorer-compass" },
  "cartoon-ninja": { kind: "icon", icon: "ninja-fox", hoverIcon: "ninja-smoke" },
  "cartoon-space": { kind: "icon", icon: "space-helmet", hoverIcon: "space-jet" },
  "cartoon-slime": { kind: "icon", icon: "slime", hoverIcon: "slime-wand" },
  "commerce-luxe": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-tech": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-min": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-organic": { kind: "cursor", accent: "dot", hoverAccent: "dot" },
  "commerce-barber": {
    kind: "icon",
    icon: "barber-clipper",
    hoverIcon: "barber-pole",
  },
  "commerce-coffee": {
    kind: "icon",
    icon: "coffee-bean",
    hoverIcon: "coffee-cup",
  },
  "commerce-bakery": {
    kind: "icon",
    icon: "bakery-croissant",
    hoverIcon: "bakery-cupcake",
  },
  "commerce-florist": {
    kind: "icon",
    icon: "florist-bud",
    hoverIcon: "florist-bouquet",
  },
  "commerce-pet": {
    kind: "icon",
    icon: "pet-paw",
    hoverIcon: "pet-bone",
  },
  "commerce-fitness": {
    kind: "icon",
    icon: "fitness-dumbbell",
    hoverIcon: "fitness-bottle",
  },
  "commerce-beauty": {
    kind: "icon",
    icon: "beauty-lipstick",
    hoverIcon: "beauty-mirror",
  },
  "commerce-apparel": {
    kind: "icon",
    icon: "apparel-shirt",
    hoverIcon: "apparel-hanger",
  },
  "commerce-bikini": {
    kind: "icon",
    icon: "bikini-top",
    hoverIcon: "flip-flop",
  },
  "commerce-surf": {
    kind: "icon",
    icon: "surfboard",
    hoverIcon: "wave",
  },
  "commerce-jewelry": {
    kind: "icon",
    icon: "jewelry-ring",
    hoverIcon: "jewelry-gem",
  },
  "commerce-home": {
    kind: "icon",
    icon: "home-lamp",
    hoverIcon: "home-plant",
  },
  "season-holiday": {
    kind: "icon",
    icon: "holiday-candy",
    hoverIcon: "holiday-spark",
  },
  "season-sun": { kind: "icon", icon: "sunset-sun", hoverIcon: "sunset-spark" },
  "season-sport": { kind: "icon", icon: "sport-ball", hoverIcon: "sport-spark" },
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
      return `<rect x="36" y="38" width="16" height="10" rx="3" fill="${color}" stroke="#111827" stroke-width="1.6"/><path d="M36 43l-4-4 4-4M52 43l4-4-4-4" stroke="#111827" stroke-width="1.4" stroke-linecap="round"/>`;
    case "candy-bite":
      return `<rect x="41" y="42" width="10" height="6" rx="2" fill="${color}" stroke="#111827" stroke-width="1.4"/><path d="M41 45l-3-3 3-3M51 45l3-3-3-3" stroke="#111827" stroke-width="1.2" stroke-linecap="round"/><circle cx="52.5" cy="42.5" r="2" fill="#fff" stroke="#111827" stroke-width="0.9"/>`;
    case "spark":
      return `<path d="M44 34l3.2 7.2 7.2 3.2-7.2 3.2-3.2 7.2-3.2-7.2-7.2-3.2 7.2-3.2z" fill="${color}" stroke="#111827" stroke-width="1.3" stroke-linejoin="round"/>`;
    case "sun":
      return `<circle cx="44" cy="44" r="7" fill="${color}" stroke="#111827" stroke-width="1.4"/><g stroke="#111827" stroke-width="1.2" stroke-linecap="round"><line x1="44" y1="32" x2="44" y2="36"/><line x1="44" y1="52" x2="44" y2="56"/><line x1="32" y1="44" x2="36" y2="44"/><line x1="52" y1="44" x2="56" y2="44"/><line x1="36" y1="36" x2="38.5" y2="38.5"/><line x1="51.5" y1="51.5" x2="54" y2="54"/><line x1="51.5" y1="36.5" x2="54" y2="34"/><line x1="36.5" y1="51.5" x2="34" y2="54"/></g>`;
    case "ball":
      return `<circle cx="44" cy="44" r="7" fill="${color}" stroke="#111827" stroke-width="1.4"/><path d="M39 42c3 4 7 4 10 0M40 47c2 2 6 2 9 0" stroke="#111827" stroke-width="1" stroke-linecap="round"/>`;
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

export const iconSvg = (
  type: IconType,
  fill: string,
  accent: string,
  idToken = "",
) => {
  let shape = "";
  const token = idToken ? `-${idToken}` : "";
  const crewmateBase = `
    <rect x="20" y="14" width="24" height="32" rx="12" fill="${fill}" stroke="#111827" stroke-width="2"/>
    <rect x="20" y="40" width="10" height="12" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/>
    <rect x="34" y="40" width="10" height="12" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/>
    <rect x="14" y="22" width="8" height="18" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/>
    <rect x="26" y="20" width="16" height="10" rx="5" fill="${accent}" stroke="#111827" stroke-width="1.6"/>
    <path d="M28 23h8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
  `;
  const popcornBucket = `
    <rect x="42" y="30" width="10" height="12" rx="2" fill="#ffffff" stroke="#111827" stroke-width="1.6"/>
    <path d="M44 30v12M48 30v12" stroke="${accent}" stroke-width="1.6"/>
    <circle cx="44" cy="28" r="2" fill="${accent}" stroke="#111827" stroke-width="1"/>
    <circle cx="48" cy="27.5" r="2" fill="${accent}" stroke="#111827" stroke-width="1"/>
    <circle cx="52" cy="28.5" r="2" fill="${accent}" stroke="#111827" stroke-width="1"/>
  `;
  const alertBeacon = `
    <rect x="42" y="28" width="10" height="10" rx="3" fill="${accent}" stroke="#111827" stroke-width="1.6"/>
    <path d="M47 30v4" stroke="#111827" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="47" cy="36" r="1.4" fill="#111827"/>
  `;
  const medCross = `
    <rect x="30" y="30" width="4" height="12" rx="1.5" fill="${accent}" stroke="#111827" stroke-width="1"/>
    <rect x="26" y="34" width="12" height="4" rx="1.5" fill="${accent}" stroke="#111827" stroke-width="1"/>
  `;
  const heartMonitor = `
    <rect x="40" y="26" width="14" height="10" rx="4" fill="#ffffff" stroke="#111827" stroke-width="1.4"/>
    <path d="M42 31h3l2-3 2 6 2-3h3" stroke="${accent}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  `;
  const wrenchPack = `
    <path d="M42 24l6 6-4 4-6-6z" fill="${accent}" stroke="#111827" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="47" cy="29" r="2.2" fill="#ffffff" stroke="#111827" stroke-width="1"/>
  `;
  const gear = `
    <circle cx="48" cy="30" r="5" fill="${accent}" stroke="#111827" stroke-width="1.4"/>
    <path d="M48 24v2M48 34v2M42 30h2M52 30h2M44 26l1.5 1.5M51 33l1.5 1.5M44 34l1.5-1.5M51 27l1.5-1.5" stroke="#111827" stroke-width="1"/>
    <circle cx="48" cy="30" r="2" fill="#ffffff" stroke="#111827" stroke-width="1"/>
  `;
  const crewmateScale = (content: string) =>
    `<g transform="translate(-4 -4) scale(1.15)">${content}</g>`;
  const commerceScale = (content: string) =>
    `<g transform="translate(-6 -6) scale(1.3)">${content}</g>`;
  const pixelArrow = [
    [6, 6],
    [40, 24],
    [32, 28],
    [42, 48],
    [32, 52],
    [22, 34],
    [12, 46],
  ];
  const pixelHand = [
    [14, 20],
    [24, 20],
    [24, 12],
    [30, 12],
    [30, 20],
    [36, 20],
    [36, 14],
    [42, 14],
    [42, 20],
    [48, 20],
    [48, 28],
    [40, 28],
    [40, 48],
    [22, 48],
    [22, 36],
    [14, 36],
  ];
  const toPoints = (points: number[][]) =>
    points.map(([x, y]) => `${x},${y}`).join(" ");
  const offsetPoints = (points: number[][], dx: number, dy: number) =>
    points.map(([x, y]) => `${x + dx},${y + dy}`).join(" ");
  const pixel3d = (points: number[][], id: string) => {
    const highlight = mixHex(fill, "#ffffff", 0.35);
    const midShadow = mixHex(fill, "#00e5ff", 0.45);
    const deepShadow = mixHex(fill, "#ff4fd8", 0.35);
    const gradientId = `${id}${token}`;
    return `
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${highlight}"/>
        <stop offset="70%" stop-color="${fill}"/>
      </linearGradient>
    </defs>
    <polygon points="${offsetPoints(points, 6, 6)}" fill="${deepShadow}" opacity="0.95"/>
    <polygon points="${offsetPoints(points, 3, 3)}" fill="${midShadow}" opacity="0.85"/>
    <polygon points="${toPoints(points)}" fill="url(#${gradientId})" stroke="${accent}" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M${points[0][0] + 6} ${points[0][1] + 2}L${points[1][0] - 8} ${points[1][1] + 5}" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" opacity="0.4"/>
  `;
  };
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
  } else if (type === "barber-clipper") {
    shape = commerceScale(
      `<rect x="22" y="16" width="20" height="30" rx="6" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="24" y="20" width="16" height="16" rx="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/><rect x="20" y="12" width="24" height="6" rx="2" fill="#e5e7eb" stroke="#111827" stroke-width="1.6"/><rect x="28" y="38" width="8" height="6" rx="2" fill="#111827"/>`,
    );
  } else if (type === "barber-pole") {
    shape = commerceScale(
      `<rect x="26" y="12" width="12" height="40" rx="6" fill="#ffffff" stroke="#111827" stroke-width="1.8"/><path d="M28 18h8M28 26h8M28 34h8M28 42h8" stroke="${accent}" stroke-width="3"/><path d="M28 22h8M28 30h8M28 38h8" stroke="${fill}" stroke-width="3"/><rect x="24" y="10" width="16" height="4" rx="2" fill="#cbd5f5"/><rect x="24" y="52" width="16" height="4" rx="2" fill="#cbd5f5"/>`,
    );
  } else if (type === "coffee-bean") {
    shape = commerceScale(
      `<ellipse cx="32" cy="32" rx="14" ry="10" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M26 22c6 8 6 12 0 20" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "coffee-cup") {
    shape = commerceScale(
      `<rect x="20" y="24" width="20" height="16" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M40 26h6c2 0 4 2 4 4s-2 4-4 4h-6" fill="none" stroke="#111827" stroke-width="2"/><path d="M24 20c0 4 4 4 4 8M32 20c0 4 4 4 4 8" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "bakery-croissant") {
    shape = commerceScale(
      `<path d="M18 34c0-8 8-14 14-10 6-4 14 2 14 10 0 6-6 10-14 10s-14-4-14-10z" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M26 28c2 2 10 2 12 0" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "bakery-cupcake") {
    shape = commerceScale(
      `<path d="M20 40h24l-4 10H24z" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="32" cy="28" r="10" fill="${accent}" stroke="#111827" stroke-width="2"/><circle cx="36" cy="24" r="3" fill="#ffffff" opacity="0.6"/>`,
    );
  } else if (type === "florist-bud") {
    shape = commerceScale(
      `<circle cx="32" cy="24" r="8" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M32 32v12" stroke="#111827" stroke-width="2"/><path d="M28 38c2-2 6-2 8 0" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "florist-bouquet") {
    shape = commerceScale(
      `<circle cx="24" cy="24" r="6" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="40" cy="24" r="6" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="32" cy="18" r="6" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M24 30l8 14 8-14" fill="${accent}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`,
    );
  } else if (type === "pet-paw") {
    shape = commerceScale(
      `<circle cx="32" cy="36" r="8" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="22" cy="26" r="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/><circle cx="32" cy="22" r="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/><circle cx="42" cy="26" r="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/>`,
    );
  } else if (type === "pet-bone") {
    shape = commerceScale(
      `<rect x="22" y="30" width="20" height="8" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="20" cy="30" r="4" fill="${accent}" stroke="#111827" stroke-width="2"/><circle cx="44" cy="30" r="4" fill="${accent}" stroke="#111827" stroke-width="2"/><circle cx="20" cy="38" r="4" fill="${accent}" stroke="#111827" stroke-width="2"/><circle cx="44" cy="38" r="4" fill="${accent}" stroke="#111827" stroke-width="2"/>`,
    );
  } else if (type === "fitness-dumbbell") {
    shape = commerceScale(
      `<rect x="24" y="30" width="16" height="6" rx="3" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="18" y="26" width="6" height="14" rx="2" fill="${accent}" stroke="#111827" stroke-width="2"/><rect x="40" y="26" width="6" height="14" rx="2" fill="${accent}" stroke="#111827" stroke-width="2"/>`,
    );
  } else if (type === "fitness-bottle") {
    shape = commerceScale(
      `<rect x="26" y="16" width="12" height="6" rx="3" fill="${accent}" stroke="#111827" stroke-width="2"/><rect x="24" y="22" width="16" height="26" rx="6" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M26 30h12" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "beauty-lipstick") {
    shape = commerceScale(
      `<rect x="26" y="28" width="12" height="16" rx="3" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="26" y="22" width="12" height="6" rx="2" fill="#111827"/><path d="M28 18h8l-2 4h-4z" fill="${accent}" stroke="#111827" stroke-width="1.6"/>`,
    );
  } else if (type === "beauty-mirror") {
    shape = commerceScale(
      `<circle cx="32" cy="28" r="10" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="29" y="38" width="6" height="12" rx="3" fill="${accent}" stroke="#111827" stroke-width="2"/>`,
    );
  } else if (type === "apparel-shirt") {
    shape = commerceScale(
      `<path d="M20 18l6-4h12l6 4 4 8-6 4v18H22V30l-6-4z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`,
    );
  } else if (type === "apparel-hanger") {
    shape = commerceScale(
      `<path d="M32 18c2 0 4 2 4 4s-2 4-4 4" stroke="#111827" stroke-width="2" fill="none"/><path d="M16 32l16-8 16 8" stroke="${accent}" stroke-width="3" stroke-linecap="round"/><path d="M16 32l6 12h20l6-12" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`,
    );
  } else if (type === "bikini-top") {
    const outline = mixHex(accent, "#000000", 0.35);
    const cupFill = mixHex(fill, "#ffffff", 0.12);
    shape = commerceScale(
      `<path d="M12 30c2-10 14-12 20 0-2 8-6 10-10 10s-8-4-10-10z" fill="${cupFill}" stroke="${outline}" stroke-width="2.4" stroke-linejoin="round"/><path d="M52 30c-2-10-14-12-20 0 2 8 6 10 10 10s8-4 10-10z" fill="${cupFill}" stroke="${outline}" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 26h16" stroke="${outline}" stroke-width="2.2" stroke-linecap="round"/><path d="M14 20c6 0 8 6 10 12" stroke="${outline}" stroke-width="2.2" stroke-linecap="round"/><path d="M50 20c-6 0-8 6-10 12" stroke="${outline}" stroke-width="2.2" stroke-linecap="round"/><path d="M18 46h28c-4 10-10 14-14 14s-10-4-14-14z" fill="${fill}" stroke="${outline}" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 48c2 3 5 4 8 4s6-1 8-4" stroke="${outline}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "flip-flop") {
    shape = commerceScale(
      `<rect x="22" y="26" width="12" height="20" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="36" y="26" width="12" height="20" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M28 30l4 4M40 30l4 4" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "surfboard") {
    const outline = mixHex(accent, "#000000", 0.55);
    shape = commerceScale(
      `<g transform="rotate(-20 32 32)"><path d="M28 6c12 14 12 44 0 58-12-14-12-44 0-58z" fill="${fill}" stroke="${outline}" stroke-width="2.6"/><path d="M24 20l8-5 8 5-3 20-5 10-5-10z" fill="${accent}" stroke="${outline}" stroke-width="2" stroke-linejoin="round"/><path d="M30 16l10 6" stroke="${outline}" stroke-width="2" stroke-linecap="round"/><path d="M26 46l6 10 6-10-3-2-3 2-3-2z" fill="${accent}" stroke="${outline}" stroke-width="2" stroke-linejoin="round"/><circle cx="28" cy="36" r="2.6" fill="#ffffff" opacity="0.7"/></g>`,
    );
  } else if (type === "wave") {
    shape = commerceScale(
      `<path d="M14 36c6-6 10-6 16 0 6 6 10 6 16 0" stroke="${accent}" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M18 44c4-4 8-4 12 0" stroke="${fill}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`,
    );
  } else if (type === "jewelry-ring") {
    shape = commerceScale(
      `<circle cx="32" cy="34" r="10" fill="none" stroke="${fill}" stroke-width="3"/><path d="M28 20h8l-4 6z" fill="${accent}" stroke="#111827" stroke-width="1.5"/>`,
    );
  } else if (type === "jewelry-gem") {
    shape = commerceScale(
      `<path d="M24 20h16l6 8-14 18-14-18z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M24 20l8 8 8-8" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "home-lamp") {
    shape = commerceScale(
      `<path d="M22 26h20l-4-10H26z" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="30" y="26" width="4" height="12" fill="${accent}" stroke="#111827" stroke-width="1.6"/><rect x="24" y="38" width="16" height="6" rx="3" fill="#111827"/>`,
    );
  } else if (type === "home-plant") {
    shape = commerceScale(
      `<path d="M22 38h20l-4 10H26z" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M32 20c0 8-8 8-8 16M32 20c0 8 8 8 8 16" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`,
    );
  } else if (type === "pixel-arrow") {
    shape = pixel3d(pixelArrow, "pixel-arrow-fill");
  } else if (type === "pixel-hand") {
    shape = pixel3d(pixelHand, "pixel-hand-fill");
  } else if (type === "snowflake") {
    shape = `<g stroke="${accent}" stroke-width="2" stroke-linecap="round"><line x1="32" y1="12" x2="32" y2="52"/><line x1="12" y1="32" x2="52" y2="32"/><line x1="18" y1="18" x2="46" y2="46"/><line x1="46" y1="18" x2="18" y2="46"/></g><circle cx="32" cy="32" r="6" fill="${fill}" stroke="#111827" stroke-width="1.6"/>`;
  } else if (type === "snowman") {
    shape = `<circle cx="32" cy="38" r="10" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="32" cy="24" r="7" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="29" cy="22" r="1.5" fill="${accent}"/><circle cx="35" cy="22" r="1.5" fill="${accent}"/><path d="M30 27h4" stroke="${accent}" stroke-width="2" stroke-linecap="round"/><rect x="24" y="12" width="16" height="6" rx="2" fill="${accent}" stroke="#111827" stroke-width="1.6"/><path d="M24 30h16" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "mitten") {
    shape = `<path d="M20 18c-6 6-6 20 0 28 4 4 14 4 18 0 2-2 2-6 0-8l-4-4V18c0-4-4-8-8-8-2 0-4 2-6 4z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M34 28h10c4 0 6 8 2 12-2 2-6 2-8 0" fill="${accent}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "valentine-heart") {
    shape = `<path d="M32 46s-12-8-14-16c-2-8 8-14 14-6 6-8 16-2 14 6-2 8-14 16-14 16z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M26 24h12" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "valentine-rose") {
    shape = `<circle cx="32" cy="26" r="10" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M32 18c4 2 6 6 4 10" stroke="${accent}" stroke-width="2" stroke-linecap="round"/><path d="M32 36v12" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M28 42c-4 0-6 4-6 8 6 2 10 0 12-4" fill="${accent}" stroke="#111827" stroke-width="1.6" stroke-linejoin="round"/>`;
  } else if (type === "summer-sun") {
    shape = `<circle cx="32" cy="32" r="10" fill="${fill}" stroke="#111827" stroke-width="2"/><g stroke="${accent}" stroke-width="2" stroke-linecap="round"><line x1="32" y1="12" x2="32" y2="18"/><line x1="32" y1="46" x2="32" y2="52"/><line x1="12" y1="32" x2="18" y2="32"/><line x1="46" y1="32" x2="52" y2="32"/><line x1="18" y1="18" x2="22" y2="22"/><line x1="42" y1="42" x2="46" y2="46"/><line x1="42" y1="22" x2="46" y2="18"/><line x1="18" y1="46" x2="22" y2="42"/></g>`;
  } else if (type === "summer-sunglasses") {
    shape = `<rect x="16" y="26" width="14" height="10" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="34" y="26" width="14" height="10" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M30 30h4" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M14 28c2-4 6-6 10-6M50 28c-2-4-6-6-10-6" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "halloween-pumpkin") {
    shape = `<ellipse cx="32" cy="32" rx="14" ry="12" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M20 32c2 8 8 12 12 12s10-4 12-12" stroke="${accent}" stroke-width="2" stroke-linecap="round"/><path d="M32 18c-2 2-2 6 0 8" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M26 30l4 4-4 4M38 30l-4 4 4 4" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if (type === "halloween-ghost") {
    shape = `<path d="M20 46c0-16 8-22 12-22s12 6 12 22l-4-2-4 2-4-2-4 2-4-2-4 2z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="28" cy="30" r="2" fill="${accent}"/><circle cx="36" cy="30" r="2" fill="${accent}"/>`;
  } else if (type === "holiday-candy") {
    shape = `<rect x="18" y="28" width="28" height="12" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M18 34l-6-6 6-6M46 34l6-6-6-6" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M24 28h16" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "holiday-spark") {
    shape = `<path d="M32 14l4.5 10 10 4.5-10 4.5-4.5 10-4.5-10-10-4.5 10-4.5z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="44" cy="20" r="3" fill="${accent}"/><circle cx="20" cy="44" r="3" fill="${accent}"/>`;
  } else if (type === "sunset-sun") {
    shape = `<circle cx="32" cy="32" r="12" fill="${fill}" stroke="#111827" stroke-width="2"/><g stroke="${accent}" stroke-width="2" stroke-linecap="round"><line x1="32" y1="10" x2="32" y2="16"/><line x1="32" y1="48" x2="32" y2="54"/><line x1="10" y1="32" x2="16" y2="32"/><line x1="48" y1="32" x2="54" y2="32"/><line x1="18" y1="18" x2="22" y2="22"/><line x1="42" y1="42" x2="46" y2="46"/><line x1="42" y1="22" x2="46" y2="18"/><line x1="18" y1="46" x2="22" y2="42"/></g>`;
  } else if (type === "sunset-spark") {
    shape = `<path d="M32 18l3.5 8 8 3.5-8 3.5-3.5 8-3.5-8-8-3.5 8-3.5z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "sport-ball") {
    shape = `<circle cx="32" cy="32" r="12" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M24 30c3 4 9 4 12 0M24 36c3 3 9 3 12 0" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "sport-spark") {
    shape = `<path d="M32 16l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M20 20l4 4M44 44l4 4" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "electric-critter") {
    shape = `<circle cx="28" cy="30" r="10" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="40" cy="30" r="8" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="26" cy="28" r="2" fill="${accent}"/><circle cx="38" cy="28" r="2" fill="${accent}"/><path d="M24 20l-6-6 8 2M44 20l6-6-8 2" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M30 36h8" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "electric-charge") {
    shape = `<path d="M28 18l-6 10h8l-6 18 16-20h-8l6-8z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="44" cy="22" r="3" fill="${accent}"/><circle cx="20" cy="44" r="3" fill="${accent}"/>`;
  } else if (type === "explorer-hat") {
    shape = `<path d="M18 30c0-8 6-14 14-14s14 6 14 14H18z" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="14" y="30" width="36" height="6" rx="3" fill="${accent}" stroke="#111827" stroke-width="2"/>`;
  } else if (type === "explorer-compass") {
    shape = `<circle cx="32" cy="32" r="12" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M32 22l4 10-10 4 4-10z" fill="${accent}" stroke="#111827" stroke-width="1.6" stroke-linejoin="round"/><circle cx="32" cy="32" r="2.2" fill="#111827"/>`;
  } else if (type === "ninja-fox") {
    shape = `<path d="M16 38l8-18 8 8 8-8 8 18-16 6z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><rect x="22" y="30" width="20" height="6" rx="3" fill="${accent}" stroke="#111827" stroke-width="1.6"/><circle cx="26" cy="33" r="1.5" fill="#111827"/><circle cx="38" cy="33" r="1.5" fill="#111827"/>`;
  } else if (type === "ninja-smoke") {
    shape = `<circle cx="26" cy="36" r="7" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="38" cy="32" r="6" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="32" cy="26" r="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/>`;
  } else if (type === "space-helmet") {
    shape = `<path d="M20 34c0-10 8-18 12-18s12 8 12 18-8 14-12 14-12-4-12-14z" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="26" y="28" width="12" height="8" rx="4" fill="${accent}" stroke="#111827" stroke-width="1.6"/><path d="M24 40h16" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "space-jet") {
    shape = `<path d="M16 38l18-8 14-2-6 10 6 10-14-2z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="34" cy="34" r="2.2" fill="${accent}"/><path d="M20 42l-6 6" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "slime") {
    shape = `<path d="M18 40c0-10 6-16 14-16s14 6 14 16-6 12-14 12-14-2-14-12z" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="28" cy="34" r="2" fill="${accent}"/><circle cx="36" cy="34" r="2" fill="${accent}"/><path d="M28 40c2 2 6 2 8 0" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "slime-wand") {
    shape = `<path d="M22 40l10-10 6 6-10 10z" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M38 22l4 4M42 18l4 4M34 18l4 4" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "cyber-chip") {
    shape = `<rect x="20" y="20" width="24" height="24" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="26" y="26" width="12" height="12" rx="2" fill="${accent}" stroke="#111827" stroke-width="1.6"/><g stroke="${accent}" stroke-width="2" stroke-linecap="round"><line x1="12" y1="24" x2="20" y2="24"/><line x1="12" y1="32" x2="20" y2="32"/><line x1="12" y1="40" x2="20" y2="40"/><line x1="44" y1="24" x2="52" y2="24"/><line x1="44" y1="32" x2="52" y2="32"/><line x1="44" y1="40" x2="52" y2="40"/></g>`;
  } else if (type === "cyber-circuit") {
    shape = `<path d="M18 32h10l4-6 8 12h10" stroke="${accent}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="32" r="4" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="46" cy="38" r="5" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M30 20l6-6 6 6" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "spring-flower") {
    shape = `<circle cx="32" cy="32" r="6" fill="${accent}" stroke="#111827" stroke-width="1.6"/><g fill="${fill}" stroke="#111827" stroke-width="1.6"><circle cx="20" cy="32" r="6"/><circle cx="44" cy="32" r="6"/><circle cx="32" cy="20" r="6"/><circle cx="32" cy="44" r="6"/><circle cx="24" cy="24" r="6"/><circle cx="40" cy="24" r="6"/><circle cx="24" cy="40" r="6"/><circle cx="40" cy="40" r="6"/></g>`;
  } else if (type === "spring-tulip") {
    shape = `<path d="M22 36c6-8 14-8 20 0-2 8-6 12-10 12s-8-4-10-12z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M32 48v10" stroke="#111827" stroke-width="2" stroke-linecap="round"/><path d="M26 54c-4 0-6 4-6 8 6 2 10 0 12-4" fill="${accent}" stroke="#111827" stroke-width="1.6" stroke-linejoin="round"/>`;
  } else if (type === "autumn-leaf") {
    shape = `<path d="M20 44c12-2 22-12 24-24-12 2-22 12-24 24z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M24 40l12-12" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "autumn-acorn") {
    shape = `<path d="M22 30h20c0-8-4-12-10-12s-10 4-10 12z" fill="${accent}" stroke="#111827" stroke-width="2"/><path d="M24 30c0 10 4 16 8 16s8-6 8-16H24z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><path d="M30 18c-2-4 2-8 6-8" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "newyear-firework") {
    shape = `<circle cx="32" cy="32" r="6" fill="${fill}" stroke="#111827" stroke-width="1.6"/><g stroke="${accent}" stroke-width="2" stroke-linecap="round"><line x1="32" y1="10" x2="32" y2="18"/><line x1="32" y1="46" x2="32" y2="54"/><line x1="10" y1="32" x2="18" y2="32"/><line x1="46" y1="32" x2="54" y2="32"/><line x1="18" y1="18" x2="22" y2="22"/><line x1="42" y1="42" x2="46" y2="46"/><line x1="42" y1="22" x2="46" y2="18"/><line x1="18" y1="46" x2="22" y2="42"/></g>`;
  } else if (type === "newyear-spark") {
    shape = `<path d="M32 14l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/><circle cx="44" cy="20" r="3" fill="${accent}"/><circle cx="20" cy="44" r="3" fill="${accent}"/>`;
  } else if (type === "travel-plane") {
    shape = `<path d="M14 32l36-10-4 8 10 6-8 2 2 10-8-6-10 6 2-10-10-6z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "travel-bag") {
    shape = `<rect x="18" y="24" width="28" height="20" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M24 24c0-6 4-8 8-8s8 2 8 8" stroke="#111827" stroke-width="2" stroke-linecap="round"/><rect x="24" y="30" width="16" height="6" rx="3" fill="${accent}" stroke="#111827" stroke-width="1.6"/>`;
  } else if (type === "music-note") {
    shape = `<path d="M24 18v20c0 4-6 6-8 2-1-3 2-6 6-5V22l18-4v16c0 4-6 6-8 2-1-3 2-6 6-5V20z" fill="${fill}" stroke="#111827" stroke-width="2" stroke-linejoin="round"/>`;
  } else if (type === "music-headphones") {
    shape = `<path d="M18 32c0-8 6-14 14-14s14 6 14 14" stroke="#111827" stroke-width="2" fill="none"/><rect x="14" y="32" width="8" height="12" rx="3" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="42" y="32" width="8" height="12" rx="3" fill="${fill}" stroke="#111827" stroke-width="2"/><path d="M22 38h20" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "gaming-pad") {
    shape = `<rect x="18" y="26" width="28" height="16" rx="8" fill="${fill}" stroke="#111827" stroke-width="2"/><circle cx="26" cy="34" r="3" fill="${accent}"/><circle cx="38" cy="34" r="3" fill="${accent}"/><path d="M30 30h4M32 28v4" stroke="#111827" stroke-width="2" stroke-linecap="round"/>`;
  } else if (type === "gaming-joystick") {
    shape = `<rect x="24" y="34" width="16" height="10" rx="4" fill="${fill}" stroke="#111827" stroke-width="2"/><rect x="30" y="22" width="4" height="12" rx="2" fill="${accent}" stroke="#111827" stroke-width="1.6"/><circle cx="32" cy="20" r="5" fill="${fill}" stroke="#111827" stroke-width="2"/>`;
  } else if (type === "bw-arrow-classic") {
    shape = `<g transform="scale(2.6666667)"><path d="M17.2607 12.4008C19.3774 11.2626 20.4357 10.6935 20.7035 10.0084C20.9359 9.41393 20.8705 8.74423 20.5276 8.20587C20.1324 7.58551 18.984 7.23176 16.6872 6.52425L8.00612 3.85014C6.06819 3.25318 5.09923 2.95471 4.45846 3.19669C3.90068 3.40733 3.46597 3.85584 3.27285 4.41993C3.051 5.06794 3.3796 6.02711 4.03681 7.94545L6.94793 16.4429C7.75632 18.8025 8.16052 19.9824 8.80519 20.3574C9.36428 20.6826 10.0461 20.7174 10.6354 20.4507C11.3149 20.1432 11.837 19.0106 12.8813 16.7454L13.6528 15.0719C13.819 14.7113 13.9021 14.531 14.0159 14.3736C14.1168 14.2338 14.2354 14.1078 14.3686 13.9984C14.5188 13.8752 14.6936 13.7812 15.0433 13.5932L17.2607 12.4008Z" fill="${fill}" stroke="${accent}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  } else if (type === "bw-arrow-outline") {
    shape = `<g transform="scale(2.6666667)"><path d="M9 4.94198C6.47561 4.02693 5.129 3.65381 4.39141 4.39141C3.55146 5.23136 4.15187 6.86106 5.3527 10.1205L7.3603 15.5696C7.96225 17.2035 8.26322 18.0204 8.92489 18.1658C9.58656 18.3111 10.2022 17.6955 11.4334 16.4643L12.6361 15.2616L16.5744 19.1999C16.9821 19.6077 17.186 19.8116 17.4135 19.9058C17.7168 20.0314 18.0575 20.0314 18.3608 19.9058C18.5882 19.8116 18.7921 19.6077 19.1999 19.1999C19.6077 18.7921 19.8116 18.5882 19.9058 18.3608C20.0314 18.0575 20.0314 17.7168 19.9058 17.4135C19.8116 17.186 19.6077 16.9821 19.1999 16.5744L15.2616 12.6361L16.4643 11.4334C17.6955 10.2022 18.3111 9.58656 18.1658 8.92489C18.0204 8.26322 17.2035 7.96225 15.5696 7.3603L13 6.41359" fill="none" stroke="${accent}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  } else if (type === "bw-arrow-bold") {
    shape = `<g transform="scale(2.6666667)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4334 16.4643L12.6361 15.2616L15.2616 12.6361L16.4643 11.4334C17.6955 10.2022 18.3111 9.58656 18.1658 8.92489C18.0204 8.26322 17.2035 7.96225 15.5696 7.3603L10.1205 5.35271C6.86106 4.15187 5.23136 3.55146 4.39141 4.39141C3.55146 5.23136 4.15187 6.86106 5.3527 10.1205L7.3603 15.5696C7.96225 17.2035 8.26322 18.0204 8.92489 18.1658C9.58656 18.3111 10.2022 17.6955 11.4334 16.4643Z" fill="${fill}" stroke="${accent}" stroke-width="0.8" stroke-linejoin="round"/><path opacity="0.45" d="M12.6357 15.2618L16.574 19.2001C16.9818 19.6079 17.1857 19.8117 17.4132 19.906C17.7164 20.0316 18.0572 20.0316 18.3605 19.906C18.5879 19.8117 18.7918 19.6078 19.1996 19.2001C19.6074 18.7923 19.8113 18.5884 19.9055 18.3609C20.0311 18.0577 20.0311 17.7169 19.9055 17.4137C19.8113 17.1862 19.6074 16.9823 19.1996 16.5745L15.2613 12.6362L12.6357 15.2618Z" fill="${accent}"/></g>`;
  } else if (type === "bw-arrow-slim") {
    shape = `<g transform="scale(2.6666667)"><path d="M12.6361 15.2616L11.4334 16.4643C10.2022 17.6955 9.58656 18.3111 8.92489 18.1658C8.26322 18.0204 7.96225 17.2035 7.3603 15.5696L5.3527 10.1205C4.15187 6.86106 3.55146 5.23136 4.39141 4.39141C5.23136 3.55146 6.86106 4.15187 10.1205 5.35271L15.5696 7.3603C17.2035 7.96225 18.0204 8.26322 18.1658 8.92489C18.3111 9.58656 17.6955 10.2022 16.4643 11.4334L15.2616 12.6361" fill="none" stroke="${accent}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.5" d="M12.636 15.2618L16.5743 19.2001C16.9821 19.6079 17.186 19.8117 17.4134 19.906C17.7167 20.0316 18.0574 20.0316 18.3607 19.906C18.5882 19.8117 18.792 19.6078 19.1998 19.2001C19.6076 18.7923 19.8115 18.5884 19.9057 18.3609C20.0313 18.0577 20.0313 17.7169 19.9057 17.4137C19.8115 17.1862 19.6076 16.9823 19.1998 16.5745L15.2615 12.6362" stroke="${accent}" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  } else if (type === "bw-crosshair") {
    shape = `<g transform="scale(2.6666667)"><path d="M12.5266 12.5324L20 20M19.0117 9.81874L12.8083 12.3731C12.6945 12.4199 12.6377 12.4434 12.5895 12.4783C12.5468 12.5093 12.5093 12.5468 12.4783 12.5895C12.4434 12.6377 12.4199 12.6945 12.3731 12.8083L9.81874 19.0117C9.56565 19.6264 9.43911 19.9337 9.2675 20.0169C9.11884 20.0889 8.94417 20.0829 8.80082 20.0008C8.63535 19.906 8.53025 19.5907 8.32005 18.9601L3.50599 4.51792C3.34314 4.02937 3.26172 3.7851 3.31964 3.62265C3.37005 3.48129 3.48129 3.37005 3.62265 3.31964C3.7851 3.26172 4.02937 3.34314 4.51792 3.50599L18.9601 8.32005C19.5907 8.53025 19.906 8.63535 20.0008 8.80082C20.0829 8.94417 20.0889 9.11884 20.0169 9.2675C19.9337 9.43911 19.6264 9.56565 19.0117 9.81874Z" fill="none" stroke="${accent}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  } else if (type === "bw-hand") {
    shape = `<g transform="scale(1.7777778)"><path d="M30.74,15.19a13.66,13.66,0,0,0-6.87-3.83A26,26,0,0,0,18,10.58V5.28A3.4,3.4,0,0,0,14.5,2,3.4,3.4,0,0,0,11,5.28v10L9.4,13.7a3.77,3.77,0,0,0-5.28,0A3.67,3.67,0,0,0,3,16.33a3.6,3.6,0,0,0,1,2.56l4.66,5.52a11.53,11.53,0,0,0,1.43,4,10.12,10.12,0,0,0,2,2.54v1.92a1.07,1.07,0,0,0,1,1.08H27a1.07,1.07,0,0,0,1-1.08v-2.7a12.81,12.81,0,0,0,3-8.36v-6A1,1,0,0,0,30.74,15.19ZM29,21.86a10.72,10.72,0,0,1-2.6,7.26,1.11,1.11,0,0,0-.4.72V32H14.14V30.52a1,1,0,0,0-.44-.83,7.26,7.26,0,0,1-1.82-2.23,9.14,9.14,0,0,1-1.2-3.52,1,1,0,0,0-.23-.59L5.53,17.53a1.7,1.7,0,0,1,0-2.42,1.76,1.76,0,0,1,2.47,0l3,3v3.14l2-1V5.28A1.42,1.42,0,0,1,14.5,4,1.42,1.42,0,0,1,16,5.28v11.8l2,.43V12.59a24.27,24.27,0,0,1,2.51.18V18l1.6.35V13c.41.08.83.17,1.26.28a14.88,14.88,0,0,1,1.53.49v5.15l1.6.35V14.5A11.06,11.06,0,0,1,29,16.23Z" fill="${accent}"/></g>`;
  } else if (type === "bw-hand-solid") {
    shape = `<g transform="scale(1.7777778)"><path d="M28.69,14.33v4.83l-2-.43V13.24a16.19,16.19,0,0,0-2.33-.84v5.82l-2-.43V12c-1.1-.18-2.18-.3-3.08-.36v5.51l-2-.43V11.48h0V4.34a2.53,2.53,0,0,0-2.6-2.43,2.53,2.53,0,0,0-2.6,2.43V17.27h0v2.59l-2,1V15.6L7.75,13.21a2.83,2.83,0,0,0-4,0,2.93,2.93,0,0,0,0,4.09l6,7.1a10.82,10.82,0,0,0,1.39,4.22,8.42,8.42,0,0,0,2.21,2.73v2.56H27.79V30.62a12.54,12.54,0,0,0,3-8.5v-6A10,10,0,0,0,28.69,14.33Z" fill="${fill}" stroke="${accent}" stroke-width="0.8" stroke-linejoin="round"/></g>`;
  } else if (type === "bw-hand-outline") {
    shape = `<g transform="scale(1.7777778)"><path d="M30.74,15.19a13.66,13.66,0,0,0-6.87-3.83A26,26,0,0,0,18,10.58V5.28A3.4,3.4,0,0,0,14.5,2,3.4,3.4,0,0,0,11,5.28v10L9.4,13.7a3.77,3.77,0,0,0-5.28,0A3.67,3.67,0,0,0,3,16.33a3.6,3.6,0,0,0,1,2.56l4.66,5.52a11.53,11.53,0,0,0,1.43,4,10.12,10.12,0,0,0,2,2.54v1.92a1.07,1.07,0,0,0,1,1.08H27a1.07,1.07,0,0,0,1-1.08v-2.7a12.81,12.81,0,0,0,3-8.36v-6A1,1,0,0,0,30.74,15.19ZM29,21.86a10.72,10.72,0,0,1-2.6,7.26,1.11,1.11,0,0,0-.4.72V32H14.14V30.52a1,1,0,0,0-.44-.83,7.26,7.26,0,0,1-1.82-2.23,9.14,9.14,0,0,1-1.2-3.52,1,1,0,0,0-.23-.59L5.53,17.53a1.7,1.7,0,0,1,0-2.42,1.76,1.76,0,0,1,2.47,0l3,3v3.14l2-1V5.28A1.42,1.42,0,0,1,14.5,4,1.42,1.42,0,0,1,16,5.28v11.8l2,.43V12.59a24.27,24.27,0,0,1,2.51.18V18l1.6.35V13c.41.08.83.17,1.26.28a14.88,14.88,0,0,1,1.53.49v5.15l1.6.35V14.5A11.06,11.06,0,0,1,29,16.23Z" fill="none" stroke="${accent}" stroke-width="0.9" stroke-linejoin="round"/><circle cx="18" cy="18" r="2" fill="${fill}"/></g>`;
  } else if (type === "bw-hand-click") {
    shape = `<g transform="scale(4)"><path d="M8 3V0H6V3H8Z" fill="${accent}"/><path d="M9.87868 12H7V15H10.6109C13.5872 15 16 12.5872 16 9.61091C16 8.18164 15.4322 6.8109 14.4216 5.80025L13.3322 4.71088L8.8322 6.71088L6.56066 4.43934L4.43934 6.56066L9.87868 12Z" fill="${fill}"/><path d="M0 6H3V8H0V6Z" fill="${accent}"/><path d="M3.29289 4.70711L0.792893 2.20711L2.20711 0.792893L4.70711 3.29289L3.29289 4.70711Z" fill="${accent}"/></g>`;
  } else if (type === "bw-hand-spark") {
    shape = `<g transform="scale(2.6666667)"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H15C14.4477 15 14 14.5523 14 14V9C14 7.89543 13.1046 7 12 7V7C10.8954 7 10 7.89543 10 9V18L7.6 14.8C7.22229 14.2964 6.62951 14 6 14H5.56619C4.70121 14 4 14.7012 4 15.5662V15.5662C4 15.8501 4.07715 16.1286 4.22319 16.372L7 21" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><path d="M12 4V3" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><path d="M18 10L19 10" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><path d="M5 10L6 10" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><path d="M7.34334 5.34309L6.63623 4.63599" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><path d="M16.6567 5.34309L17.3638 4.63599" fill="none" stroke="${accent}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"/><circle cx="12" cy="15" r="2" fill="${fill}"/></g>`;
  } else if (type === "bw-hand-press") {
    shape = `<rect x="22" y="26" width="20" height="20" rx="6" fill="${fill}" stroke="${accent}" stroke-width="1.3"/><rect x="22" y="14" width="6" height="14" rx="3" fill="${fill}" stroke="${accent}" stroke-width="1.3"/><rect x="28" y="10" width="6" height="18" rx="3" fill="${fill}" stroke="${accent}" stroke-width="1.3"/><rect x="34" y="12" width="6" height="16" rx="3" fill="${fill}" stroke="${accent}" stroke-width="1.3"/><rect x="40" y="16" width="6" height="12" rx="3" fill="${fill}" stroke="${accent}" stroke-width="1.3"/><path d="M16 20l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="${accent}"/>`;
  } else if (type === "crewmate-cinema") {
    shape = crewmateScale(`${crewmateBase}${popcornBucket}`);
  } else if (type === "crewmate-cinema-popcorn") {
    shape = crewmateScale(
      `${crewmateBase}<circle cx="28" cy="12" r="3" fill="${accent}" stroke="#111827" stroke-width="1"/><circle cx="34" cy="10" r="3" fill="${accent}" stroke="#111827" stroke-width="1"/><circle cx="40" cy="12" r="3" fill="${accent}" stroke="#111827" stroke-width="1"/>${popcornBucket}`,
    );
  } else if (type === "crewmate-saboteur") {
    shape = crewmateScale(`${crewmateBase}${alertBeacon}`);
  } else if (type === "crewmate-saboteur-alert") {
    shape = crewmateScale(
      `${crewmateBase}<path d="M44 18h10l3 3v8l-3 3H44l-3-3v-8z" fill="#ffffff" stroke="#111827" stroke-width="1.4"/><path d="M49 22v4" stroke="${accent}" stroke-width="1.6" stroke-linecap="round"/><circle cx="49" cy="28" r="1.6" fill="${accent}"/>`,
    );
  } else if (type === "crewmate-medbay") {
    shape = crewmateScale(`${crewmateBase}${medCross}`);
  } else if (type === "crewmate-medbay-monitor") {
    shape = crewmateScale(`${crewmateBase}${heartMonitor}`);
  } else if (type === "crewmate-engineer") {
    shape = crewmateScale(`${crewmateBase}${wrenchPack}`);
  } else if (type === "crewmate-engineer-gear") {
    shape = crewmateScale(`${crewmateBase}${gear}`);
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
  const idToken = `i${svgInstance++}`;
  const template = CURSOR_TEMPLATES[preset];
  if (!template) {
    return null;
  }
  if (template.kind === "icon") {
    const icon = hover && template.hoverIcon ? template.hoverIcon : template.icon;
    if (template.fixedColors) {
      const fixedFill = hover
        ? template.fixedColors.hoverFill || template.fixedColors.fill
        : template.fixedColors.fill;
      const fixedAccent = hover
        ? template.fixedColors.hoverAccent || template.fixedColors.accent
        : template.fixedColors.accent;
      return iconSvg(icon, fixedFill, fixedAccent, idToken);
    }
    return hover
      ? iconSvg(icon, options.hoverFill, options.hoverAccent, idToken)
      : iconSvg(icon, options.fill, options.accent, idToken);
  }
  const accentType = hover ? template.hoverAccent : template.accent;
  const fill = hover ? options.hoverFill : options.fill;
  const accent = hover ? options.hoverAccent : options.accent;
  return cursorSvg(fill, accent, accentType);
};
