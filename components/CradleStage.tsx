"use client";

import { useEffect, useRef, useState } from "react";
import { Cradle } from "./Cradle";

/**
 * The hero's Newton's cradle — the one looping object on the main site.
 * It stops while it is off-screen, and carries a pause control because it
 * runs for longer than five seconds (WCAG 2.2.2). With reduced motion the
 * cradle is already still, so the control is hidden.
 */
export function CradleStage({
  className = "",
  pauseLabel,
  playLabel,
}: {
  className?: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offscreen, setOffscreen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`cradle-stage ${className}`} data-paused={offscreen || paused}>
      <Cradle className="cradle-hero" />
      <button
        type="button"
        className="pause-btn absolute bottom-3 right-0 motion-reduce:hidden"
        aria-pressed={paused}
        aria-label={paused ? playLabel : pauseLabel}
        onClick={() => setPaused((value) => !value)}
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zM9.5 2.5h3v11h-3z" />}
        </svg>
      </button>
    </div>
  );
}
