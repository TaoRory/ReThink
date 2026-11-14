"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { HalloweenBrand, HalloweenNavDecor } from "./halloween/Chrome";
import { LangToggle } from "./LangToggle";
import { chrome } from "@/lib/i18n/chrome";
import { localeFromPathname, localePath, stripLocale, type Locale } from "@/lib/i18n/locale";
import { getLenis } from "@/lib/motion";
import { FACEBOOK, TEDX_2026_SITE } from "@/lib/site-state";

type Season = { href: string; external: boolean; title: string; desc: string };

/** "TEDx" is always TED red, wherever the name appears */
function Tedx({ rest }: { rest: string }) {
  return (
    <>
      <span className="text-neon-red">TEDx</span>
      {rest}
    </>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const bare = stripLocale(pathname);

  // the event page has its own palette; the chrome follows it rather than
  // floating above it in ReThink's fuchsia
  if (bare.startsWith("/halloween")) return <HalloweenHeader locale={locale} />;
  return <MainHeader locale={locale} bare={bare} pathname={pathname} />;
}

/* ------------------------------------------------------------------ */
/* Event page: only the Halloween link and the language switch remain  */
/* ------------------------------------------------------------------ */
function HalloweenHeader({ locale }: { locale: Locale }) {
  const t = chrome[locale].nav;
  return (
    <header className="hlw hlw-chrome fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink-950/85 backdrop-blur-md md:bg-ink-950/78 md:backdrop-blur-xl">
      <HalloweenNavDecor />
      <div className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* desktop: the brand sits in the middle, the nav on the right */}
        <span aria-hidden="true" className="hidden lg:block" />
        <HalloweenBrand href={localePath(locale, "/")} />
        <nav className="hidden items-center gap-7 md:flex lg:justify-self-end">
          <Link
            href={localePath(locale, "/halloween")}
            className="text-[13px] font-medium uppercase tracking-[0.14em] text-cyan-300 transition-colors"
          >
            {t.halloween}
          </Link>
          <LangToggle />
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Main site                                                           */
/* ------------------------------------------------------------------ */
function MainHeader({ locale, bare, pathname }: { locale: Locale; bare: string; pathname: string }) {
  const t = chrome[locale].nav;
  const [open, setOpen] = useState(false);
  const [tedxOpen, setTedxOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const tedxWrap = useRef<HTMLDivElement>(null);

  // newest first; the two earliest have no write-up yet, so they point at the
  // archive strip on /tedx rather than a page of their own
  const archive = `${localePath(locale, "/tedx")}#seasons`;
  const seasons: Season[] = [
    { href: TEDX_2026_SITE, external: true, title: "Limitless Decade", desc: t.seasonLimitless },
    { href: localePath(locale, "/tedx"), external: false, title: "The Firsts", desc: t.seasonFirsts },
    { href: archive, external: false, title: "The New Dawn", desc: `2024 — ${t.seasonArchive}` },
    { href: archive, external: false, title: "Reinvent the Wheel", desc: `2023 — ${t.seasonArchive}` },
  ];

  // a new page always starts with everything closed
  useEffect(() => {
    setOpen(false);
    setTedxOpen(false);
  }, [pathname]);

  // phone menu: lock the page behind it, Escape closes, focus moves in and back
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuBtn.current?.focus();
    };
    // the sheet is phone-only: growing the window past the breakpoint closes it
    const wide = window.matchMedia("(min-width: 64rem)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
      root.style.overflow = previous;
      lenis?.start();
    };
  }, [open]);

  // desktop seasons menu: Escape or a click elsewhere closes it
  useEffect(() => {
    if (!tedxOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setTedxOpen(false);
    const onDown = (event: PointerEvent) => {
      if (!tedxWrap.current?.contains(event.target as Node)) setTedxOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [tedxOpen]);

  const tedxRest = t.tedx.replace(/^TEDx/, "");
  const current = (path: string) => (bare.startsWith(path) ? "page" : undefined);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink-950/90 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <Logo chrome season compact className="text-lg" href={localePath(locale, "/")} label={t.home} />

          {/* ---------- desktop ---------- */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label={t.menu}>
            <Link href={localePath(locale, "/about")} aria-current={current("/about")} className="nav-link">
              {t.about}
            </Link>

            <div
              ref={tedxWrap}
              className="relative flex items-center"
              onPointerEnter={(event) => event.pointerType === "mouse" && setTedxOpen(true)}
              onPointerLeave={(event) => event.pointerType === "mouse" && setTedxOpen(false)}
            >
              <Link href={localePath(locale, "/tedx")} aria-current={current("/tedx")} className="nav-link">
                <span>
                  <Tedx rest={tedxRest} />
                </span>
              </Link>
              <button
                type="button"
                aria-expanded={tedxOpen}
                aria-controls="tedx-seasons"
                aria-label={t.seasons}
                onClick={() => setTedxOpen((value) => !value)}
                className="-mr-3 inline-flex h-11 w-11 items-center justify-center text-pearl-200"
              >
                <svg
                  viewBox="0 0 12 12"
                  className={`h-3 w-3 transition-transform duration-200 ${tedxOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <div
                id="tedx-seasons"
                hidden={!tedxOpen}
                className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
              >
                <ul className="panel-deep overflow-hidden p-2">
                  {seasons.map((season) => (
                    <li key={season.title}>
                      <SeasonLink season={season} onPick={() => setTedxOpen(false)} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href={localePath(locale, "/halloween")}
              aria-current={current("/halloween")}
              className="nav-link"
            >
              {t.halloween}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <LangToggle />
            </div>
            <Link href={localePath(locale, "/join")} className="btn btn-solid btn-sm">
              <span className="sm:hidden">{t.joinShort}</span>
              <span className="hidden sm:inline">{t.join}</span>
            </Link>
            <button
              ref={menuBtn}
              type="button"
              className="btn btn-line btn-sm lg:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? t.menuClose : t.menuOpen}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? t.close : t.menu}
            </button>
          </div>
        </div>
      </header>

      {/* ---------- phone / tablet menu ---------- */}
      {/* a sibling of the header, not a child: the header's backdrop-filter
          would otherwise become the containing block of this fixed sheet */}
      <div
        id="site-menu"
        ref={sheet}
        className="menu-sheet lg:hidden"
        data-open={open}
        data-lenis-prevent
        inert={!open}
      >
        <nav
          className="wrap flex min-h-full flex-col pb-10 pt-6"
          aria-label={t.menu}
          // a link to the page you are already on (e.g. /tedx#seasons) does not
          // change the pathname, so close on any link press too
          onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        >
          <Link href={localePath(locale, "/about")} aria-current={current("/about")} className="menu-link">
            {t.about}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={localePath(locale, "/tedx")} aria-current={current("/tedx")} className="menu-link">
            <span>
              <Tedx rest={tedxRest} />
            </span>
            <span aria-hidden="true">→</span>
          </Link>
          <ul className="border-t border-white/12 py-2 pl-4" aria-label={t.seasons}>
            {seasons.map((season) => (
              <li key={season.title}>
                <SeasonLink season={season} compact />
              </li>
            ))}
          </ul>
          <Link
            href={localePath(locale, "/halloween")}
            aria-current={current("/halloween")}
            className="menu-link"
          >
            {t.halloween}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href={localePath(locale, "/join")} aria-current={current("/join")} className="menu-link">
            {t.join}
            <span aria-hidden="true">→</span>
          </Link>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/12 pt-6">
            <LangToggle />
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link"
            >
              Facebook <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

function SeasonLink({
  season,
  compact = false,
  onPick,
}: {
  season: Season;
  compact?: boolean;
  onPick?: () => void;
}) {
  const body = (
    <>
      <span className={`block font-display text-pearl-50 ${compact ? "text-[1.0625rem]" : "text-base font-medium"}`}>
        <Tedx rest={` ${season.title}`} />
      </span>
      <span className="small mt-0.5 block">{season.desc}</span>
    </>
  );
  const cls = `block rounded-xl ${compact ? "py-2.5" : "px-4 py-3 transition-colors hover:bg-white/5"}`;
  return season.external ? (
    <a href={season.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onPick}>
      {body}
    </a>
  ) : (
    <Link href={season.href} className={cls} onClick={onPick}>
      {body}
    </Link>
  );
}
