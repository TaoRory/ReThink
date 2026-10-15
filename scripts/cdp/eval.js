/*
 * Load a page and print the JSON result of a JS expression — for measuring
 * positions, offsets, overflow, computed styles, anything numeric.
 *   node scripts/cdp/eval.js <url> "<expression>" [width=1440] [height=900]
 * Example:
 *   node scripts/cdp/eval.js http://localhost:3000/ \
 *     "({w: document.documentElement.scrollWidth, vw: innerWidth})" 390 844
 * Env: CDP_PORT (default 9333).
 */
const { openPage, evaluate } = require("./lib");

const [, , url, expr, w = "1440", h = "900"] = process.argv;
if (!url || !expr) {
  console.error('usage: node eval.js <url> "<expression>" [w] [h]');
  process.exit(2);
}

(async () => {
  const port = Number(process.env.CDP_PORT || 9333);
  const cdp = await openPage({ port, url, width: Number(w), height: Number(h) });
  const value = await evaluate(cdp, `(() => (${expr}))()`);
  console.log(JSON.stringify(value, null, 1));
  process.exit(0);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
