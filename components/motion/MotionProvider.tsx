"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

import { getLenis, gsap, MQ, ScrollTrigger, setLenis } from "@/lib/motion";

/**
 * Smooth scroll (Lenis) chạy chung nhịp với GSAP ticker và đồng bộ ScrollTrigger. Gắn MỘT lần trong layout gốc: <MotionProvider />.
 * Nguồn: bản đang chạy production của website Aegis (Next.js App Router), đã bỏ phần riêng của dự án.
 *
 * Những lỗi thật mà file này đã xử lý (đừng bỏ khi chép):
 * 1. Đổi trang phía client: Lenis giữ "đích cuộn" của trang cũ → trang mới bị kéo về vị trí cũ. Sau mỗi lần đổi route phải đặt lại
 *    Lenis ngay (immediate), lặp vài khung hình; Back/Forward thì trả về vị trí đã nhớ của URL đó.
 * 2. Chiều cao trang đổi sau lúc Lenis đo (font tải xong, ảnh lười, section ghim): phải đo lại giới hạn cuộn, nhưng KHÔNG gọi
 *    lenis.resize() liên tục (nó đặt lại đích cuộn, làm mất delta bánh xe/touchpad) → chỉ gọi lenis.dimensions.resize().
 * 3. Touchpad gửi nhiều delta nhỏ, chuột gửi nấc ~100px: nhận diện để touchpad bám tay hơn mà chuột không bị chậm.
 * 4. Giảm chuyển động: không tạo Lenis (cuộn gốc), chỉ refresh ScrollTrigger.
 * 5. iOS Safari chỉ áp :active khi trang có listener touchstart.
 */

/** Cảm giác cuộn: chỉnh ở đây cho từng dự án */
const MOUSE_LERP = 0.12;
const MOUSE_MULTIPLIER = 1.4;
const PAD_LERP = 0.2;
const PAD_BOOST = 1.2;

/**
 * ReThink: the Halloween event page drives its own scroll-linked tunnel and the owner is
 * lag-sensitive there, so it keeps native scrolling (no Lenis). ScrollTrigger still refreshes.
 */
const NATIVE_SCROLL = /^\/(en\/)?halloween(\/|$)/;

export function MotionProvider() {
  const pathname = usePathname();
  const smooth = !NATIVE_SCROLL.test(pathname);
  const previousPath = useRef(pathname);
  /** Vị trí cuộn cuối cùng của từng URL, để Back/Forward trả người dùng về đúng chỗ */
  const scrollMemory = useRef(new Map<string, number>());
  const poppedRef = useRef(false);

  useEffect(() => {
    const memory = scrollMemory.current;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => memory.set(window.location.pathname + window.location.search, window.scrollY));
    };
    const onPop = () => {
      poppedRef.current = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    const popped = poppedRef.current;
    poppedRef.current = false;
    const lenis = getLenis();
    if (!lenis) return;
    const remembered = popped ? (scrollMemory.current.get(window.location.pathname + window.location.search) ?? 0) : 0;
    const reset = () => {
      // the instance is destroyed when the route switches to native scrolling
      if (getLenis() !== lenis) return;
      lenis.resize();
      const hash = window.location.hash;
      const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
      lenis.scrollTo(target ?? remembered, { immediate: true, force: true });
    };
    reset();
    const frames: number[] = [];
    const after = (n: number) => {
      if (n === 0) {
        reset();
        ScrollTrigger.refresh();
        return;
      }
      frames.push(
        requestAnimationFrame(() => {
          reset();
          after(n - 1);
        }),
      );
    };
    after(3);
    // Trang dài có section ghim: chờ chiều cao ổn định rồi đặt lại một lần nữa khi Back/Forward
    const late = popped ? window.setTimeout(reset, 350) : 0;
    return () => {
      frames.forEach(cancelAnimationFrame);
      window.clearTimeout(late);
    };
  }, [pathname]);

  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    if (!smooth || window.matchMedia(MQ.reduced).matches) {
      return () => window.removeEventListener("load", refresh);
    }

    let padUntil = 0;
    const lenis = new Lenis({
      lerp: MOUSE_LERP,
      wheelMultiplier: MOUSE_MULTIPLIER,
      anchors: true,
      autoRaf: false,
      virtualScroll: (data) => {
        const event = data.event;
        // ctrl + wheel là zoom (chụm ngón trên touchpad): không đụng tới
        if (event.type !== "wheel" || (event as WheelEvent).ctrlKey) return true;
        const wheel = event as WheelEvent;
        const now = performance.now();
        if (wheel.deltaMode === 0 && Math.max(Math.abs(wheel.deltaY), Math.abs(wheel.deltaX)) < 40) padUntil = now + 250;
        const pad = now < padUntil;
        lenis.options.lerp = pad ? PAD_LERP : MOUSE_LERP;
        if (pad) {
          data.deltaX *= PAD_BOOST;
          data.deltaY *= PAD_BOOST;
        }
        return true;
      },
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    // Một vòng lặp duy nhất: Lenis chạy bằng ticker của GSAP
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let sizeRaf = 0;
    const remeasure = () => {
      cancelAnimationFrame(sizeRaf);
      sizeRaf = requestAnimationFrame(() => lenis.dimensions.resize());
    };
    const sizeObserver = new ResizeObserver(remeasure);
    sizeObserver.observe(document.body);
    ScrollTrigger.addEventListener("refresh", remeasure);
    window.addEventListener("load", remeasure);
    document.fonts?.ready.then(remeasure);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("load", remeasure);
      ScrollTrigger.removeEventListener("refresh", remeasure);
      sizeObserver.disconnect();
      cancelAnimationFrame(sizeRaf);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [smooth]);

  return null;
}
