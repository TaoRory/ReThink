---
name: i18n-copy
description: Add, edit or import site copy in both Vietnamese and English, following ReThink's voice and naming rules. Use when changing any visible text, translating, or loading content from a doc the user provides into the site.
---

# Copy in two languages

## Where copy lives
- **All** visible text is in `lib/i18n.ts`, under `dict.vi` and `dict.en`.
- The dict is typed off `vi`, so a key missing from `en` fails the build — always add to both trees.
- Page components (`components/pages/*`) read `dict[locale].<page>`; never hard-code a visible string in a component. If you find one, move it into the dict.
- Vietnamese uses the bare paths; English lives under `/en/...`.
- Passing a dict slice as a prop to a client component: `Dict["x"]` only accepts the Vietnamese literals because the dict is `as const`. Widen it, e.g. `Omit<{ [K in keyof Dict["x"]]: string }, "meta">` (see `components/WheelGame.tsx`).

## Names and voice
- ReThink is a **"tổ chức sinh viên của VinUni"** — never "câu lạc bộ" / "CLB".
- **"TEDx VinUniversity"** with a space; the word "TEDx" renders in `.text-neon-red`.
- **ReThinker / ReThinkers** with a capital T; the verb "rethink" lowercase.
- Verbatim in both languages: the four core values, culture names (Championship / Fellowship / Breakership Culture), department names, "Rethink & Let Rethink", season and event titles.
- Write concretely: who we are, what we do, what is different. No manifesto language ("kỷ nguyên AI", "chiếc hộp tư duy", "thought leader"), no absolute claims.
- Department scope: Content owns core idea, narrative, research, speaker curation. MarCom = communication strategy, messaging, campaigns. External Engagement = sponsors/partners/stakeholders (not speakers). Event = logistics + audience journey.

## Importing text the user wrote
- Apply it close to verbatim. Only fix clear typos, and say which ones you fixed.
- Match existing typography: em dash `—`, "lan toả", lowercase after a colon in lists.
- Translate to English faithfully yourself and tell the user it is your translation.
- Never invent facts, numbers, dates or names about the organisation; placeholder text must be marked as placeholder on the page.
