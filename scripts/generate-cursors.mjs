import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.resolve(
  "extensions",
  "cursor-extension",
  "assets",
);
const SIZES = [
  { suffix: "@1x", size: 32 },
  { suffix: "@2x", size: 64 },
  { suffix: "@3x", size: 96 },
];

const isSvg = (file) => file.toLowerCase().endsWith(".svg");

const buildPngs = async () => {
  const files = await fs.readdir(ASSETS_DIR);
  const svgFiles = files.filter(isSvg);

  if (!svgFiles.length) {
    console.log("No SVG cursors found to convert.");
    return;
  }

  for (const file of svgFiles) {
    const inputPath = path.join(ASSETS_DIR, file);
    const baseName = path.basename(file, ".svg");
    const svgBuffer = await fs.readFile(inputPath);

    for (const { suffix, size } of SIZES) {
      const outPath = path.join(ASSETS_DIR, `${baseName}${suffix}.png`);
      await sharp(svgBuffer)
        .resize(size, size, { fit: "contain" })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(outPath);
    }
  }

  console.log(`Generated ${SIZES.length}x PNGs for ${svgFiles.length} cursors.`);
};

buildPngs().catch((error) => {
  console.error("Failed to generate cursor PNGs:", error);
  process.exit(1);
});
