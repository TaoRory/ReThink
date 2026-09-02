/**
 * Deep-space backdrop: a slowly turning spiral disc with tilted orbital rings
 * around it. The rings are the concept's Default Orbit made literal — paths
 * that keep their course until something crosses them.
 *
 * Pure CSS, transform-only animation. Parent needs `relative overflow-hidden`.
 */
export function Galaxy({ className = "" }: { className?: string }) {
  return (
    <div className={`galaxy ${className}`} aria-hidden="true">
      <div className="galaxy-disc" />
      <div className="orbit-ring ring-1" />
      <div className="orbit-ring ring-2" />
      <div className="orbit-ring ring-3" />
    </div>
  );
}
