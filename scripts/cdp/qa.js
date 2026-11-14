/*
 * Page QA against a running server (use the production build: `npm run build && npm start`).
 *   node scripts/cdp/qa.js <baseUrl> <path> [path…]
 * For every path, at 390x844 and 1440x900:
 *   - no horizontal overflow, exactly one <h1>
 *   - no text hidden at load (opacity < 1 / visibility: hidden) outside aria-hidden
 *   - no text smaller than 13px, no link/button smaller than 40px (reported)
 *   - headings still visible with reduced motion, and with JavaScript off
 * Exits 1 if a hard check fails. Env: CDP_PORT (default 9333).
 */
const { openPage, evaluate, sleep } = require("./lib");

const [, , base, ...paths] = process.argv;
if (!base || !paths.length) {
  console.error("usage: node qa.js <baseUrl> <path> [path…]");
  process.exit(2);
}

const PROBE = `(() => {
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const decorative = (el) => el.closest('[aria-hidden="true"], details:not([open]), .kit-sr-only, .sr-only, [inert], [hidden]');
  const hiddenText = [];
  const tiny = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!node.textContent.trim()) continue;
    const el = node.parentElement;
    if (!el || seen.has(el) || decorative(el) || !visible(el)) continue;
    if (/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(el.tagName)) continue;
    seen.add(el);
    let opacity = 1;
    let hidden = false;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const cs = getComputedStyle(n);
      opacity *= parseFloat(cs.opacity);
      if (cs.visibility === "hidden") hidden = true;
    }
    const text = node.textContent.trim().slice(0, 40);
    if (opacity < 0.99 || hidden) hiddenText.push(text);
    if (parseFloat(getComputedStyle(el).fontSize) < 12.9) tiny.push(parseFloat(getComputedStyle(el).fontSize) + "px " + text);
  }
  const small = [];
  document.querySelectorAll("a, button").forEach((el) => {
    if (decorative(el) || !visible(el)) return;
    const r = el.getBoundingClientRect();
    // inline links inside running text are exempt (WCAG 2.5.8)
    if (getComputedStyle(el).display === "inline") return;
    if (r.height < 39.5 || r.width < 39.5) small.push(Math.round(r.width) + "x" + Math.round(r.height) + " " + (el.textContent.trim() || el.getAttribute("aria-label") || "").slice(0, 30));
  });
  const h1 = document.querySelector("h1");
  const h1cs = h1 && getComputedStyle(h1);
  return JSON.stringify({
    overflow: document.documentElement.scrollWidth - innerWidth,
    h1: document.querySelectorAll("h1").length,
    h1Visible: !!h1 && h1cs.visibility !== "hidden" && parseFloat(h1cs.opacity) > 0.99 && h1.getBoundingClientRect().height > 0,
    hiddenText: hiddenText.slice(0, 8),
    tiny: tiny.slice(0, 8),
    small: small.slice(0, 12),
  });
})()`;

(async () => {
  const port = Number(process.env.CDP_PORT || 9333);
  let failed = 0;
  const fail = (msg) => {
    failed++;
    console.log("   FAIL " + msg);
  };

  for (const p of paths) {
    for (const [w, h] of [
      [390, 844],
      [1440, 900],
    ]) {
      const cdp = await openPage({ port, url: base + p, width: w, height: h, wait: 3500 });
      const r = JSON.parse(await evaluate(cdp, PROBE));
      console.log(`${p} @${w}`);
      if (r.overflow > 0) fail(`horizontal overflow ${r.overflow}px`);
      if (r.h1 !== 1) fail(`${r.h1} <h1>`);
      if (!r.h1Visible) fail("h1 not visible after load");
      if (r.hiddenText.length) fail("text hidden at load: " + r.hiddenText.join(" | "));
      if (r.tiny.length) console.log("   note  text under 13px: " + r.tiny.join(" | "));
      if (r.small.length) console.log("   note  targets under 40px: " + r.small.join(" | "));
    }

    // reduced motion, then no JavaScript: the headings must simply be there
    for (const mode of ["reduced-motion", "no-js"]) {
      const cdp = await openPage({ port, url: "about:blank", width: 390, height: 844, wait: 100 });
      if (mode === "reduced-motion") {
        await cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      } else {
        await cdp.send("Emulation.setScriptExecutionDisabled", { value: true });
      }
      await cdp.send("Page.navigate", { url: base + p });
      await sleep(2500);
      // with scripts disabled Runtime.evaluate still runs in the page
      const r = JSON.parse(await evaluate(cdp, PROBE));
      if (!r.h1Visible) fail(`${mode}: h1 not visible`);
      if (r.hiddenText.length) fail(`${mode}: hidden text: ` + r.hiddenText.join(" | "));
      await cdp.send("Emulation.setEmulatedMedia", { features: [] });
      await cdp.send("Emulation.setScriptExecutionDisabled", { value: false });
    }
  }
  console.log(failed ? `\n${failed} check(s) failed` : "\nall hard checks passed");
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
