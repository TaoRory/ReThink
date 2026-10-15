/*
 * Minimal Chrome DevTools Protocol client — raw RFC 6455 WebSocket, no deps.
 *
 * Shared by shot.js and eval.js. Chrome must already be running with
 * --remote-debugging-port (see .claude/skills/verify-ui/SKILL.md).
 */
const net = require("net");
const http = require("http");
const crypto = require("crypto");

const getJSON = (port, path) =>
  new Promise((resolve, reject) =>
    http
      .get({ host: "127.0.0.1", port, path }, (r) => {
        let d = "";
        r.on("data", (c) => (d += c));
        r.on("end", () => resolve(JSON.parse(d)));
      })
      .on("error", reject)
  );

function connect(wsUrl) {
  const u = new URL(wsUrl);
  return new Promise((resolve, reject) => {
    const s = net.connect(Number(u.port), u.hostname, () =>
      s.write(
        `GET ${u.pathname}${u.search} HTTP/1.1\r\nHost: ${u.host}\r\nUpgrade: websocket\r\n` +
          `Connection: Upgrade\r\nSec-WebSocket-Key: ${crypto.randomBytes(16).toString("base64")}\r\n` +
          `Sec-WebSocket-Version: 13\r\n\r\n`
      )
    );
    let buf = Buffer.alloc(0);
    let upgraded = false;
    const waiting = new Map();
    let id = 0;

    s.on("data", (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      if (!upgraded) {
        const i = buf.indexOf("\r\n\r\n");
        if (i < 0) return;
        buf = buf.slice(i + 4);
        upgraded = true;
        resolve({ send, close: () => s.destroy() });
      }
      for (;;) {
        if (buf.length < 2) return;
        const l0 = buf[1] & 0x7f;
        let off = 2;
        let len = l0;
        if (l0 === 126) {
          if (buf.length < 4) return;
          len = buf.readUInt16BE(2);
          off = 4;
        } else if (l0 === 127) {
          if (buf.length < 10) return;
          len = Number(buf.readBigUInt64BE(2));
          off = 10;
        }
        if (buf.length < off + len) return;
        const payload = buf.slice(off, off + len).toString();
        buf = buf.slice(off + len);
        try {
          const m = JSON.parse(payload);
          if (m.id && waiting.has(m.id)) {
            waiting.get(m.id)(m.result);
            waiting.delete(m.id);
          }
        } catch {}
      }
    });
    s.on("error", reject);

    function send(method, params = {}) {
      return new Promise((r) => {
        const data = Buffer.from(JSON.stringify({ id: ++id, method, params }));
        const mask = crypto.randomBytes(4);
        let head;
        if (data.length < 126) head = Buffer.from([0x81, 0x80 | data.length]);
        else if (data.length < 65536) {
          head = Buffer.alloc(4);
          head[0] = 0x81;
          head[1] = 0x80 | 126;
          head.writeUInt16BE(data.length, 2);
        } else {
          head = Buffer.alloc(10);
          head[0] = 0x81;
          head[1] = 0x80 | 127;
          head.writeBigUInt64BE(BigInt(data.length), 2);
        }
        const masked = Buffer.from(data);
        for (let i = 0; i < masked.length; i++) masked[i] ^= mask[i % 4];
        s.write(Buffer.concat([head, mask, masked]));
        waiting.set(id, r);
      });
    }
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Open the first page target, size it like a device, load `url`, and
 * force every [data-reveal] block visible (they start at opacity 0 and
 * headless Chrome never scrolls them into view).
 */
async function openPage({ port, url, width, height, wait = 4200 }) {
  const target = (await getJSON(port, "/json/list")).find((t) => t.type === "page");
  if (!target) throw new Error(`no page target on port ${port} — is Chrome running?`);
  const cdp = await connect(target.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700,
  });
  await cdp.send("Page.navigate", { url });
  await sleep(wait);
  await evaluate(
    cdp,
    "document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('revealed'))"
  );
  return cdp;
}

async function evaluate(cdp, expression) {
  const r = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return r && r.result ? r.result.value : undefined;
}

module.exports = { connect, getJSON, openPage, evaluate, sleep };
