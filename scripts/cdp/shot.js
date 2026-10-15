/*
 * Screenshot a page.
 *   node scripts/cdp/shot.js <url> <out.png> [width=1440] [height=900] [scrollY=0] [full]
 * Env: CDP_PORT (default 9333).
 */
const fs = require("fs");
const { openPage, evaluate, sleep } = require("./lib");

const [, , url, out, w = "1440", h = "900", scroll = "0", mode = "view"] = process.argv;
if (!url || !out) {
  console.error("usage: node shot.js <url> <out.png> [w] [h] [scrollY] [full]");
  process.exit(2);
}

(async () => {
  const port = Number(process.env.CDP_PORT || 9333);
  const cdp = await openPage({ port, url, width: Number(w), height: Number(h) });
  if (Number(scroll) > 0) {
    await evaluate(cdp, `window.scrollTo({ top: ${Number(scroll)}, behavior: "instant" })`);
    await sleep(900);
  }
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: mode === "full",
  });
  fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log("saved " + out);
  process.exit(0);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
