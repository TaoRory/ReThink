import Image from "next/image";
import Link from "next/link";
import { TedxText } from "@/components/Tedx";
import { Parallax } from "@/components/motion/Parallax";
import { Rise } from "@/components/motion/Rise";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { dict, localePath, type Locale } from "@/lib/i18n";
import { RECRUITING } from "@/lib/site-state";

/* The organisation's own names: verbatim in both languages */
const DEPARTMENTS = ["Content", "MarCom", "Art", "Human Resources", "External Engagement", "Event"];
const CULTURES = ["Championship", "Fellowship", "Breakership"];
/* in-page index, same order as `about.index` */
const INDEX = ["story", "departments", "culture", "benefits"];

/**
 * Motion storyboard (docs/design-system.md has the rules):
 *   hero       load    h1 lines rise out of a mask, the mark wipes in behind
 *                      "tổ chức sinh viên": this is what ReThink is       T1
 *   hero photo scroll  the frame opens, the photo drifts: real people
 *                      before any claim                                   T2 (scene 1)
 *   headings   scroll  h2 lines rise out of a mask, once                  T1
 *   lists      scroll  rows and blocks rise into place (never hidden)     T1
 *   photos     scroll  the three small frames wipe open                   T1
 *   belonging  scroll  the quote rises, then the balcony photo opens and
 *                      drifts: the people the quote is about              T2 (scene 2)
 * No loop, no canvas, no pointer effect on this page.
 */
export function AboutPage({ locale }: { locale: Locale }) {
  const t = dict[locale].about;
  const home = dict[locale].home;
  const to = (path: string) => localePath(locale, path);
  const en = locale === "vi" ? "en" : undefined; // brand phrases are English

  const tedxTile = (
    <Link key="tedx" href={to("/tedx")} className="tile">
      <span className="small">{t.tedxTileNote}</span>
      <span className="flex items-end justify-between gap-6">
        <span className="h-section">
          <TedxText>{dict[locale].nav.tedx}</TedxText>
        </span>
        <span className="tile-arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );
  /* fuchsia only while applications are open; otherwise a plain tile that says the round has closed */
  const joinTile = (
    <Link key="join" href={to("/join")} className={`tile ${RECRUITING ? "tile-brand" : ""}`}>
      <span className="small">{RECRUITING ? home.ctaJoinOpen : home.ctaJoinClosed}</span>
      <span className="flex items-end justify-between gap-6">
        <span className="h-section">{RECRUITING ? t.becomeBtn : home.ctaJoin}</span>
        <span className="tile-arrow" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );

  return (
    <>
      {/* ============ HERO: statement across, then intro + index beside one photo ============ */}
      <section className="relative pt-16">
        <div className="wrap pb-[clamp(3rem,6vw,5.5rem)] pt-[clamp(2.5rem,6vw,5.5rem)]">
          <p className="label mb-6 flex items-center gap-3" lang={en}>
            <span className="mote text-fuchsia-400" aria-hidden="true" />
            {t.heroKicker}
          </p>

          <SplitReveal as="h1" trigger="load" className="h-display max-w-[68rem]">
            {t.heroH1a}
            <span className="kit-mark text-white">{t.heroH1Mark}</span>
            {t.heroH1b}
          </SplitReveal>

          <div className="mt-10 grid gap-x-12 gap-y-9 lg:mt-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
            <p className="lead lg:col-span-5 lg:row-start-1">{t.heroIntro}</p>

            <figure className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
              <Parallax className="photo photo-lg aspect-[4/3] lg:aspect-[16/10]" depth={8}>
                <Image
                  src="/photos/booth.jpg"
                  alt={t.altBooth}
                  fill
                  priority
                  sizes="(min-width: 1320px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className="object-[30%_50%]"
                />
              </Parallax>
              <figcaption className="small mt-3 flex items-center gap-2.5">
                <span className="mote text-cyan-300" aria-hidden="true" />
                <span>
                  <TedxText>{t.heroPhotoCaption}</TedxText>
                </span>
              </figcaption>
            </figure>

            <nav aria-label={t.indexLabel} className="lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-end">
              <p className="small mb-3">{t.indexLabel}</p>
              <ul className="rows">
                {INDEX.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="link-quiet flex min-h-[3.25rem] items-center justify-between gap-4 text-[1.0625rem]"
                    >
                      {t.index[i]}
                      <span aria-hidden="true">↓</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="spectrum-line" aria-hidden="true" />
      </section>

      {/* ============ HOW RETHINK WORKS: a statement heading, text beside two photos ============ */}
      <section id="story" className="sec">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section max-w-4xl">
            <span className="tone-2">{t.storyP3a}</span>
            {t.storyP3b}
          </SplitReveal>

          <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
            <Rise className="measure space-y-6 lg:col-span-6">
              <p className="lead">{t.storyP3c}</p>
              <p className="body">
                {t.storyP2a}
                <strong>
                  <TedxText>{t.storyP2b}</TedxText>
                </strong>
                {t.storyP2c}
              </p>
            </Rise>

            <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5 lg:col-start-8">
              <Rise kind="wipe" className="photo aspect-[3/2]">
                <Image
                  src="/photos/team-table.jpg"
                  alt={t.altTeam}
                  fill
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="object-cover"
                />
              </Rise>
              {/* a 615px file: kept in a small frame */}
              <Rise kind="wipe" index={1} className="photo ml-auto aspect-[3/2] w-[56%]">
                <Image
                  src="/photos/workshop.jpg"
                  alt={t.altWorkshop}
                  fill
                  sizes="(min-width: 1024px) 280px, 56vw"
                  className="object-cover"
                />
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SIX DEPARTMENTS: sticky heading, definition rows ============ */}
      <section id="departments" className="sec !pt-0">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SplitReveal as="h2" className="h-section">
                {t.deptHeading} <span className="tone-2 block">{t.deptKicker}</span>
              </SplitReveal>
            </div>
          </div>

          <dl className="rows lg:col-span-8">
            {DEPARTMENTS.map((name, i) => (
              <Rise key={name} className="grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
                <dt className="h-card" lang={en}>
                  {name}
                </dt>
                <dd className="body">{t.departments[i]}</dd>
              </Rise>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ THREE CULTURES: one dark chapter, the names set large ============ */}
      <section id="culture" className="px-[calc(var(--gutter)/2)]">
        <div className="panel">
          <div className="wrap py-[clamp(3rem,7vw,6.5rem)]">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
              <SplitReveal as="h2" className="h-section lg:col-span-6">
                {t.cultureHeading}
              </SplitReveal>
              <p className="lead lg:col-span-5 lg:col-start-8">{t.cultureLead}</p>
            </div>

            <ul className="mt-12 space-y-12 lg:mt-20 lg:space-y-16">
              {CULTURES.map((name, i) => (
                <Rise as="li" key={name} className="lg:grid lg:grid-cols-12 lg:gap-x-12">
                  <h3
                    className="h-section text-[length:clamp(2.25rem,1rem+5vw,4.75rem)] leading-[1.08] lg:col-span-12"
                    lang={en}
                  >
                    {name} <span className="tone-2">Culture</span>
                  </h3>
                  <p className="body mt-4 max-w-[46rem] lg:col-span-7 lg:col-start-6 lg:mt-6">{t.cultures[i]}</p>
                </Rise>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS: three lists and one photo on a two-by-two grid ============ */}
      <section id="benefits" className="sec">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section max-w-3xl">
            {t.benefitHeading}
          </SplitReveal>

          <div className="mt-12 grid gap-x-12 gap-y-14 lg:grid-cols-2">
            {t.benefits.map((items, i) => (
              <Rise
                as="article"
                key={t.benefitTitles[i]}
                index={i % 2}
                className={i === 0 ? "order-1" : i === 1 ? "order-3" : "order-4"}
              >
                <h3 className="h-card border-t border-[var(--line-strong)] pt-6">{t.benefitTitles[i]}</h3>
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li key={item} className="body flex gap-4">
                      <span className="mote mt-[0.72em] text-cyan-300" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Rise>
            ))}

            <Rise kind="wipe" index={1} className="photo order-2 aspect-[3/2] lg:aspect-auto lg:min-h-[20rem]">
              <Image
                src="/photos/booth-red.jpg"
                alt={t.altBoothRed}
                fill
                sizes="(min-width: 1320px) 600px, (min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </Rise>
          </div>
        </div>
      </section>

      {/* ============ BELONGING: the quote, then the people ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <blockquote lang={en}>
            <SplitReveal as="p" className="h-section max-w-4xl">
              {t.belongQuote}
            </SplitReveal>
          </blockquote>

          <Parallax className="photo photo-lg mt-12 aspect-[4/3] sm:aspect-[21/9]" depth={8}>
            <Image
              src="/photos/balcony.jpg"
              alt={t.altBalcony}
              fill
              sizes="(min-width: 1320px) 1240px, 100vw"
              className="object-[50%_70%]"
            />
          </Parallax>
        </div>
      </section>

      {/* ============ NEXT STEP: two large tiles ============ */}
      <section className="sec !pt-0">
        <div className="wrap">
          <SplitReveal as="h2" className="h-section">
            {t.nextHeading}
          </SplitReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {RECRUITING ? [joinTile, tedxTile] : [tedxTile, joinTile]}
          </div>
        </div>
      </section>
    </>
  );
}
