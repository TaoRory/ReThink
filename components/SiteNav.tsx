"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";

const LIMITLESS_URL = "https://v0-tedxvinuni.vercel.app/";

const tedxSeasons = [
  {
    href: "/tedx",
    external: false,
    title: "The Firsts",
    desc: "Mùa 2025 — hành trình của ReThink",
  },
  {
    href: LIMITLESS_URL,
    external: true,
    title: "Limitless Decade",
    desc: "Mùa 2026 — website chính thức ↗",
  },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tedxOpen, setTedxOpen] = useState(false);

  const linkCls = (active: boolean) =>
    `text-[13px] font-medium tracking-[0.14em] uppercase transition-colors ${
      active ? "text-lavender-300" : "text-cream-100/70 hover:text-cream-100"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-plum-950/85 backdrop-blur-md md:bg-plum-950/78 md:backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo chrome className="text-lg" />

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/about" className={linkCls(pathname.startsWith("/about"))}>
            Về ReThink
          </Link>

          {/* TEDx dropdown */}
          <div className="group relative">
            <Link
              href="/tedx"
              className={`${linkCls(pathname.startsWith("/tedx"))} inline-flex items-center gap-1.5`}
            >
              TEDxVinUniversity
              <span className="text-[9px] text-lavender-400 transition-transform duration-300 group-hover:rotate-180">
                ▼
              </span>
            </Link>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="w-72 rounded-xl border border-white/10 bg-plum-900/95 p-2 shadow-2xl shadow-plum-950 backdrop-blur-xl">
                {tedxSeasons.map((s) =>
                  s.external ? (
                    <a
                      key={s.title}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg px-4 py-3 transition hover:bg-white/5"
                    >
                      <p className="font-display text-[15px] font-semibold text-cream-100">
                        <span className="text-chrome-red">TEDx</span> {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-cream-100/55">{s.desc}</p>
                    </a>
                  ) : (
                    <Link
                      key={s.title}
                      href={s.href}
                      className="block rounded-lg px-4 py-3 transition hover:bg-white/5"
                    >
                      <p className="font-display text-[15px] font-semibold text-cream-100">
                        <span className="text-chrome-red">TEDx</span> {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-cream-100/55">{s.desc}</p>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          <Link href="/voices" className={linkCls(pathname.startsWith("/voices"))}>
            ReThink Voices
          </Link>
          <Link href="/join" className={linkCls(pathname.startsWith("/join"))}>
            Gia nhập
          </Link>

          <Link
            href="/voices/submit"
            className="btn-lux btn-lux-primary !px-5 !py-2 !text-[11px]"
          >
            Viết điều đáng nghĩ ✦
          </Link>
        </nav>

        <button
          className="md:hidden text-cream-100 text-2xl leading-none"
          onClick={() => setOpen(!open)}
          aria-label="Mở menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/8 bg-plum-950/95 px-5 py-4 md:hidden">
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium tracking-[0.14em] uppercase text-cream-100/80"
          >
            Về ReThink
          </Link>

          <button
            onClick={() => setTedxOpen(!tedxOpen)}
            className="flex w-full items-center justify-between py-3 text-sm font-medium tracking-[0.14em] uppercase text-cream-100/80"
          >
            TEDxVinUniversity
            <span className={`text-[10px] transition-transform ${tedxOpen ? "rotate-180" : ""}`}>▼</span>
          </button>
          {tedxOpen && (
            <div className="mb-2 ml-3 border-l border-white/10 pl-4">
              <Link
                href="/tedx"
                onClick={() => setOpen(false)}
                className="block py-2.5 text-sm text-cream-100/75"
              >
                The Firsts <span className="text-cream-100/45">· 2025</span>
              </Link>
              <a
                href={LIMITLESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2.5 text-sm text-cream-100/75"
              >
                Limitless Decade <span className="text-cream-100/45">· 2026 ↗</span>
              </a>
            </div>
          )}

          <Link
            href="/voices"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium tracking-[0.14em] uppercase text-cream-100/80"
          >
            ReThink Voices
          </Link>
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="block py-3 text-sm font-medium tracking-[0.14em] uppercase text-cream-100/80"
          >
            Gia nhập
          </Link>
          <Link
            href="/voices/submit"
            onClick={() => setOpen(false)}
            className="btn-lux btn-lux-primary mt-3 !px-5 !py-2.5 !text-[11px]"
          >
            Viết điều đáng nghĩ ✦
          </Link>
        </nav>
      )}
    </header>
  );
}
