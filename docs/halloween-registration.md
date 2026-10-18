# Halloween registration → Google Sheet

The two Halloween games (Scavenger Hunt, Escape Room) post their forms to a Google Apps Script
that writes into a Sheet. The site has no backend of its own; until the steps below are done the
forms show "registration opens soon" and cannot be submitted.

## One-time setup (≈5 minutes, needs the Google account that owns the Sheet)

1. Create a new Google Sheet (name it e.g. "Halloween 2026 — đăng ký"). Leave it empty.
2. In the Sheet: **Extensions → Apps Script**. Delete the sample code, paste all of
   [`halloween-sheet.gs`](./halloween-sheet.gs), save. If the script was created on its own at
   script.google.com instead, put the Sheet's ID (the part of its URL between `/d/` and `/edit`)
   in `SHEET_ID` at the top.
   Then pick the function **`setup`** in the toolbar and press **Run** once (approve the permission
   prompt): it creates the two tabs ("Escape Room", "Scavenger Hunt") with their header rows.
   Pasting the code alone does nothing — the tabs only appear when `setup` runs (or on the first
   submission).
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

## Payment (escape room only)

- **Price:** 67.000đ per person; with the promo code `ilovehlw` it drops 25% to 50.000đ (struck-through
  price shown). The form multiplies by the number of people (alone ×1, group ×2–6) and shows **Tổng cần chuyển**.
  Prices and code live in `ESCAPE_PRICING` (`lib/halloween-games.ts`) **and** `GAMES.escape.pricing` in the script —
  change both together. The script recomputes the price itself and rejects a wrong code.
- **QR code:** ONE QR for every price and group size — a plain account QR with **no amount** in it; whoever pays
  types the amount shown as "Tổng cần chuyển". Put the image at `web/public/halloween/qr.png` (`.jpg`, `.jpeg`,
  `.webp` also work; `qr67.*` is accepted as a fallback name). Until a file exists the form says "the QR will be added soon".
- **Photo:** the page shrinks the proof to a small JPEG (≈ 100–300 KB) in the browser and sends it with the registration.
- **In the Sheet:** the "Escape Room" tab has, after the usual columns, **K** a link ("Mở ảnh"), **L** the
  picture inside the cell, **M** the promo code used and **N** the amount to collect. The original photo is
  also saved in a private Drive folder **"Halloween 2026 — chứng minh CK"** (only the script's Google account can open it).
- Run `setup` once after pasting a new script (adds the columns; the first time it also makes Google ask for **Drive permission**).
- Members of a team are entered as `Name – VinUni email`, one per line, both games.

## What is written

Both tabs ("Escape Room", "Scavenger Hunt") have the same columns: submitted at · session start
(e.g. `17:50`) · type (`solo` / `group`) · number of people · contact person · email ·
student ID · phone · team name · members + their VinUni email (one per line). The escape-room tab ends with the proof link, the picture, the promo code and the amount to collect.

## Ticket id

Every successful registration gets an id `hlw001`, `hlw002`, … (one running number across both games). The
page shows it in a "Đăng ký thành công" box with the name, game, session and head count, and asks the person
to screenshot it. It is also written in the last column of each tab (**"Mã vé"**: K on the hunt tab, O on the
escape-room tab). The next id is the highest one in the Sheet + 1, so deleting your test rows restarts the count.

## Rules the script enforces (so the page cannot be tricked)

- **Required fields:** name, VinUni email, student ID and phone for everyone; a group also needs a team name and the full member list. The script refuses a registration with any of them empty.
- **Escape room:** 12 people per session. Register alone (1 seat) or as a group of **2–6** people (that many seats).
- **Scavenger hunt:** 32 people per session. Register alone (1 seat) or as a group of **2–4** people.
- A registration that would take a session over its capacity is refused with `full`, and the page
  asks the person to pick another session. Capacities and group sizes live in `GAMES` at the top of the script and in
  `GAME_CFG` in `lib/halloween-games.ts` — change both together.
- **Who may register (all matched by VinUni email only — two people can share a name, never an email):**
  1. every email — the contact person and each listed member — must end in **@vinuni.edu.vn**
     (so one person cannot slip in with a second, personal address);
  2. a group's member list must have exactly the head count, one `Name – email` per line, no repeated email,
     and must include the contact person (same name and email as typed in the form above);
  2b. the phone must be a Vietnamese mobile number (10 digits; `+84…` accepted and stored as `0…`);
  3. **one session per person per game**: an email that already has a session of the same game is refused,
     whatever the time (switch off with `ONE_SESSION_PER_GAME = false` in the script);
  4. **no two games at overlapping session times**, compared as the whole windows the page shows
     (escape 50 min, hunt 40 min from the session start). Back-to-back is fine (there is no travel buffer):
     escape 18:40–19:30 clashes with hunt 18:20–19:00 and 19:00–19:40, but not with hunt 19:40–20:20.
  A clash is refused with `conflict`; the page shows a red box listing each person (name, email, the other
  registration and why). Checks 1–2 run in the page and again in the script, so they cannot be skipped.
- **Auditing rows already in the Sheet:** in the editor choose the function **`audit`** and Run. It marks
  (red cell A + a note) every existing row that breaks these rules and lists them in the log. Nothing is deleted.
- The check runs under a script lock, so two people submitting at the same moment cannot both take
  the last seats.
- Text starting with `= + - @` is stored with a leading `'` so it cannot run as a formula.

## Session times

Generated in `lib/halloween-games.ts` (`GAME_CFG`) from the owner's briefs; change them there and the
pickers follow.

- **Escape room:** 17:00 – 22:50, sessions of 50 min (40 of play + 10 to reset), 12 people each →
  17:00–17:50, 17:50–18:40, 18:40–19:30, 19:30–20:20, 20:20–21:10, 21:10–22:00, 22:00–22:50.
- **Scavenger hunt:** 18:20 – 22:20, sessions of 40 min (30 of play + 10 to set up), 32 people each →
  18:20–19:00, 19:00–19:40, 19:40–20:20, 20:20–21:00, 21:00–21:40, 21:40–22:20.

## After changing the script

Paste the new `halloween-sheet.gs`, run `setup` once, then **Deploy → Manage deployments → edit →
New version → Deploy**. The first call rewrites the header row of the "Scavenger Hunt" tab if it still
has the old 5-column layout (do this before the first real registration).

## Not handled (decide if needed)

- No confirmation email is sent; the page only shows the confirmation on screen.
- No way to cancel or change a registration from the site — edit the Sheet by hand.
- The same person can register twice; check duplicates in the Sheet before the event.
