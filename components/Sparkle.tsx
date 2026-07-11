/** 4-point sparkle motif from the booklet */
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
      <path
        d="M50 0 C53 32 58 40 100 50 C58 60 53 68 50 100 C47 68 42 60 0 50 C42 40 47 32 50 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
