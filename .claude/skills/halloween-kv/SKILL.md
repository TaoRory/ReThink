---
name: halloween-kv
description: Everything about the /halloween event page and its KV — palette, asset map, file structure, animation catalogue, pixel-art rules, and the list of placeholders. Use for any work on /halloween, its nav/footer skin, or the Halloween KV assets.
---

# Halloween ReThink — KV and page

Working plan with phase checkboxes: `docs/halloween-kv-plan.md`. Read it first and tick boxes as you finish.

## The KV (source of truth)
`../KV/kv halloween - ReThink/Halloween ReThink/` (outside the repo, never edit).
- `Bộ Nhận Diện/` — composed Cover FB (5047×1920) and Avatar (2504²). Reference only; the avatar is the hero composition to aim for.
- `Visual Guideline & KV/` — the cut-out elements, all PNG with alpha.

**Do not re-open the 4–10MB originals to "look at the KV" — this file already records what you need.** Open one only when cropping or sampling.

Mood: an acid-green grass tunnel of nested arches; dark moss-green cylindrical branches crossing the frame; pixel-art animal masks (cat, dog, owl, bird skull); eyeballs, severed ears and hands, a bloodied hammer, blood trails; a glowing orange compass on the floor; a girl in a grey dress with glowing eyes at the end of the tunnel; square yellow-lime fireflies. A mix of 3D render and dithered pixel-art. **Gore stays exactly as in the KV** (user decision).

The old pale blue/pink "Pale Lake" theme is retired. Do not bring it back.

## Palette — SAMPLED from KV pixels (`node scripts/optimize-kv.mjs --palette` + object sampling)
| Token | Hex | Sampled from |
|---|---|---|
| `--hlw-grass` / `-2` | `#446402` / `#3d5b03` | Background cỏ |
| `--hlw-arch` | `#2b3800` | Vòm Cỏ band |
| `--hlw-branch` | `#303b1e` | Cành Cây |
| `--hlw-script` | `#d1c91e` | RETHINK letters on the cover (mustard-lime, NOT pale yellow) |
| `--hlw-firefly` | `#ffeacc` | Light 1 core |
| `--hlw-blood` / `-deep` | `#802e36` / `#631c1a` | Máu_ / Trail Máu |
| `--hlw-bone-dim` | `#959981` | cat mask |
| `--hlw-compass` | `#d2913f` | compass glow, avatar |
| `--hlw-shadow` | `#140d05` | avatar floor shadow (warm, not green) |
Page ground `--hlw-ink` `#0a0f04` is a chosen moss-black. My eyeball estimates before sampling were wrong on the script colour and the shadow — sample, don't guess.

## Asset map — originals → `public/halloween/` (run `node scripts/optimize-kv.mjs`)
| Output | Role | Notes found by measuring |
|---|---|---|
| `vom-co.webp` | one arch; stacked ×5 for the tunnel, ×1 framing the CTA | 250KB (q62) |
| `bg-vom-co.webp` | lit scene inside the deepest arch | |
| `bg-co.webp` | `.hlw-grass` section ground | |
| `canh-cay.webp` | branch cluster, hero top-right (mirrored) | |
| `nhan-vat.webp` | the girl; eyes at 46.6% / 53.9%, 9.3% from top | served `unoptimized` |
| `mask-meo/-cho/-cu.webp` | stations 1–3, hero corners | pixel |
| `eyeball-1..3.webp` | `eyeball-1` iris sits at **185°** → the only one that tracks | pixel |
| `light-1..4.webp` | fireflies (`<Motes>`) | pixel |
| `compass-logo.webp` | story emblem, slow spin | source is a **≤20%-alpha watermark** → script normalises alpha |
| `compass-3d.webp` | compass on the tunnel floor | |
| `mau.webp` | a pixel blood **stain** (not a drip) | source is OPAQUE WHITE with grey canvas corners → script crops + keys white |
| `trail-mau.webp` | the **blood carpet on the tunnel floor** in perspective (KV avatar floor) | not a line — don't use it as a timeline |
| `tay.webp` / `chan.webp` | severed arm / leg on the CTA floor | |
| `bg-tay.webp` | hands behind wet glass, FAQ backdrop | |
| `og.jpg` | Open Graph 1200×630 from the cover | |
`Texture_.jpg` is dropped (170KB of noise, `bg-co` does the job). Total ≈ 1.08MB.

## Pixel-art rules
Masks, compass, fireflies and eyeballs are dithered pixel-art. Resize them with **nearest-neighbour** (sharp `kernel: "nearest"`) and display with `image-rendering: pixelated`, or they blur into mush.

## Code structure (keep it)
- `app/halloween.css` — imported at the top of `globals.css`. **Every selector starts with `.hlw`.** `.hlw` = tokens only (the nav/footer borrow it); `.hlw-page` = the full-height ground. Putting `min-height` on `.hlw` once inflated the header to full screen.
- **`halloween.css` is unlayered, so its rules BEAT Tailwind utilities.** Never set `display` (or anything a responsive utility controls) in an `.hlw-*` class — it silently overrides `hidden` / `lg:block` in the markup. Put those in the markup only.
- `components/pages/HalloweenPage.tsx` — the page; loads its own display font via `next/font`.
- `components/halloween/Scene.tsx` — visual pieces. `components/halloween/Chrome.tsx` — nav/footer decoration, switched on in `SiteNav`/`SiteFooter` when `stripLocale(pathname).startsWith("/halloween")`.
- Wordmark: `HalloweenWordmark` in `Scene.tsx`, currently set in **Mystery Quest** (Google, latin only — never use it for Vietnamese text). When the designer's transparent PNG/SVG arrives, swap the body of that one component.

## The hero tunnel is a real 3D scene — do not go back to per-layer scale()
Everything (arches, branches, masks, fireflies, girl, compass, floor) sits in ONE CSS 3D scene (`.hlw-world`, in `halloween.css`), and scrolling moves exactly one thing: the **camera** (`translateZ`). One passive rAF-coalesced listener (`TunnelProgress`) writes `--p` (0→1).
- Units: 1 world unit = `--u` = 1vh. `z` = depth behind the picture plane. `--P` camera distance (= CSS perspective), `--T` how far it walks, `--H` camera height.
- Screen scale of an object at depth z is `P / (P + z − p·T)`. **This is verified to 0px** against 9 objects × 5 scroll positions (`$TEMP`-style probe: read `getBoundingClientRect().width`, compare to the formula). Re-run that kind of check after changing any depth.
- Add an object with `<Obj z x y w>` in `Scene.tsx` + a `.hlw-p-*` class setting `--w/--x/--y`; it gets perspective, scaling and the near-fade for free. Nothing needs its own scale factor.
- Why: the first version scaled each layer from its own origin, so any element not scaled (branch, masks) just sat still and the blood carpet grew like a sticker. Shared camera = shared vanishing point.
- **The floor is a plane, not a picture:** `Trail Máu.png` is drawn in perspective, so `scripts/unwarp-floor.mjs` un-projects it (fits the two edge lines, finds the horizon, resamples linearly in 1/depth) into a top-down `floor-mau.webp`, laid on the ground with `rotateX(90deg)`. Measured: edges `x = 963.7 − 1.273y` / `1301.9 + 1.427y`, horizon y = −125.3.
- Don't add an opaque overlay (noise, gradient) to a transparent plane texture: it shows through every transparent patch as a grey blotch (happened with a grain tile).
- Depth order matters: the lit end-wall (`z=262`) must be DEEPER than the girl (`z=250)`; at 200 it hid her.
- Phones: `--aw` and the girl's `--w` shrink together — 1 unit = 1vh and a phone is narrow, so the girl must fit inside the deepest arch's opening (~56% of arch width).
- Perf measured with a real GPU: median 4.3ms/frame scrolling through the tunnel, same as the light pages. Headless `--disable-gpu` shows 50–500ms for EVERY page, including `/` — never judge perf from a software-rendered run.

## Animation catalogue (transform/opacity only — `npm run check:hlw` enforces it)
- Fireflies blink; branches/masks sway a degree or two; masks shake on hover.
- Eyeballs follow the cursor — ONE shared pointermove listener (`EyeTracker`), rAF-throttled.
- One-shots keyed to `[data-reveal].revealed`: blood stain spreads, the line of blood runs along the timeline.
- FAQ: hands behind the glass press closer when a question is open (`:has(details[open])`).
- Reduced motion: the camera stays at 0, `--p` is forced to 0, nothing animates.

## Placeholders (all copy on the page is invented)
- Event name is a neutral "Halloween 2026"; date 30/10/2026 18:00–22:00, venue, the four stations, schedule and FAQ are invented to fit the KV (tunnel, masks, compass).
- Every string is in `dict.*.halloween` now (times, date label and ticker words included) — nothing visible is hard-coded in `HalloweenPage.tsx`.
- Remove the two "nội dung mẫu" notes and set the registration link (CTA button currently loops back to the page) when real content lands.
- Waiting on the designer: transparent RETHINK wordmark; optionally a cut-out bird skull (station 4 uses the tracking eye meanwhile).
