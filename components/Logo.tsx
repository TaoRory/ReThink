import Link from "next/link";

/**
 * AY 26-27 wordmark: monoline uppercase "RETHINK" rendered as a neon tube,
 * with the season tag trailing it — the lockup from KV/New KV.
 */
export function Logo({
  className = "",
  chrome = false,
  season = false,
  compact = false,
  href = "/",
  label = "ReThink — về trang chủ",
}: {
  className?: string;
  /** paint the wordmark as lit neon instead of flat pearl */
  chrome?: boolean;
  /** show the "26-27" season tag */
  season?: boolean;
  /** drop the season tag on narrow phones (the header has no room for it) */
  compact?: boolean;
  /** home of the current language (`/` or `/en`) */
  href?: string;
  /** accessible name, in the current language */
  label?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-1.5 ${className}`}
      aria-label={label}
    >
      <span
        className={`font-display text-[1em] font-light tracking-[0.34em] ${
          chrome ? "text-neon" : "text-pearl-100"
        }`}
      >
        RETHINK
      </span>
      {season && (
        <span
          className={`font-display text-[max(0.5em,11px)] font-light tracking-[0.22em] text-fuchsia-300 ${
            compact ? "max-sm:hidden" : ""
          }`}
        >
          26-27
        </span>
      )}
    </Link>
  );
}
