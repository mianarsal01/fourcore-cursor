import {
  cursorSvg,
  iconSvg,
  type AccentType,
  type IconType,
} from "./cursor-templates";

type CursorItem = {
  id: string;
  name: string;
  imageUrl: string;
  hoverImageUrl: string;
  previewSvg: string;
  previewHoverSvg: string;
  size?: number;
  defaultColor: string;
  defaultAccentColor: string;
  hoverColor: string;
  hoverAccentColor: string;
};

type CursorCategory = {
  id: string;
  name: string;
  items: CursorItem[];
};

const buildPreviewSvg = (
  kind: "cursor" | "icon",
  fill: string,
  accent: string,
  accentType?: AccentType,
  iconType?: IconType,
) => {
  const svg =
    kind === "icon"
      ? iconSvg(iconType || "cart", fill, accent)
      : cursorSvg(fill, accent, accentType || "dot");
  return {
    dataUri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    markup: svg,
  };
};

export const CURSOR_LIBRARY: CursorCategory[] = [
  {
    id: "cartoon",
    name: "Cartoon",
    items: [
      (() => {
        const defaultColor = "#ff7a59";
        const defaultAccentColor = "#ffd166";
        const hoverColor = "#ff4d4d";
        const hoverAccentColor = "#ffe29a";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "box",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "box-open",
        );
        return {
          id: "cartoon-bag",
          name: "Bag Pop",
          imageUrl: "cartoon-bag",
          hoverImageUrl: "cartoon-bag-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#2ec4b6";
        const defaultAccentColor = "#ffbf69";
        const hoverColor = "#1f9d93";
        const hoverAccentColor = "#ffd6a5";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "tag",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "tag-percent",
        );
        return {
          id: "cartoon-sale",
          name: "Sale Tag",
          imageUrl: "cartoon-sale",
          hoverImageUrl: "cartoon-sale-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#f72585";
        const defaultAccentColor = "#ffcad4";
        const hoverColor = "#b5179e";
        const hoverAccentColor = "#ffe5ec";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "heart",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "heart-double",
        );
        return {
          id: "cartoon-heart",
          name: "Wish Heart",
          imageUrl: "cartoon-heart",
          hoverImageUrl: "cartoon-heart-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#4361ee";
        const defaultAccentColor = "#fca311";
        const hoverColor = "#3a0ca3";
        const hoverAccentColor = "#ffd166";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "box",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "box-open",
        );
        return {
          id: "cartoon-gift",
          name: "Gift Drop",
          imageUrl: "cartoon-gift",
          hoverImageUrl: "cartoon-gift-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#52b788";
        const defaultAccentColor = "#d8f3dc";
        const hoverColor = "#40916c";
        const hoverAccentColor = "#e9f5db";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "leaf",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "leaf-spark",
        );
        return {
          id: "cartoon-green",
          name: "Minty",
          imageUrl: "cartoon-green",
          hoverImageUrl: "cartoon-green-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#ff8fab";
        const defaultAccentColor = "#ffc6ff";
        const hoverColor = "#ff5d8f";
        const hoverAccentColor = "#ffd6ff";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
          "candy",
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
          "candy-bite",
        );
        return {
          id: "cartoon-sweet",
          name: "Candy",
          imageUrl: "cartoon-sweet",
          hoverImageUrl: "cartoon-sweet-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
    ],
  },
  {
    id: "premium",
    name: "Premium",
    items: [
      (() => {
        const defaultColor = "#f59e0b";
        const defaultAccentColor = "#fde68a";
        const hoverColor = "#d97706";
        const hoverAccentColor = "#fef3c7";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "cart",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "cart",
        );
        return {
          id: "premium-cart",
          name: "Golden Cart",
          imageUrl: "premium-cart",
          hoverImageUrl: "premium-cart-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#3b82f6";
        const defaultAccentColor = "#dbeafe";
        const hoverColor = "#2563eb";
        const hoverAccentColor = "#bfdbfe";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "tag",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "tag",
        );
        return {
          id: "premium-tag",
          name: "Price Tag",
          imageUrl: "premium-tag",
          hoverImageUrl: "premium-tag-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#ef4444";
        const defaultAccentColor = "#fecaca";
        const hoverColor = "#dc2626";
        const hoverAccentColor = "#fee2e2";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "heart",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "heart",
        );
        return {
          id: "premium-heart",
          name: "Wishlist",
          imageUrl: "premium-heart",
          hoverImageUrl: "premium-heart-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#111827";
        const defaultAccentColor = "#9ca3af";
        const hoverColor = "#0f172a";
        const hoverAccentColor = "#e5e7eb";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "star",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "star",
        );
        return {
          id: "premium-star",
          name: "Luxe Star",
          imageUrl: "premium-star",
          hoverImageUrl: "premium-star-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#22c55e";
        const defaultAccentColor = "#bbf7d0";
        const hoverColor = "#16a34a";
        const hoverAccentColor = "#dcfce7";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "leaf",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "leaf",
        );
        return {
          id: "premium-leaf",
          name: "Eco Leaf",
          imageUrl: "premium-leaf",
          hoverImageUrl: "premium-leaf-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#a855f7";
        const defaultAccentColor = "#e9d5ff";
        const hoverColor = "#7c3aed";
        const hoverAccentColor = "#ddd6fe";
        const base = buildPreviewSvg(
          "icon",
          defaultColor,
          defaultAccentColor,
          undefined,
          "bolt",
        );
        const hover = buildPreviewSvg(
          "icon",
          hoverColor,
          hoverAccentColor,
          undefined,
          "bolt",
        );
        return {
          id: "premium-bolt",
          name: "Power Bolt",
          imageUrl: "premium-bolt",
          hoverImageUrl: "premium-bolt-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 32,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    items: [
      (() => {
        const defaultColor = "#c9a24b";
        const defaultAccentColor = "#f1e2b6";
        const hoverColor = "#b4892f";
        const hoverAccentColor = "#f8edc0";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "commerce-luxe",
          name: "Luxe Gild",
          imageUrl: "commerce-luxe",
          hoverImageUrl: "commerce-luxe-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#39c6ff";
        const defaultAccentColor = "#8b5cf6";
        const hoverColor = "#0ea5e9";
        const hoverAccentColor = "#a78bfa";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "commerce-tech",
          name: "Tech Glow",
          imageUrl: "commerce-tech",
          hoverImageUrl: "commerce-tech-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#0f172a";
        const defaultAccentColor = "#94a3b8";
        const hoverColor = "#1e293b";
        const hoverAccentColor = "#cbd5f5";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "commerce-min",
          name: "Mono Pro",
          imageUrl: "commerce-min",
          hoverImageUrl: "commerce-min-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#7aa387";
        const defaultAccentColor = "#e2d6c2";
        const hoverColor = "#5f8f74";
        const hoverAccentColor = "#efe6d4";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "commerce-organic",
          name: "Earthy",
          imageUrl: "commerce-organic",
          hoverImageUrl: "commerce-organic-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
    ],
  },
  {
    id: "seasonal",
    name: "Seasonal",
    items: [
      (() => {
        const defaultColor = "#e11d48";
        const defaultAccentColor = "#fbbf24";
        const hoverColor = "#be123c";
        const hoverAccentColor = "#fde68a";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "season-holiday",
          name: "Holiday Spark",
          imageUrl: "season-holiday",
          hoverImageUrl: "season-holiday-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#ff5a3c";
        const defaultAccentColor = "#ffb65c";
        const hoverColor = "#fb7185";
        const hoverAccentColor = "#fde68a";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "season-sun",
          name: "Sunset Pop",
          imageUrl: "season-sun",
          hoverImageUrl: "season-sun-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
      (() => {
        const defaultColor = "#1d4ed8";
        const defaultAccentColor = "#93c5fd";
        const hoverColor = "#2563eb";
        const hoverAccentColor = "#bfdbfe";
        const base = buildPreviewSvg(
          "cursor",
          defaultColor,
          defaultAccentColor,
        );
        const hover = buildPreviewSvg(
          "cursor",
          hoverColor,
          hoverAccentColor,
        );
        return {
          id: "season-sport",
          name: "Sports Energy",
          imageUrl: "season-sport",
          hoverImageUrl: "season-sport-hover",
          previewSvg: base.markup,
          previewHoverSvg: hover.markup,
          size: 24,
          defaultColor,
          defaultAccentColor,
          hoverColor,
          hoverAccentColor,
        };
      })(),
    ],
  },
];