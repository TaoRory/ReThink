import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/**
 * Pieces of the Halloween ReThink KV, assembled the way the designer's Avatar
 * composes them.
 *
 * The hero is a flat 2D scene with ONE shared vanishing point. Every layer sits
 * at a depth `d` (1 = the nearest big arch, bigger = further in) and the scroll
 * dollies the camera forward by `--p * --Tn`; a layer's scale about the
 * vanishing point is then d / (d - p*Tn). Same projection maths as a real 3D
 * camera — so branches, masks, arches and the floor all rush past together —
 * but it is only `transform: scale()` on ordinary boxes. A real CSS 3D scene
 * was tried first and rejected: on a real GPU Chrome clipped the big layers
 * where they crossed the camera plane (branches sliced in half, the girl cut
 * at the neck), which the headless test browser never showed.
 *
 * Artwork comes from the designer's KV (public/halloween/*.webp, produced by
 * scripts/optimize-kv.mjs). Pixel art is served `unoptimized` and rendered
 * `image-rendering: pixelated`. Everything here is decoration: aria-hidden.
 */

const H = "/halloween";

/** where the iris sits in eyeball-1.webp, measured from the artwork */
export const EYEBALL_IRIS_DEG = 185;

/** vanishing point, as a fraction of the square composition (from its top) */
const VP_Y = 0.64;

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
/* small parts used by the page sections too                           */
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

/** Fireflies for the page sections: square pixel motes with fixed positions. */
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

/* ------------------------------------------------------------------ */
/* the hero: the Avatar composition                                    */
/* ------------------------------------------------------------------ */

/**
 * A depth layer. Its children are positioned relative to the vanishing point
 * and scale about it together (see `.hlw-l` in halloween.css).
 */
function L({ d, children }: { d: number; children: ReactNode }) {
  return (
    <div className="hlw-l" style={{ "--d": d } as CSSProperties}>
      {children}
    </div>
  );
}

/**
 * An item inside a layer. cx/cy are the item's centre (or, with `top`, the
 * centre of its top edge) as a fraction of the square composition — measured
 * off the designer's Avatar — and w is its width as a fraction of it.
 */
function I({
  cx,
  cy,
  w,
  r = 0,
  anchor = "centre",
  className = "",
  style,
  children,
}: {
  cx: number;
  cy: number;
  w: number;
  r?: number;
  anchor?: "centre" | "top" | "bottom";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const ty = anchor === "top" ? "0%" : anchor === "bottom" ? "-100%" : "-50%";
  return (
    <div
      className={`hlw-i ${className}`}
      style={
        {
          "--x": cx - 0.5,
          "--y": cy - VP_Y,
          "--w": w,
          "--r": `${r}deg`,
          "--ty": ty,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** the four nested arches, measured from the Avatar: width, top edge, depth */
const ARCHES = [
  { w: 0.84, top: 0.088, d: 1.0 },
  { w: 0.668, top: 0.171, d: 1.26 },
  { w: 0.409, top: 0.305, d: 2.05 },
  { w: 0.207, top: 0.476, d: 4.06 },
];

/** branches: centre, length, thickness (fractions of the square), angle, depth */
const BRANCHES = [
  { cx: 0.466, cy: 0.41, len: 0.125, th: 0.013, r: 137, d: 2.3 }, // thin, behind the girl
  { cx: 0.5, cy: 0.508, len: 0.71, th: 0.026, r: -9.4, d: 1.6 }, // long one across her head
  { cx: 0.324, cy: 0.625, len: 0.22, th: 0.016, r: 105, d: 1.5 },
  { cx: 0.233, cy: 0.145, len: 0.295, th: 0.014, r: 94, d: 1.4 },
  { cx: 0.5, cy: 0.74, len: 0.77, th: 0.044, r: -24.2, d: 0.85 }, // thick, across the floor
  { cx: 0.714, cy: 0.234, len: 0.62, th: 0.036, r: -23.4, d: 0.8 }, // top right
];

/** fireflies hang in the air at their own depths */
const FLIES = [
  { cx: 0.5, cy: 0.5, d: 3.2, img: 1 },
  { cx: 0.42, cy: 0.56, d: 3.0, img: 2 },
  { cx: 0.58, cy: 0.6, d: 3.4, img: 3 },
  { cx: 0.46, cy: 0.68, d: 2.6, img: 4 },
  { cx: 0.63, cy: 0.44, d: 2.2, img: 1 },
  { cx: 0.36, cy: 0.42, d: 1.9, img: 3 },
  { cx: 0.7, cy: 0.7, d: 1.5, img: 2 },
  { cx: 0.3, cy: 0.78, d: 1.3, img: 4 },
  { cx: 0.8, cy: 0.5, d: 1.2, img: 1 },
  { cx: 0.2, cy: 0.5, d: 1.1, img: 2 },
];

export function TunnelStage({ children }: { children?: ReactNode }) {
  return (
    <div className="hlw-tunnel-stage">
      {/* everything in this layer is scenery; the real copy comes in as children */}
      <div className="hlw-comp" aria-hidden="true">
        <div className="hlw-vp">
          {/* ---- 1. the lit grass inside each arch, outermost first. Nested, so each
                 deeper wall paints over the middle of the one before it and what is left
                 round the edge reads as the tunnel's side walls. ---- */}
          {ARCHES.map((a) => (
            <L key={`wall-${a.w}`} d={a.d}>
              <I
                cx={0.5}
                cy={a.top + a.w * 0.1}
                w={a.w * 0.64}
                anchor="top"
                className="hlw-wall"
                style={{ "--hgt": a.w * 0.96, "--rad": a.w * 0.32 } as CSSProperties}
              />
            </L>
          ))}

          {/* ---- 2. the far end, the floor and the carpet ---- */}
          <L d={4.3}>
            <I cx={0.5} cy={0.727} w={0.32} anchor="bottom">
              <Image loading="eager" src={`${H}/bg-vom-co.webp`} alt="" width={720} height={944} sizes="30vh" className="h-auto w-full" />
            </I>
          </L>
          <L d={2.2}>
            {/* starts at the feet of the innermost arch, so it never paints over a wall */}
            <I cx={0.5} cy={1.29} w={3} className="hlw-ground" />
            {/* the blood carpet, drawn in perspective in the KV: its narrow end is at her feet */}
            <I cx={0.5} cy={0.84} w={0.88}>
              <Image loading="eager" src={`${H}/trail-mau.webp`} alt="" width={1400} height={387} sizes="80vh" className="hlw-carpet-img h-auto w-full" />
            </I>
          </L>

          {/* ---- 3. the girl and the compass ---- */}
          <L d={3.9}>
            <I cx={0.5} cy={0.727} w={0.124} anchor="bottom">
              <Image loading="eager" src={`${H}/nhan-vat.webp`} alt="" width={380} height={624} unoptimized priority className="h-auto w-full" />
              <span className="hlw-girl-eyes">
                <i />
                <i />
              </span>
            </I>
          </L>
          <L d={3.4}>
            <I cx={0.512} cy={0.855} w={0.07}>
              <Image loading="eager" src={`${H}/compass-3d.webp`} alt="" width={290} height={153} unoptimized className="hlw-pixel h-auto w-full" />
            </I>
          </L>

          {/* ---- 4. the arch rings, deepest first, so the nearest paints last ---- */}
          {[...ARCHES].reverse().map((a) => (
            <L key={`ring-${a.w}`} d={a.d}>
              <I cx={0.5} cy={a.top} w={a.w} anchor="top">
                <Image
                  loading="eager"
                  src={`${H}/vom-co.webp`}
                  alt=""
                  width={1400}
                  height={1475}
                  sizes="(max-width: 768px) 100vw, 90vh"
                  priority
                  className="h-auto w-full"
                />
              </I>
            </L>
          ))}

          {/* ---- masks and eyes, pinned to the arches as in the Avatar ---- */}
          <L d={1.9}>
            <I cx={0.19} cy={0.67} w={0.08}>
              <Image loading="eager" src={`${H}/mask-cu.webp`} alt="" width={339} height={530} unoptimized className="hlw-pixel hlw-mask hlw-sway h-auto w-full" />
            </I>
          </L>
          <L d={2.6}>
            <I cx={0.34} cy={0.495} w={0.036}>
              <Eyeball variant={2} size={64} className="block w-full [&_img]:h-auto [&_img]:w-full" />
            </I>
          </L>
          <L d={3.0}>
            <I cx={0.56} cy={0.4} w={0.05}>
              <Eyeball track size={72} className="block w-full [&_img]:h-auto [&_img]:w-full" />
            </I>
          </L>

          {/* ---- branches, thin and far first ---- */}
          {BRANCHES.map((b) => (
            <L key={`${b.cx}-${b.cy}`} d={b.d}>
              <I cx={b.cx} cy={b.cy} w={b.len} r={b.r}>
                <div className="hlw-branch w-full" style={{ height: `calc(var(--S) * ${b.th})` }} />
              </I>
            </L>
          ))}

          {/* ---- the big branch with the wordmark on it ---- */}
          <L d={0.75}>
            <I cx={0.265} cy={0.31} w={1.08} r={-46}>
              <div className="hlw-branch flex w-full items-center justify-center" style={{ height: "calc(var(--S) * 0.13)" }}>
                <HalloweenWordmark className="hlw-word-text" />
              </div>
            </I>
          </L>

          {/* ---- nearest: masks on the top branches, hands on the floor ---- */}
          <L d={0.9}>
            <I cx={0.085} cy={0.12} w={0.145}>
              <Image loading="eager" src={`${H}/mask-meo.webp`} alt="" width={460} height={579} unoptimized className="hlw-pixel hlw-mask hlw-sway h-auto w-full" />
            </I>
            <I cx={0.92} cy={0.11} w={0.13}>
              <Image loading="eager" src={`${H}/mask-cho.webp`} alt="" width={647} height={818} unoptimized className="hlw-pixel hlw-mask hlw-sway hlw-sway-b h-auto w-full" />
            </I>
          </L>
          <L d={0.8}>
            <I cx={0.115} cy={0.955} w={0.27} r={-6}>
              <Image loading="eager" src={`${H}/tay.webp`} alt="" width={600} height={352} className="h-auto w-full" />
            </I>
            <I cx={0.83} cy={0.9} w={0.24} r={8}>
              <Image loading="eager" src={`${H}/chan.webp`} alt="" width={600} height={397} className="h-auto w-full" />
            </I>
          </L>

          {/* ---- fireflies ---- */}
          {FLIES.map((f, i) => (
            <L key={i} d={f.d}>
              <I cx={f.cx} cy={f.cy} w={0.012}>
                <img
                  src={`${H}/light-${f.img}.webp`}
                  alt=""
                  width={14}
                  height={14}
                  className="hlw-fly hlw-pixel w-full"
                  style={{ "--dl": `${-(i * 1.7).toFixed(1)}s` } as CSSProperties}
                />
              </I>
            </L>
          ))}
        </div>
      </div>

      {/* darkens the edges so the composition melts into the page */}
      <div className="hlw-vignette" aria-hidden="true" />

      {children}
    </div>
  );
}
