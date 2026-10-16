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
 * "RETHINK 26-27" — the designer's hand-drawn wordmark, from
 * `RETHINK 26-27 2.svg` (which is a PNG wrapped in an SVG; the PNG is
 * extracted and trimmed to `wordmark.webp`). It is drawn already tilted on a
 * diagonal, so it is used as artwork, not as a text line.
 */
export function HalloweenWordmark({ className = "" }: { className?: string }) {
  return (
    <Image
      src={`${H}/kv/wordmark.webp`}
      alt="ReThink 26-27"
      width={1000}
      height={926}
      sizes="(max-width: 768px) 70vw, 420px"
      className={`h-auto ${className}`}
    />
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
/* the hero: the Avatar, rebuilt from the KV elements                    */
/* ------------------------------------------------------------------ */

/*
 * Every piece of the designer's Avatar placed as its own element, at the box
 * it occupies in the Avatar. Boxes are fractions of the square [x, y, w, h],
 * MEASURED, not eyeballed:
 *  - girl, masks, compass, inner wall, arm, leg: read off a 1% grid laid
 *    over the Avatar; each source PNG is cropped to its visible content
 *    (alpha > 40) so a box is exactly what you see. The designer stretched
 *    some pieces (the owl is taller than its file), so boxes are not forced
 *    to the file's aspect.
 *  - the branch cluster (Cành Cây.png): its main limb is at 47°, the same as
 *    the RETHINK branch; placed at x 0, y 0, width 1.02.
 *  - the arches: an edge search found the frame arch at x .151-.849,
 *    y .118-.922; the others follow from arches standing on one perspective
 *    floor, and their predicted tops (.272, .383, .461) land on the bright
 *    bands measured down the Avatar's centre line.
 *  - the wordmark: the R-to-K letter centroids of the SVG mapped onto the
 *    Avatar's lettering (scale, angle within 0.5°, offset).
 *  - fireflies: detected in the Avatar (bright yellow squares).
 *  - the bird skull and the small hooded mask have no source file; they are
 *    cut from the Avatar with a soft oval edge.
 *
 * Walking in (see .hlw-layer in halloween.css): each element has a depth d
 * and scales about the end of the tunnel by d / (d - p*Tn). Near things
 * grow fast and fade out as they pass; the girl barely moves.
 */

const K = `${H}/kv`;

type Box = [number, number, number, number]; // x, y, w, h — fractions of the square

/** one element of the scene, at depth d */
function El({
  d,
  box,
  src,
  pixel = false,
  rot,
  className = "",
  children,
}: {
  d: number;
  box: Box;
  src?: string;
  pixel?: boolean;
  /** degrees, about the box centre */
  rot?: number;
  className?: string;
  children?: ReactNode;
}) {
  const [x, y, w, h] = box;
  return (
    <div className="hlw-layer" style={{ "--d": d } as CSSProperties}>
      <div
        className={`hlw-el ${className}`}
        style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%`, ...(rot ? { transform: `rotate(${rot}deg)` } : {}) }}
      >
        {src && (
          // plain <img>: these are exact-size, pre-cropped crops; fill the measured box
          <img src={`${K}/${src}`} alt="" className={`hlw-fill ${pixel ? "hlw-pixel" : ""}`} draggable={false} />
        )}
        {children}
      </div>
    </div>
  );
}

/** a moss cylinder from (x1,y1) to (x2,y2), thickness t — for the branches that have no file */
function Limb({ d, from, to, t }: { d: number; from: [number, number]; to: [number, number]; t: number }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const len = Math.hypot(x2 - x1, y2 - y1);
  const deg = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <div className="hlw-layer" style={{ "--d": d } as CSSProperties}>
      <div
        className="hlw-limb"
        style={{
          left: `${x1 * 100}%`,
          top: `${y1 * 100}%`,
          width: `${len * 100}%`,
          height: `calc(var(--S) * ${t})`,
          transform: `translateY(-50%) rotate(${deg}deg)`,
        }}
      />
    </div>
  );
}

/** the nested arches: [x, y, w, h], deepest first, with depth */
const ARCHES: [Box, number][] = [
  [[0.38, 0.461, 0.25, 0.2885], 2.9],
  [[0.329, 0.383, 0.352, 0.406], 2.1],
  [[0.257, 0.272, 0.496, 0.572], 1.5],
];
const ARCH_B: [Box, number] = [[0.151, 0.118, 0.698, 0.806], 1.0];
const ARCH_A: [Box, number] = [[0.03, 0.04, 0.94, 1.085], 0.75];

export function TunnelStage({ children }: { children?: ReactNode }) {
  return (
    <div className="hlw-tunnel-stage">
      {/* grass beyond the square, so wide screens are not black at the sides */}
      <div className="hlw-surround" aria-hidden="true" />

      <div className="hlw-scene" aria-hidden="true">
        {/* ---- deepest: the grass, the lit wall at the end, the floor ---- */}
        <El d={3} box={[-0.02, -0.02, 1.04, 1.04]} src="../bg-co.webp" />
        <El d={3.6} box={[0.405, 0.487, 0.2, 0.261]} src="inner.webp" />
        <El d={2.6} box={[-0.185, 0.735, 1.37, 0.407]} src="carpet.webp" className="hlw-carpet" />

        {/* ---- the girl, with a branch behind her ---- */}
        <Limb d={3.3} from={[0.41, 0.605]} to={[0.585, 0.665]} t={0.022} />
        <El d={3.2} box={[0.4737, 0.535, 0.0626, 0.21]} src="girl.webp">
          <span className="hlw-girl-eyes">
            <i />
            <i />
          </span>
        </El>

        {/* ---- arches, deepest first, with what hangs on them ---- */}
        {ARCHES.map(([box, d]) => (
          <El key={d} d={d} box={box} src="arch.webp" />
        ))}
        <El d={2.1} box={[0.533, 0.366, 0.055, 0.1]} src="skull.webp" />
        <El d={1.8} box={[0.309, 0.472, 0.032, 0.047]} src="hood.webp" />
        <Limb d={1.6} from={[0.305, 0.75]} to={[0.435, 0.375]} t={0.013} />
        <Limb d={1.9} from={[0.565, 0.487]} to={[0.69, 0.615]} t={0.016} />
        <Limb d={1.9} from={[0.645, 0.48]} to={[0.64, 0.54]} t={0.006} />
        <Limb d={1.9} from={[0.64, 0.54]} to={[0.745, 0.545]} t={0.006} />

        {/* ---- the compass and the light it throws ---- */}
        <El d={2.6} box={[0.474, 0.838, 0.086, 0.0447]} src="compass.webp">
          <span className="hlw-compass-pool" />
        </El>

        {/* ---- the frame arch and what is in front of it ---- */}
        <El d={ARCH_B[1]} box={ARCH_B[0]} src="arch.webp" />
        <El d={1.0} box={[0.148, 0.618, 0.075, 0.127]} src="owl.webp" pixel className="hlw-owl hlw-sway-c" />
        <Limb d={1.3} from={[0.15, 0.565]} to={[0.85, 0.43]} t={0.033} />
        <Limb d={0.85} from={[0.15, 0.895]} to={[0.85, 0.6]} t={0.052} />
        <El d={ARCH_A[1]} box={ARCH_A[0]} src="arch.webp" />

        {/* ---- nearest: the masks, the branch cluster with the wordmark, the remains ---- */}
        <El d={0.65} box={[0.022, 0.035, 0.133, 0.178]} src="cat.webp" pixel className="hlw-sway" />
        <El d={0.65} box={[0.855, 0.02, 0.12, 0.215]} src="dog.webp" pixel className="hlw-sway-b" />
        <El d={0.6} box={[0, 0, 1.02, 0.71]} src="branches.webp" />
        <El d={0.6} box={[0.0997, -0.128, 0.732, 0.677]} src="wordmark.webp" className="hlw-word" />
        {/* the co-host, lettered along the second branch */}
        <El d={0.6} box={[0.57, 0.182, 0.28, 0.059]} src="logo-sc.webp" rot={-21} />
        <El d={0.55} box={[-0.005, 0.93, 0.292, 0.058]} src="arm.webp" />
        <El d={0.6} box={[0.63, 0.842, 0.22, 0.063]} src="leg.webp" />

        {/* ---- the Avatar's grade: dark edges ---- */}
        <div className="hlw-grade" />

        {/* ---- light sources, above the grade so it does not darken them ---- */}
        <El d={2.6} box={[0.4, 0.59, 0.24, 0.27]} className="hlw-compass-beam" />
      </div>

      {children}
    </div>
  );
}
