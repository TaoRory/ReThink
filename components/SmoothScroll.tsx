"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

/**
 * Inertial wheel scrolling (Lenis). Mounted once in the root layout.
 *
 * - Touch keeps the phone's own scrolling (Lenis default); this smooths mouse
 *   wheels and touchpads only.
 * - `/halloween` keeps native scrolling: its tunnel is scroll-linked and the
 *   owner is lag-sensitive there.
 * - Reduced motion: no Lenis at all.
 * - Lenis keeps its own scroll target, so after a client-side route change it
 *   would drag the new page back to the old position. It is reset to the top
 *   (or the remembered spot on Back/Forward, or the #hash target) for a few
 *   frames after every navigation.
 * - Page height changes after load (fonts, lazy images): re-measure with
 *   `dimensions.resize()`, never `resize()` (that would drop wheel momentum).
 */

const NATIVE_SCROLL = /^\/(en\/)?halloween(\/|$)/;
const MOUSE_LERP = 0.1;
const PAD_LERP = 0.2;

let current: Lenis | null = null;

export function SmoothScroll() {
  const pathname = usePathname();
  const smooth = !NATIVE_SCROLL.test(pathname);
  const previousPath = useRef(pathname);
  const memory = useRef(new Map<string, number>());
  const popped = useRef(false);

  // remember where each URL was left, for Back/Forward
  useEffect(() => {
    const map = memory.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => map.set(location.pathname + location.search, scrollY));
    };
    const onPop = () => {
      popped.current = true;
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    if (!smooth || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let padUntil = 0;
    const lenis = new Lenis({
      lerp: MOUSE_LERP,
      wheelMultiplier: 1.1,
      anchors: true,
      autoRaf: true,
      virtualScroll: (data) => {
        const e = data.event;
        // ctrl + wheel is pinch-zoom on a touchpad: leave it alone
        if (e.type !== "wheel" || (e as WheelEvent).ctrlKey) return true;
        const w = e as WheelEvent;
        const now = performance.now();
        // touchpads send many small deltas, mice ~100px notches
        if (w.deltaMode === 0 && Math.max(Math.abs(w.deltaY), Math.abs(w.deltaX)) < 40) padUntil = now + 250;
        lenis.options.lerp = now < padUntil ? PAD_LERP : MOUSE_LERP;
        return true;
      },
    });
    current = lenis;

    let sizeRaf = 0;
    const remeasure = () => {
      cancelAnimationFrame(sizeRaf);
      sizeRaf = requestAnimationFrame(() => lenis.dimensions.resize());
    };
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);

    return () => {
      ro.disconnect();
      removeEventListener("load", remeasure);
      cancelAnimationFrame(sizeRaf);
      lenis.destroy();
      if (current === lenis) current = null;
    };
  }, [smooth]);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const wasPop = popped.current;
    popped.current = false;
    const lenis = current;
    if (!lenis) return;
    const target = wasPop ? (memory.current.get(location.pathname + location.search) ?? 0) : 0;
    const reset = () => {
      if (current !== lenis) return;
      lenis.resize();
      const hash = location.hash;
      const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      lenis.scrollTo(el ?? target, { immediate: true, force: true });
    };
    reset();
    const frames: number[] = [];
    const after = (n: number) => {
      if (n === 0) return;
      frames.push(
        requestAnimationFrame(() => {
          reset();
          after(n - 1);
        }),
      );
    };
    after(3);
    const late = wasPop ? window.setTimeout(reset, 350) : 0;
    return () => {
      frames.forEach(cancelAnimationFrame);
      clearTimeout(late);
    };
  }, [pathname]);

  return null;
}
