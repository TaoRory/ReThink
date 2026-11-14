/*
 * Full-page screenshot after scrolling through the page once (so every
 * scroll-triggered reveal has fired), scaled down to keep the file small.
 *   node scripts/cdp/fullshot.js <url> <out.png> [width=1440] [height=900] [scale=0.5]
 */
const fs = require("fs");
const { openPage, evaluate, sleep } = require("./lib");

const [, , url, out, w = "1440", h = "900", scale = "0.5"] = process.argv;
if (!url || !out) {
  console.error("usage: node fullshot.js <url> <out.png> [w] [h] [scale]");
  process.exit(2);
}

(async () => {
  const port = Number(process.env.CDP_PORT || 9333);
  const cdp = await openPage({ port, url, width: Number(w), height: Number(h) });
  await sleep(1200);
  const total = await evaluate(cdp, "document.documentElement.scrollHeight");
  for (let y = 0; y < total; y += Number(h) * 0.8) {
    await evaluate(cdp, `window.scrollTo({ top: ${y}, behavior: "instant" })`);
    await sleep(350);
  }
  await evaluate(cdp, `window.scrollTo({ top: 0, behavior: "instant" })`);
  await sleep(Number(process.env.SETTLE || 1500));
  const height = await evaluate(cdp, "document.documentElement.scrollHeight");
  const shot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: Number(w), height, scale: Number(scale) },
  });
  fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(`saved ${out} (${w}x${height} @${scale})`);
  process.exit(0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
