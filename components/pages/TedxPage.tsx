import Image from "next/image";
import Link from "next/link";
import { Btn } from "@/components/Btn";
import { Tedx, TedxText } from "@/components/Tedx";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { RECRUITING, TEDX_2026_SITE } from "@/lib/site-state";

/* Theme names are brand phrases: verbatim in both languages */
const FIRSTS = "The Firsts";

/**
 * The season archive, newest first. What we may say about each season is
 * fixed (see lib/i18n/tedx.ts): 2026 = name + year + its own site, 2025 = the
 * season this page documents, 2024 / 2023 = name + year, write-up pending.
 */
const SEASONS = [
  { year: "2026", title: "Limitless Decade", kind: "site" },
  { year: "2025", title: FIRSTS, kind: "here", img: "/photos/tedx-thanks.jpg", alt: "altThumb2025" },
  { year: "2024", title: "The New Dawn", kind: "pending", img: "/photos/tedx-purple-2.jpg", alt: "altThumb2024" },
  { year: "2023", title: "Reinvent the Wheel", kind: "pending", img: "/photos/stage-2023.jpg", alt: "altThumb2023" },
] as const;

/**
 * Motion storyboard (docs/design-system.md has the rules):
 *   hero      load    h1 lines rise out of a mask; the stage photo opens
 *                     and drifts in its frame                            T1 + T2 (scene 1)
 *   seasons   scroll  the four rows rise one after another, newest first  T1
 *   Firsts    scroll  the audience photo opens and drifts in its frame    T2 (scene 2)
 *   photos    scroll  each frame wipes open (images only)                 T1
 *   the rest  scroll  blocks rise into place (never hidden)               T1
 * One <Magnetic>: the hero's main action.
 */
export function TedxPage({ locale }: { locale: Locale }) {
  const t = dict[locale].tedx;
  const to = (path: string) => localePath(locale, path);
  const en = locale === "vi" ? "en" : undefined; // brand phrases are English

  return (
    <>
      {/* ============ HERO: the name across the page, then the stage ============ */}
      <section className="relative overflow-hidden pt-16">
        <div className="wrap pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(2rem,4.5vw,3.5rem)]">
          <p className="label mb-5 flex items-center gap-3" lang={en}>
            <span className="mote text-fuchsia-400" aria-hidden="true" />
            {t.presents}
          </p>

          <SplitReveal as="h1" trigger="load" className="h-display">
            <Tedx /> VinUniversity <span className="tone-2">{t.h1Rest}</span>
          </SplitReveal>

          <div className="mt-8 grid gap-8 lg:mt-11 lg:grid-cols-12 lg:gap-12">
            <figure className="lg:col-span-8">
              <Parallax className="photo photo-lg aspect-[3/2] lg:aspect-[16/10]" depth={8}>
                <Image
                  src="/photos/tedx-stage.jpg"
                  alt={t.altHero}
                  fill
                  priority
                  sizes="(min-width: 1320px) 820px, (min-width: 1024px) 66vw, 100vw"
                />
              </Parallax>
              <figcaption className="small mt-3 flex items-center gap-2.5">
                <span className="mote text-cyan-300" aria-hidden="true" />
                <span>{t.heroCaption}</span>
              </figcaption>
            </figure>

            {/* lead at the photo's top edge, actions at its bottom edge */}
            <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-between lg:pb-9">
              <p className="lead">{t.heroLead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Btn variant="ted" href="#seasons" arrow>
                    {t.heroBtn1}
                  </Btn>
                </Magnetic>
                {RECRUITING ? (
                  <Btn variant="brand" href={to("/join")} arrow>
                    {t.heroBtn2}
                  </Btn>
                ) : (
                  <Btn variant="line" href="#the-firsts">
                    {t.heroBtnFirsts}
                  </Btn>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="spectrum-line" aria-hidden="true" />
      </section>

      {/* ============ THE SEASONS: one panel, a row per year, newest first ============ */}
      <section id="seasons" className="mt-[clamp(2.5rem,6vw,5rem)] px-[calc(var(--gutter)/2)]">
        <div className="panel">
          <div className="wrap py-[clamp(3rem,7vw,6.5rem)]">
            <SplitReveal as="h2" className="h-section">
              {t.seasonsHeadingA} <span className="tone-2">{t.seasonsHeadingB}</span>
            </SplitReveal>

            <ol className="rows mt-10">
              {SEASONS.map((season, i) => (
                <Rise
                  as="li"
                  key={season.year}
                  index={i}
                  className="grid grid-cols-[1fr_7rem] items-start gap-x-5 gap-y-4 py-8 lg:grid-cols-12 lg:items-center lg:gap-x-8"
                >
                  <div
                    className={`lg:col-span-5 lg:flex lg:items-baseline lg:gap-8 ${
                      season.kind === "site" ? "col-span-2" : ""
                    }`}
                  >
                    <p className="figure lg:w-[9.5rem] lg:flex-none">{season.year}</p>
                    <h3 className="h-card mt-2 lg:mt-0" lang={en}>
                      {season.title}
                    </h3>
                  </div>

                  <div className="col-span-2 lg:col-span-4">
                    <p className="body">
                      {season.kind === "site" && t.s2026Desc}
                      {season.kind === "here" && t.s1Desc}
                      {season.kind === "pending" && t.pastNote}
                    </p>
                    {season.kind === "here" && (
                      <Btn variant="line" href="#the-firsts" className="mt-5">
                        {t.s1Btn}
                      </Btn>
                    )}
                  </div>

                  {season.kind === "site" ? (
                    <div className="col-span-2 lg:col-span-3 lg:justify-self-end">
                      <Btn variant="ted" href={TEDX_2026_SITE} external arrow>
                        {t.s2026Btn}
                      </Btn>
                    </div>
                  ) : (
                    <div className="photo col-start-2 row-start-1 aspect-[3/2] lg:col-span-3 lg:col-start-10">
                      <Image
                        src={season.img}
                        alt={t[season.alt]}
                        fill
                        sizes="(min-width: 1024px) 300px, 112px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </Rise>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ THE FIRSTS, 2025: heading + lead, the room, the numbers ============ */}
      <section id="the-firsts" className="sec">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SplitReveal as="h2" className="h-section lg:col-span-5">
              <span lang={en}>{FIRSTS}</span> <span className="tone-2">2025</span>
            </SplitReveal>
            <p className="lead lg:col-span-6 lg:col-start-7">
              {t.heroLeadA}
              <strong>{t.heroTheme}</strong>
              {t.heroLeadB}
            </p>
          </div>

          <figure className="mt-12">
            <Parallax className="photo photo-lg aspect-[4/3] sm:aspect-[21/9]" depth={10}>
              <Image
                src="/photos/tedx-audience.jpg"
                alt={t.altAudience}
                fill
                sizes="(min-width: 1320px) 1240px, 100vw"
              />
            </Parallax>
            <figcaption className="small mt-3 flex items-center gap-2.5">
              <span className="mote text-cyan-300" aria-hidden="true" />
              <span>{t.audienceCaption}</span>
            </figcaption>
          </figure>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-12">
            {t.stats.map(([figure, label], i) => (
              <Rise
                key={label}
                index={i % 3}
                className="flex flex-col-reverse justify-end gap-3 border-t border-[var(--line-strong)] pt-5"
              >
                <dt className="max-w-[17rem] text-[0.9375rem] leading-snug text-[var(--text-2)]">{label}</dt>
                <dd className="figure">{figure}</dd>
              </Rise>
            ))}
          </dl>
          <p className="small mt-8 flex items-center gap-2.5">
            <span className="mote text-cyan-300" aria-hidden="true" />
            <span>{t.statsSource}</span>
          </p>
        </div>
      </section>

      {/* ============ BEHIND THE STAGE: sticky heading, the account, one voice ============ */}
      <section className="sec !pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="label mb-4" lang={en}>
                {t.behindKicker}
              </p>
              <SplitReveal as="h2" className="h-section">
                {t.behindHeading1} <span className="tone-2">{t.behindHeading2}</span>
              </SplitReveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Rise className="measure space-y-6">
              <p className="lead">
                <TedxText>{t.behindP1}</TedxText>
              </p>
              <p className="body">
                {t.behindP2.map((part, i) =>
                  i % 2 === 1 ? <strong key={i}>{part}</strong> : <TedxText key={i}>{part}</TedxText>,
                )}
              </p>
            </Rise>

            <Rise as="figure" className="mt-12 border-t border-[var(--line)] pt-10">
              <blockquote
                lang="en"
                className="max-w-2xl font-display text-[clamp(1.5rem,1.1rem+1.5vw,2.25rem)] font-light leading-[1.3] text-pearl-50"
              >
                {t.testimonial}
              </blockquote>
              <figcaption className="small mt-5 flex items-center gap-2.5">
                <span className="mote text-fuchsia-400" aria-hidden="true" />
                <span>
                  <TedxText>{t.testimonialBy}</TedxText>
                </span>
              </figcaption>
            </Rise>
          </div>
        </div>
      </section>

      {/* ============ PHOTOS: a mosaic, one tall frame against two uneven rows ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section">
            {t.galleryHeading} <span lang={en}>{FIRSTS}</span>
          </SplitReveal>

          {/* phones: 2-column mosaic (wrappers are `contents`); desktop: tall frame + two justified rows */}
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
            <Rise kind="wipe" className="photo order-2 row-span-2 lg:order-none lg:col-span-4 lg:row-auto">
              <Image
                src="/photos/tedx-redcarpet.jpg"
                alt={t.altRedcarpet}
                fill
                sizes="(min-width: 1024px) 400px, 50vw"
                className="object-cover"
              />
            </Rise>

            <div className="contents lg:col-span-8 lg:flex lg:flex-col lg:gap-4">
              <div className="contents lg:flex lg:items-start lg:gap-4">
                <Rise
                  kind="wipe"
                  index={1}
                  className="photo order-1 col-span-2 aspect-[10/7] lg:order-none lg:min-w-0 lg:flex-[1.43_1_0%]"
                >
                  <Image
                    src="/photos/tedx-team.jpg"
                    alt={t.altTeam}
                    fill
                    sizes="(min-width: 1024px) 440px, 100vw"
                    className="object-cover"
                  />
                </Rise>
                <Rise
                  kind="wipe"
                  index={2}
                  className="photo order-3 aspect-[16/13] lg:order-none lg:min-w-0 lg:flex-[1.23_1_0%]"
                >
                  <Image
                    src="/photos/tedx-speakers.jpg"
                    alt={t.altSpeakers}
                    fill
                    sizes="(min-width: 1024px) 380px, 50vw"
                    className="object-cover object-bottom"
                  />
                </Rise>
              </div>
              <div className="contents lg:flex lg:items-start lg:gap-4">
                <Rise
                  kind="wipe"
                  index={1}
                  className="photo order-5 col-span-2 aspect-[16/9] lg:order-none lg:min-w-0 lg:flex-[1.78_1_0%]"
                >
                  <Image
                    src="/photos/tedx-backdrop.jpg"
                    alt={t.altBackdrop}
                    fill
                    sizes="(min-width: 1024px) 450px, 100vw"
                    className="object-cover object-[50%_60%]"
                  />
                </Rise>
                <Rise
                  kind="wipe"
                  index={2}
                  className="photo order-4 aspect-[3/2] lg:order-none lg:min-w-0 lg:flex-[1.5_1_0%]"
                >
                  <Image
                    src="/photos/tedx-expert.jpg"
                    alt={t.altExpert}
                    fill
                    sizes="(min-width: 1024px) 380px, 50vw"
                    className="object-cover"
                  />
                </Rise>
              </div>
            </div>
          </div>

          <p className="small mt-4 flex items-center gap-2.5">
            <span className="mote text-cyan-300" aria-hidden="true" />
            <span>
              <TedxText>{t.galleryCaption}</TedxText>
            </span>
          </p>
        </div>
      </section>

      {/* ============ NEXT STEP: two uneven tiles ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-display max-w-4xl">
            {t.ctaHeading1} <span className="tone-2">{t.ctaHeading2}</span>
          </SplitReveal>
          <p className="lead measure mt-6">
            {t.ctaLead}
            {RECRUITING && ` ${t.ctaLeadOpen}`}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <Link href={to("/about")} className={`tile md:col-span-7 ${RECRUITING ? "" : "tile-brand"}`}>
              <span className="small">{t.ctaAboutNote}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{t.ctaAbout}</span>
                <span className="tile-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </Link>
            <Link href={to("/join")} className={`tile md:col-span-5 ${RECRUITING ? "tile-brand" : ""}`}>
              <span className="small">{RECRUITING ? t.ctaJoinOpen : t.ctaJoinClosed}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="h-section">{RECRUITING ? t.ctaBtn : t.ctaJoin}</span>
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
