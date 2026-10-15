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

## The hero: the Avatar REBUILT FROM ITS ELEMENTS (owner's request, 16/10)
The owner rejected both "drop the Avatar image in" and loose re-compositions. They want every piece of the Avatar as its own element, placed exactly as in the Avatar, then a scroll into the tunnel where elements grow and disappear, with light rising from the compass.

**How the placement was measured — reuse this, don't eyeball:**
- Sources cropped to visible content (alpha > 40) → `public/halloween/kv/*.webp`, so a CSS box = what you see. Boxes in `Scene.tsx` are fractions of the square `[x, y, w, h]`. Some pieces are stretched in the Avatar (owl is taller than its file) — boxes are not forced to the file's aspect.
- Raw pixel matching FAILS: the Avatar is colour-graded (≈0.62× the raw elements overall, ≈0.45× at the edges). Normalised cross-correlation on texture also failed. What worked:
  - distinctive pieces (girl, masks, compass, inner wall, arm, leg): 1% grid laid over the Avatar;
  - `Cành Cây.png` = the whole top branch group: its main limb is 47°, same as the RETHINK branch → box `[0, 0, 1.02, 0.71]`;
  - arches: an EDGE search (gradient magnitude along the band's boundary) found the frame arch at x .151–.849, y .118–.922; the rest follow from arches standing on one perspective floor (bottom = .654 + .384·w, widths geometric) — and the predicted tops (.272, .383, .461) match the bright bands measured down the centre line. Outer arch crown at y .04;
  - wordmark: R/N/K letter centroids of the SVG mapped onto the Avatar's lettering (angle within 0.5°) → `[0.0997, -0.128, 0.732, 0.677]`. Its "26-27" runs on up the branch;
  - fireflies: detected as bright yellow squares in the Avatar.
- `Mask Mèo/Chó/Cú` exist; the **bird skull and the small hooded mask do not** — they are cut from the Avatar with a soft oval (`skull.webp`, `hood.webp`). Ask the designer for real cut-outs.
- `RETHINK 26-27 2.svg` is a PNG wrapped in an SVG (plus a drop-shadow filter) — extract the PNG.
- The grade is a plain dark radial overlay measured against the Avatar (centre .12 → edge .66 alpha); light sources (glow behind the girl, compass beam/pool) sit ABOVE it, or it darkens them. The glow must be BEHIND the girl in paint order or it washes her out.
- Comparing: screenshot the `.hlw-scene` box, resize to the Avatar, mean |diff| per channel. Went 20.2 → 13.6.

**Walking in:** every element is a full-square `.hlw-layer` at depth `--d`, scaled about the end of the tunnel (50.5% 62%) by `d / (d − p·Tn)`, `Tn = 2.1`; it fades out just before reaching the camera. Near things (branches, masks, arm) go first, the girl grows ~2.5×. At the end the scene fades and the event details fade in.
**Rule:** no `mask-image`/`overflow` on anything that contains a scaled layer — a mask clips children to its box, which is what cut earlier versions into rectangles on the owner's screen. (Earlier rebuilds: real CSS 3D — clipped on the owner's GPU; flat 2D Avatar comp; and dropping the Avatar image in — all rejected.)

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
