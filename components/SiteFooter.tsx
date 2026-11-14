"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { HalloweenFooterDecor } from "./halloween/Chrome";
import { Sparkle } from "./Sparkle";
import { chrome } from "@/lib/i18n/chrome";
import { localeFromPathname, localePath, stripLocale, type Locale } from "@/lib/i18n/locale";
import { FACEBOOK, TEDX_2026_SITE } from "@/lib/site-state";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  if (stripLocale(pathname).startsWith("/halloween")) return <HalloweenFooter locale={locale} />;
  return <MainFooter locale={locale} />;
}

function useLinks(locale: Locale) {
  const t = chrome[locale].footer;
  return {
    t,
    explore: [
      { href: localePath(locale, "/about"), label: t.about },
      { href: localePath(locale, "/tedx"), label: t.tedx },
      { href: localePath(locale, "/halloween"), label: t.halloween },
      { href: localePath(locale, "/join"), label: t.join },
      { href: localePath(locale, "/game"), label: t.game },
    ],
    connect: [
      { href: FACEBOOK, label: t.fb },
      { href: TEDX_2026_SITE, label: t.tedxSite },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Main site: a rounded dark panel inside the page gutter, closed by   */
/* the oversized wordmark                                              */
/* ------------------------------------------------------------------ */
function MainFooter({ locale }: { locale: Locale }) {
  const { t, explore, connect } = useLinks(locale);
  const row = "link-quiet inline-flex min-h-11 items-center text-[0.9375rem]";

  return (
    <footer className="px-[calc(var(--gutter)/2)] pb-[calc(var(--gutter)/2)] pt-10">
      <div className="panel relative overflow-hidden">
        <div className="wrap pb-10 pt-[clamp(2.5rem,6vw,5rem)]">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <Logo
                chrome
                season
                className="text-xl"
                href={localePath(locale, "/")}
                label={chrome[locale].nav.home}
              />
              <p lang="en" className="body mt-5 max-w-md">
                {t.quote}
              </p>
              <p className="small mt-4 uppercase tracking-[0.14em]">{t.since}</p>
            </div>

            <nav aria-label={t.exploreHead}>
              <h2 className="label">{t.exploreHead}</h2>
              <ul className="mt-3">
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link className={row} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="label">{t.connectHead}</h2>
              <ul className="mt-3">
                {connect.map((item) => (
                  <li key={item.href}>
                    <a className={row} href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}&nbsp;<span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
                <li className="small flex min-h-11 items-center">{t.address}</li>
              </ul>
            </div>
          </div>

          <p className="small mt-12 border-t border-white/12 pt-6">
            &copy; {new Date().getFullYear()} {t.rights}
          </p>
        </div>

        {/* decorative repeat of the wordmark, cropped by the panel edge */}
        <p aria-hidden="true" className="footer-word -mb-[0.16em] text-center">
          RETHINK
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Event page: unchanged — it follows the Halloween KV                 */
/* ------------------------------------------------------------------ */
function HalloweenFooter({ locale }: { locale: Locale }) {
  const { t, explore, connect } = useLinks(locale);

  return (
    <footer className="hlw hlw-chrome relative border-t border-white/8 bg-ink-950">
      <HalloweenFooterDecor />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo chrome season className="text-xl" href={localePath(locale, "/")} label={chrome[locale].nav.home} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl-100/60">{t.quote}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-cyan-400/70">{t.since}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.exploreHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-pearl-100/70">
              {[explore[0], explore[2], explore[1], explore[3], explore[4]].map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-pearl-100" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              {t.connectHead}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-pearl-100/70">
              {connect.map((item) => (
                <li key={item.href}>
                  <a className="hover:text-pearl-100" href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
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
