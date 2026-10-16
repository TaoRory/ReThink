/**
 * Halloween registration → Google Sheet.
 * Paste this whole file into the Apps Script project attached to the Sheet
 * (Extensions → Apps Script) and deploy it as a Web app. Steps: docs/halloween-registration.md
 *
 * POST (JSON body, sent as text/plain): writes one row to the "Escape Room" or
 *   "Scavenger Hunt" tab. Escape-room rows are refused with {ok:false,error:"full"}
 *   when the session would go over CAPACITY, so two people can never both take the last seats.
 * GET ?action=availability: {ok:true, taken:{"17:00":7, ...}} — seats already booked per session.
 */

const CAPACITY = 15;
const TABS = { escape: "Escape Room", hunt: "Scavenger Hunt" };
const TYPE_SIZE = { solo: 1, team: 5, group: 15 };
const SLOT_RE = /^\d{2}:\d{2}$/;

const HEADERS = {
  escape: ["Thời gian gửi", "Ca", "Hình thức", "Số người", "Người đại diện", "Email", "MSSV", "SĐT", "Tên nhóm", "Thành viên"],
  hunt: ["Thời gian gửi", "Người đăng ký", "Email", "MSSV", "SĐT"],
};

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// a cell starting with = + - @ would be run as a formula in Sheets
function safe_(v) {
  const s = String(v == null ? "" : v).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function tab_(game) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TABS[game]);
  if (!sh) sh = ss.insertSheet(TABS[game]);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS[game]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS[game].length).setFontWeight("bold");
  }
  return sh;
}

// seats taken per session, from the sheet itself (column B = slot, D = headcount)
function taken_() {
  const sh = tab_("escape");
  const out = {};
  const last = sh.getLastRow();
  if (last < 2) return out;
  sh.getRange(2, 2, last - 1, 3).getValues().forEach(function (r) {
    const slot = String(r[0]);
    out[slot] = (out[slot] || 0) + (Number(r[2]) || 0);
  });
  return out;
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === "availability") {
    return json_({ ok: true, taken: taken_() });
  }
  return json_({ ok: true });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // serialise writers so the capacity check is honest
  try {
    const d = JSON.parse(e.postData.contents);
    if (!TABS[d.game]) return json_({ ok: false, error: "bad_game" });
    if (!d.name || !d.email || !d.studentId) return json_({ ok: false, error: "missing" });

    const sh = tab_(d.game);
    const now = new Date();

    if (d.game === "hunt") {
      sh.appendRow([now, safe_(d.name), safe_(d.email), safe_(d.studentId), safe_(d.phone)]);
      return json_({ ok: true });
    }

    const size = TYPE_SIZE[d.type];
    if (!size || Number(d.headcount) !== size || !SLOT_RE.test(String(d.slot))) {
      return json_({ ok: false, error: "bad_request" });
    }
    const booked = taken_()[d.slot] || 0;
    if (booked + size > CAPACITY) return json_({ ok: false, error: "full" });

    sh.appendRow([
      now,
      safe_(d.slot),
      safe_(d.type),
      size,
      safe_(d.name),
      safe_(d.email),
      safe_(d.studentId),
      safe_(d.phone),
      safe_(d.teamName),
      safe_(d.members),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "server" });
  } finally {
    lock.releaseLock();
  }
}
