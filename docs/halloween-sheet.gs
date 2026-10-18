/**
 * Halloween registration → Google Sheet.
 * Paste this whole file into the Apps Script project attached to the Sheet
 * (Extensions → Apps Script) and deploy it as a Web app. Steps: docs/halloween-registration.md
 *
 * POST (JSON body, sent as text/plain): writes one row to the "Escape Room" or
 *   "Scavenger Hunt" tab. A row is refused with {ok:false,error:"full"} when its session would
 *   go over that game's capacity, so two people can never both take the last seats.
 *   The escape room also takes a bank-transfer proof (a small JPEG): it is saved in a private Drive
 *   folder ("Halloween 2026 — chứng minh CK"), and the row gets a link to it plus the picture itself
 *   in the last column. The script works out the price itself (ticket × people, or the promo price
 *   when the right promo code is sent) and writes the code and the amount to collect on the row; a
 *   wrong code is refused with {ok:false,error:"promo"}.
 *   Who may register — all matched by VinUni EMAIL only (two people can share a name, never an email):
 *     - every email (contact person + each listed member) must be @vinuni.edu.vn  → error "email_domain"
 *     - a group's list must have exactly the head count, one email each, no repeats → "members_count" / "dup_member",
 *       and it must include the contact person (same name AND email as in the form) → "leader_missing"
 *     - the phone must be a Vietnamese mobile number (10 digits; +84 / 84 / 0084 accepted) → "phone"
 *     - ONE session per person per game (kind "same_game"), and nobody in two games at overlapping
 *       session times (kind "overlap") → {ok:false,error:"conflict",conflicts:[{who,email,game,slot,end,kind}, …]}
 *       naming each clashing person.
 *   Run audit() from the editor to mark rows already in the Sheet that break these rules.
 *   Every registration gets a ticket id: hlw001, hlw002, … one running number across both games
 *   (the next one is the highest id in the Sheet + 1, so clearing test rows restarts the count). It is
 *   written in the last column ("Mã vé") and returned as {ok:true, ticket:"hlw001"}.
 * GET ?action=availability: {ok:true, takenBy:{escape:{"17:00":7,...}, hunt:{"18:20":12,...}},
 *   taken:{...escape...}} — seats already booked per session.
 */

// Leave "" when this script was opened from the Sheet (Extensions → Apps Script).
// If it was created on script.google.com on its own, paste the Sheet's ID here
// (the long part of its URL between /d/ and /edit).
const SHEET_ID = "";

// Keep in step with lib/halloween-games.ts (GAME_CFG). slotMin = the whole session window (play + reset),
// which is what the page shows and what the clash check compares.
const GAMES = {
  escape: { slotMin: 50, capacity: 12, proof: true, pricing: { price: 67000, promoPrice: 50000, promoCode: "ELLIE1996" }, groupMin: 2, groupMax: 6 },
  hunt: { slotMin: 40, capacity: 32, proof: false, groupMin: 2, groupMax: 4 },
};
const ONE_SESSION_PER_GAME = true; // false = a person may take several different sessions of the same game
const VINUNI_EMAIL = /^[^\s@,;|<>()]+@vinuni\.edu\.vn$/i;
const TABS = { escape: "Escape Room", hunt: "Scavenger Hunt" };
const SLOT_RE = /^\d{2}:\d{2}$/;

const PROOF_FOLDER = "Halloween 2026 — chứng minh CK";
const MAX_PROOF_B64 = 1500000; // the page sends ≈ 100–300 KB; this is a safety cap

// both games book by session, so both tabs share these columns; the escape room adds the proof
const BASE_HEADERS = ["Thời gian gửi", "Ca", "Hình thức", "Số người", "Người đại diện", "Email", "MSSV", "SĐT", "Tên nhóm", "Thành viên (+ email)"];
const HEADERS = {
  escape: BASE_HEADERS.concat(["Link chứng minh CK", "Ảnh chứng minh CK", "Mã giảm giá", "Số tiền cần thu (đ)", "Mã vé"]),
  hunt: BASE_HEADERS.concat(["Mã vé"]),
};
const TICKET_COL = { escape: 15, hunt: 11 }; // the "Mã vé" column of each tab

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// a cell starting with = + - @ would be run as a formula in Sheets
function safe_(v) {
  const s = String(v == null ? "" : v).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function ss_() {
  return SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

/** Run this once from the editor (select "setup" → Run): creates both tabs and their headers. */
function setup() {
  tab_("escape");
  tab_("hunt");
  proofFolder_(); // also makes Google ask for Drive permission now rather than on the first registration
  const ss = ss_();
  const blank = ss.getSheetByName("Sheet1");
  if (blank && blank.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(blank);
}

function tab_(game) {
  const ss = ss_();
  let sh = ss.getSheetByName(TABS[game]);
  if (!sh) sh = ss.insertSheet(TABS[game]);
  const cols = HEADERS[game];
  const head = sh.getRange(1, 1, 1, cols.length);
  if (head.getValues()[0].join("|") !== cols.join("|")) {
    // new tab, or an older layout (the hunt tab used to have 5 columns): (re)write the header row
    head.setValues([cols]).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  // keep these as text: Sheets would turn "17:50" into a time and drop the leading 0 of a phone number
  ["B:B", "G:G", "H:H"].forEach(function (c) {
    sh.getRange(c).setNumberFormat("@");
  });
  return sh;
}

function proofFolder_() {
  const it = DriveApp.getFoldersByName(PROOF_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(PROOF_FOLDER); // private: only this account can open it
}

// ---- the same person in both games at overlapping times ---------------------------------------

function minutes_(slot) {
  const m = String(slot).match(/(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) * 60 + Number(m[2]) : -1;
}

function hhmm_(mins) {
  return ("0" + Math.floor(mins / 60)).slice(-2) + ":" + ("0" + (mins % 60)).slice(-2);
}

const EMAIL_RE = /[^\s,;|<>()]+@[^\s,;|<>()]+/;

// a Vietnamese MOBILE number → 10 digits starting with 0, or "" if it is not one (keep in step with normalizePhone in lib/halloween-games.ts)
function normalizePhone_(raw) {
  let d = String(raw == null ? "" : raw).replace(/[\s.\-()]/g, "");
  if (d.indexOf("+84") === 0) d = "0" + d.slice(3);
  else if (d.indexOf("0084") === 0) d = "0" + d.slice(4);
  else if (d.indexOf("84") === 0 && d.length === 11) d = "0" + d.slice(2);
  return /^0(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-46-9])\d{7}$/.test(d) ? d : "";
}

// "Nguyễn  Văn Đạt" and "dat van nguyen" → the same key (accents, case, spacing and word order ignored)
function nameKey_(s) {
  return String(s == null ? "" : s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ");
}

// everyone a registration covers: the contact person plus each "Name – email" line of the member list.
// A person is identified by their (lower-cased) email.
function personsOf_(name, email, members) {
  const out = [];
  const add = function (n, e) {
    const em = String(e || "").trim().toLowerCase();
    if (em) out.push({ label: String(n || "").trim() || em, email: em });
  };
  add(name, email);
  String(members || "")
    .split(/\r?\n/)
    .forEach(function (line) {
      const m = line.match(EMAIL_RE);
      if (!m) return;
      add(line.replace(m[0], "").replace(/[–—|:;,<>()+]|\s-\s/g, " ").trim(), m[0]);
    });
  return out;
}

// Checks the page can also make, repeated here so nobody can skip them: returns "" or an error code.
function checkPeople_(d, size) {
  if (!VINUNI_EMAIL.test(String(d.email || "").trim())) return "email_domain";
  if (d.type !== "group") return "";
  const lines = String(d.members || "").split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
  if (lines.length !== size) return "members_count";
  const emails = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(EMAIL_RE);
    if (!m || !VINUNI_EMAIL.test(m[0])) return "email_domain";
    emails.push(m[0].toLowerCase());
  }
  // the contact person must be on the list, with the same name AND email as in the form
  const leaderEmail = String(d.email).trim().toLowerCase();
  const leaderName = nameKey_(d.name);
  const hasLeader = lines.some(function (l) {
    const m = l.match(EMAIL_RE);
    return m && m[0].toLowerCase() === leaderEmail && nameKey_(l.replace(m[0], " ")) === leaderName;
  });
  if (!hasLeader) return "leader_missing";
  const seen = {};
  for (let j = 0; j < emails.length; j++) {
    if (seen[emails[j]]) return "dup_member";
    seen[emails[j]] = true;
  }
  return "";
}

// Everyone in this registration who may not take this session, as [{who, email, game, slot, end, kind}]:
//  - kind "same_game": already has a session of THIS game (any time) — one session per person per game
//  - kind "overlap":   already has a session of the OTHER game whose play time overlaps this one
function findConflicts_(d) {
  const myStart = minutes_(d.slot);
  const myEnd = myStart + GAMES[d.game].slotMin;
  const mine = personsOf_(d.name, d.email, d.members);
  const found = [];
  const other = d.game === "escape" ? "hunt" : "escape";
  [other, d.game].forEach(function (g) {
    const same = g === d.game;
    if (same && !ONE_SESSION_PER_GAME) return;
    const sh = tab_(g);
    const last = sh.getLastRow();
    if (last < 2) return;
    sh.getRange(2, 1, last - 1, 10).getDisplayValues().forEach(function (r) {
      const s2 = minutes_(r[1]);
      if (s2 < 0) return;
      const e2 = s2 + GAMES[g].slotMin;
      if (!same && !(myStart < e2 && s2 < myEnd)) return; // other game: only overlapping times clash
      const theirs = personsOf_(r[4], r[5], r[9]).map(function (p) { return p.email; });
      mine.forEach(function (p) {
        if (theirs.indexOf(p.email) < 0) return;
        const again = found.some(function (f) { return f.email === p.email && f.game === g && f.slot === hhmm_(s2); });
        if (!again) found.push({ who: p.label, email: p.email, game: g, slot: hhmm_(s2), end: hhmm_(e2), kind: same ? "same_game" : "overlap" });
      });
    });
  });
  return found;
}

/**
 * Run from the editor (select "audit" → Run): marks rows ALREADY in the Sheet that break the rules
 * (same email twice in one game, or in both games at overlapping times, or a non-vinuni.edu.vn email).
 * Marked rows get a red "Thời gian gửi" cell with a note; the log lists them. Nothing is deleted.
 */
function audit() {
  const regs = [];
  ["escape", "hunt"].forEach(function (g) {
    const sh = tab_(g);
    const last = sh.getLastRow();
    if (last < 2) return;
    sh.getRange(2, 1, last - 1, 10).getDisplayValues().forEach(function (r, i) {
      regs.push({ game: g, sh: sh, row: i + 2, s: minutes_(r[1]), emails: personsOf_(r[4], r[5], r[9]).map(function (p) { return p.email; }) });
    });
  });
  const problems = {};
  const flag = function (reg, why) {
    const k = reg.game + ":" + reg.row;
    problems[k] = problems[k] || { reg: reg, why: [] };
    problems[k].why.push(why);
  };
  regs.forEach(function (a, i) {
    a.emails.forEach(function (e) {
      if (!VINUNI_EMAIL.test(e)) flag(a, "email ngoài @vinuni.edu.vn: " + e);
    });
    regs.forEach(function (b, j) {
      if (i === j) return;
      const shared = a.emails.filter(function (e) { return b.emails.indexOf(e) >= 0; });
      if (!shared.length) return;
      if (a.game === b.game) {
        flag(a, "cùng email " + shared[0] + " với " + b.game + " dòng " + b.row);
      } else if (a.s < b.s + GAMES[b.game].slotMin && b.s < a.s + GAMES[a.game].slotMin) {
        flag(a, "trùng giờ với " + b.game + " dòng " + b.row + " (" + shared[0] + ")");
      }
    });
  });
  const keys = Object.keys(problems);
  keys.forEach(function (k) {
    const p = problems[k];
    const cell = p.reg.sh.getRange(p.reg.row, 1);
    cell.setBackground("#f4cccc").setNote(p.why.join("\n"));
    Logger.log(TABS[p.reg.game] + " dòng " + p.reg.row + ": " + p.why.join("; "));
  });
  Logger.log(keys.length ? keys.length + " dòng có vấn đề (đã tô đỏ ô A)." : "Không có dòng nào vi phạm.");
}

// the next ticket id: highest hlwNNN already in either tab, plus one ("hlw001" for the first)
function nextTicket_() {
  let max = 0;
  ["escape", "hunt"].forEach(function (g) {
    const sh = tab_(g);
    const last = sh.getLastRow();
    if (last < 2) return;
    sh.getRange(2, TICKET_COL[g], last - 1, 1).getDisplayValues().forEach(function (r) {
      const m = String(r[0]).match(/hlw(\d+)/i);
      if (m) max = Math.max(max, Number(m[1]));
    });
  });
  const n = String(max + 1);
  return "hlw" + (n.length < 3 ? ("00" + n).slice(-3) : n);
}

// "17:50", "17:50:00" or "5:50 PM" (whatever the cell displays) → "17:50"
function slotKey_(display) {
  const m = String(display).match(/(\d{1,2}):(\d{2})/);
  if (!m) return String(display);
  let h = Number(m[1]);
  if (/pm/i.test(display) && h < 12) h += 12;
  if (/am/i.test(display) && h === 12) h = 0;
  return ("0" + h).slice(-2) + ":" + m[2];
}

// seats taken per session, read from the sheet itself (column B = slot, D = headcount).
// getDisplayValues so it works whether Sheets stored the slot as text or turned it into a time.
function taken_(game) {
  const sh = tab_(game);
  const out = {};
  const last = sh.getLastRow();
  if (last < 2) return out;
  sh.getRange(2, 2, last - 1, 3).getDisplayValues().forEach(function (r) {
    const slot = slotKey_(r[0]);
    out[slot] = (out[slot] || 0) + (Number(r[2]) || 0);
  });
  return out;
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === "availability") {
    const escape = taken_("escape");
    return json_({ ok: true, taken: escape, takenBy: { escape: escape, hunt: taken_("hunt") } });
  }
  return json_({ ok: true });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // serialise writers so the capacity check is honest
  try {
    const d = JSON.parse(e.postData.contents);
    const game = GAMES[d.game];
    if (!game) return json_({ ok: false, error: "bad_game" });
    if (!d.name || !d.email || !d.studentId || !d.phone) return json_({ ok: false, error: "missing" });
    if (d.type === "group" && !String(d.teamName || "").trim()) return json_({ ok: false, error: "missing" }); // a group needs a team name

    // alone = 1 person; a group = groupMin…groupMax people (the page sends the headcount, we check it)
    const size = d.type === "solo" ? 1 : d.type === "group" ? Number(d.headcount) : 0;
    const sizeOk = d.type === "solo" ? size === 1 : size === Math.floor(size) && size >= game.groupMin && size <= game.groupMax;
    if (!sizeOk || Number(d.headcount) !== size || !SLOT_RE.test(String(d.slot))) {
      return json_({ ok: false, error: "bad_request" });
    }
    const phone = normalizePhone_(d.phone);
    if (!phone) return json_({ ok: false, error: "phone" });
    const peopleErr = checkPeople_(d, size);
    if (peopleErr) return json_({ ok: false, error: peopleErr });
    const proof = d.proof;
    if (game.proof) {
      if (!proof || !proof.data) return json_({ ok: false, error: "proof" });
      if (String(proof.data).length > MAX_PROOF_B64) return json_({ ok: false, error: "proof_big" });
      if (!/^image\/(jpeg|png|webp)$/.test(String(proof.mime))) return json_({ ok: false, error: "proof_type" });
    }

    // price: worked out here, never taken from the page
    let promo = "";
    let amount = "";
    if (game.pricing) {
      let unit = game.pricing.price;
      if (d.promo) {
        if (String(d.promo).trim().toLowerCase() !== String(game.pricing.promoCode).toLowerCase()) return json_({ ok: false, error: "promo" }); // not case-sensitive
        promo = game.pricing.promoCode;
        unit = game.pricing.promoPrice;
      }
      amount = unit * size;
    }

    const clashes = findConflicts_(d);
    if (clashes.length) return json_({ ok: false, error: "conflict", conflicts: clashes });

    const sh = tab_(d.game);
    const booked = taken_(d.game)[d.slot] || 0;
    if (booked + size > game.capacity) return json_({ ok: false, error: "full" });

    const row = [
      new Date(),
      safe_(d.slot),
      safe_(d.type),
      size,
      safe_(d.name),
      safe_(d.email),
      safe_(d.studentId),
      phone,
      safe_(d.teamName),
      safe_(d.members),
    ];
    const ticket = nextTicket_();
    let fileUrl = "";
    if (game.proof) {
      const stamp = Utilities.formatDate(new Date(), ss_().getSpreadsheetTimeZone(), "yyyyMMdd-HHmmss");
      const who = String(d.name).replace(/[^\p{L}\p{N} _-]/gu, "").trim().slice(0, 40) || "khach";
      const ext = proof.mime === "image/png" ? "png" : proof.mime === "image/webp" ? "webp" : "jpg";
      const blob = Utilities.newBlob(Utilities.base64Decode(proof.data), proof.mime, d.slot.replace(":", "h") + " - " + who + " - " + stamp + "." + ext);
      fileUrl = proofFolder_().createFile(blob).getUrl();
      row.push("", "", promo, amount); // the first two are filled in below, once the row exists
    }
    row.push(ticket);
    sh.appendRow(row);

    if (game.proof) {
      const r = sh.getLastRow();
      sh.getRange(r, 11).setFormula('=HYPERLINK("' + fileUrl + '","Mở ảnh")');
      try {
        // the picture itself, inside the cell (a data: URL, so the Drive file can stay private)
        const img = SpreadsheetApp.newCellImage()
          .setSourceUrl("data:" + proof.mime + ";base64," + proof.data)
          .setAltTextTitle("Chứng minh chuyển khoản")
          .build();
        sh.getRange(r, 12).setValue(img);
        sh.setRowHeight(r, 140);
      } catch (imgErr) {
        /* the link in column K still works */
      }
    }
    return json_({ ok: true, ticket: ticket });
  } catch (err) {
    return json_({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}
