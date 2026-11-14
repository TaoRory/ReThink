import Image from "next/image";
import Link from "next/link";
import { Btn } from "@/components/Btn";
import { CradleStage } from "@/components/CradleStage";
import { Tedx, TedxText } from "@/components/Tedx";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { RECRUITING, TEDX_2026_SITE } from "@/lib/site-state";

/* Brand names: verbatim in both languages */
const VALUE_TITLES = [
  "Rethink & Let Rethink",
  "Embrace Diversity",
  "Own & Act Together",
  "Reflect to Evolve",
];
const SIDE_WORK = [
  { title: "Reinventors", img: "/photos/podcast-hachu.jpg", alt: "altPodcast" },
  { title: "Rethink Reality", img: "/photos/contest-reality.jpg", alt: "altContest" },
] as const;
const THIS_YEAR_TITLES = ["Interactive Cinematic Experience", "TEDx VinUniversity 2027"];
const FUTURE_TITLES = [
  "Science Under 15 Minutes",
  "ReThink Offline Event",
  "ReThinkers Community Building",
];

/**
 * Motion storyboard (docs/design-system.md has the rules):
 *   hero      load    h1 lines rise out of a mask, the mark wipes in behind
 *                     "nhìn lại"; the cradle swings          T1 + signature
 *   photo     scroll  the frame opens, the photo drifts      T2 (scene 1)
 *   marquee   ticker  the four values, as a breath           T1
 *   TEDx      scroll  the stage photo drifts in its frame    T2 (scene 2)
 *   the rest  scroll  blocks rise into place (never hidden)  T1
 */
export function HomePage({ locale }: { locale: Locale }) {
  const t = dict[locale].home;
  const to = (path: string) => localePath(locale, path);
  const en = locale === "vi" ? "en" : undefined; // brand phrases are English

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-16">
        <div className="wrap relative lg:grid lg:min-h-[min(100svh,58rem)] lg:grid-cols-12 lg:items-center">
          {/* the cradle hangs from the header line: above the text on phones,
              in its own column on desktop */}
          <CradleStage
            className="relative h-[11.5rem] lg:absolute lg:inset-y-0 lg:right-[var(--gutter)] lg:h-auto lg:w-[calc((100%-2*var(--gutter))*5/12)]"
            pauseLabel={t.pauseMotion}
            playLabel={t.playMotion}
          />

          <div className="relative pb-16 pt-8 lg:col-span-7 lg:py-16">
            <p className="label mb-6 flex items-center gap-3" lang={en}>
              <span className="mote text-fuchsia-400" aria-hidden="true" />
              {t.since}
            </p>

            <SplitReveal as="h1" trigger="load" className="h-display h-hero">
              {t.heroH1a}
              <span className="kit-mark text-white">{t.heroH1Mark}</span>
              {t.heroH1b}
            </SplitReveal>

            <p className="lead mt-7 max-w-xl">
              {t.heroLeadA}
              <Tedx /> VinUniversity
              {t.heroLeadB}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {RECRUITING && (
                <Magnetic>
                  <Btn variant="brand" href={to("/join")} arrow>
                    {t.joinCta}
                  </Btn>
                </Magnetic>
              )}
              {RECRUITING ? (
                <Btn variant="line" href={to("/about")}>
                  {t.heroCtaAbout}
                </Btn>
              ) : (
                <Magnetic>
                  <Btn href={to("/about")} arrow>
                    {t.heroCtaAbout}
                  </Btn>
                </Magnetic>
              )}
              <Btn variant="ted" href={to("/tedx")}>
                <Tedx /> VinUniversity
              </Btn>
            </div>
          </div>
        </div>
        <div className="spectrum-line" aria-hidden="true" />
      </section>

      {/* ============ REAL PEOPLE, FIRST ============ */}
      <section className="wrap pt-[clamp(2.5rem,6vw,5rem)]">
        <figure>
          <Parallax className="photo photo-lg aspect-[4/3] sm:aspect-[21/9]" depth={10}>
            <Image
              src="/photos/community-3.jpg"
              alt={t.altCommunity}
              fill
              priority
              sizes="(min-width: 1320px) 1240px, 100vw"
            />
          </Parallax>
          <figcaption className="small mt-3 flex items-center gap-2.5">
            <span className="mote text-cyan-300" aria-hidden="true" />
            {t.heroPhotoCaption}
          </figcaption>
        </figure>
      </section>

      {/* ============ VALUES MARQUEE (decorative: the same words are a section below) ============ */}
      <div className="pt-[clamp(3rem,7vw,6rem)]" aria-hidden="true">
        <VelocityMarquee className="border-y border-white/12 py-5">
          {VALUE_TITLES.map((value) => (
            <span
              key={value}
              className="flex items-center gap-10 pr-10 font-display text-[clamp(1.375rem,1rem+1.6vw,2.25rem)] font-light text-pearl-50"
            >
              {value}
              <span className="mote text-fuchsia-400" />
            </span>
          ))}
        </VelocityMarquee>
      </div>

      {/* ============ WHAT IS RETHINK: sticky heading, text on the right ============ */}
      <section className="sec">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SplitReveal as="h2" className="h-section">
                {t.whatHeading}
              </SplitReveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Rise className="measure space-y-6">
              <p className="lead">
                {t.whatP1a}
                <strong>{t.whatP1b}</strong>
                {t.whatP1c}
              </p>
              <p className="body">
                {t.whatP2a}
                <strong>
                  <TedxText>{t.whatP2b}</TedxText>
                </strong>
                {t.whatP2c}
              </p>
              <p className="body">
                {t.whatP3a}
                <strong>{t.whatP3b}</strong>
                {t.whatP3c}
              </p>
            </Rise>

            <ul className="rows mt-10">
              {t.bullets.map(([, name, desc], i) => (
                <Rise as="li" key={name} index={i} className="grid gap-2 py-6 sm:grid-cols-[16rem_1fr] sm:gap-8">
                  <span className="h-card" lang={en}>
                    {name}
                  </span>
                  <span className="body first-letter:uppercase">{desc.replace(/^:\s*/, "")}</span>
                </Rise>
              ))}
            </ul>

            <div className="mt-12 grid grid-cols-5 gap-3 sm:gap-4">
              <Rise kind="wipe" className="photo col-span-3 aspect-[4/3]">
                <Image
                  src="/photos/team-table.jpg"
                  alt={t.altTeam}
                  fill
                  sizes="(min-width: 1024px) 480px, 60vw"
                  className="object-cover"
                />
              </Rise>
              <Rise kind="wipe" index={1} className="photo col-span-2 aspect-[4/5] self-end">
                <Image
                  src="/photos/balcony.jpg"
                  alt={t.altBalcony}
                  fill
                  sizes="(min-width: 1024px) 320px, 40vw"
                  className="object-cover"
                />
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES: rows inside one panel ============ */}
      <section className="px-[calc(var(--gutter)/2)]">
        <div className="panel">
          <div className="wrap py-[clamp(3rem,7vw,6.5rem)]">
            <SplitReveal as="h2" className="h-section">
              {t.valuesHeading}
            </SplitReveal>
            <dl className="rows mt-10">
              {VALUE_TITLES.map((title, i) => (
                <Rise key={title} index={i} className="grid gap-3 py-7 lg:grid-cols-12 lg:gap-8">
                  <dt className="h-card flex items-center gap-4 lg:col-span-5" lang={en}>
                    <span className="mote text-fuchsia-400" aria-hidden="true" />
                    {title}
                  </dt>
                  <dd className="body lg:col-span-7">{t.values[i]}</dd>
                </Rise>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO: one big project, then a list ============ */}
      <section className="sec">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section">
            {t.doHeading}
          </SplitReveal>

          <article className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Parallax className="photo photo-lg aspect-[4/3] lg:col-span-7" depth={8}>
              <Image
                src="/photos/tedx-stage.jpg"
                alt={t.altTedxStage}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </Parallax>

            <div className="lg:col-span-5">
              <p className="label">{t.tedxBandKicker}</p>
              <h3 className="h-section mt-3">
                <Tedx /> VinUniversity
              </h3>
              <p className="body mt-5">
                {t.tedxBandP1}
                <strong>{t.tedxBandTheme}</strong>
                {t.tedxBandP2}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
                {t.tedxStats.map(([figure, label]) => (
                  <div key={label} className="flex flex-col-reverse gap-2">
                    <dt className="small">{label}</dt>
                    <dd className="figure">{figure}</dd>
                  </div>
                ))}
              </dl>
              <p className="small mt-5 flex items-center gap-2.5">
                <span className="mote text-cyan-300" aria-hidden="true" />
                {t.tedxStatsSource}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Btn variant="ted" href={to("/tedx")} arrow>
                  {t.tedxBtn1}
                </Btn>
                <Btn variant="line" href={TEDX_2026_SITE} external arrow>
                  {t.tedxBtn2}
                </Btn>
              </div>
            </div>
          </article>

          <ul className="rows mt-16">
            {SIDE_WORK.map((work, i) => (
              <Rise
                as="li"
                key={work.title}
                index={i}
                className="grid grid-cols-[5.5rem_1fr] gap-x-5 gap-y-4 py-8 lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                <div className="photo aspect-square lg:col-span-2">
                  <Image src={work.img} alt={t[work.alt]} fill sizes="200px" className="object-cover" />
                </div>
                <div className="self-center lg:col-span-4">
                  <p className="label">{t.activityKickers[i + 1]}</p>
                  <h3 className="h-card mt-2" lang={en}>
                    {work.title}
                  </h3>
                </div>
                <p className="body col-span-2 lg:col-span-6">{t.activities[i + 1]}</p>
              </Rise>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ THIS YEAR ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SplitReveal as="h2" className="h-section lg:col-span-6">
              {t.thisYearHeading} <span className="tone-2">{t.thisYearKicker}</span>
            </SplitReveal>
            <p className="lead lg:col-span-5 lg:col-start-8">{t.yearLead}</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {THIS_YEAR_TITLES.map((title, i) => (
              <Rise
                as="article"
                key={title}
                index={i}
                className="panel flex min-h-[18rem] flex-col justify-between gap-10 p-[clamp(1.5rem,3vw,2.5rem)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="label">{t.thisYear[i].kicker}</p>
                  <p className="small rounded-full border border-white/24 px-3 py-1.5">{t.comingSoon}</p>
                </div>
                <div>
                  <h3 className="h-section" lang={en}>
                    <TedxText>{title}</TedxText>
                  </h3>
                  <p className="body mt-4 max-w-md">{t.thisYear[i].desc}</p>
                </div>
              </Rise>
            ))}
          </div>

          <div className="mt-20 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="h-card">{t.keyHeading}</h3>
              <p className="body mt-3">{t.keyLead}</p>
            </div>
            <ul className="rows lg:col-span-8">
              {FUTURE_TITLES.map((title, i) => (
                <Rise as="li" key={title} index={i} className="grid gap-2 py-6 sm:grid-cols-[18rem_1fr] sm:gap-8">
                  <span className="h-card" lang={en}>
                    {title}
                  </span>
                  <span className="body">{t.future[i]}</span>
                </Rise>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ NEXT STEP: two large tiles ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-display max-w-4xl">
            <span lang={en}>
              Let&rsquo;s Rethink. <span className="tone-2">Let&rsquo;s be ReThinkers!</span>
            </span>
          </SplitReveal>
          <p className="lead measure mt-6">{t.ctaLead}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
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
