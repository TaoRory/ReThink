/*
 * TEDx 2026 (The Limitless Decade) images → web-ready webp in public/tedx/2026/.
 *   node scripts/optimize-tedx26.mjs <folder with the downloaded originals>
 *
 * Originals come from the season's own site (https://v0-tedxvinuni.vercel.app/:
 * /speakers/*.png, /tedx-light-long.png) and are 0.3–3.5 MB at 5000+ px.
 * Outputs get ASCII names. Speaker portraits sit on black, so the one with a
 * transparent background (Mook) is flattened onto black to match the others.
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error("usage: node scripts/optimize-tedx26.mjs <folder with originals>");
  process.exit(2);
}
const OUT = "public/tedx/2026";
mkdirSync(OUT, { recursive: true });

/** [source, output, width, options] */
const JOBS = [
  ["le-nguyen-phuong.png", "le-nguyen-phuong.webp", 720, { flatten: true, q: 74 }],
  ["le-minh-thi.png", "le-minh-thi.webp", 720, { flatten: true, q: 74 }],
  ["nguyen-lam-thanh.png", "nguyen-lam-thanh.webp", 720, { flatten: true, q: 74 }],
  ["mook.png", "mook.webp", 720, { flatten: true, q: 74 }],
  ["thierry-nguyen.png", "thierry-nguyen.webp", 720, { flatten: true, q: 74 }],
  // red stage-light beams on transparent: the hero backdrop
  ["tedx-light-long.png", "light.webp", 960, { q: 72 }],
];

let total = 0;
for (const [src, out, width, o] of JOBS) {
  let img = sharp(path.join(SRC, src)).resize({ width, withoutEnlargement: true });
  if (o.flatten) img = img.flatten({ background: "#000000" });
  const file = path.join(OUT, out);
  const info = await img.webp({ quality: o.q, alphaQuality: 80, effort: 5 }).toFile(file);
  total += statSync(file).size;
  console.log(`${out.padEnd(24)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
console.log(`total ${(total / 1024).toFixed(0)} KB`);
