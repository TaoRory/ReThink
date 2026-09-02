"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
  drift: number;
  color: string;
};

type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

const STAR_COLORS = ["#e9ecf8", "#a8f0fb", "#e3ccff", "#70e0f0", "#f2a0fb"];

/**
 * Light motes drifting through the dark, with occasional streaks crossing the
 * frame. Canvas-based, GPU-cheap.
 */
export function Starfield({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    // phones ship 3x screens — capping DPR keeps the canvas cheap
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let nextMeteor = 2500 + Math.random() * 3000;
    let last = performance.now();
    let raf = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / (isSmall ? 11000 : 7000)) * density);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.9 + Math.random() * 2.4,
        drift: 2 + Math.random() * 7,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    };

    const drawFrame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.phase += s.speed * dt;
        s.y -= s.drift * dt;
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }
        const tw = 0.22 + 0.78 * Math.abs(Math.sin(s.phase));
        ctx.globalAlpha = tw;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        // soft glow for the brightest few (skipped on phones)
        if (!isSmall && s.r > 1.3) {
          ctx.globalAlpha = tw * 0.28;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // shooting stars
      nextMeteor -= dt * 1000;
      if (nextMeteor <= 0) {
        nextMeteor = 3500 + Math.random() * 4500;
        const fromLeft = Math.random() > 0.5;
        meteors.push({
          x: fromLeft ? -30 : Math.random() * w,
          y: Math.random() * h * 0.4,
          vx: 420 + Math.random() * 260,
          vy: 150 + Math.random() * 120,
          life: 1,
        });
      }
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.life -= dt * 0.9;
        const tail = 90;
        const grad = ctx.createLinearGradient(
          m.x, m.y,
          m.x - (m.vx / m.vy) * tail * 0.28, m.y - tail * 0.28
        );
        grad.addColorStop(0, `rgba(168, 240, 251, ${0.85 * m.life})`);
        grad.addColorStop(1, "rgba(168, 240, 251, 0)");
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - (m.vx / m.vy) * tail * 0.28, m.y - tail * 0.28);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(drawFrame);
    };

    resize();
    if (reduced) {
      // static sky for reduced-motion users
      for (const s of stars) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
