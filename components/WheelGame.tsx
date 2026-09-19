"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/i18n";

/** the game copy, widened to plain strings so both locale trees fit (the dict
    is `as const`, so `Dict["game"]` alone only accepts the Vietnamese literals) */
type GameCopy = Omit<{ [K in keyof Dict["game"]]: string }, "meta">;

/**
 * The Club Fair topic wheel.
 *
 * Topics are the ones from the club's own wheel (wheelofnames.com/apq-tbg) and
 * stay in English in both locales — they are the script the booth actually
 * runs. `short` is the wedge label only; the full prompt is what the player
 * reads out.
 */
export const TOPICS: { short: string; text: string }[] = [
  { short: "8 AM classes", text: "Why 8 am classes should be banned" },
  { short: "Naps", text: "Why naps should count as self-development" },
  {
    short: "Free food",
    text: "Why free food is the strongest marketing strategy on campus",
  },
  {
    short: "Back row",
    text: "Why sitting at the back of the class is a personality trait",
  },
  {
    short: "Major ≠ career",
    text: "Why your major does not have to decide your career",
  },
  {
    short: "“I don’t know”",
    text: "Why saying “I don’t know” can be smarter than pretending you do",
  },
  {
    short: "The quiet ones",
    text: "Why being the quietest person in the room does not mean having the least to say",
  },
  { short: "GPA", text: "Why GPA is overrated" },
  {
    short: "Joy over pay",
    text: "Why you should choose a job you enjoy over one that pays more",
  },
  {
    short: "Over-optimising",
    text: "Why students should stop trying to optimise every part of university life",
  },
  {
    short: "Competitiveness",
    text: "Why being competitive can sometimes make university less enjoyable",
  },
];

const N = TOPICS.length;
const SEG = 360 / N;
const SPIN_MS = 5200;
const TALK_SECONDS = 30;

/* ---------- wedge colours: one pass around the KV spectrum ---------- */

const STOPS = ["#d633e8", "#7a15f0", "#2540d0", "#22c9e8", "#d633e8"];

function hex(c: string): [number, number, number] {
  return [
    parseInt(c.slice(1, 3), 16),
    parseInt(c.slice(3, 5), 16),
    parseInt(c.slice(5, 7), 16),
  ];
}

/** spectrum colour at t in [0,1), dimmed to `k` so the wheel reads as glass */
function spectrum(t: number, k: number): string {
  const span = STOPS.length - 1;
  const i = Math.min(Math.floor(t * span), span - 1);
  const f = t * span - i;
  const a = hex(STOPS[i]);
  const b = hex(STOPS[i + 1]);
  const mix = a.map((v, j) => Math.round((v + (b[j] - v) * f) * k));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}

const FILL = TOPICS.map((_, i) => spectrum((i + 0.5) / N, 0.34));
const FILL_LIT = TOPICS.map((_, i) => spectrum((i + 0.5) / N, 0.82));

/* ---------- geometry ---------- */

const R = 196;
const C = 200;

/** a point on the rim at `deg` clockwise from 12 o'clock */
function rim(deg: number, r: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
}

function wedge(i: number): string {
  const [x0, y0] = rim(i * SEG, R);
  const [x1, y1] = rim((i + 1) * SEG, R);
  return `M ${C} ${C} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

export function WheelGame({ t }: { t: GameCopy }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [left, setLeft] = useState<number | null>(null);

  const spinTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);
  const [spinMs, setSpinMs] = useState(SPIN_MS);

  useEffect(
    () => () => {
      if (spinTimer.current) clearTimeout(spinTimer.current);
      if (tick.current) clearInterval(tick.current);
    },
    []
  );

  const stopTimer = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    tick.current = null;
    setLeft(null);
  }, []);

  const startTimer = useCallback(() => {
    if (tick.current) clearInterval(tick.current);
    const end = Date.now() + TALK_SECONDS * 1000;
    setLeft(TALK_SECONDS);
    tick.current = setInterval(() => {
      const s = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setLeft(s);
      if (s === 0 && tick.current) {
        clearInterval(tick.current);
        tick.current = null;
      }
    }, 200);
  }, []);

  const pool = TOPICS.map((_, i) => i).filter((i) => !done.includes(i));

  const spin = useCallback(() => {
    if (spinning || pool.length === 0) return;

    const pick = pool[Math.floor(Math.random() * pool.length)];
    // land the middle of the winning wedge under the pointer at 12 o'clock,
    // off-centre by a little so it never stops in the same spot twice
    const centre = (pick + 0.5) * SEG + (Math.random() - 0.5) * SEG * 0.6;
    const turns = 5 + Math.floor(Math.random() * 3);
    let target = -centre;
    target += 360 * Math.ceil((rotation - target) / 360 + turns);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 0 : SPIN_MS;

    stopTimer();
    setSpinMs(ms);
    setWinner(null);
    setSpinning(true);
    setRotation(target);

    if (spinTimer.current) clearTimeout(spinTimer.current);
    spinTimer.current = setTimeout(() => {
      setSpinning(false);
      setWinner(pick);
    }, ms);
  }, [pool, rotation, spinning, stopTimer]);

  const reset = () => {
    stopTimer();
    setDone([]);
    setWinner(null);
  };

  const markDone = () => {
    if (winner === null) return;
    stopTimer();
    setDone((d) => (d.includes(winner) ? d : [...d, winner]));
    setWinner(null);
  };

  const exhausted = pool.length === 0;

  return (
    <>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---------------- the wheel ---------------- */}
        <div className="relative mx-auto w-full max-w-[27rem]">
          <div className="wheel-halo" aria-hidden="true" />

          {/* the pointer hangs like a pendulum bob — the KV motif */}
          <div className="wheel-pointer" aria-hidden="true">
            <span className="wheel-wire" />
            <span className={`wheel-bob ${spinning ? "is-spinning" : ""}`} />
          </div>

          <div
            className="wheel-rotor"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: `${spinMs}ms`,
            }}
          >
            <svg viewBox="0 0 400 400" className="block h-auto w-full">
              <defs>
                <radialGradient id="wheel-sheen" cx="32%" cy="22%" r="78%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
                  <stop offset="55%" stopColor="#fff" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
                </radialGradient>
              </defs>

              {TOPICS.map((topic, i) => {
                const isDone = done.includes(i);
                const isWinner = winner === i;
                const centre = (i + 0.5) * SEG;
                const [lx, ly] = rim(centre, R * 0.63);
                // radial text points outward, which reads upside-down once the
                // wedge is past 6 o'clock — flip the left half so every label
                // sits upright with the wheel at rest
                const flip = centre > 180;
                const spin = centre - 90 + (flip ? 180 : 0);
                return (
                  <g key={topic.short} opacity={isDone && !isWinner ? 0.28 : 1}>
                    <path
                      d={wedge(i)}
                      fill={isWinner ? FILL_LIT[i] : FILL[i]}
                      stroke="rgba(233,236,248,0.16)"
                      strokeWidth="1"
                    />
                    <text
                      x={lx}
                      y={ly}
                      fill={isWinner ? "#fff" : "rgba(233,236,248,0.9)"}
                      fontSize="14"
                      fontWeight={isWinner ? 600 : 400}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${spin.toFixed(2)}, ${lx.toFixed(2)}, ${ly.toFixed(2)})`}
                      style={{
                        textDecoration: isDone ? "line-through" : "none",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {topic.short}
                    </text>
                  </g>
                );
              })}

              <circle cx={C} cy={C} r={R} fill="url(#wheel-sheen)" />
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="rgba(214,51,232,0.55)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* hub = the spin button */}
          <button
            type="button"
            onClick={spin}
            disabled={spinning || exhausted}
            className="wheel-hub"
            aria-label={t.spin}
          >
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em]">
              {spinning ? t.spinning : t.spin}
            </span>
            <span className="mt-1 text-[10px] tracking-[0.18em] text-pearl-100/50">
              {pool.length}/{N}
            </span>
          </button>

          <p className="mt-6 text-center text-xs uppercase tracking-[0.28em] text-pearl-100/40">
            {t.hint}
          </p>
        </div>

        {/* ---------------- result panel ---------------- */}
        <div className="frame-hairline min-h-[22rem] bg-ink-900/50 p-8 sm:p-10">
          <div aria-live="polite">
            {winner !== null ? (
              <>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                  <span className="h-px w-8 bg-gradient-to-r from-fuchsia-500 to-cyan-300" />
                  {t.topicLabel}
                </p>
                <p className="mt-6 font-display text-2xl font-light leading-snug text-pearl-50 sm:text-[1.75rem]">
                  {TOPICS[winner].text}
                </p>

                <div className="mt-8">
                  {left === null ? (
                    <button
                      type="button"
                      onClick={startTimer}
                      className="btn-lux btn-lux-ghost !px-6 !py-2.5 !text-[11px]"
                    >
                      {t.timerStart}
                    </button>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-display text-5xl font-extralight tabular-nums ${
                            left === 0 ? "text-neon-red" : "text-neon"
                          }`}
                        >
                          {left === 0 ? t.timerDone : `${left}s`}
                        </span>
                        <button
                          type="button"
                          onClick={stopTimer}
                          className="text-xs uppercase tracking-[0.2em] text-pearl-100/50 hover:text-pearl-100"
                        >
                          {t.timerReset}
                        </button>
                      </div>
                      <div className="mt-4 h-px w-full bg-white/10">
                        <div
                          className="h-px bg-gradient-to-r from-fuchsia-500 to-cyan-300 transition-[width] duration-200 ease-linear"
                          style={{ width: `${(left / TALK_SECONDS) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={spin}
                    className="btn-lux btn-lux-primary !px-6 !py-2.5 !text-[11px]"
                  >
                    {t.again} <span className="text-cyan-300">&#9642;</span>
                  </button>
                  <button
                    type="button"
                    onClick={markDone}
                    className="btn-lux btn-lux-ghost !px-6 !py-2.5 !text-[11px]"
                  >
                    {t.markDone}
                  </button>
                </div>
              </>
            ) : exhausted ? (
              <>
                <p className="font-display text-2xl font-light text-pearl-50">
                  {t.allDoneTitle}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-pearl-100/70">
                  {t.allDoneLead}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="btn-lux btn-lux-primary mt-8 !px-6 !py-2.5 !text-[11px]"
                >
                  {t.reset}
                </button>
              </>
            ) : (
              <>
                <p className="font-display text-2xl font-light text-pearl-50">
                  {spinning ? `${t.spinning}…` : t.idleTitle}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-pearl-100/70">
                  {t.idleLead}
                </p>
                <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cyan-300/70">
                  {pool.length} {t.remaining}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- every topic, in full ---------------- */}
      <div className="mt-20">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          <span className="h-px w-8 bg-gradient-to-r from-fuchsia-500 to-cyan-300" />
          {t.listKicker}
        </p>
        <h2 className="font-display text-3xl font-light tracking-[0.02em] text-pearl-50 sm:text-4xl">
          {t.listHeading}
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((topic, i) => {
            const isDone = done.includes(i);
            return (
              <li
                key={topic.short}
                className={`frame-hairline bg-ink-900/40 p-5 transition ${
                  isDone ? "opacity-40" : ""
                } ${winner === i ? "!border-fuchsia-400/70" : ""}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xs uppercase tracking-[0.22em] text-cyan-400/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {isDone && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-400/80">
                      {t.done}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed text-pearl-100/75 ${
                    isDone ? "line-through" : ""
                  }`}
                >
                  {topic.text}
                </p>
              </li>
            );
          })}
        </ul>

        {done.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="btn-lux btn-lux-ghost mt-10 !px-6 !py-2.5 !text-[11px]"
          >
            {t.reset}
          </button>
        )}
      </div>
    </>
  );
}
