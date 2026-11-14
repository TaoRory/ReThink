import Link from "next/link";
import { Tedx, TedxText } from "@/components/Tedx";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { WheelGame } from "@/components/WheelGame";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { RECRUITING } from "@/lib/site-state";

/**
 * Motion storyboard (docs/design-system.md has the rules):
 *   hero     load    h1 lines rise out of a mask, the mark wipes in behind
 *                    "30s": the one number the game is about        T1
 *   wheel    click   the wheel spins 5.2s and lands on a topic; the
 *                    pendulum bob ticks while it turns: the page's one
 *                    interactive object (instant under reduced motion)
 *   timer    click   a bar drains over 30s (transform only)
 *   topics   scroll  the heading rises out of its mask, the list rises
 *                    into place (never hidden)                      T1
 *   closing  scroll  the heading rises out of its mask              T1
 * No scroll-linked scene, no Magnetic, no ambient loop.
 */
export function GamePage({ locale }: { locale: Locale }) {
  const t = dict[locale].game;
  const to = (path: string) => localePath(locale, path);
  const en = locale === "vi" ? "en" : undefined; // brand phrases are English

  return (
    <>
      {/* ============ HERO: what this is, left; how it works, right ============ */}
      <section className="pt-16">
        <div className="wrap pt-[clamp(2rem,5vw,4rem)]">
          <p className="label mb-5 flex items-center gap-3" lang={en}>
            <span className="mote text-fuchsia-400" aria-hidden="true" />
            {t.badge}
          </p>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
            {/* the game's name sits on its own line so "chủ đề" never splits */}
            <SplitReveal as="h1" trigger="load" className="h-display lg:col-span-8">
              {t.h1}{" "}
              <span lang={en} className="block whitespace-nowrap">
                <Tedx /> in <span className="kit-mark text-white">30s</span>
              </span>
            </SplitReveal>
            <p className="lead lg:col-span-4 lg:pb-3">
              <TedxText>{t.lead}</TedxText>
            </p>
          </div>
        </div>
      </section>

      {/* ============ THE WHEEL + EVERY TOPIC (client: the game state lives here) ============ */}
      <WheelGame t={t} topicLang={en} />

      {/* ============ NEXT STEP: two large tiles ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section max-w-3xl">
            {t.ctaHeading}
          </SplitReveal>
          <p className="lead measure mt-5">{t.ctaLead}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Link href={to("/about")} className={`tile ${RECRUITING ? "" : "tile-brand"}`}>
              <span className="small">{t.ctaAboutNote}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{t.ctaAbout}</span>
                <span className="tile-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
            <Link href={to("/join")} className={`tile ${RECRUITING ? "tile-brand" : ""}`}>
              <span className="small">{RECRUITING ? t.ctaJoinOpen : t.ctaJoinClosed}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{t.ctaJoin}</span>
                <span className="tile-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
