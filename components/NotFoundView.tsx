"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Btn } from "@/components/Btn";
import { TedxText } from "@/components/Tedx";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { DEFAULT_LOCALE, localeFromPathname, localePath } from "@/lib/i18n/locale";
import { system } from "@/lib/i18n/system";

/**
 * The 404, in the visitor's language.
 *
 * One root layout serves both languages and Next prerenders a single 404
 * document for every unknown URL, so the server cannot know the locale: the
 * HTML is always Vietnamese (the default), and the real URL takes over at
 * hydration. `useSyncExternalStore` makes that switch part of the hydration
 * commit, so React never sees a mismatch.
 *
 * On /en/… the layout's boot script has already set <html lang="en"> before
 * first paint; until hydration the block is held back there (PENDING) so the
 * Vietnamese copy never flashes at an English reader. With JS off the lang
 * stays "vi" and the Vietnamese page is simply shown; `kit-failsafe`
 * (motion.css) releases the block after 3s if hydration never happens.
 *
 * Motion storyboard:
 *   h1     load   lines rise out of a mask; the mark wipes in behind
 *                 "nhìn lại" / "another look" — the brand's verb     T1
 *   links  load   the two rows rise into place (never hidden)        T1
 */
const PENDING =
  "[html[lang=en]_&[data-pending]]:invisible [html[lang=en]_&[data-pending]]:[animation:kit-failsafe_0.01s_3s_forwards]";

const subscribe = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

export function NotFoundView() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const locale = hydrated ? localeFromPathname(pathname) : DEFAULT_LOCALE;
  const t = system[locale].notFound;
  const to = (path: string) => localePath(locale, path);

  const more = [
    { href: to("/about"), title: t.aboutTitle, desc: t.aboutDesc },
    { href: to("/tedx"), title: t.tedxTitle, desc: t.tedxDesc },
  ];

  return (
    <section
      className={`wrap pb-[var(--sec-y)] pt-[calc(var(--kit-header)+clamp(3.5rem,9vw,8rem))] ${PENDING}`}
      data-pending={hydrated ? undefined : ""}
    >
      <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="label mb-6 flex items-center gap-3">
            <span className="mote text-fuchsia-400" aria-hidden="true" />
            {t.code}
          </p>

          {/* keyed: SplitText owns the heading's text nodes, so a new language is a new heading */}
          <SplitReveal key={locale} as="h1" trigger="load" className="h-display">
            {t.h1}{" "}
            <span className="tone-2">
              {t.h1HintA}
              <span className="kit-mark text-white">{t.h1Mark}</span>
              {t.h1HintB}
            </span>
          </SplitReveal>

          <p className="lead measure mt-7">
            <TedxText>{t.lead}</TedxText>
          </p>

          <div className="mt-9">
            <Btn href={to("/")} arrow>
              {t.home}
            </Btn>
          </div>
        </div>

        <nav aria-label={t.more} className="lg:col-span-4">
          <ul className="rows">
            {more.map((item, i) => (
              <Rise as="li" key={item.href} index={i}>
                <Link href={item.href} className="group flex min-h-[5rem] items-center justify-between gap-6 py-4">
                  <span>
                    <span className="h-card block">
                      <TedxText>{item.title}</TedxText>
                    </span>
                    <span className="small mt-1 block">{item.desc}</span>
                  </span>
                  <span
                    className="text-lg text-[var(--text-2)] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </Rise>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
