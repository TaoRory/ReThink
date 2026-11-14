/*
 * Default share card + favicons for the main site.
 *   node scripts/make-og.mjs            public/og.jpg (1200x630)
 *   node scripts/make-og.mjs --icons    also app/icon.png (256) and app/apple-icon.png (180)
 *
 * The card is evergreen on purpose (no season theme, no cohort): chat apps
 * cache it for weeks. /halloween keeps its own card (scripts/optimize-kv.mjs).
 *
 * Why a script and not app/opengraph-image.tsx: a static JPG needs no font at
 * request time. Shapes are an SVG; the lettering is set in Lexend by sharp's
 * text input (pango) and composited on top, because librsvg cannot load a
 * font file. Lexend is not kept in the repo: pass LEXEND_TTF=<path>, or let
 * the script fetch the variable TTF from the Google Fonts repository once
 * into the OS temp folder.
 *
 * The icons come from the KV avatar in ../KV (outside git, never edited).
 */
import sharp from "sharp";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const W = 1200;
const H = 630;
const M = 80; // page margin of the card

/* tokens from app/globals.css @theme and app/system.css */
const INK = "#04060c";
const PEARL = "#f7f9ff";
const TEXT_2 = "#b9bfd3";
const FUCHSIA_300 = "#f2a0fb";
const FUCHSIA_500 = "#d633e8";
/* the stops of .spectrum-line: fuchsia → violet → azure → cyan */
const SPECTRUM = [FUCHSIA_500, "#9a4dff", "#3a7fd0", "#22c9e8"];

const FONT_URL = "https://github.com/google/fonts/raw/main/ofl/lexend/Lexend%5Bwght%5D.ttf";

async function lexend() {
  if (process.env.LEXEND_TTF) return path.resolve(process.env.LEXEND_TTF);
  const file = path.join(os.tmpdir(), "rethink-og", "Lexend.ttf");
  if (!existsSync(file)) {
    mkdirSync(path.dirname(file), { recursive: true });
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error(`could not fetch Lexend (${res.status}); pass LEXEND_TTF=<path to Lexend.ttf>`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  return file;
}

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
/** colour at t (0..1) along the spectrum stops */
function spectrum(t) {
  const x = t * (SPECTRUM.length - 1);
  const i = Math.min(Math.floor(x), SPECTRUM.length - 2);
  const a = hexToRgb(SPECTRUM[i]);
  const b = hexToRgb(SPECTRUM[i + 1]);
  return rgbToHex(a.map((v, c) => v + (b[c] - v) * (x - i)));
}

/**
 * One line of Lexend as a transparent PNG cropped to its ink.
 * size in px, tracking in em. At 72 dpi one pango point is one pixel.
 */
async function line(fontfile, text, { size, weight = 300, color = PEARL, tracking = 0 }) {
  const markup =
    `<span font_family="Lexend" font_weight="${weight}" font_size="${size}pt" foreground="${color}"` +
    ` letter_spacing="${Math.round(tracking * size * 1024)}">${text.replace(/&/g, "&amp;")}</span>`;
  const { data, info } = await sharp({ text: { text: markup, font: "Lexend", fontfile, rgba: true, dpi: 72 } })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { input: data, width: info.width, height: info.height };
}

/* ---------- the cradle: seven equal weights, tangent, the first one lifted ---------- */
function cradleSvg() {
  const count = 7;
  const d = 76; // diameter = centre spacing, so the weights touch
  const drop = 252; // pivot (top edge) to centre: every pendulum the same length
  const lift = (30 * Math.PI) / 180;
  const lastX = W - M - d / 2;
  let wires = "";
  let orbs = "";
  for (let i = 0; i < count; i++) {
    const pivotX = lastX - d * (count - 1 - i);
    const angle = i === 0 ? lift : 0;
    const cx = pivotX - drop * Math.sin(angle);
    const cy = drop * Math.cos(angle);
    wires += `<line x1="${pivotX}" y1="0" x2="${cx.toFixed(1)}" y2="${cy.toFixed(1)}"/>`;
    orbs += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${d / 2}" fill="${spectrum(i / (count - 1))}"/>`;
  }
  const stops = SPECTRUM.map((c, i) => `<stop offset="${i / (SPECTRUM.length - 1)}" stop-color="${c}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><linearGradient id="s" x1="0" x2="1" y1="0" y2="0">${stops}</linearGradient></defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <g stroke="#e9ecf8" stroke-opacity="0.38" stroke-width="1.5">${wires}</g>
  ${orbs}
  <rect x="${M}" y="${M + 3}" width="14" height="14" fill="${FUCHSIA_500}"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#s)"/>
</svg>`;
}

async function makeCard() {
  const font = await lexend();
  const word = await line(font, "RETHINK", { size: 116, weight: 300, tracking: 0.3 });
  const season = await line(font, "26-27", { size: 46, weight: 300, color: FUCHSIA_300, tracking: 0.2 });
  const tagline = await line(font, "Rethink & Let Rethink", { size: 42, weight: 300, color: TEXT_2 });
  const place = await line(font, "VinUniversity", { size: 27, weight: 400, color: TEXT_2, tracking: 0.04 });

  const taglineTop = H - M - 6 - tagline.height; // sits on the bottom margin
  const wordTop = taglineTop - 44 - word.height;
  // pango drops the tracking after the last letter: put it back before the season tag
  const seasonLeft = M + word.width + Math.round(0.3 * 116);
  const layers = [
    { input: place.input, left: M + 14 + 16, top: M },
    { input: word.input, left: M, top: wordTop },
    // the season tag shares the wordmark's baseline (caps and figures have no descenders)
    { input: season.input, left: seasonLeft, top: wordTop + word.height - season.height },
    { input: tagline.input, left: M, top: taglineTop },
  ];
  if (layers[2].left + season.width > W - M) throw new Error("wordmark + season tag overflow the card");

  const out = "public/og.jpg";
  await sharp(Buffer.from(cradleSvg()))
    .composite(layers)
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(out);
  return [out, `${W}x${H}`, statSync(out).size];
}

/* ---------- favicons from the KV avatar ---------- */
async function makeIcons() {
  const src = "../KV/New KV/Avatar ReThink 2026-2027.png";
  if (!existsSync(src)) throw new Error(`KV avatar not found at ${src}`);
  const rows = [];
  // An 8-bit palette of 256 colours keeps the gradients of the spheres; fewer
  // colours posterise them. The artwork is an opaque square, so the alpha
  // channel is dropped (iOS would paint transparency black anyway).
  for (const [file, size] of [
    ["app/icon.png", 256],
    ["app/apple-icon.png", 180],
  ]) {
    await sharp(src)
      .resize(size, size, { kernel: "lanczos3" })
      .flatten({ background: INK })
      .png({ palette: true, colours: 256, dither: 1, effort: 10, compressionLevel: 9 })
      .toFile(file);
    rows.push([file, `${size}x${size}`, statSync(file).size]);
  }
  return rows;
}

const rows = [await makeCard()];
if (process.argv.includes("--icons")) rows.push(...(await makeIcons()));
console.log("| file | size | KB |\n|---|---|---|");
for (const [file, size, bytes] of rows) console.log(`| ${file} | ${size} | ${(bytes / 1024).toFixed(1)} |`);
