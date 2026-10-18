/**
 * Halloween game schedule — change the numbers here and the slot pickers follow.
 * (Keep docs/halloween-sheet.gs `GAMES` in step: it enforces the same limits on the Sheet side.)
 *
 * escape — owner's brief 18/10: 17:00 → 22:50, sessions of 50 min (40 min of play + 10 min reset), 12 people a session.
 * hunt   — owner's brief 18/10: 18:20 → 22:20, sessions of 40 min (30 min of play + 10 min set-up), 32 people a session.
 * A session is shown, and clash-checked, as its whole window (stepMin); playMin is only the play time quoted to guests.
 */
export type GameId = "hunt" | "escape";
export type RegType = "solo" | "group";

/** escape-room ticket: per person, with a promo code. Keep in step with PRICING in docs/halloween-sheet.gs. */
export const ESCAPE_PRICING = { price: 67000, promoPrice: 50000, promoCode: "ELLIE1996" } as const;

/** 67000 → "67.000đ" */
export const money = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;

export const promoMatches = (s: string) => s.trim().toLowerCase() === ESCAPE_PRICING.promoCode.toLowerCase();

type Cfg = {
  open: number; // minutes from midnight
  close: number;
  playMin: number; // time of actual play, quoted on the cards
  stepMin: number; // play + reset/set-up = the whole session window: sessions start this far apart
  capacity: number; // people per session
  /** a group registers 2…groupMax people at once; alone is always 1 */
  groupMin: number;
  groupMax: number;
  /** a bank-transfer proof (photo) must be uploaded with the registration */
  proof: boolean;
  /** per-person ticket price (and promo); absent = free */
  pricing?: typeof ESCAPE_PRICING;
};

export const GAME_CFG: Record<GameId, Cfg> = {
  escape: {
    open: 17 * 60,
    close: 22 * 60 + 50,
    playMin: 40,
    stepMin: 50,
    capacity: 12,
    proof: true,
    pricing: ESCAPE_PRICING,
    groupMin: 2,
    groupMax: 6,
  },
  hunt: {
    open: 18 * 60 + 20,
    close: 22 * 60 + 20,
    playMin: 30,
    stepMin: 40,
    capacity: 32, // 4 teams × 8
    proof: false,
    groupMin: 2,
    groupMax: 4,
  },
};

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export type Slot = { id: string; start: string; end: string };

/** every session whose whole window fits before closing */
export function slotsFor(game: GameId): Slot[] {
  const c = GAME_CFG[game];
  const out: Slot[] = [];
  for (let s = c.open; s + c.stepMin <= c.close; s += c.stepMin) {
    out.push({ id: hhmm(s), start: hhmm(s), end: hhmm(s + c.stepMin) });
  }
  return out;
}

/**
 * A Vietnamese MOBILE number → its 10-digit form starting with 0, or null if it is not one.
 * Accepts 0912 345 678, 0912.345.678, +84 912 345 678, 84912345678, 0084912345678.
 * Valid prefixes (2019 plan): 03[2-9] Viettel · 05[2,5,6,8,9] · 07[0,6-9] · 08[1-9] · 09[0-4,6-9].
 * Keep in step with normalizePhone_ in docs/halloween-sheet.gs.
 */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/[\s.\-()]/g, "");
  if (d.startsWith("+84")) d = "0" + d.slice(3);
  else if (d.startsWith("0084")) d = "0" + d.slice(4);
  else if (d.startsWith("84") && d.length === 11) d = "0" + d.slice(2);
  return /^0(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-46-9])\d{7}$/.test(d) ? d : null;
}

/** "Nguyễn  Văn Đạt" and "dat van nguyen" → the same key (accents, case, spacing and word order ignored) */
export function nameKey(s: string): string {
  return s
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

const EMAIL_IN = /[^\s,;|<>()]+@[^\s,;|<>()]+/;

/** a group's member list must contain a line "<leader's name> – <leader's email>", exactly as typed in the form above */
export function listHasLeader(members: string, leaderName: string, leaderEmail: string): boolean {
  const want = nameKey(leaderName);
  const email = leaderEmail.trim().toLowerCase();
  return members
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .some((line) => {
      const m = line.match(EMAIL_IN);
      if (!m || m[0].toLowerCase() !== email) return false;
      return nameKey(line.replace(m[0], " ")) === want;
    });
}
