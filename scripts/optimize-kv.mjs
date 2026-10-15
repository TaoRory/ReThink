/*
 * Halloween KV → web-ready assets in public/halloween/.
 *   node scripts/optimize-kv.mjs            convert everything
 *   node scripts/optimize-kv.mjs --palette  also print sampled colours
 *
 * Sources live outside the repo in ../KV (never edited). Outputs get ASCII
 * names so no path in the app contains Vietnamese characters.
 *
 * Pixel-art pieces (masks, compass, fireflies, eyeballs) are resized with
 * nearest-neighbour and served `unoptimized`, or their dithered pixels blur.
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";

const KV = "../KV/kv halloween - ReThink/Halloween ReThink";
const SRC = `${KV}/Visual Guideline & KV`;
const OUT = "public/halloween";
mkdirSync(OUT, { recursive: true });

/**
 * [source, output, maxWidth | null, kind, options]
 *   kind: photo | pixel
 *   options.q: webp quality override (to meet a size budget)
 *   options.normalizeAlpha: scale alpha so the most opaque pixel becomes 255
 *   options.extract: crop {left, top, width, height} from the source first
 *   options.whiteKey: the source has an OPAQUE WHITE background instead of
 *     alpha (Máu_.png) — unmultiply it so the white becomes transparent
 *     without leaving a pale fringe round the drips.
 */
const JOBS = [
  ["Vòm Cỏ.png", "vom-co.webp", 1400, "photo", { q: 62 }],
  ["Background Vòm Cỏ.png", "bg-vom-co.webp", 720, "photo"],
  ["Background cỏ.png", "bg-co.webp", 1600, "photo"],
  // Texture_.jpg dropped: noisy grass compresses to 170KB+ and bg-co already covers the ground
  ["Cành Cây.png", "canh-cay.webp", 1600, "photo"],
  ["Nhân Vật Chính.png", "nhan-vat.webp", null, "photo"],
  ["Mask Mèo.png", "mask-meo.webp", null, "pixel"],
  ["Mask Chó.png", "mask-cho.webp", null, "pixel"],
  ["Mask Cú.png", "mask-cu.webp", null, "pixel"],
  ["Eyeball 1.png", "eyeball-1.webp", null, "pixel"],
  ["Eyeball 2.png", "eyeball-2.webp", null, "pixel"],
  ["Eyeball 3.png", "eyeball-3.webp", null, "pixel"],
  ["Light 1.png", "light-1.webp", null, "pixel"],
  ["Light 2.png", "light-2.webp", null, "pixel"],
  ["Light 3.png", "light-3.webp", null, "pixel"],
  ["Light 3(1).png", "light-4.webp", null, "pixel"],
  // drawn as a faint watermark for the cover (every pixel ≤ 20% alpha) —
  // stretch its alpha so it can stand on its own as an emblem
  ["Compass Logo.png", "compass-logo.webp", 480, "pixel", { normalizeAlpha: true }],
  ["Compass Full 3D.png", "compass-3d.webp", null, "pixel"],
  // a pixel blood STAIN (not a drip) laid diagonally on a white canvas whose
  // corners are solid grey — crop the corners off before keying the white
  ["Máu_.png", "mau.webp", 480, "pixel", { whiteKey: true, extract: { left: 150, top: 280, width: 1002, height: 1360 } }],
  ["Trail Máu.png", "trail-mau.webp", 1400, "photo"],
  ["Tay.png", "tay.webp", 600, "photo"],
  ["Chân.png", "chan.webp", 600, "photo"],
  ["Background Tay_.jpg", "bg-tay.webp", null, "photo"],
];

const rows = [];
/** invert "colour composited over white": a = 255 - min(r,g,b), c' = (c - (255 - a)) * 255 / a */
async function unmultiplyWhite(file, extract) {
  let src = sharp(file);
  if (extract) src = src.extract(extract);
  const { data, info } = await src.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = 255 - Math.min(r, g, b);
    out[j + 3] = a;
    if (a === 0) continue;
    out[j] = Math.max(0, Math.min(255, ((r - (255 - a)) * 255) / a));
    out[j + 1] = Math.max(0, Math.min(255, ((g - (255 - a)) * 255) / a));
    out[j + 2] = Math.max(0, Math.min(255, ((b - (255 - a)) * 255) / a));
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}

/** scale alpha so the most opaque pixel becomes fully opaque */
async function normalizeAlpha(img) {
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let max = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > max) max = data[i];
  const k = max ? 255 / max : 1;
  for (let i = 3; i < data.length; i += 4) data[i] = Math.min(255, Math.round(data[i] * k));
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

for (const [src, out, maxW, kind, opts = {}] of JOBS) {
  let img = opts.whiteKey
    ? await unmultiplyWhite(path.join(SRC, src), opts.extract)
    : opts.extract
      ? sharp(path.join(SRC, src)).extract(opts.extract)
      : sharp(path.join(SRC, src));
  if (opts.normalizeAlpha) img = await normalizeAlpha(img);
  const meta = await img.metadata();
  if (maxW && meta.width > maxW) {
    img = img.resize({ width: maxW, kernel: kind === "pixel" ? "nearest" : "lanczos3" });
  }
  // pixel art keeps its hard edges better at a high quality setting
  img = img.webp(
    kind === "pixel"
      ? { quality: opts.q ?? 88, alphaQuality: 100, smartSubsample: false }
      : { quality: opts.q ?? 74, alphaQuality: 90 }
  );
  const dest = path.join(OUT, out);
  const info = await img.toFile(dest);
  rows.push([out, `${info.width}x${info.height}`, Math.round(statSync(dest).size / 1024)]);
}

// Open Graph image from the Facebook cover
await sharp(`${KV}/Bộ Nhận Diện/15102026 Cover FB Halloween.png`)
  .resize({ width: 1200, height: 630, fit: "cover" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, "og.jpg"));
rows.push(["og.jpg", "1200x630", Math.round(statSync(path.join(OUT, "og.jpg")).size / 1024)]);

const total = rows.reduce((s, r) => s + r[2], 0);
console.log("| file | size | KB |\n|---|---|---|");
for (const r of rows) console.log(`| ${r[0]} | ${r[1]} | ${r[2]} |`);
console.log(`| **total** | | **${total}** |`);

if (process.argv.includes("--palette")) {
  const hex = ([r, g, b]) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const sample = async (file, region) => {
    const { data, info } = await sharp(file).extract(region).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const acc = [0, 0, 0];
    for (let i = 0; i < data.length; i += info.channels) for (let c = 0; c < 3; c++) acc[c] += data[i + c];
    const n = data.length / info.channels;
    return hex(acc.map((v) => v / n));
  };
  const cover = `${KV}/Bộ Nhận Diện/15102026 Cover FB Halloween.png`;
  const avatar = `${KV}/Bộ Nhận Diện/15102026 Avatar Halloween.png`;
  console.log("\npalette (region averages):");
  console.log("grass, cover centre      ", await sample(cover, { left: 2300, top: 1400, width: 400, height: 300 }));
  console.log("grass, avatar inner arch ", await sample(avatar, { left: 1150, top: 1150, width: 200, height: 200 }));
  console.log("deep shadow, avatar edge ", await sample(avatar, { left: 20, top: 2300, width: 150, height: 150 }));
  console.log("branch, cover            ", await sample(cover, { left: 620, top: 1150, width: 120, height: 120 }));
  console.log("blood floor, avatar      ", await sample(avatar, { left: 1250, top: 2080, width: 120, height: 60 }));
  console.log("compass glow, avatar     ", await sample(avatar, { left: 1240, top: 2230, width: 40, height: 40 }));
}
