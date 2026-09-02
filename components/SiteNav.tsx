"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";
import { dict, localeFromPathname, localePath, stripLocale } from "@/lib/i18n";

const LIMITLESS_URL = "https://v0-tedxvinuni.vercel.app/";

export function SiteNav() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const bare = stripLocale(pathname);
  const t = dict[locale].nav;

  const [open, setOpen] = useState(false);
  const [tedxOpen, setTedxOpen] = useState(false);

  const linkCls = (active: boolean) =>
    `text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
      active ? "text-cyan-300" : "text-pearl-100/70 hover:text-pearl-100"
    }`;

  const tedxSeasons = [
    {
      href: localePath(locale, "/tedx"),
      external: false,
      title: "The Firsts",
      desc: t.seasonFirsts,
    },
    {
      href: LIMITLESS_URL,
      external: true,
      title: "Limitless Decade",
      desc: t.seasonLimitless,
    },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink-950/85 backdrop-blur-md md:bg-ink-950/78 md:backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo chrome className="text-lg" />

        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href={localePath(locale, "/about")}
            className={linkCls(bare.startsWith("/about"))}
          >
            {t.about}
          </Link>

          {/* TEDx dropdown */}
          <div className="group relative">
            <Link
              href={localePath(locale, "/tedx")}
              className={`${linkCls(bare.startsWith("/tedx"))} inline-flex items-center gap-1.5`}
            >
              {t.tedx}
              <span className="text-[9px] text-cyan-400 transition-transform duration-300 group-hover:rotate-180">
                &#9660;
              </span>
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="w-72 rounded-xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-ink-950 backdrop-blur-xl">
                {tedxSeasons.map((s) =>
                  s.external ? (
                    <a
                      key={s.title}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-4 py-3 transition hover:bg-white/5"
                    >
                      <p className="font-display text-[15px] font-semibold text-pearl-100">
                        <span className="text-neon-red">TEDx</span> {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-pearl-100/55">{s.desc}</p>
                    </a>
                  ) : (
                    <Link
                      key={s.title}
                      href={s.href}
                      className="block rounded-lg px-4 py-3 transition hover:bg-white/5"
                    >
                      <p className="font-display text-[15px] font-semibold text-pearl-100">
                        <span className="text-neon-red">TEDx</span> {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-pearl-100/55">{s.desc}</p>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          <Link
            href={localePath(locale, "/join")}
            className="btn-lux btn-lux-primary !px-5 !py-2 !text-[11px]"
          >
            {t.join} &#9642;
          </Link>

          <LangToggle />
        </nav>

        {/* mobile: language stays reachable next to the menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <button
            className="text-pearl-100 text-2xl leading-none"
            onClick={() => setOpen(!open)}
            aria-label={t.menu}
            aria-expanded={open}
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-ink-950/95 px-5 py-4 md:hidden">
          <Link
            href={localePath(locale, "/about")}
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium tracking-[0.14em] uppercase text-pearl-100/80"
          >
            {t.about}
          </Link>

          <button
            onClick={() => setTedxOpen(!tedxOpen)}
            className="flex w-full items-center justify-between py-3 text-sm font-medium tracking-[0.14em] uppercase text-pearl-100/80"
          >
            {t.tedx}
            <span
              className={`text-[10px] transition-transform ${tedxOpen ? "rotate-180" : ""}`}
            >
              &#9660;
            </span>
          </button>
          {tedxOpen && (
            <div className="mb-2 ml-3 border-l border-white/10 pl-4">
              <Link
                href={localePath(locale, "/tedx")}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-pearl-100/75"
              >
                The Firsts <span className="text-pearl-100/45">&middot; 2025</span>
              </Link>
              <a
                href={LIMITLESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-sm text-pearl-100/75"
              >
                Limitless Decade{" "}
                <span className="text-pearl-100/45">&middot; 2026 &#8599;</span>
              </a>
            </div>
          )}

          <Link
            href={localePath(locale, "/join")}
            onClick={() => setOpen(false)}
            className="btn-lux btn-lux-primary mt-3 !px-5 !py-2.5 !text-[11px]"
          >
            {t.join} &#9642;
          </Link>
        </nav>
      )}
    </header>
  );
}
