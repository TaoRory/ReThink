# Main-site design system (AY 26-27)

How the main site (`/`, `/about`, `/tedx`, `/join`, `/game`, 404) is built.
`/halloween` is the deliberate exception: its own theme under `.hlw`, native
scrolling, none of the classes below.

`components/pages/HomePage.tsx` is the reference implementation — read it
before building or changing a page.

## The idea in one line

ReThink is where a familiar problem gets looked at again. The page is calm and
flat (ink background, hairlines, real photos, large type); the **Newton's
cradle** in the Home hero is the one brand signature, and the **flat fuchsia
block behind a keyword** (`.kit-mark`) plus the **square mote ▪** (`.mote`)
are the small signature repeated across pages.

## Files

| File | What |
|---|---|
| `app/system.css` | tokens + component classes (below) |
| `app/motion.css` | motion foundation CSS (`[data-rise]`, `.kit-mark`, `.kit-roll`, `.kit-parallax`, `.kit-pin`…) |
| `lib/motion.ts` | the only place gsap is imported from: `gsap, ScrollTrigger, SplitText, useGSAP, MQ, EASE, DUR, cx, getLenis, scrollToTarget` |
| `components/motion/*` | `MotionProvider` (Lenis, mounted once in the layout), `Rise`, `SplitReveal`, `Parallax`, `Magnetic`, `VelocityMarquee`, `usePinProgress` |
| `components/Btn.tsx`, `Tedx.tsx`, `CradleStage.tsx` | shared pieces |
| `lib/site-state.ts` | `RECRUITING`, `JOIN_FORM`, `FACEBOOK`, `TEDX_2026_SITE` — the facts about "now" |
| `lib/i18n/<page>.ts` | each page's copy, `{ vi, en }`; `lib/i18n.ts` assembles `dict` |

## Classes (`app/system.css`)

- **Layout:** `.wrap` (1240px + gutter), `.sec` (section padding `clamp(72px,10vw,144px)`), `.sec-sm`, `.measure` (reading column).
- **Type:** `.h-display` (h1), `.h-hero` (Home hero only), `.h-section` (h2), `.h-card` (h3), `.lead`, `.body`, `.label` (14px/600 caps, cyan — use sparingly), `.small` (13px), `.tone-2` (the quieter half of a two-tone heading), `.figure` (big sourced number). Nothing smaller than 13px. Text colours: `--text` / `--text-2` / `--text-3` (16:1, 10:1, 7:1 on ink-950) — do not go fainter with `/40`-style opacity.
- **Surfaces:** `.panel`, `.panel-deep` (rounded 28px dark chapter), `.rows` (children separated by hairlines), `.photo` / `.photo-lg` (rounded image frame), `.spectrum-line`, `.mote`.
- **Actions:** `<Btn variant="solid|brand|line|ted" size="md|sm" arrow>`; `.tile` / `.tile-brand` + `.tile-arrow` for big link tiles; `.nav-link`, `.link-quiet`.
- `brand` (fuchsia) means **something is open right now**. TEDx actions are `ted` (TED red). The word "TEDx" is always `<Tedx />` / `<TedxText>`.

## Layout rules

- Left-aligned by default. Every section on a page has a **different** layout: sticky heading + text, rows in a panel, one big project + list, two tiles… never a row of three identical cards as the skeleton, no nested cards, no `01/02/03` where order means nothing, no eyebrow above every heading.
- Flat colour and hairlines. No gradient text, no glass, no glow borders, no shadows as decoration. No aurora / starfield / galaxy / pointer-glow backgrounds (removed on purpose).
- Real photos from `public/photos`, never dimmed into a background; each with real `alt` text. TEDx photos are not colour-graded.
- Phone header = logo + one action + Menu. Touch targets ≥ 44px. No horizontal overflow at 375 / 768 / 1280 / 1440.
- Exactly one `<h1>` per page, and it says in the page's language what the page is.

## Motion rules (from the Aegis web kit — non-negotiable)

1. Content is complete with JS off and with reduced motion. "Waiting" states exist only under `html[data-motion="on"]`.
2. Never hide text waiting for a scroll: blocks **rise by transform** (`<Rise>`), opacity stays 1. `kind="wipe"` is for images only.
3. Headings: `<SplitReveal as="h1" trigger="load">` once in a hero, `<SplitReveal as="h2">` for section headings. Content must be static.
4. Animate only `transform`, `opacity`, `clip-path`, CSS variables. Anything looping: `transform` / `opacity` only.
5. One frame loop: everything rides `gsap.ticker` (Lenis already does). All GSAP inside `useGSAP` + `gsap.matchMedia()`.
6. Pin / long scrub is desktop-only (`MQ.desktopMotion`); phones get the static version.
7. Budget per page: **at most two scroll-linked scenes** (`<Parallax>` counts) and one interactive object. Site-wide: one signature (the cradle). No new ambient loop without removing one.
8. Pointer effects (`<Magnetic>`, hover) only for `(hover: hover) and (pointer: fine)`; at most one `<Magnetic>` per page, on the main action.
9. Anything that runs by itself for more than 5s has a pause control (see `CradleStage`).
10. Write the storyboard first (section / trigger / what moves / what it says). An effect with nothing to say is dropped.

## Truth rules

- Never invent facts, dates, numbers, quotes, people or logos. Numbers sit next to their source ("The Firsts, 2025").
- Seasonal claims come from `lib/site-state.ts`. Titles and meta descriptions stay evergreen (no "Gia nhập Gen 5", no season name) because chat apps cache them for weeks.
- All visible strings live in `lib/i18n/<page>.ts`, in both `vi` and `en`. Brand phrases (core values, culture names, "Rethink & Let Rethink") stay verbatim English; mark them `lang="en"` on Vietnamese pages.

## Checking a change

```bash
npx tsc --noEmit
npm run build && npm run check:hlw
node scripts/cdp/shot.js     http://localhost:3000/about out.png 390 844      # one viewport
node scripts/cdp/fullshot.js http://localhost:3000/about out.png 1440 900 0.5 # whole page, after scrolling through it
node scripts/cdp/eval.js     http://localhost:3000/about "({w: document.documentElement.scrollWidth, vw: innerWidth})" 390 844
```
