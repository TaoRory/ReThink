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
 * GET ?action=availability: {ok:true, takenBy:{escape:{"17:00":7,...}, hunt:{"18:20":12,...}},
 *   taken:{...escape...}} — seats already booked per session.
 */

// Leave "" when this script was opened from the Sheet (Extensions → Apps Script).
// If it was created on script.google.com on its own, paste the Sheet's ID here
// (the long part of its URL between /d/ and /edit).
const SHEET_ID = "";

// Keep in step with lib/halloween-games.ts (GAME_CFG).
const GAMES = {
  escape: { capacity: 15, proof: true, pricing: { price: 67000, promoPrice: 50000, promoCode: "ilovehlw" }, groupMin: 2, groupMax: 6 },
  hunt: { capacity: 32, proof: false, groupMin: 2, groupMax: 4 },
};
const TABS = { escape: "Escape Room", hunt: "Scavenger Hunt" };
const SLOT_RE = /^\d{2}:\d{2}$/;

const PROOF_FOLDER = "Halloween 2026 — chứng minh CK";
const MAX_PROOF_B64 = 1500000; // the page sends ≈ 100–300 KB; this is a safety cap

// both games book by session, so both tabs share these columns; the escape room adds the proof
const BASE_HEADERS = ["Thời gian gửi", "Ca", "Hình thức", "Số người", "Người đại diện", "Email", "MSSV", "SĐT", "Tên nhóm", "Thành viên (+ email)"];
const HEADERS = {
  escape: BASE_HEADERS.concat(["Link chứng minh CK", "Ảnh chứng minh CK", "Mã giảm giá", "Số tiền cần thu (đ)"]),
  hunt: BASE_HEADERS,
};

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
    if (!d.name || !d.email || !d.studentId) return json_({ ok: false, error: "missing" });

    // alone = 1 person; a group = groupMin…groupMax people (the page sends the headcount, we check it)
    const size = d.type === "solo" ? 1 : d.type === "group" ? Number(d.headcount) : 0;
    const sizeOk = d.type === "solo" ? size === 1 : size === Math.floor(size) && size >= game.groupMin && size <= game.groupMax;
    if (!sizeOk || Number(d.headcount) !== size || !SLOT_RE.test(String(d.slot))) {
      return json_({ ok: false, error: "bad_request" });
    }
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
        if (String(d.promo).trim().toLowerCase() !== game.pricing.promoCode) return json_({ ok: false, error: "promo" });
        promo = game.pricing.promoCode;
        unit = game.pricing.promoPrice;
      }
      amount = unit * size;
    }

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
      safe_(d.phone),
      safe_(d.teamName),
      safe_(d.members),
    ];
    let fileUrl = "";
    if (game.proof) {
      const stamp = Utilities.formatDate(new Date(), ss_().getSpreadsheetTimeZone(), "yyyyMMdd-HHmmss");
      const who = String(d.name).replace(/[^\p{L}\p{N} _-]/gu, "").trim().slice(0, 40) || "khach";
      const ext = proof.mime === "image/png" ? "png" : proof.mime === "image/webp" ? "webp" : "jpg";
      const blob = Utilities.newBlob(Utilities.base64Decode(proof.data), proof.mime, d.slot.replace(":", "h") + " - " + who + " - " + stamp + "." + ext);
      fileUrl = proofFolder_().createFile(blob).getUrl();
      row.push("", "", promo, amount); // the first two are filled in below, once the row exists
    }
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
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}
