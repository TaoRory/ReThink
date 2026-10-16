# Halloween registration → Google Sheet

The two Halloween games (Scavenger Hunt, Escape Room) post their forms to a Google Apps Script
that writes into a Sheet. The site has no backend of its own; until the steps below are done the
forms show "registration opens soon" and cannot be submitted.

## One-time setup (≈5 minutes, needs the Google account that owns the Sheet)

1. Create a new Google Sheet (name it e.g. "Halloween 2026 — đăng ký"). Leave it empty; the script
   makes the two tabs ("Escape Room", "Scavenger Hunt") and their header rows itself.
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code, paste all of
   [`halloween-sheet.gs`](./halloween-sheet.gs), save.
3. **Deploy → New deployment → type "Web app"**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, and approve the permission prompt (it only touches this Sheet).
4. Copy the **Web app URL** (ends in `/exec`).
5. On Vercel: Project → Settings → Environment Variables → add
   `NEXT_PUBLIC_HLW_FORM_URL` = that URL (Production, and Preview if wanted), then **redeploy**
   (a `NEXT_PUBLIC_` variable is baked in at build time).
   For local testing put the same line in `web/.env.local`.
6. Test: submit one escape-room registration on the site and check the row appears.
   The session picker should then show the seats left.

If you change the script later: **Deploy → Manage deployments → edit → new version**
(the URL stays the same).

## What is written

**Escape Room** tab: submitted at · session start (e.g. `17:50`) · type (`solo` / `team` / `group`) ·
number of people · contact person · email · student ID · phone · team name · members (one per line).

**Scavenger Hunt** tab: submitted at · name · email · student ID · phone.

## Rules the script enforces (so the page cannot be tricked)

- Capacity is **15 per session** (`CAPACITY` in the script and `ESCAPE.capacity` in
  `lib/halloween-games.ts` — change both together).
- Registration types: individual = 1 seat, team = 5 seats, group = 15 seats (a whole session).
  A registration that would take the session over 15 is refused with `full`, and the page asks the
  person to pick another session.
- The check runs under a script lock, so two people submitting at the same moment cannot both take
  the last seats.
- Text starting with `= + - @` is stored with a leading `'` so it cannot run as a formula.

## Session times

Generated in `lib/halloween-games.ts` from the owner's brief: open 17:00, close 22:30, 40 min of
play + 10 min reset, so sessions start 17:00, 17:50, 18:40, 19:30, 20:20, 21:10 (the next one would
finish after 22:30). Change `ESCAPE` there and the picker follows.

## Not handled (decide if needed)

- No confirmation email is sent; the page only shows the confirmation on screen.
- No way to cancel or change a registration from the site — edit the Sheet by hand.
- The same person can register twice; check duplicates in the Sheet before the event.
