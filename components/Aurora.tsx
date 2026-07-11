/**
 * Living gradient backdrop: drifting blurred color blobs, a rotating conic
 * color sweep and a hue cycle. Parent section needs `relative overflow-hidden`.
 */
export function Aurora({
  className = "",
  sweep = false,
}: {
  className?: string;
  sweep?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`aurora-field pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {sweep && <div className="aurora-sweep" />}
      <div className="aurora-blob ab-1" />
      <div className="aurora-blob ab-2" />
      <div className="aurora-blob ab-3" />
      <div className="aurora-blob ab-4" />
    </div>
  );
}
