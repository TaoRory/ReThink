"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The scroll track for the grass-tunnel hero.
 *
 * Writes one CSS custom property, `--p` (0 → 1), as the track scrolls past;
 * every layer in the stage derives its own `scale()`/`opacity` from it in CSS.
 * One passive listener, coalesced to one write per animation frame, and
 * nothing at all under prefers-reduced-motion (the CSS then shows a still).
 */
export function TunnelProgress({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      // the event details at the end of the tunnel only take clicks once you are there
      el.toggleAttribute("data-arrived", p > 0.85);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="hlw-tunnel">
      {children}
    </div>
  );
}
