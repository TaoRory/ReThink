/**
 * Decorative pieces for the Halloween event page.
 *
 * Every shape here is drawn from scratch — plain geometry, no traced or
 * copied artwork. The mood is point-and-click: a still lake, a wall of
 * portraits, a few things that move when you are not looking straight at
 * them. Motion lives in halloween.css and is transform/opacity only.
 *
 * All of it is `aria-hidden`: it carries atmosphere, never information.
 */

/** A bat on a long crossing path. `top` places it in the sky. */
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
        {/* body */}
        <ellipse cx="50" cy="30" rx="7" ry="11" />
        {/* ears */}
        <path d="M45 20 L43 11 L48 18 Z M55 20 L57 11 L52 18 Z" />
        {/* wings — these two beat */}
        <g className="hlw-wing">
          <path d="M44 26 C32 14, 16 16, 4 8 C10 24, 6 32, 2 40 C14 36, 30 40, 44 34 Z" />
          <path d="M56 26 C68 14, 84 16, 96 8 C90 24, 94 32, 98 40 C86 36, 70 40, 56 34 Z" />
        </g>
      </svg>
    </span>
  );
}

/** A small ghost that drifts, with a ragged hem that sways on its own. */
export function Ghost({ className = "", size = 76 }: { className?: string; size?: number }) {
  return (
    <span className={`hlw-ghost inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
        <g className="hlw-ghost-tail">
          <path
            d="M40 6 C20 6, 10 22, 10 42 L10 88 C10 94, 16 94, 19 89 L24 81 C26 77, 31 77, 33 81
               L37 88 C39 92, 44 92, 46 88 L50 81 C52 77, 57 77, 59 81 L64 89 C67 94, 70 94, 70 88
               L70 42 C70 22, 60 6, 40 6 Z"
            fill="rgba(207, 232, 242, 0.16)"
            stroke="rgba(207, 232, 242, 0.5)"
            strokeWidth="1.2"
          />
        </g>
        <g className="hlw-eyes" fill="rgba(240, 182, 204, 0.95)">
          <ellipse cx="30" cy="40" rx="4.5" ry="6" />
          <ellipse cx="50" cy="40" rx="4.5" ry="6" />
        </g>
        <path
          d="M34 56 Q40 62, 46 56"
          fill="none"
          stroke="rgba(240, 182, 204, 0.7)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** A lit candle — the only warm thing on the page. */
export function Candle({ className = "", size = 54 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 1.7} viewBox="0 0 54 92">
        <g className="hlw-flame">
          <ellipse cx="27" cy="18" rx="7" ry="13" fill="rgba(250, 219, 230, 0.75)" />
          <ellipse cx="27" cy="21" rx="3.4" ry="7.5" fill="rgba(255, 255, 255, 0.9)" />
        </g>
        <rect x="26" y="30" width="2" height="7" fill="rgba(55, 36, 63, 0.9)" />
        <rect x="14" y="36" width="26" height="46" rx="2" fill="var(--hlw-paper)" opacity="0.85" />
        <path d="M14 36 h26 v6 c-6 3, -20 3, -26 0 Z" fill="var(--hlw-paper-2)" opacity="0.9" />
        <rect x="9" y="82" width="36" height="5" rx="2" fill="rgba(55, 36, 63, 0.8)" />
      </svg>
    </span>
  );
}

/** A spider dangling from the top of a card; drops when the card is hovered. */
export function Spider({ size = 28 }: { size?: number }) {
  return (
    <span className="hlw-spider" aria-hidden="true">
      <svg width={size} height={size * 3.4} viewBox="0 0 28 95">
        <line x1="14" y1="0" x2="14" y2="62" stroke="rgba(207, 232, 242, 0.35)" strokeWidth="1" />
        <g className="hlw-spider-body" stroke="var(--hlw-blue-soft)" strokeWidth="1.4" fill="none">
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

/** The hero backdrop: moon, far shore, the lake and its reflection. */
export function LakeScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* moon */}
      {/* kept clear of the kicker line, which runs nearly edge to edge on a phone */}
      <div className="absolute left-[74%] top-[6%] -translate-x-1/2 sm:left-[78%] sm:top-[10%]">
        <div className="hlw-moon-glow absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,232,242,0.3),transparent_68%)] sm:h-64 sm:w-64" />
        <div className="relative h-16 w-16 rounded-full sm:h-24 sm:w-24 bg-[radial-gradient(circle_at_36%_32%,#f4f7f8,#cfe8f2_52%,#9fd0e3_100%)] opacity-90">
          <span className="absolute left-[26%] top-[32%] h-3 w-3 rounded-full bg-[rgba(74,127,153,0.35)]" />
          <span className="absolute left-[56%] top-[54%] h-4 w-4 rounded-full bg-[rgba(74,127,153,0.28)]" />
          <span className="absolute left-[40%] top-[70%] h-2 w-2 rounded-full bg-[rgba(74,127,153,0.3)]" />
        </div>
      </div>

      {/* far treeline + the water's edge */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
      >
        <path
          d="M0 232 L62 206 L104 228 L150 186 L198 224 L250 196 L298 230 L352 202 L404 234
             L462 200 L520 230 L578 194 L636 228 L700 204 L760 232 L820 198 L884 230
             L944 206 L1004 234 L1066 200 L1126 228 L1188 196 L1248 230 L1310 204
             L1372 228 L1440 208 L1440 420 L0 420 Z"
          fill="var(--hlw-ink-3)"
          opacity="0.85"
        />
        <path
          d="M0 268 L1440 268 L1440 420 L0 420 Z"
          fill="var(--hlw-ink)"
          opacity="0.72"
        />
        <rect x="0" y="266" width="1440" height="1.5" fill="var(--hlw-blue)" opacity="0.28" />
        {/* the moon's path on the water */}
        <g opacity="0.38">
          <rect className="hlw-ripple" x="660" y="288" width="120" height="3" rx="1.5" fill="var(--hlw-blue)" />
          <rect className="hlw-ripple hlw-ripple-2" x="640" y="308" width="160" height="3" rx="1.5" fill="var(--hlw-blue)" opacity="0.7" />
          <rect className="hlw-ripple" x="672" y="330" width="96" height="2" rx="1" fill="var(--hlw-pink)" opacity="0.6" />
          <rect className="hlw-ripple hlw-ripple-2" x="628" y="352" width="184" height="2" rx="1" fill="var(--hlw-blue)" opacity="0.45" />
        </g>
      </svg>

      {/* a rowing boat, dead centre of the lake, as still as the game's */}
      <svg
        className="absolute bottom-[16%] left-1/2 w-44 -translate-x-1/2"
        viewBox="0 0 200 80"
        aria-hidden="true"
      >
        <path d="M24 52 L176 52 L156 70 L44 70 Z" fill="var(--hlw-ink)" opacity="0.95" />
        <rect x="96" y="18" width="3" height="34" fill="var(--hlw-ink)" />
        <ellipse cx="97" cy="14" rx="9" ry="11" fill="var(--hlw-ink)" />
      </svg>

      <div className="hlw-fog absolute bottom-[18%]" />
      <div className="hlw-fog hlw-fog-2 absolute bottom-[4%]" />
    </div>
  );
}

/**
 * A portrait in a frame: an animal head in formal dress, shoulders up —
 * the convention the genre borrows from Victorian family walls.
 */
export function Portrait({ kind }: { kind: "crow" | "owl" | "deer" | "rabbit" }) {
  return (
    <svg viewBox="0 0 120 140" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`hlw-bg-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(159,208,227,0.14)" />
          <stop offset="100%" stopColor="rgba(240,182,204,0.08)" />
        </linearGradient>
      </defs>
      <rect width="120" height="140" fill={`url(#hlw-bg-${kind})`} />

      {/* shoulders and collar, shared by all four sitters */}
      <path d="M18 140 C20 112, 40 100, 60 100 C80 100, 100 112, 102 140 Z" fill="var(--hlw-ink)" opacity="0.92" />
      <path d="M52 101 L60 118 L68 101 L63 99 L60 104 L57 99 Z" fill="var(--hlw-paper)" opacity="0.75" />

      {kind === "crow" && (
        <g fill="var(--hlw-ink)">
          <ellipse cx="60" cy="62" rx="24" ry="27" />
          <path d="M60 64 L96 72 L60 80 Z" fill="var(--hlw-paper-2)" />
          <circle cx="52" cy="54" r="4.2" fill="var(--hlw-pink)" />
          <path d="M38 40 C44 28, 58 26, 66 32" stroke="var(--hlw-ink)" strokeWidth="5" fill="none" />
        </g>
      )}

      {kind === "owl" && (
        <g>
          <ellipse cx="60" cy="62" rx="28" ry="26" fill="var(--hlw-ink)" />
          <path d="M34 44 L40 30 L50 40 Z M86 44 L80 30 L70 40 Z" fill="var(--hlw-ink)" />
          <g className="hlw-eyes">
            <circle cx="49" cy="60" r="10" fill="var(--hlw-paper)" opacity="0.9" />
            <circle cx="71" cy="60" r="10" fill="var(--hlw-paper)" opacity="0.9" />
            <circle cx="49" cy="60" r="4.5" fill="var(--hlw-ink)" />
            <circle cx="71" cy="60" r="4.5" fill="var(--hlw-ink)" />
          </g>
          <path d="M60 68 L65 76 L55 76 Z" fill="var(--hlw-pink-deep)" />
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
          <circle cx="51" cy="58" r="3.6" fill="var(--hlw-blue)" />
          <circle cx="69" cy="58" r="3.6" fill="var(--hlw-blue)" />
        </g>
      )}

      {kind === "rabbit" && (
        <g fill="var(--hlw-ink)">
          <ellipse cx="47" cy="36" rx="7" ry="22" transform="rotate(-12 47 36)" />
          <ellipse cx="73" cy="36" rx="7" ry="22" transform="rotate(12 73 36)" />
          <ellipse cx="60" cy="68" rx="21" ry="24" />
          <circle cx="52" cy="62" r="3.8" fill="var(--hlw-pink)" />
          <circle cx="68" cy="62" r="3.8" fill="var(--hlw-pink)" />
          <path d="M60 76 L64 82 L56 82 Z" fill="var(--hlw-pink-deep)" />
        </g>
      )}
    </svg>
  );
}

/** A lantern hanging from a hook, swinging very slightly. */
export function Lantern({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      <svg width={size} height={size * 2.2} viewBox="0 0 44 97">
        <line x1="22" y1="0" x2="22" y2="16" stroke="rgba(207,232,242,0.35)" strokeWidth="1.2" />
        <g className="hlw-sway" style={{ transformOrigin: "22px 16px" }}>
          <path d="M14 20 Q22 10, 30 20" fill="none" stroke="var(--hlw-paper-2)" strokeWidth="1.6" />
          <rect x="9" y="20" width="26" height="5" rx="1.5" fill="var(--hlw-paper-2)" />
          <path d="M11 25 L33 25 L30 62 L14 62 Z" fill="rgba(240,182,204,0.14)" stroke="var(--hlw-paper-2)" strokeWidth="1.4" />
          <ellipse className="hlw-flame" cx="22" cy="48" rx="4" ry="8" fill="rgba(250,219,230,0.9)" />
          <rect x="12" y="62" width="20" height="4" rx="1.5" fill="var(--hlw-paper-2)" />
        </g>
      </svg>
    </span>
  );
}
