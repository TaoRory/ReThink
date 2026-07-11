/**
 * Booklet-style heading: oversized script initial + display serif rest.
 * e.g. <SectionHeading script="W" rest="hat is Rethink?" />
 */
export function SectionHeading({
  script,
  rest,
  kicker,
  light = false,
  className = "",
}: {
  script: string;
  rest: string;
  kicker?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.35em] ${
            light ? "text-crimson-600" : "text-lavender-400"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`font-display text-4xl leading-tight sm:text-5xl ${
          light ? "text-ink-900" : "text-cream-100"
        }`}
      >
        <span className="font-script text-[1.6em] leading-none align-[-0.12em] mr-1">
          {script}
        </span>
        {rest}
      </h2>
    </div>
  );
}
