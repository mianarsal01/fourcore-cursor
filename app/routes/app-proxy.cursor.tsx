import type { LoaderFunctionArgs } from "react-router";
import { authenticate } from "../shopify.server";
import { buildCursorSvg, CURSOR_TEMPLATES } from "../cursor-templates";
import { checkRateLimit } from "../rate-limiter.server";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const normalizeHexColor = (value: string | null, fallback: string) => {
  if (!value) return fallback;
  const trimmed = value.trim();
  const normalized = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized : fallback;
};

const withSize = (svg: string, size: number) =>
  svg
    .replace('width="64"', `width="${size}"`)
    .replace('height="64"', `height="${size}"`);

const TRANSPARENT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" style="background:transparent"></svg>';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const rateLimitResponse = checkRateLimit(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  const preset = url.searchParams.get("preset") || "cartoon-bag";
  const state = url.searchParams.get("state") || "default";
  const size = clamp(Number(url.searchParams.get("size") || 32), 24, 64);
  const color = normalizeHexColor(url.searchParams.get("color"), "#ff7a59");
  const accent = normalizeHexColor(
    url.searchParams.get("accent"),
    "#ffd166",
  );

  const safePreset = CURSOR_TEMPLATES[preset] ? preset : "cartoon-bag";
  const svg = buildCursorSvg(
    safePreset,
    {
      fill: color,
      accent,
      hoverFill: color,
      hoverAccent: accent,
    },
    state === "hover",
  );

  if (!svg) {
    return new Response(TRANSPARENT_SVG, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new Response(withSize(svg, size), {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
