# ReThink — VinUniversity student organization website

Loaded every session, so it stays short. Task-specific detail lives in skills
(`.claude/skills/`) and loads only when the task matches; mechanical work goes
to subagents (`.claude/agents/`).

## Where things are
- This folder (`web/`) is the git root: remote `TaoRory/ReThink`, branch `main`. Push → Vercel deploys to **https://rethinkorg.com** in ~30–60s.
- Next.js 15 App Router · React 19 · TypeScript strict · Tailwind v4 (no config file; tokens in `app/globals.css` `@theme`). All pages static.
- Brand assets live one level up in `../KV/` (outside git, never edit): `New KV/` = AY 26-27 site KV, `kv halloween - ReThink/` = Halloween event KV, the booklet folder = retired.
- Pages, each with an `/en` twin: `/`, `/about`, `/tedx`, `/join`, `/game`, `/halloween`.
- Main-site design system + motion rules: **`docs/design-system.md`** (read before touching a main-site page; `components/pages/HomePage.tsx` is the reference). Motion foundation = GSAP + Lenis, imported only through `lib/motion.ts`; recipes in `components/motion/`.
- Season switches (is recruitment open, external links): `lib/site-state.ts`.
- Run: `npm run dev` (http://localhost:3000). Gates: `npm run build`, `npm run check:hlw`.

## Skills (load the one that matches)
| Skill | When |
|---|---|
| `verify-ui` | after any visual change — build, serve, CDP screenshots/measurements |
| `deploy` | commit / push / "is it live?" |
| `i18n-copy` | any visible text, translation, importing a doc |
| `halloween-kv` | anything on `/halloween` or its KV |
| `rethink-brand` | main-site design, or copy that states facts about ReThink (numbers, seasons, dates) |

Subagents: `asset-optimizer` (image conversion), `ui-verifier` (screenshots → short findings), `copy-loader` (doc → dictionary).
Plans being worked on live in `docs/` with checkboxes — read the relevant one first.

## Rules every session
- **Bilingual.** All copy in `lib/i18n/<page>.ts` (`{ vi, en }`, assembled into `dict` by `lib/i18n.ts`; header/footer copy is `lib/i18n/chrome.ts`), both languages with the same keys (a missing `en` key fails the type check). Vietnamese = bare paths, English = `/en/...`. No hard-coded visible strings in components.
- **Naming.** ReThink is a "tổ chức sinh viên của VinUni" (never "CLB"). "TEDx VinUniversity" with a space; the word "TEDx" is always TED red neon (`.text-neon-red`). ReThinker/ReThinkers with capital T. Current cohort: Gen 5 (AY 26-27).
- **Brand.** Site KV = the AY 26-27 pendulum: near-black `#04060c`, fuchsia → violet → azure → cyan spectrum, neon monoline "RETHINK 26-27", Lexend + Be Vietnam Pro, square `▪` motes. `/halloween` is the deliberate exception — its own theme, scoped under `.hlw` (see `halloween-kv`).
- **Animation performance.** Text is never hidden waiting for an animation (blocks rise by transform, see `docs/design-system.md`). Anything looping may animate only `transform` and `opacity` — never `filter`, `box-shadow`, `text-shadow`, `background-position` or layout. One-shot effects are fine. Always keep a `prefers-reduced-motion` fallback. The owner has reverted a hero for lag before.
- **Evidence before "done".** Build, look at screenshots at 390 and 1440, measure alignment instead of eyeballing (`verify-ui`).
- **"Commit" ≠ "push".** Push only when the owner says so; verify on rethinkorg.com, not vercel.app (`deploy`).
- **Never invent** facts, dates or numbers about the organisation. Placeholder copy must be visibly marked as placeholder.
- Text the owner writes is applied near-verbatim; fix only clear typos and say which.
