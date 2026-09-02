import Link from "next/link";

/**
 * AY 26-27 wordmark: monoline uppercase "RETHINK" rendered as a neon tube,
 * with the season tag trailing it — the lockup from KV/New KV.
 */
export function Logo({
  className = "",
  chrome = false,
  season = false,
}: {
  className?: string;
  /** paint the wordmark as lit neon instead of flat pearl */
  chrome?: boolean;
  /** show the "26-27" season tag */
  season?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
      aria-label="ReThink — về trang chủ"
    >
      <span
        className={`font-display text-[1em] font-light tracking-[0.34em] ${
          chrome ? "text-neon" : "text-pearl-100"
        }`}
      >
        RETHINK
      </span>
      {season && (
        <span className="font-display text-[0.5em] font-light tracking-[0.22em] text-fuchsia-300">
          26-27
        </span>
      )}
    </Link>
  );
}
