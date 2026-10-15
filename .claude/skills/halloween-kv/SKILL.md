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

## Palette — ESTIMATE, replace with sampled values in Phase 1
| Token idea | Hex | Where |
|---|---|---|
| grass acid | `#7aa51e` / `#5f8a1a` | ground, arches |
| moss shadow | `#0c140c` | page ground, deep shadow |
| branch | `#1e3328` | cylinders, borders |
| script lime | `#e6ec7a` | RETHINK wordmark, headings |
| firefly | `#f2f56a` | motes, highlights |
| blood | `#7a0a0a` → `#a01212` | trails, drips, accents |
| bone | `#d9d6c4` | masks, compass, body text on dark |
| compass glow | `#e0702a` | the one warm light |

## Asset map — originals → `public/halloween/` (ASCII names)
| Original | Output | Role |
|---|---|---|
| `Vòm Cỏ.png` 2377×2504 | `vom-co.webp` | one arch; stack 4–5 at decreasing scale for the tunnel |
| `Background Vòm Cỏ.png` | `bg-vom-co.webp` | fill inside the deepest arch |
| `Background cỏ.png` 2564×1920 | `bg-co.webp` | page ground |
| `Texture_.jpg` | `texture.webp` | subtle repeat |
| `Cành Cây.png` 2504×1901 | `canh-cay.webp` | crossing branches; one carries the wordmark |
| `Nhân Vật Chính.png` | `nhan-vat.webp` | the girl |
| `Mask Mèo/Chó/Cú.png` | `mask-meo/-cho/-cu.webp` | rooms 1–3 (room 4 = bird skull, crop from avatar or ask) |
| `Eyeball 1–3.png` | `eyeball-1..3.webp` | follow the cursor |
| `Light 1, 2, 3, 3(1).png` | `light-1..4.webp` | fireflies |
| `Compass Logo.png` / `Compass Full 3D.png` | `compass-logo.webp` / `compass-3d.webp` | event mark, scroll-progress needle |
| `Máu_.png` / `Trail Máu.png` | `mau.webp` / `trail-mau.webp` | section drips / timeline spine |
| `Tay.png` / `Chân.png` | `tay.webp` / `chan.webp` | decoration |
| `Background Tay_.jpg` | `bg-tay.webp` | hands-behind-glass, FAQ backdrop |
| Cover FB | `og.jpg` 1200×630 | Open Graph image |

Budget: whole page < 1.8MB desktop / < 900KB phone; hero LCP image < 250KB. Render through `next/image` with real `sizes`.

## Pixel-art rules
Masks, compass, fireflies and eyeballs are dithered pixel-art. Resize them with **nearest-neighbour** (sharp `kernel: "nearest"`) and display with `image-rendering: pixelated`, or they blur into mush.

## Code structure (keep it)
- `app/halloween.css` — imported at the top of `globals.css`. **Every selector starts with `.hlw`.** `.hlw` = tokens only (the nav/footer borrow it); `.hlw-page` = the full-height ground. Putting `min-height` on `.hlw` once inflated the header to full screen.
- `components/pages/HalloweenPage.tsx` — the page; loads its own display font via `next/font`.
- `components/halloween/Scene.tsx` — visual pieces. `components/halloween/Chrome.tsx` — nav/footer decoration, switched on in `SiteNav`/`SiteFooter` when `stripLocale(pathname).startsWith("/halloween")`.
- Wordmark: put it behind one `<HalloweenWordmark>` component. Use a Google script font until the designer's transparent PNG/SVG arrives, then swap in one place.

## Animation catalogue (transform/opacity only — `npm run check:hlw` enforces it)
- **Hero tunnel:** sticky section ~250vh; ONE passive scroll listener (rAF) writes `--p` 0→1; each arch layer `scale()`s by its own factor so you walk in; the girl's eye glow fades up. Phone: 3 layers. Reduced motion: static composition.
- Fireflies drift + blink; branches sway a degree or two; masks swing on their branch, shake on hover.
- Eyeballs follow the cursor — ONE shared pointermove listener, rAF-throttled, rotating/translating the pupil layer.
- Blood trail "flows" to each timeline stop (one-shot `scaleX` on enter).
- FAQ: a hand presses against the glass when a question opens (`scale`).
- One-shot effects may be dramatic; anything looping must stay cheap. The user has reverted a hero before for lag.

## Placeholders (all copy on the page is invented)
- Event name: drop "Pale Lake"; use neutral "Halloween 2026" until docs arrive.
- Date 30/10/2026 18:00–22:00, venue, rooms, schedule, FAQ — all invented.
- Hard-coded in `HalloweenPage.tsx` (move into the dict): `TIMES`, the pinned date label, the `ticker` words, the "PL" wax seal.
- Remove the two "nội dung mẫu" notes and fill the registration link when real content lands.
- Waiting on the designer: transparent RETHINK wordmark; optional cut-out bird skull.
