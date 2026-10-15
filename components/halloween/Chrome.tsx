import Image from "next/image";
import { Eyeball, Motes } from "./Scene";

/**
 * Decoration the site chrome puts on while you are inside the Halloween page.
 *
 * Plain presentational components (no hooks), so the client-rendered
 * SiteNav and SiteFooter can drop them in behind a path check. They sit
 * under the real nav/footer content and never take pointer events.
 * The footer eye is driven by the page's EyeTracker (same document).
 */

export function HalloweenNavDecor() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Motes count={4} size={10} />
      <span className="hlw-grass-edge" />
    </div>
  );
}

export function HalloweenFooterDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/halloween/mau.webp"
        alt=""
        width={480}
        height={651}
        unoptimized
        className="hlw-pixel absolute -left-8 -top-10 w-32 rotate-[160deg] opacity-60 sm:w-44"
      />
      <Motes count={6} />
      <Eyeball track size={54} className="absolute bottom-6 right-6 opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(68,100,2,0.35),transparent)]" />
    </div>
  );
}
