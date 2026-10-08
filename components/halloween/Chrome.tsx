import { Bat, Candle, Ghost, Web } from "./Scene";

/**
 * Decoration the site chrome puts on while you are inside the event.
 *
 * Both pieces are plain presentational components with no hooks, so the
 * client-rendered SiteNav and SiteFooter can drop them in behind a path
 * check. They sit at z-0 under the real nav/footer content and never take
 * pointer events, so nothing here can swallow a click on a link.
 */

export function HalloweenNavDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      <Web className="hlw-web hlw-web-l" size={96} />
      <Web className="hlw-web hlw-web-r" size={96} />

      {/* one bat crosses the bar every 17s */}
      <Bat className="hlw-nav-bat" top="0.55rem" size={22} />

      {/* wax dripping off the bottom edge, with the odd drop falling free */}
      <span className="hlw-chrome-drip">
        <span className="hlw-drop" style={{ left: "18%", top: "10px" }} />
        <span className="hlw-drop hlw-drop-2" style={{ left: "47%", top: "10px" }} />
        <span className="hlw-drop hlw-drop-3" style={{ left: "76%", top: "10px" }} />
      </span>
    </div>
  );
}

export function HalloweenFooterDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Web className="hlw-web hlw-web-r" size={110} />
      <div className="hlw-fog hlw-fog-low absolute bottom-0 opacity-70" />

      {/* a row of candles burning along the bottom edge */}
      <div className="absolute bottom-0 left-0 flex w-full items-end justify-around px-10 opacity-70">
        <Candle size={26} />
        <Candle size={34} flame="hlw-flame-b" />
        <Candle size={22} flame="hlw-flame-c" />
        <Candle size={30} />
        <Candle size={24} flame="hlw-flame-b" />
      </div>

      <Ghost className="hlw-ghost-slow absolute right-[12%] top-6 opacity-40" size={52} tint="pink" />
    </div>
  );
}
