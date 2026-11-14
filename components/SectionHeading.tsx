/**
 * AY 26-27 heading: a lit rule + kicker above monoline display caps.
 * The `script` letter is kept in the API (callers pass the first character)
 * and is rejoined to the rest — the KV has no calligraphic initial.
 */
export function SectionHeading({
  script,
  rest,
  kicker,
  className = "",
}: {
  script: string;
  rest: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {kicker && (
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
          <span className="kicker-rule h-px w-8 bg-gradient-to-r from-fuchsia-500 to-cyan-300" />
          {kicker}
        </p>
      )}
      <h2
        data-split
        className="font-display text-3xl font-light leading-tight tracking-[0.02em] text-pearl-50 sm:text-4xl"
      >
        {/* each word rises out of its own mask (see [data-split] in globals.css) */}
        {`${script}${rest}`.split(" ").map((word, i, all) => (
          <span key={i}>
            <span className="split-w">
              <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
            </span>
            {i < all.length - 1 ? " " : null}
          </span>
        ))}
      </h2>
    </div>
  );
}
