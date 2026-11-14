"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Btn } from "@/components/Btn";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
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
  // rounded: Node and the browser disagree in the last float digit of sin/cos,
  // which React reports as a hydration mismatch on the SVG attributes
  const round = (n: number) => Math.round(n * 100) / 100;
  return [round(C + r * Math.cos(a)), round(C + r * Math.sin(a))];
}

function wedge(i: number): string {
  const [x0, y0] = rim(i * SEG, R);
  const [x1, y1] = rim((i + 1) * SEG, R);
  return `M ${C} ${C} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

/**
 * Renders two page sections: the game (wheel + result panel) and the full
 * topic list. `topicLang` marks the English topics on the Vietnamese page.
 */
export function WheelGame({ t, topicLang }: { t: GameCopy; topicLang?: string }) {
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
      {/* ============ THE GAME: the wheel, and what it landed on ============ */}
      <section className="wrap pt-[clamp(1.5rem,3.5vw,3rem)]">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* ---------------- the wheel ---------------- */}
          <div className="mx-auto w-full max-w-[27rem] pt-10 lg:col-span-5 lg:mx-0">
            {/* the disc and everything pinned to its centre live in their own
                square box — the hint below must not pull `top: 50%` off-centre */}
            <div className="relative">
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
                  // flat system: no glow around the disc
                  filter: "none",
                }}
              >
                {/* the wedge labels are short forms; every topic is listed in
                    full below, so the drawing is hidden from screen readers */}
                <svg viewBox="0 0 400 400" className="block h-auto w-full" aria-hidden="true">
                  {TOPICS.map((topic, i) => {
                    const isDone = done.includes(i);
                    const isWinner = winner === i;
                    const dim = isDone && !isWinner;
                    const centre = (i + 0.5) * SEG;
                    const [lx, ly] = rim(centre, R * 0.63);
                    // radial text points outward, which reads upside-down once the
                    // wedge is past 6 o'clock — flip the left half so every label
                    // sits upright with the wheel at rest
                    const flip = centre > 180;
                    const spin = centre - 90 + (flip ? 180 : 0);
                    return (
                      <g key={topic.short}>
                        <path
                          d={wedge(i)}
                          fill={isWinner ? FILL_LIT[i] : FILL[i]}
                          fillOpacity={dim ? 0.3 : 1}
                          stroke="rgba(233,236,248,0.16)"
                          strokeWidth="1"
                        />
                        {/* 16 units = 13px+ once the wheel is 330px wide */}
                        <text
                          x={lx}
                          y={ly}
                          fill={isWinner ? "#fff" : dim ? "#979eb6" : "#e9ecf8"}
                          fontSize="16"
                          fontWeight={isWinner ? 600 : 400}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${spin.toFixed(2)}, ${lx.toFixed(2)}, ${ly.toFixed(2)})`}
                          style={{ textDecoration: isDone ? "line-through" : "none" }}
                        >
                          {topic.short}
                        </text>
                      </g>
                    );
                  })}

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
                <span className="font-display text-[13px] font-semibold leading-none min-[481px]:text-[15px]">
                  {spinning ? t.spinning : t.spin}
                </span>
                <span className="mt-1.5 text-[13px] leading-none tabular-nums text-[var(--text-2)]">
                  {pool.length}/{N}
                </span>
              </button>
            </div>

            <p className="small mt-5 flex items-center justify-center gap-2.5">
              <span className="mote text-cyan-300" aria-hidden="true" />
              {t.hint}
            </p>
          </div>

          {/* ---------------- result panel ---------------- */}
          <div className="panel flex min-h-[22rem] flex-col justify-center p-[clamp(1.5rem,3vw,2.5rem)] lg:col-span-7">
            {/* only this block is announced: the countdown below would
                otherwise be read out every second */}
            <div aria-live="polite" aria-atomic="true">
              {winner !== null ? (
                <>
                  <p className="label flex items-center gap-3">
                    <span className="mote text-fuchsia-400" aria-hidden="true" />
                    {t.topicLabel}
                  </p>
                  <p className="h-section mt-5" lang={topicLang}>
                    {TOPICS[winner].text}
                  </p>
                </>
              ) : exhausted ? (
                <>
                  <p className="h-section">{t.allDoneTitle}</p>
                  <p className="body mt-4">{t.allDoneLead}</p>
                </>
              ) : (
                <>
                  <p className="h-section">{spinning ? `${t.spinning}…` : t.idleTitle}</p>
                  <p className="body mt-4">{t.idleLead}</p>
                  <p className="small mt-8 flex items-center gap-2.5">
                    <span className="mote text-cyan-300" aria-hidden="true" />
                    {pool.length} {t.remaining}
                  </p>
                </>
              )}
            </div>

            {winner !== null ? (
              <>
                <div className="mt-8">
                  {left === null ? (
                    <Btn type="button" variant="solid" onClick={startTimer}>
                      {t.timerStart}
                    </Btn>
                  ) : (
                    <div>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                        <span
                          role="timer"
                          aria-live="off"
                          aria-label={t.timerLabel}
                          className={`figure tabular-nums ${left === 0 ? "!text-fuchsia-400" : ""}`}
                        >
                          {left === 0 ? t.timerDone : `${left}s`}
                        </span>
                        <Btn type="button" variant="line" onClick={stopTimer}>
                          {t.timerReset}
                        </Btn>
                      </div>
                      <div
                        className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/12"
                        aria-hidden="true"
                      >
                        <div
                          className="h-full origin-left bg-cyan-300 transition-transform duration-200 ease-linear motion-reduce:transition-none"
                          style={{ transform: `scaleX(${left / TALK_SECONDS})` }}
                        />
                      </div>
                      {/* the one moment of the countdown worth announcing */}
                      <span className="sr-only" role="status">
                        {left === 0 ? t.timerDone : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* the solid button is the next step: start the clock, then
                    (once time is up) spin again */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Btn type="button" variant={left === 0 ? "solid" : "line"} onClick={spin}>
                    {t.again}
                  </Btn>
                  <Btn type="button" variant="line" onClick={markDone}>
                    {t.markDone}
                  </Btn>
                </div>
              </>
            ) : exhausted ? (
              <div className="mt-8">
                <Btn type="button" variant="solid" onClick={reset}>
                  {t.reset}
                </Btn>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ============ EVERY TOPIC, IN FULL: sticky heading, rows on the right ============ */}
      <section className="sec">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SplitReveal as="h2" className="h-section">
                {t.listHeading}
              </SplitReveal>
              <p className="small mt-4 flex items-center gap-2.5">
                <span className="mote text-cyan-300" aria-hidden="true" />
                {t.listKicker}
              </p>
              {done.length > 0 && (
                <div className="mt-8">
                  <Btn type="button" variant="line" onClick={reset}>
                    {t.reset}
                  </Btn>
                </div>
              )}
            </div>
          </div>

          <Rise as="ul" className="rows lg:col-span-8">
            {TOPICS.map((topic, i) => {
              const isDone = done.includes(i);
              const isWinner = winner === i;
              return (
                <li
                  key={topic.short}
                  className="flex items-start gap-4 py-5"
                  aria-current={isWinner ? "true" : undefined}
                >
                  <span
                    className={`mote mt-[0.72rem] ${
                      isWinner
                        ? "text-fuchsia-400"
                        : isDone
                          ? "text-[var(--text-3)]"
                          : "text-cyan-300"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    lang={topicLang}
                    className={`body flex-1 ${
                      isWinner
                        ? "!text-pearl-50"
                        : isDone
                          ? "!text-[var(--text-3)] line-through"
                          : ""
                    }`}
                  >
                    {topic.text}
                  </span>
                  {isDone && <span className="small mt-1.5 shrink-0">{t.done}</span>}
                </li>
              );
            })}
          </Rise>
        </div>
      </section>
    </>
  );
}
