/**
 * Newton's cradle from the AY 26-27 KV, read as a small solar system.
 *
 * Seven equal weights hang tangent to one another and the row is centred, so
 * the handoff is legible: the first weight swings out, falls back and strikes
 * the second, the momentum crosses the row untouched, and the last weight
 * alone flies out the far side. Then it returns and the whole thing reverses.
 *
 * Physics kept honest:
 *  - only ONE weight is ever in motion; the five between never move
 *  - the ends alternate — they are never out at the same time
 *  - easeInSine falling / easeOutSine climbing, so speed peaks at the bottom
 *    of the arc and reaches exactly zero at the apex (the concept's Pause)
 *  - equal diameters and equal wires mean equal pendulum lengths, hence one
 *    shared period — the precondition for the handoff to land on time
 *
 * Pure CSS. Parent section needs `relative overflow-hidden`.
 */

/** full cycle: fall → strike → out → pause → back → strike → out */
const T = 3.6;
/** time the compression pulse takes to cross one weight */
const STEP = 0.05;
/** weight diameter; also the centre-to-centre spacing, so they sit tangent */
const D = "clamp(3rem, 11.5vw, 11rem)";

const COUNT = 7;
const MID = (COUNT - 1) / 2;

/** the spectrum the KV runs across the row, fuchsia → cyan */
const FILLS = [
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.72), rgba(232,92,245,.9) 30%, rgba(178,36,204,.6) 66%, rgba(70,10,90,.2) 100%)",
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.6), rgba(196,86,255,.82) 32%, rgba(122,21,240,.55) 68%, rgba(45,10,110,.18) 100%)",
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.55), rgba(154,77,255,.78) 34%, rgba(90,15,208,.5) 70%, rgba(28,12,100,.16) 100%)",
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.5), rgba(58,110,220,.75) 34%, rgba(37,64,208,.5) 70%, rgba(10,24,90,.14) 100%)",
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.5), rgba(58,127,208,.72) 36%, rgba(34,150,225,.46) 72%, rgba(8,36,80,.12) 100%)",
  "radial-gradient(circle at 34% 28%, rgba(255,255,255,.48), rgba(34,201,232,.68) 36%, rgba(74,184,221,.42) 72%, rgba(8,44,66,.1) 100%)",
  "", // the last weight is the lit pearl
];

export function Cradle({ className = "" }: { className?: string }) {
  return (
    <div
      className={`cradle ${className}`}
      aria-hidden="true"
      style={{ "--cradle-T": `${T}s`, "--orb-d": D } as React.CSSProperties}
    >
      {FILLS.map((fill, i) => {
        const isFirst = i === 0;
        const isLast = i === COUNT - 1;
        const inner = !isFirst && !isLast;
        return (
          <div
            key={i}
            className={`pendulum${isFirst ? " swing-l" : ""}${isLast ? " swing-r" : ""}`}
            style={{
              // tangent row, centred on the hero
              left: "50%",
              width: D,
              marginLeft: `calc(${D} * ${i - MID} - ${D} / 2)`,
            }}
          >
            <div className="pendulum-wire" />
            <div
              className={`orb${isLast ? " orb-pearl" : ""}`}
              style={{ "--orb-fill": fill } as React.CSSProperties}
            >
              {/* slow gas-giant swirl */}
              {!isLast && <span className="orb-swirl" />}
              {inner && (
                <>
                  {/* pulse crossing left → right after the first strike */}
                  <span
                    className="orb-pulse"
                    style={{ animationDelay: `${(T * 0.25 + i * STEP).toFixed(3)}s` }}
                  />
                  {/* and right → left after the return strike */}
                  <span
                    className="orb-pulse"
                    style={{
                      animationDelay: `${(T * 0.75 + (COUNT - 1 - i) * STEP).toFixed(3)}s`,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* contact flares, at the two points where weights actually meet */}
      <div
        className="impact"
        style={{
          left: "50%",
          marginLeft: `calc(${D} * -2.5)`,
          top: "var(--cradle-drop)",
          animationDelay: `${T * 0.25}s`,
        }}
      />
      <div
        className="impact"
        style={{
          left: "50%",
          marginLeft: `calc(${D} * 2.5)`,
          top: "var(--cradle-drop)",
          animationDelay: `${T * 0.75}s`,
        }}
      />

      <div className="cradle-scrim" />
    </div>
  );
}
