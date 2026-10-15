import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Pieces of the Halloween ReThink KV, assembled for the web.
 *
 * Artwork comes from the designer's KV (public/halloween/*.webp, produced by
 * scripts/optimize-kv.mjs). Pixel-art pieces are served `unoptimized` and
 * rendered `image-rendering: pixelated` so their dithering stays crisp. All
 * of it is decoration — `alt=""` and `aria-hidden` throughout.
 */

const H = "/halloween";

/** where the iris sits in eyeball-1.webp, measured by eye from the artwork */
export const EYEBALL_IRIS_DEG = 185;

/* ------------------------------------------------------------------ */
/* the wordmark                                                        */
/* ------------------------------------------------------------------ */

/**
 * "RETHINK" in the KV's hand-drawn script.
 *
 * TEMPORARY: set in a Google script face until the designer supplies the
 * transparent PNG/SVG. When it arrives, replace the body of this component
 * with an <Image> — nothing else on the site needs to change.
 */
export function HalloweenWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`hlw-script block whitespace-nowrap leading-none ${className}`}>
      RETHINK
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* small parts                                                         */
/* ------------------------------------------------------------------ */

/** A moss-green cylinder like the KV's branches, drawn in CSS. */
export function Branch({
  className = "",
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div className={`hlw-branch ${className}`} style={style} aria-hidden={children ? undefined : true}>
      {children}
    </div>
  );
}

/** Fireflies: square pixel motes. Positions are fixed so SSR and client agree. */
const MOTE_SPOTS = [
  { l: "12%", t: "22%", d: "9s", b: "2.4s", dl: "0s", dx: "22px", dy: "-30px", img: 1 },
  { l: "28%", t: "58%", d: "11s", b: "3.1s", dl: "-2s", dx: "-16px", dy: "-24px", img: 2 },
  { l: "41%", t: "34%", d: "8s", b: "2.2s", dl: "-4s", dx: "14px", dy: "-18px", img: 3 },
  { l: "57%", t: "46%", d: "12s", b: "2.8s", dl: "-1s", dx: "-20px", dy: "-28px", img: 4 },
  { l: "66%", t: "24%", d: "10s", b: "3.4s", dl: "-6s", dx: "18px", dy: "-16px", img: 1 },
  { l: "78%", t: "62%", d: "9.5s", b: "2.6s", dl: "-3s", dx: "-14px", dy: "-30px", img: 2 },
  { l: "88%", t: "36%", d: "13s", b: "3s", dl: "-5s", dx: "12px", dy: "-22px", img: 3 },
  { l: "50%", t: "72%", d: "10.5s", b: "2.3s", dl: "-7s", dx: "-18px", dy: "-20px", img: 4 },
  { l: "20%", t: "80%", d: "11.5s", b: "3.2s", dl: "-2.5s", dx: "16px", dy: "-26px", img: 1 },
  { l: "93%", t: "14%", d: "9s", b: "2.7s", dl: "-4.5s", dx: "-12px", dy: "-18px", img: 2 },
];

export function Motes({ count = 10, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {MOTE_SPOTS.slice(0, count).map((m, i) => (
        <img
          key={i}
          src={`${H}/light-${m.img}.webp`}
          alt=""
          width={size}
          height={size}
          className="hlw-mote hlw-pixel"
          style={
            {
              left: m.l,
              top: m.t,
              width: size,
              height: size,
              "--d": m.d,
              "--b": m.b,
              "--dl": m.dl,
              "--dx": m.dx,
              "--dy": m.dy,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** An eyeball. `track` makes it follow the cursor (see EyeTracker). */
export function Eyeball({
  size = 64,
  track = false,
  variant = 1,
  className = "",
  style,
}: {
  size?: number;
  track?: boolean;
  variant?: 1 | 2 | 3;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`inline-block ${className}`} style={style} aria-hidden="true">
      <Image
        src={`${H}/eyeball-${track ? 1 : variant}.webp`}
        alt=""
        width={size}
        height={size}
        unoptimized
        className={`hlw-pixel ${track ? "hlw-eye" : ""}`}
        data-eye={track ? EYEBALL_IRIS_DEG : undefined}
      />
    </span>
  );
}

/** A pixel mask hanging on a cord from whatever sits above it. */
export function HangingMask({
  src,
  width,
  height,
  cord = 60,
  sway = "",
  className = "",
  style,
}: {
  src: string;
  width: number;
  height: number;
  cord?: number;
  sway?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`hlw-sway ${sway} ${className}`} style={style} aria-hidden="true">
      <span
        className="mx-auto block w-px bg-[rgba(222,217,196,0.45)]"
        style={{ height: cord }}
      />
      <Image
        src={`${H}/${src}`}
        alt=""
        width={width}
        height={height}
        unoptimized
        className="hlw-pixel hlw-mask mx-auto"
        style={{ width, height: "auto" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* the hero tunnel                                                     */
/* ------------------------------------------------------------------ */

/**
 * Nested grass arches, as in the KV avatar. --s = resting scale, --k = how
 * fast the layer rushes toward you, --f = progress at which it starts to fade.
 * `hlw-arch-desktop` layers are dropped on phones.
 */
const ARCHES = [
  { s: 1.28, k: 3.0, f: 0.04, desktop: true },
  { s: 0.95, k: 2.5, f: 0.22, desktop: false },
  { s: 0.7, k: 2.0, f: 0.42, desktop: false },
  { s: 0.52, k: 1.6, f: 0.62, desktop: true },
  { s: 0.38, k: 1.25, f: 2, desktop: false },
];

export function TunnelStage({ children }: { children?: ReactNode }) {
  return (
    <div className="hlw-tunnel-stage">
      {/* everything in this layer is scenery; the real copy comes in as children */}
      <div className="absolute inset-0" aria-hidden="true">
      {/* the far end: the lit inner scene, behind the smallest arch */}
      <div
        className="hlw-arch"
        style={{ "--s": 0.3, "--k": 1.25, "--f": 2, width: "min(60vh, 64vw)" } as CSSProperties}
      >
        <Image src={`${H}/bg-vom-co.webp`} alt="" width={720} height={944} sizes="64vw" className="h-auto w-full" />
      </div>

      {/* the blood carpet along the tunnel floor, leading to her feet (KV avatar) */}
      <div className="hlw-floor">
        <Image src={`${H}/trail-mau.webp`} alt="" width={1400} height={387} sizes="60vh" className="h-full w-auto max-w-none" />
      </div>

      {/* the girl at the end of the tunnel */}
      <div className="hlw-girl">
        <Image src={`${H}/nhan-vat.webp`} alt="" width={380} height={624} unoptimized priority />
        <span className="hlw-girl-eyes">
          <i />
          <i />
        </span>
      </div>

      {/* arches, deepest first so the nearer ones paint over */}
      {[...ARCHES].reverse().map((a, i) => (
        <div
          key={i}
          className={`hlw-arch hlw-arch-fade ${a.desktop ? "hlw-arch-desktop" : ""}`}
          style={{ "--s": a.s, "--k": a.k, "--f": a.f } as CSSProperties}
        >
          <Image
            src={`${H}/vom-co.webp`}
            alt=""
            width={1400}
            height={1475}
            sizes="(max-width: 768px) 150vw, 128vw"
            priority={i === ARCHES.length - 1}
            className="h-auto w-full"
          />
        </div>
      ))}

      {/* the compass glowing on the floor */}
      <div className="hlw-floor-glow" />
      <Image
        src={`${H}/compass-3d.webp`}
        alt=""
        width={290}
        height={153}
        unoptimized
        className="hlw-pixel absolute bottom-[3%] left-1/2 w-[18vh] -translate-x-1/2"
      />

      {/* branches across the front, as in the KV */}
      <div className="hlw-drift absolute -right-[12%] -top-[8%] w-[70vw] max-w-[1000px] -scale-x-100 opacity-95">
        <Image src={`${H}/canh-cay.webp`} alt="" width={1600} height={1215} sizes="70vw" className="h-auto w-full" />
      </div>

      {/* masks hanging in the corners */}
      <div className="absolute left-[4%] top-0 hidden sm:block">
        <Branch className="relative h-3 w-56 -rotate-6" />
        <HangingMask src="mask-meo.webp" width={150} height={189} cord={40} />
      </div>
      <div className="absolute right-[6%] top-[10%] hidden md:block">
        <HangingMask src="mask-cho.webp" width={130} height={164} cord={90} sway="hlw-sway-b" />
      </div>
      <div className="absolute right-[22%] top-[38%] hidden lg:block">
        <HangingMask src="mask-cu.webp" width={86} height={134} cord={30} sway="hlw-sway-c" />
      </div>

      <Motes count={10} />
      </div>

      {children}
    </div>
  );
}
