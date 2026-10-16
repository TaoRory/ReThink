/**
 * Halloween game schedule — change the numbers here and the slot picker follows.
 * (Owner's brief, 16/10: escape room runs 17:00 → 22:30, 40 min of play + 10 min
 * to reset the room per session, at most 15 people per session.)
 */
export const ESCAPE = {
  open: 17 * 60,
  close: 22 * 60 + 30,
  playMin: 40,
  resetMin: 10,
  capacity: 15,
} as const;

const hhmm = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export type Slot = { id: string; start: string; end: string };

/** every session whose play time fits before closing: 17:00, 17:50, 18:40 … */
export function escapeSlots(): Slot[] {
  const out: Slot[] = [];
  for (let s = ESCAPE.open; s + ESCAPE.playMin <= ESCAPE.close; s += ESCAPE.playMin + ESCAPE.resetMin) {
    out.push({ id: hhmm(s), start: hhmm(s), end: hhmm(s + ESCAPE.playMin) });
  }
  return out;
}

/** the three ways to register for the escape room, and how many seats each takes in a session */
export const ESCAPE_TYPES = [
  { id: "solo", size: 1 },
  { id: "team", size: 5 },
  { id: "group", size: ESCAPE.capacity }, // a whole session
] as const;
export type EscapeType = (typeof ESCAPE_TYPES)[number]["id"];
