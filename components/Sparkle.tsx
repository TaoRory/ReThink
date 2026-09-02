/**
 * Square light mote from the AY 26-27 KV — a glowing chip of light scattered
 * around the cradle, replacing the old booklet's 4-point star.
 */
export function Sparkle({
  className = "",
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${animate ? "sparkle-anim " : ""}${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sq-glow">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#sq-glow)" />
      <rect x="33" y="33" width="34" height="34" rx="2" fill="currentColor" />
    </svg>
  );
}
