"use client";

import { useEffect } from "react";

/**
 * Makes every `[data-eye]` on the page look at the pointer.
 *
 * One pointermove listener for the whole document, coalesced to one pass per
 * animation frame. Each eye gets `--a` (degrees); CSS turns that into a
 * `rotate()`. `data-eye` holds the angle the iris already sits at in the
 * artwork, so the iris — not the image's 0° — points at the cursor.
 * Renders nothing; mounted once by the Halloween page, and it also drives the
 * eye in the footer because that lives in the same document.
 */
export function EyeTracker() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return; // phones: no cursor to follow

    let frame = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>("[data-eye]").forEach((eye) => {
        const r = eye.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return; // off screen
        const angle = (Math.atan2(y - (r.top + r.height / 2), x - (r.left + r.width / 2)) * 180) / Math.PI;
        const iris = Number(eye.dataset.eye) || 0;
        eye.style.setProperty("--a", (angle - iris).toFixed(1));
      });
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
