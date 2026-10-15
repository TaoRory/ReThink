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
        loading="eager"
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
/* the hero tunnel — a real 3D scene                                   */
/* ------------------------------------------------------------------ */

/*
 * Everything in the tunnel lives in one CSS 3D scene, and the scroll moves ONE
 * thing: the camera (see `.hlw-world` in halloween.css). That is what makes it
 * read as walking in, where the first version only `scale()`d each layer from
 * its own origin: a branch or mask that wasn't scaled just sat there, and the
 * blood carpet grew like a sticker. In a shared 3D scene every object —
 * arches, branches, masks, fireflies, the floor — is projected through the same
 * camera and the same vanishing point, so near things rush outward past you
 * and far things barely move, with no per-layer fudge factors.
 *
 * Units: 1 world unit = 1vh (`--u`). z is "how far behind the picture plane",
 * so bigger z = deeper in the tunnel. The camera starts `--P` units in front of
 * the plane (also the CSS perspective distance) and walks `--T` units forward.
 * An object at depth z appears at scale P / (P + z - p*T).
 * Transforms and opacity only — see the performance rule in halloween.css.
 */

/** an object standing in the scene. Position vars go inline; sizes live in CSS classes. */
function Obj({
  z,
  x,
  y,
  w,
  className = "",
  style,
  children,
}: {
  z: number;
  x?: number;
  y?: number;
  w?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`hlw-obj ${className}`}
      style={
        {
          "--z": z,
          ...(x !== undefined && { "--x": x }),
          ...(y !== undefined && { "--y": y }),
          ...(w !== undefined && { "--w": w }),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** equal arches at increasing depth: a tunnel, not a stack of different-sized pictures */
const ARCH_Z = [0, 32, 72, 124, 196];
/** deeper arches are lit from inside the tunnel, near ones stand in shadow */
const ARCH_LIGHT = [0.62, 0.74, 0.88, 1, 1.12];

/** fireflies hang in the air at real depths, so they stream past with the camera */
const FLIES = [
  { x: -52, y: -30, z: 10, img: 1 },
  { x: 44, y: -16, z: 24, img: 2 },
  { x: -28, y: 8, z: 48, img: 3 },
  { x: 30, y: -34, z: 70, img: 4 },
  { x: -64, y: -6, z: 86, img: 1 },
  { x: 58, y: 12, z: 104, img: 2 },
  { x: -14, y: -22, z: 128, img: 3 },
  { x: 22, y: 20, z: 150, img: 4 },
  { x: -40, y: 26, z: 172, img: 1 },
  { x: 8, y: -40, z: 196, img: 2 },
  { x: 36, y: -4, z: 214, img: 3 },
  { x: -18, y: 14, z: 232, img: 4 },
];

export function TunnelStage({ children }: { children?: ReactNode }) {
  return (
    <div className="hlw-tunnel-stage">
      {/* everything in this layer is scenery; the real copy comes in as children */}
      <div className="hlw-world" aria-hidden="true">
        {/* ---- the floor: flat planes the camera walks over ---- */}
        <div className="hlw-plane hlw-ground" />
        <div className="hlw-plane hlw-carpet" />
        <div className="hlw-plane hlw-compass-glow" />

        {/* ---- the far end, lit from inside ---- */}
        <Obj z={262} className="hlw-p-farbg">
          <Image loading="eager" src={`${H}/bg-vom-co.webp`} alt="" width={720} height={944} sizes="40vw" className="h-auto w-full" />
        </Obj>

        {/* ---- arches, deepest first ---- */}
        {[...ARCH_Z].reverse().map((z, k) => {
          const i = ARCH_Z.length - 1 - k;
          return (
            <Obj
              key={z}
              z={z}
              className="hlw-p-arch"
              style={{ "--light": ARCH_LIGHT[i] } as CSSProperties}
            >
              <Image
                src={`${H}/vom-co.webp`}
                alt=""
                width={1400}
                height={1475}
                sizes="(max-width: 768px) 120vh, 150vh"
                priority
                className="h-auto w-full"
              />
            </Obj>
          );
        })}

        {/* ---- the girl, on the carpet at the far end ---- */}
        <Obj z={250} className="hlw-p-girl">
          <Image src={`${H}/nhan-vat.webp`} alt="" width={380} height={624} unoptimized priority className="h-auto w-full" />
          <span className="hlw-girl-eyes">
            <i />
            <i />
          </span>
        </Obj>
        <Obj z={222} className="hlw-p-compass">
          <Image loading="eager" src={`${H}/compass-3d.webp`} alt="" width={290} height={153} unoptimized className="hlw-pixel h-auto w-full" />
        </Obj>

        {/* ---- the wordmark branch, nearest of all: the first thing to rush past ---- */}
        <Obj z={0} className="hlw-p-word">
          <div className="hlw-word-tilt">
            <Branch className="relative flex h-full w-full items-center justify-center">
              <HalloweenWordmark className="hlw-word-text" />
            </Branch>
          </div>
        </Obj>

        {/* ---- branches with their masks hanging from them: one rigid piece ---- */}
        <Obj z={26} className="hlw-p-cluster">
          <div className="hlw-drift -scale-x-100">
            <Image loading="eager" src={`${H}/canh-cay.webp`} alt="" width={1600} height={1215} sizes="60vh" className="h-auto w-full" />
          </div>
          <div className="hlw-cluster-mask">
            <HangingMask src="mask-cho.webp" width={130} height={164} cord={90} sway="hlw-sway-b" />
          </div>
        </Obj>

        <Obj z={8} className="hlw-p-cat">
          <Branch className="relative mx-auto h-3 w-[22rem] -rotate-6" />
          <HangingMask src="mask-meo.webp" width={150} height={189} cord={40} />
        </Obj>

        <Obj z={44} className="hlw-p-owl">
          <HangingMask src="mask-cu.webp" width={104} height={163} cord={30} sway="hlw-sway-c" />
        </Obj>

        {/* ---- fireflies ---- */}
        {FLIES.map((f, i) => (
          <Obj key={i} z={f.z} x={f.x} y={f.y} className="hlw-p-fly">
            <img
              src={`${H}/light-${f.img}.webp`}
              alt=""
              width={14}
              height={14}
              className="hlw-fly hlw-pixel"
              style={{ "--dl": `${-(i * 1.7).toFixed(1)}s` } as CSSProperties}
            />
          </Obj>
        ))}
      </div>

      {/* darkens the edges so the world has no visible seams */}
      <div className="hlw-vignette" aria-hidden="true" />

      {children}
    </div>
  );
}
