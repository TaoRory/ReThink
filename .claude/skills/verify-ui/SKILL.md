---
name: verify-ui
description: Build the site, serve it, and verify UI changes with evidence — CDP screenshots at phone/desktop sizes, numeric measurements (positions, overflow, offsets), and the Halloween lag/isolation gates. Use after any visual or layout change, before reporting a UI task done, or when the user reports something looks wrong.
---

# Verify UI with evidence

Never report a visual change as done from reading code. Measure or look.

## 1. Build and serve (Windows / Git Bash)

```bash
npm run build
# `npm run start` keeps serving the OLD build from memory — always kill port 3000 first
powershell -NoProfile -Command "try { Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction Stop | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id \$_ -Force } } catch {}"
npm run start   # run in background, then wait ~5s
```

## 2. Start headless Chrome once per session

```bash
curl -s http://127.0.0.1:9333/json/version >/dev/null 2>&1 || \
  ("/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
   --remote-debugging-port=9333 --user-data-dir="$TEMP/cdp-rethink" \
   --hide-scrollbars --disable-gpu about:blank >/dev/null 2>&1 &)
```

`--window-size` does NOT give a phone layout in headless; the scripts below use
`Emulation.setDeviceMetricsOverride` instead.

## 3. Tools (committed in `scripts/`, no dependencies)

| Command | Use |
|---|---|
| `node scripts/cdp/shot.js <url> <out.png> [w] [h] [scrollY] [full]` | Screenshot. Use `390 844` (phone) and `1440 900` (laptop). |
| `node scripts/cdp/eval.js <url> "<expr>" [w] [h]` | Print JSON of any JS expression — positions, gaps, overflow. |
| `npm run check:hlw` | Halloween gates: lag (keyframes transform/opacity only) + isolation (no `hlw-` on other pages). Needs a build. |

Write screenshots to `$TEMP`, never into the repo. Both scripts force
`[data-reveal]` blocks visible (they start at opacity 0).

Useful measurements:
- Horizontal overflow: `document.documentElement.scrollWidth - innerWidth` (headless may report ~17px of scrollbar — check the real content edge before calling it a bug).
- Centre alignment: compare `getBoundingClientRect()` midpoints of the two elements.
- Rotated elements: `getBoundingClientRect` returns the rotated bounding box — measure the unrotated parent instead.

## 4. Checklist before saying "done"

1. `npm run build` green.
2. Screenshot both 390×844 and 1440×900 of every section you touched; actually open them.
3. Measure anything about alignment or overflow instead of eyeballing.
4. If `/halloween` changed: `npm run check:hlw` exits 0.
5. `prefers-reduced-motion` still renders a complete static layout.
6. After a push, repeat the key checks on **https://rethinkorg.com** (see the `deploy` skill).

## Known traps

- `grep -c` counts LINES; rendered HTML is one line → use `grep -o … | wc -l`.
- `SectionHeading` splits the first letter into its own node, so grepping a full heading can miss.
- Next.js RSC `<script>` payloads contain page text — when searching the DOM for text, skip SCRIPT/STYLE and require a non-zero rect.
