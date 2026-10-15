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
- **`halloween.css` is unlayered, so its rules BEAT Tailwind utilities — including `position`.** `.hlw-chrome { position: relative }` once overrode the header's `fixed`, so the nav scrolled away on /halloween and the hero started 65px low. Never set `position`, `display` or anything a utility controls on a class that lands on shared chrome.
- (older note, same cause) **`halloween.css` is unlayered, so its rules BEAT Tailwind utilities.** Never set `display` (or anything a responsive utility controls) in an `.hlw-*` class — it silently overrides `hidden` / `lg:block` in the markup. Put those in the markup only.
- `components/pages/HalloweenPage.tsx` — the page; loads its own display font via `next/font`.
- `components/halloween/Scene.tsx` — visual pieces. `components/halloween/Chrome.tsx` — nav/footer decoration, switched on in `SiteNav`/`SiteFooter` when `stripLocale(pathname).startsWith("/halloween")`.
- Wordmark: `HalloweenWordmark` in `Scene.tsx`, currently set in **Mystery Quest** (Google, latin only — never use it for Vietnamese text). When the designer's transparent PNG/SVG arrives, swap the body of that one component.

## The hero: the FIRST KV adaptation (commit b5c7191) — the owner's chosen version
The owner asked, twice, to go back to this one. **Do not "improve" the hero without being asked, and do not replace it with either of the two rebuilds below.**

What it is (`Scene.tsx` `TunnelStage` + the HERO block of `halloween.css`): a 260vh scroll track pins a stage; ONE passive rAF listener (`TunnelProgress`) writes `--p` (0→1); the nested arch layers, the girl, the carpet and the wordmark branch each scale/fade from `--p` in CSS; masks hang in the corners; fireflies drift. The copy is left-aligned over the scene and fades out as you walk in.

Two rebuilds were tried and REJECTED on 15–16/10:
1. **A real CSS 3D scene** (`preserve-3d`, `perspective`, a `rotateX` floor, one camera). It measured exact (0px against `P/(P+z−pT)`) and looked right in headless Chrome — and on the owner's machine Chrome clipped large layers to rectangles (wordmark branch sliced across, the girl cut at the waist, the lit wall clipped). Verdict: "far too elaborate".
2. **A flat 2D Avatar composition** with one shared vanishing point (depth layers scaling about it, positions measured off the Avatar). It looked closer to the Avatar and measured exact — and the owner's Chrome STILL showed rectangular clipping (copy text cut at a vertical line, the girl missing her torso). They asked to go back.
The cause of that clipping is **not understood**: it never reproduced in headless Chrome, with or without a real GPU. It looks like unpainted compositor tiles, which points at many large `will-change: transform` layers on the owner's machine rather than at any one layout. If it appears again, first ask whether it also happens on other heavy pages on their machine, and whether it happens on a production build (`npm run build && npm run start`) as well as `npm run dev` — before changing code.

Still true, from the abandoned work:
- The Avatar has BRIGHT grass walls and DARK arch rings; rings on a bright stage vanish.
- Draw order is DOM order: a wall painted after a deeper layer hides it.
- A fixed header must stay `position: fixed` (see the unlayered-CSS trap above — the nav-scroll bug was real and is fixed in this version too).
- The headless browser here cannot be trusted to show clipping bugs; the owner's browser is the real test.

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
