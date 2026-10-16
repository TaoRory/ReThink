/**
 * The timeline's spine: a gash cut across the page, blood welling in it and
 * running down in streaks. The stops' text sits on top of it.
 *
 * Static SVG. When the section arrives (data-reveal → .revealed) the cut is
 * drawn left → right, and each streak starts running down the moment the cut
 * reaches its x (--x × the cut's duration). A few drops then keep sliding off
 * the streaks (transform + opacity only, see halloween.css).
 */

const W = 1200;
const Y = 34; // the cut's centre line

/** [x, length, width] — the four big ones sit under the four timeline stops */
const STREAKS: [number, number, number][] = [
  [150, 170, 9],
  [450, 118, 8],
  [750, 196, 10],
  [1050, 142, 8],
  [62, 74, 5],
  [226, 64, 4],
  [300, 96, 5],
  [560, 82, 4],
  [648, 128, 5],
  [902, 104, 5],
  [1000, 66, 4],
  [1132, 86, 5],
];
/** drops that keep leaving the long streaks: [x, streak length, seconds, delay] */
const DROPS: [number, number, number, number][] = [
  [150, 170, 7.5, 2.7],
  [450, 118, 9, 3.2],
  [750, 196, 8, 3.6],
  [1050, 142, 10, 4.1],
];

function streak([x, len, w]: [number, number, number]) {
  const h = w / 2;
  // a neck that widens where it leaves the cut, a straight run, a rounded end
  return (
    `M${x - w * 1.8},${Y + 7} C${x - w * 0.6},${Y + 10} ${x - h * 1.05},${Y + 18} ${x - h},${Y + 30} ` +
    `L${x - h},${len} A${h},${h} 0 0 0 ${x + h},${len} L${x + h},${Y + 30} ` +
    `C${x + h * 1.05},${Y + 18} ${x + w * 0.6},${Y + 10} ${x + w * 1.8},${Y + 7} Z`
  );
}

const TOP =
  `M20,${Y + 2} C120,${Y - 12} 200,${Y - 4} 300,${Y - 8} S480,${Y} 600,${Y - 6} S800,${Y - 12} 900,${Y - 4} S1100,${Y - 10} 1180,${Y}`;
const BOTTOM =
  `C1100,${Y + 10} 1000,${Y + 6} 900,${Y + 12} S700,${Y + 6} 600,${Y + 12} S400,${Y + 8} 300,${Y + 10} S120,${Y + 14} 20,${Y + 2} Z`;

export function Wound({ className = "", uid }: { className?: string; uid: string }) {
  const clip = `hlw-wound-clip-${uid}`; // one per <svg>: a clipPath inside a display:none svg does not resolve
  return (
    <svg
      className={`hlw-wound ${className}`}
      viewBox={`0 0 ${W} 240`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* the blade: this rect grows left → right and uncovers the cut */}
      <defs>
        <clipPath id={clip}>
          <rect className="hlw-wound-blade" x="0" y="-40" width={W} height="120" />
        </clipPath>
      </defs>

      {/* the cut: swollen skin around it, a dark opening, a wet lower lip */}
      <g clipPath={`url(#${clip})`}>
        <path d={`${TOP} ${BOTTOM}`} fill="none" stroke="rgba(122,42,46,0.35)" strokeWidth="16" strokeLinejoin="round" />
        <path d={`${TOP} ${BOTTOM}`} fill="#140404" stroke="#7a2a2e" strokeWidth="2.5" strokeLinejoin="round" />
        <path
          d={`M60,${Y + 9} C200,${Y + 14} 340,${Y + 8} 600,${Y + 11} S980,${Y + 8} 1140,${Y + 5}`}
          fill="none"
          stroke="#8f2d34"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* the streaks running down from it */}
      {STREAKS.map((s, i) => (
        <g key={i} className="hlw-wound-streak" style={{ ["--x" as string]: (s[0] / W).toFixed(3) }}>
          <path d={streak(s)} fill="#7a1f26" />
          <path d={streak(s)} fill="none" stroke="#4d1015" strokeWidth="1.2" />
          <line
            x1={s[0] - s[2] * 0.18}
            y1={Y + 22}
            x2={s[0] - s[2] * 0.18}
            y2={s[1] - s[2]}
            stroke="rgba(255,170,170,0.28)"
            strokeWidth={Math.max(1, s[2] * 0.18)}
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* drops that leave the long streaks and fall */}
      {DROPS.map(([x, len, dur, delay], i) => (
        <ellipse
          key={i}
          className="hlw-wound-drop"
          cx={x}
          cy={len + 10}
          rx="4"
          ry="5.5"
          fill="#8c2229"
          style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}
        />
      ))}
    </svg>
  );
}
