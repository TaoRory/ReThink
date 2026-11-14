"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HALLOWEEN = /^\/(en\/)?halloween(\/|$)/;

/**
 * Site-wide motion, mounted once in the root layout. Re-scans the page after
 * every route change. Everything here animates transform / opacity /
 * clip-path only, and only one scroll handler + one rAF frame run.
 *
 * Markup hooks (all optional; content is complete without JS):
 * - `data-reveal`         block swings in when it enters the viewport (also
 *                         used by /halloween — keep the behaviour)
 * - `data-split`          heading whose `.split-w > span` words rise in
 * - `data-reveal-img`     image wipes open and settles from a slight zoom
 * - `data-count`          number counts up from 0 to its real value
 * - `data-parallax="f"`   moves at f × scroll relative to its parent
 *                         (`data-parallax-anchor="top"` for a hero)
 * - `data-hero-out`       hero content drifts up and fades as it leaves
 * - `data-tilt`           card leans toward the pointer (fine pointers only)
 * - `data-magnetic`       wrapper pulled toward the pointer (fine pointers only)
 * - `.marquee-track`      speeds up / reverses with scroll velocity
 * - sections holding aurora / galaxy / cradle / marquee pause their CSS
 *   loops while off screen (`data-offscreen`)
 */
export function Reveal() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const hlw = HALLOWEEN.test(pathname);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    /* ---------- reveal on enter ---------- */
    const countUp = (el: HTMLElement) => {
      const m = (el.textContent ?? "").match(/^(\d+)(.*)$/);
      if (!m || reduced || el.dataset.counted) return;
      el.dataset.counted = "1";
      const end = Number(m[1]);
      const suffix = m[2];
      const t0 = performance.now();
      const dur = 1400;
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // A `data-reveal-img` starts clipped to nothing (clip-path), and the browser's
    // IntersectionObserver measures the CLIPPED box — it would see 0×0 and never
    // fire. So images are observed through their parent and revealed from there.
    const imgHosts = new Map<Element, HTMLElement[]>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.matches("[data-reveal], [data-split]")) el.classList.add("revealed");
          imgHosts.get(el)?.forEach((img) => img.classList.add("revealed"));
          io.unobserve(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach(countUp);
          if (el.hasAttribute("data-count")) countUp(el);
        }
      },
      // the root box reaches far above the viewport so fast scrolls and anchor
      // jumps never leave an element permanently hidden
      { threshold: 0, rootMargin: "1000% 0px -8% 0px" },
    );
    document
      .querySelectorAll("[data-reveal]:not(.revealed), [data-split]:not(.revealed), [data-count]")
      .forEach((el) => io.observe(el));
    document.querySelectorAll<HTMLElement>("[data-reveal-img]:not(.revealed)").forEach((img) => {
      const host = img.parentElement ?? img;
      imgHosts.set(host, [...(imgHosts.get(host) ?? []), img]);
      io.observe(host);
    });
    cleanups.push(() => io.disconnect());

    /* ---------- pause ambient loops off screen ---------- */
    const ambient = new Set<Element>();
    document.querySelectorAll(".aurora-field, .galaxy, .cradle, .marquee-track").forEach((el) => {
      const s = el.closest("section");
      if (s) ambient.add(s);
    });
    const pauser = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    ambient.forEach((s) => pauser.observe(s));
    cleanups.push(() => {
      pauser.disconnect();
      ambient.forEach((s) => s.removeAttribute("data-offscreen"));
    });

    if (reduced) {
      return () => cleanups.forEach((f) => f());
    }

    /* ---------- scroll-linked: parallax, hero drift, marquee, progress ---------- */
    type Layer = { el: HTMLElement; f: number; top: boolean; y0: number; h: number };
    let layers: Layer[] = [];
    const heroes = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-out]"));
    let heroH: number[] = [];
    let docMax = 1;

    const measure = () => {
      const sy = scrollY;
      layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        return {
          el,
          f: Number(el.dataset.parallax) || 0,
          top: el.dataset.parallaxAnchor === "top",
          y0: r.top + sy,
          h: r.height,
        };
      });
      heroH = heroes.map((el) => (el.closest("section") ?? el).getBoundingClientRect().height || innerHeight);
      docMax = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    };
    measure();
    const ro = new ResizeObserver(() => {
      measure();
      schedule();
    });
    ro.observe(document.body);
    cleanups.push(() => ro.disconnect());

    const marquees = Array.from(document.querySelectorAll<HTMLElement>(".marquee-track")).flatMap((el) =>
      el.getAnimations(),
    );
    let rate = 1;
    let dir = 1;
    let lastY = scrollY;
    let lastT = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = 0;
      const y = scrollY;
      const vh = innerHeight;

      for (const l of layers) {
        const offset = l.top ? y - l.y0 : y + vh / 2 - (l.y0 + l.h / 2);
        // skip work for layers far from the viewport
        if (Math.abs(offset) > vh + l.h) continue;
        l.el.style.transform = `translate3d(0, ${(offset * l.f).toFixed(1)}px, 0)`;
      }

      heroes.forEach((el, i) => {
        const p = Math.min(1, Math.max(0, y / heroH[i]));
        el.style.transform = `translate3d(0, ${(y * 0.32).toFixed(1)}px, 0)`;
        el.style.opacity = String(1 - p * 1.15 < 0 ? 0 : 1 - p * 1.15);
      });

      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, y / docMax).toFixed(4)})`;

      // marquee: velocity in px per 16ms, eased toward a target rate
      const dt = Math.max(1, now - lastT);
      const v = ((y - lastY) / dt) * 16;
      lastY = y;
      lastT = now;
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      const target = dir * (1 + Math.min(Math.abs(v) * 0.35, 7));
      rate += (target - rate) * 0.12;
      if (Math.abs(rate - dir) < 0.02) rate = dir;
      for (const a of marquees) a.playbackRate = rate;

      if (rate !== dir || Math.abs(v) > 0.01) schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    schedule();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", measure);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", measure);
      layers.forEach((l) => (l.el.style.transform = ""));
      heroes.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
    });

    /* ---------- pointer: tilt + magnetic ---------- */
    if (finePointer) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
        };
        const leave = () => {
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate3d(${(x * 0.28).toFixed(1)}px, ${(y * 0.38).toFixed(1)}px, 0)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => cleanups.forEach((f) => f());
  }, [pathname]);

  if (hlw) return null;
  return <div ref={bar} aria-hidden="true" className="scroll-progress" />;
}
