/*
 * Evidence gates for the Halloween theme. Run AFTER `npm run build`.
 *   npm run check:hlw
 * Exits non-zero if either gate fails, so it can sit in a verify chain.
 *
 * 1. Lag gate — looping keyframes may only animate transform/opacity.
 * 2. Isolation gate — no other page's built HTML may carry an `hlw-` class.
 */
import { readFileSync, existsSync } from "node:fs";

let failed = false;

// 1. lag gate. Walk braces instead of regex-matching to a closing "\n}":
//    a one-line keyframe (`@keyframes hlw-x { to { ... } }`) slipped through
//    the regex version.
const css = readFileSync("app/halloween.css", "utf8");
const BANNED = /\b(filter|box-shadow|text-shadow|background-position|width|height|top|left|right|bottom|margin|padding)\s*:/;
const blocks = [];
for (const m of css.matchAll(/@keyframes\s+(hlw-[\w-]+)\s*\{/g)) {
  let depth = 1;
  let i = m.index + m[0].length;
  while (depth && i < css.length) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") depth--;
    i++;
  }
  blocks.push({ name: m[1], body: css.slice(m.index, i) });
}
const offenders = blocks.filter((b) => BANNED.test(b.body)).map((b) => b.name);
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
