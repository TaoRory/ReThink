"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Sparkle } from "./Sparkle";
import { dict, localeFromPathname, localePath } from "@/lib/i18n";

export function SiteFooter() {
  const locale = localeFromPathname(usePathname());
  const t = dict[locale].footer;

  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo chrome season className="text-xl" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl-100/60">
              {t.quote}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cyan-400/70">
              {t.since}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.exploreHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-pearl-100/70">
              <li>
                <Link className="hover:text-pearl-100" href={localePath(locale, "/about")}>
                  {t.about}
                </Link>
              </li>
              <li>
                <Link className="hover:text-pearl-100" href={localePath(locale, "/tedx")}>
                  {t.tedx}
                </Link>
              </li>
              <li>
                <Link className="hover:text-pearl-100" href={localePath(locale, "/join")}>
                  {t.join}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.connectHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-pearl-100/70">
              <li>
                <a
                  className="hover:text-pearl-100"
                  href="https://www.facebook.com/rethink.vinuni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.fb}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-pearl-100"
                  href="https://v0-tedxvinuni.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.tedxSite}
                </a>
              </li>
              <li className="text-pearl-100/45">{t.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-white/8 pt-6">
          <p className="text-xs text-pearl-100/40">
            &copy; {new Date().getFullYear()} {t.rights}
          </p>
          <Sparkle className="h-5 w-5 text-cyan-400/60" />
        </div>
      </div>
    </footer>
  );
}
