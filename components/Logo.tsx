import Link from "next/link";

export function Logo({
  className = "",
  chrome = false,
}: {
  className?: string;
  chrome?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-0.5 ${className}`}
      aria-label="ReThink — về trang chủ"
    >
      <span
        className={`font-script text-[1.9em] leading-none -mb-[0.2em] ${
          chrome ? "text-chrome" : "text-cream-100"
        }`}
      >
        Re
      </span>
      <span
        className={`font-display font-semibold tracking-[0.18em] text-[1em] ${
          chrome ? "text-chrome" : "text-cream-100"
        }`}
      >
        THINK
      </span>
    </Link>
  );
}
