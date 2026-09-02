/**
 * Newton's cradle from the AY 26-27 KV.
 *
 * Reads left → right as the concept does: weights holding their default orbit,
 * their arcs crossing (Encounter), and the lifted pearl at the far right paused
 * at the top of its swing (Pause) before it chooses a direction.
 *
 * Pure CSS — the two end weights swing, the inner ones stay on their line.
 * Parent section needs `relative overflow-hidden`.
 */

type Orb = {
  /** horizontal position, % of the container */
  left: number;
  /** wire length, % of the container height */
  wire: number;
  /** orb diameter, css length */
  size: string;
  fill: string;
  swing?: "l" | "r";
  pearl?: boolean;
  delay?: string;
};

const ORBS: Orb[] = [
  {
    left: 9,
    wire: 11,
    size: "clamp(7rem, 17vw, 15rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.55), rgba(232,92,245,.85) 34%, rgba(178,36,204,.55) 68%, rgba(90,15,110,.15) 100%)",
    swing: "l",
  },
  {
    left: 22,
    wire: 13,
    size: "clamp(6rem, 14vw, 12.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.4), rgba(154,77,255,.7) 36%, rgba(90,15,208,.45) 70%, rgba(30,10,90,.12) 100%)",
    delay: "0.4s",
  },
  {
    left: 34,
    wire: 14,
    size: "clamp(5.5rem, 13vw, 11.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.36), rgba(37,64,208,.62) 38%, rgba(28,53,198,.4) 70%, rgba(10,20,80,.1) 100%)",
    delay: "0.8s",
  },
  {
    left: 46,
    wire: 15,
    size: "clamp(5.5rem, 13vw, 11.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.36), rgba(58,127,208,.6) 38%, rgba(34,201,232,.38) 72%, rgba(8,40,70,.1) 100%)",
    delay: "1.2s",
  },
  {
    left: 58,
    wire: 16,
    size: "clamp(5rem, 12vw, 10.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.34), rgba(34,201,232,.55) 38%, rgba(74,184,221,.34) 72%, rgba(8,40,60,.08) 100%)",
    delay: "1.6s",
  },
  {
    left: 70,
    wire: 17,
    size: "clamp(4.5rem, 11vw, 9.5rem)",
    fill: "radial-gradient(circle at 36% 30%, rgba(255,255,255,.3), rgba(112,224,240,.45) 40%, rgba(168,240,251,.24) 74%, rgba(10,40,60,.06) 100%)",
    delay: "2s",
  },
  {
    left: 88,
    wire: 9,
    size: "clamp(2.75rem, 6vw, 5rem)",
    fill: "",
    pearl: true,
    swing: "r",
  },
];

export function Cradle({ className = "" }: { className?: string }) {
  return (
    <div className={`cradle ${className}`} aria-hidden="true">
      {ORBS.map((o) => (
        <div
          key={o.left}
          className={`pendulum ${o.swing === "l" ? "swing-l" : ""}${
            o.swing === "r" ? "swing-r" : ""
          }`}
          style={{
            left: `${o.left}%`,
            width: o.size,
            marginLeft: `calc(${o.size} / -2)`,
            animationDelay: o.delay,
          }}
        >
          <div className="pendulum-wire" style={{ height: `${o.wire}vh` }} />
          <div
            className={`orb ${o.pearl ? "orb-pearl" : ""}`}
            style={{
              width: o.size,
              height: o.size,
              background: o.pearl ? undefined : o.fill,
            }}
          />
        </div>
      ))}

      <div className="cradle-scrim" />

      {/* Encounter — two trajectories crossing over the cradle */}
      <div
        className="beam"
        style={{ left: "2%", right: "36%", top: "46%", transform: "rotate(-13deg)" }}
      />
      <div
        className="beam"
        style={{ left: "10%", right: "62%", top: "30%", transform: "rotate(74deg)" }}
      />
    </div>
  );
}
