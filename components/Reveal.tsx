"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global scroll-reveal: fades in any element marked with `data-reveal`
 * when it enters the viewport. Mounted once in the root layout.
 */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        }
      },
      // extend the root box far above the viewport so fast scrolls and
      // anchor jumps never leave an element permanently hidden
      { threshold: 0, rootMargin: "1000% 0px -8% 0px" }
    );
    document
      .querySelectorAll("[data-reveal]:not(.revealed)")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
