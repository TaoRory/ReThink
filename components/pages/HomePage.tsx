import Image from "next/image";
import Link from "next/link";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { Cradle } from "@/components/Cradle";
import { Galaxy } from "@/components/Galaxy";
import { PointerGlow } from "@/components/PointerGlow";
import { Sparkle } from "@/components/Sparkle";
import { Starfield } from "@/components/Starfield";
import { SectionHeading } from "@/components/SectionHeading";
import { dict, localePath, type Locale } from "@/lib/i18n";

/** brand phrases — verbatim in both locales */
const VALUE_TITLES = [
  "Rethink & Let Rethink",
  "Embrace Diversity",
  "Own & Act Together",
  "Reflect to Evolve",
];
const ACTIVITY_TITLES = ["Reinventors", "Rethink Reality", "TEDxVinUniversity"];
const ACTIVITY_IMGS = [
  "/photos/podcast-cover.jpg",
  "/photos/contest-reality.jpg",
  "/photos/tedx-stage.jpg",
];
const THIS_YEAR_TITLES = [
  "Interactive Cinematic Experience",
  "TEDxVinUniversity 2027",
];
const FUTURE_TITLES = [
  "Science Under 15 Minutes",
  "ReThink Offline Event",
  "ReThinkers Community Building",
];

export function HomePage({ locale }: { locale: Locale }) {
  const t = dict[locale].home;

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="smoke grain guides relative overflow-hidden pt-16">
        <Aurora sweep />
        <Galaxy />
        <Starfield density={1.35} />
        <Cradle />
        <PointerGlow />
        <Sparkle className="absolute left-[8%] top-28 h-10 w-10 text-cyan-300/70" />
        <Sparkle className="absolute right-[10%] top-48 h-16 w-16 text-cyan-400/50" />
        <Sparkle className="absolute bottom-24 left-[16%] h-6 w-6 text-lilac-200/60" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="rise mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-cyan-300/80">
            {t.weAre}
          </p>

          <h1 className="rise flex flex-wrap items-baseline justify-center gap-x-4 leading-none [animation-delay:0.1s]">
            <span className="neon-breathe font-display text-neon text-[clamp(2.6rem,10.5vw,7.5rem)] font-extralight tracking-[0.16em]">
              RETHINK
            </span>
            <span className="font-display text-neon text-[clamp(1rem,3vw,2rem)] font-extralight tracking-[0.2em]">
              26-27
            </span>
          </h1>

          <p className="rise mt-4 text-sm font-semibold uppercase tracking-[0.45em] text-cyan-300 [animation-delay:0.2s]">
            {t.since}
          </p>

          <p className="rise mx-auto mt-10 max-w-2xl font-display text-xl leading-relaxed text-pearl-100/90 italic sm:text-2xl [animation-delay:0.3s]">
            {t.heroQuotePre}
            <span className="text-cyan-300">{t.heroQuoteA}</span>
            {t.heroQuoteMid}
            <span className="text-cyan-300">{t.heroQuoteB}</span>
            {t.heroQuoteEnd}
          </p>

          <div className="rise mt-12 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.4s]">
            <Btn href={localePath(locale, "/join")} variant="primary">
              {t.joinCta} <span className="text-cyan-300">▪</span>
            </Btn>
          </div>
        </div>

        {/* value marquee */}
        <div className="relative border-y border-white/10 bg-ink-900/60 py-4 overflow-hidden">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex gap-12 text-sm font-medium uppercase tracking-[0.3em] text-pearl-100/60"
              >
                {VALUE_TITLES.map((v) => (
                  <span key={v} className="flex items-center gap-12">
                    <span>{v}</span>
                    <span className="text-cyan-400">▪</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT IS RETHINK ============ */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-2">
          <div data-reveal>
            <SectionHeading
              script="W"
              rest={t.whatHeading.slice(1)}
              kicker={t.whatKicker}
            />
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
              <p>
                {t.whatP1a}
                <strong className="text-pearl-100">{t.whatP1b}</strong>
                {t.whatP1c}
              </p>
              <p>
                {t.whatP2a}
                <strong className="text-pearl-100">{t.whatP2b}</strong>
                {t.whatP2c}
              </p>
              <p>
                {t.whatP3a}
                <em className="text-cyan-300 not-italic font-semibold">
                  {t.whatP3b}
                </em>
                {t.whatP3c}
              </p>
            </div>

            <ul className="frame-hairline mt-8 grid gap-3 p-6 text-sm text-pearl-100/80">
              {t.bullets.map(([pre, strong, post]) => (
                <li key={strong} className="flex gap-3">
                  <span className="text-cyan-400">▪</span>
                  <span>
                    {pre}
                    <strong>{strong}</strong>
                    {post}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative"
            data-reveal
            style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}
          >
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/photos/community-3.jpg"
                alt={t.altCommunity}
                width={717}
                height={478}
                className="col-span-2 rounded-2xl border border-white/10 object-cover shadow-2xl shadow-violet-800/20"
              />
              <Image
                src="/photos/team-table.jpg"
                alt={t.altTeam}
                width={614}
                height={410}
                className="rounded-2xl border border-white/10 object-cover"
              />
              <Image
                src="/photos/balcony.jpg"
                alt={t.altBalcony}
                width={614}
                height={345}
                className="rounded-2xl border border-white/10 object-cover h-full"
              />
            </div>
            <Sparkle className="absolute -right-5 -top-6 h-12 w-12 text-cyan-300/80" />
            <Sparkle className="absolute -bottom-5 -left-4 h-8 w-8 text-lilac-200/70" />
          </div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="smoke grain relative overflow-hidden border-y border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="C"
            rest={t.valuesHeading.slice(1)}
            kicker={t.valuesKicker}
            className="text-center [&>p]:justify-center"
          />
          <div className="stagger mt-14 grid gap-5 sm:grid-cols-2" data-reveal>
            {VALUE_TITLES.map((title, i) => (
              <div
                key={title}
                className="hang frame-hairline group relative bg-ink-900/50 p-7 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <span className="font-display text-2xl font-light tracking-[0.25em] text-cyan-300/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-pearl-100">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.values[i]}
                </p>
                <Sparkle
                  animate={false}
                  className="absolute right-5 top-5 h-4 w-4 text-cyan-400/40 transition group-hover:text-cyan-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="W"
            rest={t.doHeading.slice(1)}
            kicker={t.doKicker}
          />
          <div className="stagger mt-14 grid gap-6 md:grid-cols-3" data-reveal>
            {ACTIVITY_TITLES.map((title, i) => {
              const isTedx = i === 2;
              const card = (
                <article
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition hover:border-cyan-400/40"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={ACTIVITY_IMGS[i]}
                      alt={title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                      {t.activityKickers[i]}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-pearl-100">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                      {t.activities[i]}
                    </p>
                    {isTedx && (
                      <p className="mt-4 text-sm font-semibold text-cyan-300 group-hover:text-lilac-200">
                        {t.exploreTedx}
                      </p>
                    )}
                  </div>
                </article>
              );
              return isTedx ? (
                <Link key={title} href={localePath(locale, "/tedx")}>
                  {card}
                </Link>
              ) : (
                card
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TEDx BAND ============ */}
      <section className="relative overflow-hidden border-y border-white/8">
        <div className="absolute inset-0">
          <Image
            src="/photos/tedx-audience.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-fuchsia-700/40" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-24" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-400">
            {t.tedxBandKicker}
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            <span className="text-neon-cyan">TEDx</span>
            <span className="text-pearl-100">VinUniversity</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-pearl-100/80">
            {t.tedxBandP1}
            <strong className="text-pearl-100">{t.tedxBandTheme}</strong>
            {t.tedxBandP2}
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {t.tedxStats.map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl font-bold text-pearl-100">
                  {n}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-pearl-100/60">
                  {l}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Btn href={localePath(locale, "/tedx")} variant="red">
              {t.tedxBtn1}
            </Btn>
            <Btn href="https://v0-tedxvinuni.vercel.app/" external variant="ghost">
              {t.tedxBtn2}
            </Btn>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS THIS YEAR ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="P"
            rest={t.thisYearHeading.slice(1)}
            kicker={t.thisYearKicker}
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            {t.thisYearLead}
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-2" data-reveal>
            {THIS_YEAR_TITLES.map((title, i) => (
              <article
                key={title}
                className="hang frame-hairline relative bg-ink-900/50 p-8 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <div className="flex items-center gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    {t.thisYear[i].kicker}
                  </p>
                  <span className="rounded-full border border-cyan-400/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    {t.comingSoon}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-pearl-100">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.thisYear[i].desc}
                </p>
                <Sparkle
                  animate={false}
                  className="absolute right-6 top-6 h-4 w-4 text-cyan-400/40"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ KEY ACTIVITIES ============ */}
      <section className="smoke grain relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="K"
            rest={t.keyHeading.slice(1)}
            kicker={t.keyKicker}
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            {t.keyLead}
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-3" data-reveal>
            {FUTURE_TITLES.map((title, i) => (
              <div
                key={title}
                className="hang relative rounded-2xl border border-white/10 bg-ink-900/50 p-7 backdrop-blur-sm"
              >
                <span className="font-display text-5xl font-bold text-violet-500/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-lilac-200">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.future[i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOIN CTA ============ */}
      <section className="relative overflow-hidden border-t border-white/8 py-28 text-center">
        <Aurora sweep className="opacity-80" />
        <Starfield density={0.7} />
        <Sparkle className="absolute left-[12%] top-14 h-8 w-8 text-cyan-300/60" />
        <Sparkle className="absolute right-[14%] bottom-16 h-12 w-12 text-cyan-400/50" />
        <div className="relative mx-auto max-w-3xl px-5" data-reveal>
          <h2 className="font-display text-4xl leading-tight text-pearl-100 sm:text-5xl">
            Let&apos;s Rethink.
            <br />
            Let&apos;s be{" "}
            <span className="text-neon font-bold">ReThinkers!</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-pearl-100/70">
            {t.ctaLead}
          </p>
          <Btn
            href={localePath(locale, "/join")}
            variant="primary"
            className="mt-10"
          >
            {t.ctaBtn} <span className="text-cyan-300">▪</span>
          </Btn>
        </div>
      </section>
    </>
  );
}
