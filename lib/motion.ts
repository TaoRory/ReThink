"use client";

/**
 * Nền chuyển động của dự án. Chép file này vào `src/lib/motion.ts` và LUÔN import gsap từ đây
 * (không `import gsap from "gsap"` rải rác): plugin chỉ đăng ký một lần, token dùng chung một chỗ.
 *
 * Cần: npm i gsap @gsap/react lenis
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/** Media query dùng với gsap.matchMedia() và window.matchMedia() */
export const MQ = {
  /** Pin / scrub dài: chỉ màn rộng, đủ cao, không giảm chuyển động */
  desktopMotion: "(min-width: 64rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)",
  mobileMotion: "not ((min-width: 64rem) and (min-height: 40rem)) and (prefers-reduced-motion: no-preference)",
  anyMotion: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  /** Thiết bị có chuột: cursor, magnetic, tilt, hover */
  fineHover: "(hover: hover) and (pointer: fine)",
  /** Hiệu ứng phản ứng theo tốc độ cuộn: chỉ máy tính có chuột */
  speedFx: "(min-width: 64rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

/** Bộ easing của dự án: một họ cho mỗi loại chuyển động, dùng nhất quán */
export const EASE = {
  /** Vào: nhanh rồi lắng */
  out: "expo.out",
  /** Di chuyển giữa hai trạng thái */
  inOut: "power3.inOut",
  /** Ra: tăng tốc rồi biến mất */
  in: "power3.in",
  /** Gắn với cuộn (scrub): luôn tuyến tính */
  scrub: "none",
} as const;

/** Thời lượng (giây): phần tử càng lớn càng chậm */
export const DUR = {
  micro: 0.2,
  ui: 0.4,
  reveal: 1,
  scene: 1.6,
} as const;

/** Ghép class có điều kiện (thay cho clsx / cn nếu dự án chưa có) */
export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

/** Cuộn tới phần tử / vị trí: dùng Lenis nếu có, nếu không thì cuộn gốc. Giảm chuyển động: nhảy ngay. */
export function scrollToTarget(target: HTMLElement | number, options: { immediate?: boolean; offset?: number } = {}) {
  const reduced = window.matchMedia(MQ.reduced).matches;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate: options.immediate || reduced, offset: options.offset, force: true });
    return;
  }
  const top = (typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY) + (options.offset ?? 0);
  window.scrollTo({ top, behavior: options.immediate || reduced ? "auto" : "smooth" });
}
