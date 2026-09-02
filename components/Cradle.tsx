/**
 * Newton's cradle from the AY 26-27 KV.
 *
 * The four concept beats are the mechanism itself: the weights hold their
 * Default Orbit, the swinging one Encounters the row, everything holds still
 * at the apex (Pause), and the momentum picks a direction (Choice).
 *
 * Physics kept honest:
 *  - only ONE weight is ever in motion; the inner ones stay on their line
 *  - momentum hands off at contact, then returns — the ends alternate,
 *    they never swing together
 *  - each arc is easeInSine falling / easeOutSine climbing, so speed peaks at
 *    the bottom and reaches exactly zero at the top
 *  - every sphere's CENTRE hangs at the same depth, so all pendulums share a
 *    length and therefore a period; a fat sphere's wire is shortened by its
 *    own radius to keep that true
 *
 * Pure CSS. Parent section needs `relative overflow-hidden`.
 */

/** full cycle: fall → impact → out → pause → back → impact → out */
const T = 3.6;
/** how long the compression pulse takes to cross one weight */
const STEP = 0.045;

type Orb = {
  /** horizontal position of the pivot, % of the container */
  left: number;
  /** sphere diameter */
  size: string;
  fill?: string;
  swing?: "l" | "r";
  pearl?: boolean;
  /** index in the row, used to stagger the compression pulse */
  k?: number;
};

const ORBS: Orb[] = [
  {
    left: 9,
    size: "clamp(7rem, 17vw, 15rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.55), rgba(232,92,245,.85) 34%, rgba(178,36,204,.55) 68%, rgba(90,15,110,.15) 100%)",
    swing: "l",
  },
  {
    left: 22,
    size: "clamp(6rem, 14vw, 12.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.4), rgba(154,77,255,.7) 36%, rgba(90,15,208,.45) 70%, rgba(30,10,90,.12) 100%)",
    k: 1,
  },
  {
    left: 34,
    size: "clamp(5.5rem, 13vw, 11.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.36), rgba(37,64,208,.62) 38%, rgba(28,53,198,.4) 70%, rgba(10,20,80,.1) 100%)",
    k: 2,
  },
  {
    left: 46,
    size: "clamp(5.5rem, 13vw, 11.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.36), rgba(58,127,208,.6) 38%, rgba(34,201,232,.38) 72%, rgba(8,40,70,.1) 100%)",
    k: 3,
  },
  {
    left: 58,
    size: "clamp(5rem, 12vw, 10.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.34), rgba(34,201,232,.55) 38%, rgba(74,184,221,.34) 72%, rgba(8,40,60,.08) 100%)",
    k: 4,
  },
  {
    left: 70,
    size: "clamp(4.5rem, 11vw, 9.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.3), rgba(112,224,240,.45) 40%, rgba(168,240,251,.24) 74%, rgba(10,40,60,.06) 100%)",
    k: 5,
  },
  {
    left: 78,
    size: "clamp(2.75rem, 6vw, 5rem)",
    pearl: true,
    swing: "r",
  },
];

const INNER = ORBS.filter((o) => o.k !== undefined).length;

export function Cradle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`cradle ${className}`}
      aria-hidden="true"
      style={{ "--cradle-T": `${T}s` } as React.CSSProperties}
    >
      {ORBS.map((o) => (
        <div
          key={o.left}
          className={`pendulum${o.swing === "l" ? " swing-l" : ""}${
            o.swing === "r" ? " swing-r" : ""
          }`}
          style={{ left: `${o.left}%`, width: o.size, marginLeft: `calc(${o.size} / -2)` }}
        >
          {/* wire shortened by the sphere's own radius: centres stay level,
              so every pendulum keeps the same length and period */}
          <div
            className="pendulum-wire"
            style={{ height: `calc(var(--cradle-drop) - ${o.size} / 2)` }}
          />
          <div
            className={`orb${o.pearl ? " orb-pearl" : ""}`}
            style={{
              width: o.size,
              height: o.size,
              background: o.pearl ? undefined : o.fill,
            }}
          >
            {o.k !== undefined && (
              <>
                {/* pulse crossing left → right, just after the first impact */}
                <span
                  className="orb-pulse"
                  style={{ animationDelay: `${(T * 0.25 + o.k * STEP).toFixed(3)}s` }}
                />
                {/* and right → left after the return impact */}
                <span
                  className="orb-pulse"
                  style={{
                    animationDelay: `${(T * 0.75 + (INNER + 1 - o.k) * STEP).toFixed(3)}s`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}

      {/* contact flares, at the two points where the weights actually meet */}
      <div
        className="impact"
        style={{ left: "15.5%", top: "var(--cradle-drop)", animationDelay: `${T * 0.25}s` }}
      />
      <div
        className="impact"
        style={{ left: "74%", top: "var(--cradle-drop)", animationDelay: `${T * 0.75}s` }}
      />

      <div className="cradle-scrim" />

      {/* Encounter — two trajectories crossing, lit on each impact */}
      <div
        className="beam"
        style={{ left: "2%", right: "36%", top: "46%", transform: "rotate(-13deg)", animationDelay: `${T * 0.25}s` }}
      />
      <div
        className="beam"
        style={{ left: "10%", right: "62%", top: "30%", transform: "rotate(74deg)", animationDelay: `${T * 0.75}s` }}
      />
    </div>
  );
}
