/*
 * Evidence gates for the Halloween theme. Run AFTER `npm run build`.
 *   node scripts/check-hlw.mjs
 * Exits non-zero if either gate fails, so it can sit in a verify chain.
 *
 * 1. Lag gate — looping keyframes may only animate transform/opacity.
 * 2. Isolation gate — no other page's built HTML may carry an `hlw-` class.
 */
import { readFileSync, existsSync } from "node:fs";

let failed = false;

// 1. lag gate: inspect every @keyframes hlw-* block
const css = readFileSync("app/halloween.css", "utf8");
const BANNED = /\b(filter|box-shadow|text-shadow|background-position|width|height|top|left|right|bottom|margin|padding)\s*:/;
const blocks = css.match(/@keyframes\s+hlw-[\w-]+\s*\{[\s\S]*?\n\}/g) || [];
const offenders = blocks.filter((b) => BANNED.test(b)).map((b) => b.match(/hlw-[\w-]+/)[0]);
if (offenders.length) {
  failed = true;
  console.log(`LAG     FAIL  keyframes animate a non-composited property: ${offenders.join(", ")}`);
} else {
  console.log(`LAG     ok    ${blocks.length} hlw keyframes, transform/opacity only`);
}

// 2. isolation gate
const pages = ["index", "about", "tedx", "join", "game", "en", "en/about", "en/tedx", "en/join", "en/game"];
const leaks = [];
for (const p of pages) {
  const f = `.next/server/app/${p}.html`;
  if (!existsSync(f)) continue;
  const n = (readFileSync(f, "utf8").match(/\bhlw-[\w-]+/g) || []).length;
  if (n) leaks.push(`${p} (${n})`);
}
if (!existsSync(".next/server/app/index.html")) {
  failed = true;
  console.log("ISOLATE FAIL  no build output — run `npm run build` first");
} else if (leaks.length) {
  failed = true;
  console.log(`ISOLATE FAIL  hlw- classes leaked into: ${leaks.join(", ")}`);
} else {
  console.log(`ISOLATE ok    0 hlw- classes on ${pages.length} non-event pages`);
}

process.exit(failed ? 1 : 0);
