/*
 * Load pages and print what they wrote to console.error plus uncaught errors
 * (hydration warnings show up here in dev).
 *   node scripts/cdp/errors.js <baseUrl> <path> [path…]
 * Env: CDP_PORT (default 9333), SETTLE ms to wait after load (default 4500).
 */
const { openPage, evaluate, sleep } = require("./lib");

const [, , base, ...paths] = process.argv;
if (!base || !paths.length) {
  console.error("usage: node errors.js <baseUrl> <path> [path…]");
  process.exit(2);
}

const HOOK = `
if (!window.__errs) {
  window.__errs = [];
  (function () {
    var original = console.error;
    console.error = function () {
      try {
        window.__errs.push([].map.call(arguments, function (a) {
          return String((a && a.message) || a);
        }).join(" ").slice(0, 3000));
      } catch (e) {}
      return original.apply(this, arguments);
    };
    window.addEventListener("error", function (e) { window.__errs.push("UNCAUGHT " + e.message); });
  })();
}`;

(async () => {
  const port = Number(process.env.CDP_PORT || 9333);
  const cdp = await openPage({ port, url: "about:blank", width: 1440, height: 900, wait: 200 });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: HOOK });
  let bad = 0;
  for (const p of paths) {
    await cdp.send("Page.navigate", { url: base + p });
    await sleep(Number(process.env.SETTLE || 4500));
    const errs = JSON.parse((await evaluate(cdp, "JSON.stringify(window.__errs || [])")) || "[]");
    bad += errs.length;
    console.log(`${errs.length ? "FAIL" : "ok  "} ${p}`);
    for (const e of errs) console.log("   " + e.replace(/\n/g, "\n   "));
  }
  process.exit(bad ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
