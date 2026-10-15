/*
 * Un-project the KV's blood carpet into a flat, top-down floor texture.
 *   node scripts/unwarp-floor.mjs          -> public/halloween/floor-mau.webp
 * (also run by optimize-kv.mjs)
 *
 * `Trail Máu.png` is a floor strip already drawn IN perspective: a trapezoid
 * whose edges converge on a vanishing point above the image. Scaling that
 * picture on the web only ever looks like a growing sticker. To make the floor
 * behave, the page lays a flat plane in CSS 3D (rotateX) and lets the camera
 * walk over it — which needs the texture as seen from straight above.
 *
 * Geometry (measured from the file, see the numbers below): fit the two edges
 * as lines, intersect them to find the horizon row `Y_H`, then for each output
 * row pick the source row whose depth matches. On a ground plane, a row at
 * y sits at depth Z ∝ 1/(y - Y_H), and the strip's width at that row is
 * proportional to (y - Y_H) — so output rows are stepped linearly in 1/q,
 * q = y - Y_H, and each output column interpolates between the two edge lines.
 */
import sharp from "sharp";
import path from "node:path";

const SRC = "../KV/kv halloween - ReThink/Halloween ReThink/Visual Guideline & KV/Trail Máu.png";
const OUT = "public/halloween/floor-mau.webp";

// Measured on Trail Máu.png (2226x616): least-squares edge lines over rows 60-560.
//   left  x = 963.7 - 1.273 * y        right x = 1301.9 + 1.427 * y
//   edges meet at y = -125.3 (the horizon), x = 1123
const L0 = 963.7, LS = -1.273;
const R0 = 1301.9, RS = 1.427;
const Y_H = -(R0 - L0) / (RS - LS);

// 640x1280: the carpet is shown at most ~860px wide and mostly far smaller; the
// first 1024x2048 build was 461KB and blew the phone image budget on its own
const OW = 640; // output width
const OH = 1280; // output length
const Y_FAR = 6; // skip the very first rows: they are a hard cut-off edge
const Y_NEAR = 612;

export async function unwarpFloor(outFile = OUT) {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const out = Buffer.alloc(OW * OH * 4);

  const qFar = Y_FAR - Y_H, qNear = Y_NEAR - Y_H;
  const iFar = 1 / qFar, iNear = 1 / qNear;

  // bilinear, alpha-weighted so transparent pixels don't bleed their RGB in
  const sample = (x, y) => {
    const x0 = Math.max(0, Math.min(W - 2, Math.floor(x))), y0 = Math.max(0, Math.min(H - 2, Math.floor(y)));
    const fx = Math.max(0, Math.min(1, x - x0)), fy = Math.max(0, Math.min(1, y - y0));
    let r = 0, g = 0, b = 0, a = 0;
    for (let k = 0; k < 4; k++) {
      const px = x0 + (k & 1), py = y0 + (k >> 1);
      const w = ((k & 1) ? fx : 1 - fx) * ((k >> 1) ? fy : 1 - fy);
      const i = (py * W + px) * 4;
      const al = data[i + 3] / 255;
      r += data[i] * al * w; g += data[i + 1] * al * w; b += data[i + 2] * al * w; a += al * w;
    }
    return a > 0 ? [r / a, g / a, b / a, a * 255] : [0, 0, 0, 0];
  };

  for (let j = 0; j < OH; j++) {
    const q = 1 / (iFar + (iNear - iFar) * (j / (OH - 1))); // far (top) -> near (bottom)
    const y = q + Y_H;
    const xl = L0 + LS * y, xr = R0 + RS * y;
    for (let i = 0; i < OW; i++) {
      const [r, g, b, a] = sample(xl + (xr - xl) * (i / (OW - 1)), y);
      const o = (j * OW + i) * 4;
      out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = a;
    }
  }
  await sharp(out, { raw: { width: OW, height: OH, channels: 4 } })
    .webp({ quality: 64, alphaQuality: 80 })
    .toFile(outFile);
  return { horizonY: Y_H, size: `${OW}x${OH}` };
}

// run directly (`node scripts/unwarp-floor.mjs`) but not when imported by optimize-kv.mjs
if (process.argv[1] && process.argv[1].endsWith("unwarp-floor.mjs")) {
  const r = await unwarpFloor();
  console.log(`floor-mau.webp  ${r.size}  horizon y=${r.horizonY.toFixed(1)}`);
}
