/**
 * Scenery for the Halloween event page.
 *
 * Every shape is drawn from scratch out of plain geometry — nothing traced or
 * copied. The mood is point-and-click: a lit house across the water, a wall of
 * portraits, things that move when you are not looking straight at them.
 *
 * Motion lives in halloween.css and is transform/opacity only. All of it is
 * `aria-hidden`: atmosphere, never information.
 */

/* ------------------------------------------------------------------ */
/* creatures                                                           */
/* ------------------------------------------------------------------ */

export function Bat({
  className = "",
  top = "20%",
  size = 34,
}: {
  className?: string;
  top?: string;
  size?: number;
}) {
  return (
    <span className={`hlw-bat ${className}`} style={{ top }} aria-hidden="true">
      <svg width={size} height={size * 0.58} viewBox="0 0 100 58" fill="currentColor">
        <ellipse cx="50" cy="30" rx="7" ry="11" />
        <path d="M45 20 L43 11 L48 18 Z M55 20 L57 11 L52 18 Z" />
        <g className="hlw-wing">
          <path d="M44 26 C32 14, 16 16, 4 8 C10 24, 6 32, 2 40 C14 36, 30 40, 44 34 Z" />
          <path d="M56 26 C68 14, 84 16, 96 8 C90 24, 94 32, 98 40 C86 36, 70 40, 56 34 Z" />
        </g>
      </svg>
    </span>
  );
}

export function Ghost({
  className = "",
  size = 76,
  tint = "blue",
}: {
  className?: string;
  size?: number;
  tint?: "blue" | "pink";
}) {
  const body =
    tint === "pink" ? "rgba(243, 188, 210, 0.18)" : "rgba(207, 232, 242, 0.16)";
  const edge =
    tint === "pink" ? "rgba(243, 188, 210, 0.6)" : "rgba(207, 232, 242, 0.5)";
  return (
    <span className={`hlw-ghost inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
        <g className="hlw-ghost-tail">
          <path
            d="M40 6 C20 6, 10 22, 10 42 L10 88 C10 94, 16 94, 19 89 L24 81 C26 77, 31 77, 33 81
               L37 88 C39 92, 44 92, 46 88 L50 81 C52 77, 57 77, 59 81 L64 89 C67 94, 70 94, 70 88
               L70 42 C70 22, 60 6, 40 6 Z"
            fill={body}
            stroke={edge}
            strokeWidth="1.2"
          />
        </g>
        <g className="hlw-eyes" fill="rgba(243, 188, 210, 0.95)">
          <ellipse cx="30" cy="40" rx="4.5" ry="6" />
          <ellipse cx="50" cy="40" rx="4.5" ry="6" />
        </g>
        <path
          d="M34 56 Q40 62, 46 56"
          fill="none"
          stroke="rgba(243, 188, 210, 0.7)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A crow perched on something, watching. */
export function Crow({ className = "", size = 46 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 60 60">
        <path
          d="M30 10 C20 10, 14 18, 14 28 C14 38, 18 44, 22 50 L38 50 C42 44, 46 38, 46 28
             C46 18, 40 10, 30 10 Z"
          fill="var(--hlw-ink)"
        />
        <path d="M44 20 C52 24, 56 32, 52 42 C48 36, 44 32, 40 30 Z" fill="var(--hlw-ink)" />
        <path d="M18 22 L4 26 L18 29 Z" fill="var(--hlw-paper-2)" />
        <circle className="hlw-eyes hlw-eyes-b" cx="21" cy="21" r="2.6" fill="var(--hlw-pink)" />
        <path d="M24 50 L24 56 M36 50 L36 56" stroke="var(--hlw-paper-2)" strokeWidth="1.6" />
      </svg>
    </span>
  );
}

export function Spider({ size = 28 }: { size?: number }) {
  return (
    <span className="hlw-spider" aria-hidden="true">
      <svg width={size} height={size * 3.4} viewBox="0 0 28 95">
        <line x1="14" y1="0" x2="14" y2="62" stroke="rgba(243, 188, 210, 0.4)" strokeWidth="1" />
        <g className="hlw-spider-body" stroke="var(--hlw-pink-soft)" strokeWidth="1.4" fill="none">
          <path d="M14 70 C6 66, 3 72, 1 78 M14 70 C6 74, 4 80, 3 87" />
          <path d="M14 70 C22 66, 25 72, 27 78 M14 70 C22 74, 24 80, 25 87" />
          <ellipse cx="14" cy="70" rx="6.5" ry="8" fill="rgba(8, 15, 22, 0.95)" />
          <circle cx="11.5" cy="65" r="1.1" fill="var(--hlw-pink)" stroke="none" />
          <circle cx="16.5" cy="65" r="1.1" fill="var(--hlw-pink)" stroke="none" />
        </g>
      </svg>
    </span>
  );
}

/** A corner cobweb. Mirror it with CSS for the opposite corner. */
export function Web({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <span className={className} aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" stroke="currentColor">
        <g strokeWidth="0.9">
          {/* radials out of the corner */}
          <path d="M0 0 L120 24 M0 0 L104 54 M0 0 L80 84 M0 0 L48 108 M0 0 L22 120" />
          {/* the spiral strands */}
          <path d="M26 6 C22 16, 14 22, 6 26" />
          <path d="M50 11 C44 30, 30 44, 11 50" />
          <path d="M76 17 C66 46, 46 66, 17 76" />
          <path d="M102 23 C88 62, 62 88, 23 102" />
        </g>
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* props                                                               */
/* ------------------------------------------------------------------ */

export function Candle({
  className = "",
  size = 54,
  flame = "",
}: {
  className?: string;
  size?: number;
  flame?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 1.7} viewBox="0 0 54 92">
        <g className={`hlw-flame ${flame}`}>
          <ellipse cx="27" cy="18" rx="7" ry="13" fill="rgba(243, 188, 210, 0.8)" />
          <ellipse cx="27" cy="21" rx="3.4" ry="7.5" fill="rgba(255, 255, 255, 0.92)" />
        </g>
        <rect x="26" y="30" width="2" height="7" fill="rgba(58, 35, 66, 0.9)" />
        <rect x="14" y="36" width="26" height="46" rx="2" fill="var(--hlw-paper)" opacity="0.88" />
        <path d="M14 36 h26 v6 c-6 3, -20 3, -26 0 Z" fill="var(--hlw-paper-2)" opacity="0.9" />
        {/* wax running down the side */}
        <path d="M17 42 c0 8, 3 10, 3 18 c0 3, -3 3, -3 0 Z" fill="var(--hlw-paper-2)" opacity="0.7" />
        <rect x="9" y="82" width="36" height="5" rx="2" fill="rgba(58, 35, 66, 0.85)" />
      </svg>
    </span>
  );
}

export function Lantern({
  className = "",
  size = 44,
  sway = "",
}: {
  className?: string;
  size?: number;
  sway?: string;
}) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 2.2} viewBox="0 0 44 97">
        <line x1="22" y1="0" x2="22" y2="16" stroke="rgba(243, 188, 210, 0.4)" strokeWidth="1.2" />
        <g className={`hlw-sway ${sway}`} style={{ transformOrigin: "22px 16px" }}>
          <path d="M14 20 Q22 10, 30 20" fill="none" stroke="var(--hlw-paper-2)" strokeWidth="1.6" />
          <rect x="9" y="20" width="26" height="5" rx="1.5" fill="var(--hlw-paper-2)" />
          <path
            d="M11 25 L33 25 L30 62 L14 62 Z"
            fill="rgba(243, 188, 210, 0.2)"
            stroke="var(--hlw-paper-2)"
            strokeWidth="1.4"
          />
          <ellipse className="hlw-flame hlw-flame-b" cx="22" cy="48" rx="4" ry="8" fill="rgba(251, 224, 234, 0.95)" />
          <rect x="12" y="62" width="20" height="4" rx="1.5" fill="var(--hlw-paper-2)" />
        </g>
      </svg>
    </span>
  );
}

/** A wall sconce: a candle on a bracket, for between the portraits. */
export function Sconce({ className = "", flame = "" }: { className?: string; flame?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width="40" height="92" viewBox="0 0 40 92">
        <g className={`hlw-flame ${flame}`} style={{ transformOrigin: "20px 30px" }}>
          <ellipse cx="20" cy="18" rx="5.5" ry="11" fill="rgba(243, 188, 210, 0.75)" />
          <ellipse cx="20" cy="21" rx="2.6" ry="6" fill="#fff" opacity="0.9" />
        </g>
        <rect x="16" y="30" width="8" height="26" rx="2" fill="var(--hlw-paper)" opacity="0.85" />
        <path d="M10 58 L30 58 L26 66 L14 66 Z" fill="var(--hlw-paper-2)" opacity="0.85" />
        <path d="M20 66 L20 86 M20 86 C12 86, 8 80, 8 74 M20 86 C28 86, 32 80, 32 74"
          stroke="var(--hlw-paper-2)" strokeWidth="1.6" fill="none" opacity="0.7" />
      </svg>
    </span>
  );
}

/** A melting wax column — the spine of the running order. */
export function WaxSpine({ className = "" }: { className?: string }) {
  return (
    <span className={`block ${className}`} aria-hidden="true">
      <svg width="46" height="100%" viewBox="0 0 46 600" preserveAspectRatio="none">
        <path
          d="M15 0 L31 0 L31 560 C31 575, 27 586, 23 586 C19 586, 15 575, 15 560 Z"
          fill="rgba(243, 188, 210, 0.16)"
          stroke="rgba(243, 188, 210, 0.42)"
          strokeWidth="1"
        />
        {/* drips frozen on the side */}
        <path d="M15 120 c-5 0, -6 26, -2 34 c3 6, 7 2, 7 -6 Z" fill="rgba(243, 188, 210, 0.28)" />
        <path d="M31 240 c5 0, 7 32, 3 42 c-3 7, -8 2, -8 -8 Z" fill="rgba(243, 188, 210, 0.24)" />
        <path d="M15 400 c-6 0, -7 22, -3 30 c3 6, 8 1, 8 -8 Z" fill="rgba(243, 188, 210, 0.26)" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* the hero scene                                                      */
/* ------------------------------------------------------------------ */

/** The house on the far shore — lit windows, crooked chimney. */
function House({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 220" aria-hidden="true">
      {/* body */}
      <path d="M40 210 L40 96 L130 36 L220 96 L220 210 Z" fill="#04090e" />
      {/* roof */}
      <path d="M28 102 L130 28 L232 102 L220 112 L130 46 L40 112 Z" fill="#0a131b" />
      {/* tower */}
      <path d="M150 210 L150 70 L186 44 L222 70 L222 210 Z" fill="#060c12" />
      <path d="M142 76 L186 36 L230 76 L222 84 L186 52 L150 84 Z" fill="#0a131b" />
      {/* chimney, leaning */}
      <path d="M70 92 L70 56 L86 52 L86 86 Z" fill="#0a131b" />
      {/* porch */}
      <path d="M86 210 L86 158 L126 158 L126 210 Z" fill="#03070b" />
      <path d="M78 160 L134 160 L130 150 L82 150 Z" fill="#0a131b" />
      {/* lit windows — the pink inside */}
      <g>
        <rect className="hlw-window" x="58" y="118" width="20" height="26" rx="1.5" fill="var(--hlw-pink)" opacity="1" />
        <rect className="hlw-window hlw-window-b" x="96" y="112" width="22" height="28" rx="1.5" fill="var(--hlw-pink-soft)" opacity="1" />
        <rect className="hlw-window hlw-window-c" x="168" y="96" width="18" height="24" rx="1.5" fill="var(--hlw-pink)" opacity="0.95" />
        <rect className="hlw-window hlw-window-b" x="192" y="132" width="16" height="22" rx="1.5" fill="var(--hlw-pink-soft)" opacity="0.85" />
        {/* the open door, spilling light */}
        <path className="hlw-window" d="M98 210 L98 168 Q106 160, 114 168 L114 210 Z" fill="var(--hlw-pink-soft)" opacity="0.9" />
      </g>
      {/* window bars */}
      <g stroke="#04090e" strokeWidth="1.6">
        <path d="M68 118 L68 144 M58 131 L78 131" />
        <path d="M107 112 L107 140 M96 126 L118 126" />
        <path d="M177 96 L177 120 M168 108 L186 108" />
      </g>
    </svg>
  );
}

/** A bare tree. `flip` mirrors it for the other side of the frame. */
function DeadTree({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 300"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke="#04090e" fill="none" strokeLinecap="round">
        <path d="M96 300 L100 180 L104 300 Z" fill="#04090e" stroke="none" />
        <path d="M100 196 C78 176, 62 170, 40 150" strokeWidth="7" />
        <path d="M100 176 C120 158, 136 152, 158 136" strokeWidth="6" />
        <path d="M100 160 C86 140, 74 130, 58 110" strokeWidth="5" />
        <path d="M100 146 C116 128, 130 118, 144 96" strokeWidth="4.5" />
        <path d="M100 132 C94 112, 92 98, 88 76" strokeWidth="4" />
        <path d="M40 150 C28 142, 20 132, 14 118" strokeWidth="3" />
        <path d="M158 136 C170 128, 178 118, 184 104" strokeWidth="3" />
        <path d="M58 110 C48 100, 42 92, 38 80" strokeWidth="2.4" />
        <path d="M144 96 C154 86, 158 76, 160 64" strokeWidth="2.4" />
        <path d="M88 76 C84 64, 80 56, 72 46" strokeWidth="2.2" />
      </g>
    </svg>
  );
}


/** Cattails along the shoreline. */
function Reeds({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 180"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke="#04090e" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M20 180 C22 130, 18 104, 24 72" />
        <path d="M52 180 C50 136, 56 110, 50 84" />
        <path d="M84 180 C88 140, 82 118, 90 96" />
        <path d="M116 180 C112 142, 118 122, 112 100" />
        <path d="M150 180 C154 146, 148 128, 156 112" />
        <path d="M186 180 C182 150, 188 136, 182 120" />
      </g>
      <g fill="#04090e">
        <rect x="18" y="52" width="9" height="26" rx="4.5" />
        <rect x="45" y="64" width="9" height="24" rx="4.5" />
        <rect x="86" y="78" width="8" height="22" rx="4" />
        <rect x="107" y="82" width="8" height="22" rx="4" />
        <rect x="152" y="96" width="7" height="19" rx="3.5" />
      </g>
    </svg>
  );
}

/** A jetty running out into the water, with a lamp on the end post. */
function Jetty({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 220" aria-hidden="true">
      {/* decking, in perspective */}
      <path d="M0 150 L300 108 L300 128 L0 186 Z" fill="#04090e" />
      <g stroke="#0a131b" strokeWidth="2">
        <path d="M40 174 L44 139 M100 163 L102 131 M160 152 L160 123 M220 141 L218 116 M274 132 L270 111" />
      </g>
      {/* posts */}
      <rect x="286" y="96" width="10" height="92" fill="#04090e" />
      <rect x="150" y="124" width="9" height="88" fill="#04090e" />
      <rect x="22" y="150" width="11" height="70" fill="#04090e" />
      {/* the lamp on the end post */}
      <g>
        <path d="M278 96 L302 96 L298 72 L282 72 Z" fill="rgba(243,188,210,0.3)" stroke="#0a131b" strokeWidth="1.6" />
        <ellipse className="hlw-flame hlw-flame-c" cx="290" cy="86" rx="4" ry="8" fill="#fbe0ea" />
        <path d="M282 72 L298 72 L296 66 L284 66 Z" fill="#0a131b" />
      </g>
    </svg>
  );
}

/** Candles set adrift, each with a smear of itself on the water. */
function FloatingCandles({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 400 90" className="w-full">
        {[
          { x: 40, s: 1, f: "" },
          { x: 150, s: 0.78, f: "hlw-flame-b" },
          { x: 250, s: 1.1, f: "hlw-flame-c" },
          { x: 340, s: 0.66, f: "hlw-flame-b" },
        ].map((c) => (
          <g key={c.x} transform={`translate(${c.x} 40) scale(${c.s})`}>
            <ellipse className={`hlw-flame ${c.f}`} cx="0" cy="-10" rx="3.4" ry="7" fill="#fbe0ea" />
            <rect x="-5" y="-3" width="10" height="12" rx="1.5" fill="var(--hlw-paper)" opacity="0.8" />
            <ellipse cx="0" cy="10" rx="11" ry="2.6" fill="rgba(243,188,210,0.3)" />
            {/* the light it throws on the surface */}
            <rect className="hlw-ripple" x="-16" y="18" width="32" height="2" rx="1" fill="var(--hlw-pink)" opacity="0.4" />
            <rect className="hlw-ripple hlw-ripple-2" x="-11" y="26" width="22" height="1.6" rx="0.8" fill="var(--hlw-pink)" opacity="0.26" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/** A far-off flock, no bigger than pen strokes. */
function Flock({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 90" aria-hidden="true" fill="none"
      stroke="rgba(4,9,14,0.75)" strokeWidth="2" strokeLinecap="round">
      <path d="M10 30 q7 -7 14 0 M30 44 q6 -6 12 0 M56 22 q8 -8 16 0 M80 50 q5 -5 10 0
               M104 34 q7 -7 14 0 M134 18 q6 -6 12 0 M158 46 q7 -7 14 0 M190 28 q5 -5 10 0
               M214 52 q8 -8 16 0 M246 36 q6 -6 12 0 M274 20 q7 -7 14 0" />
    </svg>
  );
}

/**
 * The hero is composed as two bands rather than one soup: `LakeSky` paints
 * behind everything, and `LakeShore` is an IN-FLOW strip under the copy. The
 * copy therefore cannot land on the waterline, whatever the viewport does —
 * which is exactly what went wrong when the scene covered the whole hero.
 */
export function LakeSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hlw-aurora top-[4%]" />

      <div className="absolute left-[76%] top-[8%] -translate-x-1/2 sm:top-[14%]">
        <div className="hlw-moon-glow absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,188,210,0.42),rgba(207,232,242,0.16)_55%,transparent_72%)] sm:h-72 sm:w-72" />
        <div className="relative h-16 w-16 rounded-full bg-[radial-gradient(circle_at_36%_32%,#fff,#fbe0ea_46%,#e4a9c2_100%)] opacity-95 sm:h-24 sm:w-24">
          <span className="absolute left-[26%] top-[32%] h-2 w-2 rounded-full bg-[rgba(184,115,143,0.35)] sm:h-3 sm:w-3" />
          <span className="absolute left-[56%] top-[54%] h-2.5 w-2.5 rounded-full bg-[rgba(184,115,143,0.3)] sm:h-4 sm:w-4" />
          <span className="absolute left-[40%] top-[70%] h-1.5 w-1.5 rounded-full bg-[rgba(184,115,143,0.32)] sm:h-2 sm:w-2" />
        </div>
      </div>

      <Flock className="absolute left-[8%] top-[26%] w-36 opacity-60 sm:w-56" />
      <div className="hlw-fog absolute top-[34%] opacity-70" />
    </div>
  );
}

/** The shoreline strip: horizon, house, water, jetty, reeds, drifting candles. */
export function LakeShore() {
  return (
    <div
      className="relative z-[5] h-[38vh] min-h-[15rem] w-full overflow-hidden"
      aria-hidden="true"
    >
      {/* the horizon burns — without this the shore is black on black */}
      <div className="absolute inset-x-0 top-0 h-40 -translate-y-1/2 bg-[radial-gradient(58%_100%_at_52%_50%,rgba(243,188,210,0.5),rgba(159,208,227,0.2)_52%,transparent_80%)]" />

      {/* far shore */}
      <svg
        className="absolute inset-x-0 top-0 h-12 w-full sm:h-16"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0 54 L70 26 L118 52 L168 14 L222 50 L280 20 L332 56 L392 24 L448 58 L510 22
             L572 56 L634 16 L694 54 L760 26 L822 58 L886 20 L950 56 L1012 28 L1074 60
             L1136 22 L1198 54 L1258 26 L1320 58 L1384 30 L1440 54 L1440 90 L0 90 Z"
          fill="#04090e"
        />
      </svg>

      {/* the house, standing on the far bank */}
      <div className="absolute bottom-[50%] right-[9%] w-[130px] sm:w-[210px]">
        <House className="w-full" />
        <div className="hlw-reflection absolute left-0 top-full w-full">
          <House className="w-full" />
        </div>
      </div>

      <DeadTree className="absolute bottom-[42%] left-[-3%] w-[120px] opacity-95 sm:w-[190px]" />
      <DeadTree flip className="absolute bottom-[46%] right-[-4%] w-[90px] opacity-80 sm:w-[140px]" />

      {/* the water */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(to_bottom,rgba(4,9,14,0.86),rgba(4,9,14,0.97))]">
        <span className="absolute inset-x-0 top-0 h-[2px] bg-[color:var(--hlw-pink)] opacity-45" />
        <svg className="h-full w-full" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <g opacity="0.4">
            <rect className="hlw-ripple" x="900" y="26" width="150" height="3" rx="1.5" fill="var(--hlw-pink)" />
            <rect className="hlw-ripple hlw-ripple-2" x="880" y="54" width="200" height="3" rx="1.5" fill="var(--hlw-pink)" opacity="0.7" />
            <rect className="hlw-ripple" x="300" y="40" width="120" height="2.5" rx="1" fill="var(--hlw-blue)" opacity="0.7" />
            <rect className="hlw-ripple hlw-ripple-2" x="250" y="84" width="190" height="2.5" rx="1" fill="var(--hlw-blue)" opacity="0.5" />
            <rect className="hlw-ripple" x="910" y="96" width="120" height="2.5" rx="1" fill="var(--hlw-pink)" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* a rowing boat just off the far bank */}
      <svg
        className="absolute bottom-[44%] left-[36%] w-20 sm:w-28"
        viewBox="0 0 200 80"
      >
        <path d="M24 52 L176 52 L156 70 L44 70 Z" fill="#04090e" />
        <rect x="96" y="18" width="3" height="34" fill="#04090e" />
        <ellipse cx="97" cy="14" rx="9" ry="11" fill="#04090e" />
      </svg>

      {/* foreground — this is what keeps the lower half from being empty water */}
      <FloatingCandles className="absolute bottom-[22%] left-[26%] w-[34%] sm:w-[26%]" />
      <Jetty className="absolute bottom-[-6%] left-[-5%] w-[230px] sm:w-[360px]" />
      <Reeds className="absolute bottom-[-4%] right-[-2%] w-[130px] sm:w-[200px]" />
      <Reeds flip className="absolute bottom-[-5%] left-[30%] w-[90px] opacity-80 sm:w-[130px]" />

      <div className="hlw-fog hlw-fog-low absolute bottom-[12%]" />
      <div className="hlw-fog hlw-fog-blue hlw-fog-low absolute bottom-[-4%] opacity-80" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* the portraits                                                       */
/* ------------------------------------------------------------------ */

export function Portrait({ kind }: { kind: "crow" | "owl" | "deer" | "rabbit" }) {
  return (
    <svg viewBox="0 0 120 140" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`hlw-bg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(243,188,210,0.2)" />
          <stop offset="100%" stopColor="rgba(159,208,227,0.08)" />
        </linearGradient>
      </defs>
      <rect width="120" height="140" fill={`url(#hlw-bg-${kind})`} />

      {/* shoulders and collar, shared by all four sitters */}
      <path d="M18 140 C20 112, 40 100, 60 100 C80 100, 100 112, 102 140 Z" fill="var(--hlw-ink)" opacity="0.94" />
      <path d="M52 101 L60 118 L68 101 L63 99 L60 104 L57 99 Z" fill="var(--hlw-paper)" opacity="0.8" />

      {kind === "crow" && (
        <g fill="var(--hlw-ink)">
          <ellipse cx="60" cy="62" rx="24" ry="27" />
          <path d="M60 64 L96 72 L60 80 Z" fill="var(--hlw-paper-2)" />
          <circle className="hlw-eyes" cx="52" cy="54" r="4.2" fill="var(--hlw-pink)" />
          <path d="M38 40 C44 28, 58 26, 66 32" stroke="var(--hlw-ink)" strokeWidth="5" fill="none" />
        </g>
      )}

      {kind === "owl" && (
        <g>
          <ellipse cx="60" cy="62" rx="28" ry="26" fill="var(--hlw-ink)" />
          <path d="M34 44 L40 30 L50 40 Z M86 44 L80 30 L70 40 Z" fill="var(--hlw-ink)" />
          <g className="hlw-eyes hlw-eyes-b">
            <circle cx="49" cy="60" r="10" fill="var(--hlw-paper)" opacity="0.92" />
            <circle cx="71" cy="60" r="10" fill="var(--hlw-paper)" opacity="0.92" />
            <circle cx="49" cy="60" r="4.5" fill="var(--hlw-ink)" />
            <circle cx="71" cy="60" r="4.5" fill="var(--hlw-ink)" />
          </g>
          <path d="M60 68 L65 76 L55 76 Z" fill="var(--hlw-pink-mid)" />
        </g>
      )}

      {kind === "deer" && (
        <g fill="var(--hlw-ink)">
          <path
            d="M44 42 C40 30, 32 26, 28 14 M44 42 C36 36, 26 38, 20 32 M76 42 C80 30, 88 26, 92 14 M76 42 C84 36, 94 38, 100 32"
            stroke="var(--hlw-paper-2)"
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse cx="60" cy="66" rx="20" ry="26" />
          <ellipse cx="60" cy="84" rx="9" ry="7" fill="var(--hlw-ink-3)" opacity="0.9" />
          <circle className="hlw-eyes" cx="51" cy="58" r="3.6" fill="var(--hlw-pink)" />
          <circle className="hlw-eyes" cx="69" cy="58" r="3.6" fill="var(--hlw-pink)" />
        </g>
      )}

      {kind === "rabbit" && (
        <g fill="var(--hlw-ink)">
          <ellipse cx="47" cy="36" rx="7" ry="22" transform="rotate(-12 47 36)" />
          <ellipse cx="73" cy="36" rx="7" ry="22" transform="rotate(12 73 36)" />
          <ellipse cx="60" cy="68" rx="21" ry="24" />
          <circle className="hlw-eyes hlw-eyes-b" cx="52" cy="62" r="3.8" fill="var(--hlw-pink)" />
          <circle className="hlw-eyes hlw-eyes-b" cx="68" cy="62" r="3.8" fill="var(--hlw-pink)" />
          <path d="M60 76 L64 82 L56 82 Z" fill="var(--hlw-pink-mid)" />
        </g>
      )}
    </svg>
  );
}

/** The arched doorway the page ends on, with light spilling out of it. */
export function Doorway({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 340" aria-hidden="true">
      <path
        d="M30 340 L30 140 C30 70, 76 24, 130 24 C184 24, 230 70, 230 140 L230 340 Z"
        fill="rgba(8,15,22,0.9)"
        stroke="rgba(243,188,210,0.4)"
        strokeWidth="2"
      />
      <path
        className="hlw-window"
        d="M58 340 L58 146 C58 90, 92 54, 130 54 C168 54, 202 90, 202 146 L202 340 Z"
        fill="rgba(243,188,210,0.22)"
      />
      <path
        className="hlw-window hlw-window-b"
        d="M92 340 L92 152 C92 112, 110 90, 130 90 C150 90, 168 112, 168 152 L168 340 Z"
        fill="rgba(251,224,234,0.3)"
      />
      <line x1="130" y1="54" x2="130" y2="340" stroke="rgba(8,15,22,0.8)" strokeWidth="3" />
      <circle cx="118" cy="214" r="4" fill="var(--hlw-paper-2)" />
      <circle cx="142" cy="214" r="4" fill="var(--hlw-paper-2)" />
    </svg>
  );
}
