/**
 * Halloween game schedule — change the numbers here and the slot pickers follow.
 * (Keep docs/halloween-sheet.gs `GAMES` in step: it enforces the same limits on the Sheet side.)
 *
 * escape — owner's brief 16/10: 17:00 → 22:30, 40 min of play + 10 min reset, 15 people a session.
 * hunt   — owner's brief 16/10: 18:20 → 22:20, 30 min of play + 10 min set-up, 4 teams of 8 a session.
 */
export type GameId = "hunt" | "escape";
export type RegType = "solo" | "team" | "group";

/** escape-room ticket: per person, with a promo code. Keep in step with PRICING in docs/halloween-sheet.gs. */
export const ESCAPE_PRICING = { price: 67000, promoPrice: 50000, promoCode: "ilovehlw" } as const;

/** 67000 → "67.000đ" */
export const money = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`;

export const promoMatches = (s: string) => s.trim().toLowerCase() === ESCAPE_PRICING.promoCode;

type Cfg = {
  open: number; // minutes from midnight
  close: number;
  playMin: number;
  stepMin: number; // play + set-up: how far apart sessions start
  capacity: number; // people per session
  /** how a person can register and how many seats it takes */
  types: readonly { id: RegType; size: number }[];
  /** a bank-transfer proof (photo) must be uploaded with the registration */
  proof: boolean;
  /** per-person ticket price (and promo); absent = free */
  pricing?: typeof ESCAPE_PRICING;
};

export const GAME_CFG: Record<GameId, Cfg> = {
  escape: {
    open: 17 * 60,
    close: 22 * 60 + 30,
    playMin: 40,
    stepMin: 50,
    capacity: 15,
    proof: true,
    pricing: ESCAPE_PRICING,
    types: [
      { id: "solo", size: 1 },
      { id: "team", size: 5 },
      { id: "group", size: 15 }, // a whole session
    ],
  },
  hunt: {
    open: 18 * 60 + 20,
    close: 22 * 60 + 20,
    playMin: 30,
    stepMin: 40,
    capacity: 32, // 4 teams × 8
    proof: false,
    types: [
      { id: "solo", size: 1 },
      { id: "team", size: 8 }, // one full team
    ],
  },
};

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export type Slot = { id: string; start: string; end: string };

/** every session whose play time fits before closing */
export function slotsFor(game: GameId): Slot[] {
  const c = GAME_CFG[game];
  const out: Slot[] = [];
  for (let s = c.open; s + c.playMin <= c.close; s += c.stepMin) {
    out.push({ id: hhmm(s), start: hhmm(s), end: hhmm(s + c.playMin) });
  }
  return out;
}
