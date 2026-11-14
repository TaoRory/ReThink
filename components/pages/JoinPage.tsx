import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Btn } from "@/components/Btn";
import { TedxText } from "@/components/Tedx";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { FACEBOOK, JOIN_FORM, RECRUITING } from "@/lib/site-state";

/** department names stay in English in both locales — they are the org's own labels */
const POSITIONS = [
  "Content",
  "Event",
  "Human Resources",
  "External Engagement",
  "MarCom",
  "Art",
];

/** "closed" is stated calmly: the keyword block goes neutral, fuchsia is kept for "open right now" */
const QUIET_MARK = { "--kit-mark": "var(--line-strong)" } as CSSProperties;

/**
 * The page has two states, both fully built; `RECRUITING` (lib/site-state.ts)
 * picks one. Closed: the hero says the round is over and the main action is
 * following ReThink on Facebook — the form is not linked anywhere. Open: the
 * hero invites applications and the main action is the form.
 *
 * Motion storyboard (docs/design-system.md has the rules):
 *   hero         load    h1 lines rise out of a mask, the block wipes in behind
 *                        the keyword ("đã đóng" / "Gen 5")           T1
 *   hero photo   scroll  the frame opens, the team photo drifts      T2 (scene 1)
 *   departments  scroll  the six rows rise into place, one by one    T1
 *   quote        scroll  the statement rises (never hidden)          T1
 *   members      scroll  the frame opens, the photo drifts           T2 (scene 2)
 *   main action  pointer the one button that matters leans to the cursor
 */
export function JoinPage({ locale }: { locale: Locale }) {
  const t = dict[locale].join;
  const s = RECRUITING ? t.open : t.closed;
  const to = (path: string) => localePath(locale, path);
  const en = locale === "vi" ? "en" : undefined; // brand phrases are English

  const invitation = (
    <>
      {t.leadA}
      <strong>{t.leadB}</strong>
      {t.leadC}
      <strong>{t.leadD}</strong>
      {t.leadE}
    </>
  );

  return (
    <>
      {/* ============ HERO: the state of recruitment, then what to do about it ============ */}
      <section className="pt-16">
        <div className="wrap pt-[clamp(2.5rem,6vw,5rem)]">
          <p className="label mb-6 flex items-center gap-3">
            <span
              className={`mote ${RECRUITING ? "text-fuchsia-400" : "text-pearl-50"}`}
              aria-hidden="true"
            />
            {s.label}
          </p>

          <SplitReveal as="h1" trigger="load" className="h-display max-w-5xl">
            {s.h1a}
            <span className="kit-mark text-white" style={RECRUITING ? undefined : QUIET_MARK}>
              {s.h1Mark}
            </span>
            {s.h1b}
          </SplitReveal>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12">
            <div>
              {RECRUITING ? (
                <p className="lead">{invitation}</p>
              ) : (
                <p className="lead">
                  {t.closed.statusA}
                  <strong>{t.closed.statusDates}</strong>
                  {t.closed.statusB}
                </p>
              )}

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Btn
                    variant={RECRUITING ? "brand" : "solid"}
                    href={RECRUITING ? JOIN_FORM : FACEBOOK}
                    external
                    arrow
                  >
                    {s.mainCta}
                  </Btn>
                </Magnetic>
                {RECRUITING ? (
                  <Btn variant="line" href={FACEBOOK} external arrow>
                    {s.secondCta}
                  </Btn>
                ) : (
                  <Btn variant="line" href={to("/about")}>
                    {s.secondCta}
                  </Btn>
                )}
              </div>

              {RECRUITING && (
                <div className="mt-8 max-w-md">
                  <p className="body">
                    <strong>{t.period}</strong>
                  </p>
                  <p className="small mt-2">{t.periodNote}</p>
                </div>
              )}
            </div>

            <figure>
              <Parallax className="photo photo-lg aspect-[4/3]" depth={8}>
                <Image
                  src="/photos/tedx-team.jpg"
                  alt={t.altHero}
                  fill
                  priority
                  sizes="(min-width: 1320px) 596px, (min-width: 1024px) 46vw, 100vw"
                />
              </Parallax>
              <figcaption className="small mt-3 flex items-center gap-2.5">
                <span className="mote text-cyan-300" aria-hidden="true" />
                <span>
                  <TedxText>{t.heroCaption}</TedxText>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ DEPARTMENTS: sticky heading, six rows ============ */}
      <section id="departments" className="sec">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SplitReveal as="h2" className="h-section">
                {s.deptHeading}
              </SplitReveal>
              {/* open: the invitation is the hero's lead; closed: it introduces the departments */}
              {!RECRUITING && <p className="lead mt-6">{invitation}</p>}
            </div>
          </div>

          <dl className="rows lg:col-span-8">
            {POSITIONS.map((name, i) => (
              <Rise
                key={name}
                index={i}
                className="grid gap-2 py-6 sm:grid-cols-[17rem_1fr] sm:gap-8 sm:py-7"
              >
                <dt className="h-card" lang={en}>
                  {name}
                </dt>
                <dd className="body">{t.positions[i]}</dd>
              </Rise>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ THE INVITATION, AS A STATEMENT + the people it comes from ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <Rise as="figure" className="border-t border-[var(--line)] pt-[clamp(2.5rem,5vw,4.5rem)]">
            <blockquote lang={en}>
              <p className="h-section max-w-5xl">{t.quote}</p>
            </blockquote>
            <figcaption className="small mt-7 flex items-center gap-2.5" lang={en}>
              <span className="mote text-fuchsia-400" aria-hidden="true" />
              {t.quoteBy}
            </figcaption>
          </Rise>

          <figure className="mt-[clamp(3rem,6vw,5rem)]">
            <Parallax className="photo photo-lg aspect-[4/3] sm:aspect-[21/9]" depth={8}>
              <Image
                src="/photos/balcony.jpg"
                alt={t.altMembers}
                fill
                sizes="(min-width: 1320px) 1240px, 100vw"
              />
            </Parallax>
            <figcaption className="small mt-3 flex items-center gap-2.5">
              <span className="mote text-cyan-300" aria-hidden="true" />
              {t.membersCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============ NEXT STEP: one wide tile for the main action, one for About ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section max-w-3xl">
            {s.nextA} <span className="tone-2">{s.nextB}</span>
          </SplitReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-12">
            <a
              href={RECRUITING ? JOIN_FORM : FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className={`tile md:col-span-7 ${RECRUITING ? "tile-brand" : ""}`}
            >
              <span className="small">{s.tileNote}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{s.tileTitle}</span>
                <span className="tile-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
            <Link href={to("/about")} className="tile md:col-span-5">
              <span className="small">{t.aboutTileNote}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{t.aboutTile}</span>
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
