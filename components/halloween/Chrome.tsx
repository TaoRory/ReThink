import Image from "next/image";
import Link from "next/link";
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

/** the nav's brand while inside the Halloween page: ReThink × Student Council, in each side's own lettering */
export function HalloweenBrand({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 sm:gap-3" aria-label="ReThink × VinUniversity Student Council">
      <Image src="/halloween/kv/rethink-script.webp" alt="" width={600} height={127} className="h-[20px] w-auto sm:h-[24px]" priority />
      {/* a hand-drawn ×: two brush strokes, the same weight and yellow as the lettering */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px] shrink-0 text-[color:var(--hlw-script)] sm:h-[18px] sm:w-[18px] md:max-lg:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M4.5 4.2 C9 8.5 14.5 15.5 19.8 20.2" />
        <path d="M19.2 3.6 C14.5 8.8 9.5 14.8 4.2 20.4" />
      </svg>
      <Image src="/halloween/kv/logo-sc.webp" alt="" width={1079} height={227} className="h-[22px] w-auto sm:h-[26px] md:max-lg:hidden" priority />
    </Link>
  );
}
