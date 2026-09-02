import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { Sparkle } from "@/components/Sparkle";
import { dict, localePath, type Locale } from "@/lib/i18n";

const TEDX_URL = "https://v0-tedxvinuni.vercel.app/";

const GALLERY = [
  { src: "/photos/tedx-stage.jpg", span: true },
  { src: "/photos/tedx-speakers.jpg" },
  { src: "/photos/tedx-redcarpet.jpg" },
  { src: "/photos/tedx-team.jpg" },
  { src: "/photos/tedx-expert.jpg" },
  { src: "/photos/tedx-backdrop.jpg", span: true },
];

export function TedxPage({ locale }: { locale: Locale }) {
  const t = dict[locale].tedx;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image
            src="/photos/tedx-audience.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/80 to-ink-950" />
          <div className="absolute inset-0 bg-[radial-gradient(50rem_28rem_at_75%_10%,rgba(192,26,51,0.28),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-pearl-100/70">
            {t.presents}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,9.5vw,4.5rem)] font-bold leading-none sm:text-7xl">
            <span className="text-neon-red">TEDx</span>
            <span className="text-pearl-100">VinUniversity</span>
          </h1>
          <p className="mt-4 font-display text-[clamp(1.9rem,7vw,3.1rem)] font-extralight uppercase tracking-[0.3em] text-neon-red">
            The Firsts
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-pearl-100/80">
            {t.heroLeadA}
            <strong className="text-pearl-100">{t.heroTheme}</strong>
            {t.heroLeadB}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Btn href="#seasons" variant="red">
              {t.heroBtn1} ▪
            </Btn>
            <Btn href={localePath(locale, "/join")} variant="ghost">
              {t.heroBtn2}
            </Btn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/8 bg-ink-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-16 sm:grid-cols-3 lg:grid-cols-6">
          {t.stats.map(([n, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl font-bold text-fuchsia-400">
                {n}
              </p>
              <p className="mx-auto mt-2 max-w-[10rem] text-xs leading-relaxed text-pearl-100/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Two seasons */}
      <section id="seasons" className="relative overflow-hidden py-24">
        <Aurora sweep className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-400">
              {t.seasonsKicker}
            </p>
            <h2 className="mt-4 font-display text-4xl text-pearl-100 sm:text-5xl">
              {t.seasonsHeading}
            </h2>
          </div>

          <div className="stagger grid gap-6 md:grid-cols-2" data-reveal>
            {/* The Firsts 2025 */}
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/photos/tedx-stage.jpg"
                  alt={t.gallery[0]}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink-950/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-pearl-100 backdrop-blur">
                  {t.s1Badge}
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-3xl font-bold">
                  <span className="text-neon-red">The</span>{" "}
                  <span className="text-pearl-100">Firsts</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.s1Desc}
                </p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                  {t.s1Cue}
                </p>
              </div>
            </article>

            {/* Limitless Decade 2026 */}
            <a
              href={TEDX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-gradient-to-b from-fuchsia-700/25 via-ink-900/70 to-ink-900/60 transition hover:border-fuchsia-400/60"
            >
              <div className="relative flex h-52 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(24rem_14rem_at_50%_120%,rgba(192,26,51,0.4),transparent_65%)] transition duration-700 group-hover:scale-110" />
                <Sparkle className="absolute left-[12%] top-8 h-6 w-6 text-fuchsia-400/70" />
                <Sparkle className="absolute right-[14%] bottom-8 h-9 w-9 text-lilac-200/50" />
                <p className="relative font-display text-4xl font-extralight uppercase tracking-[0.28em] text-neon-red">
                  Limitless
                </p>
                <span className="absolute left-5 top-5 rounded-full border border-fuchsia-400/40 bg-ink-950/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-400 backdrop-blur">
                  {t.s2Badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl font-bold">
                  <span className="text-neon-red">Limitless</span>{" "}
                  <span className="text-pearl-100">Decade</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.s2Desc}
                </p>
                <p className="mt-auto pt-5 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400 transition group-hover:text-fuchsia-300">
                  {t.s2Cue}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-14 px-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-400">
              {t.behindKicker}
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-pearl-100 sm:text-5xl">
              {t.behindHeading1}
              <br />
              {t.behindHeading2}
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
              <p>{t.behindP1}</p>
              <p>
                {t.behindP2[0]}
                <strong className="text-pearl-100">{t.behindP2[1]}</strong>
                {t.behindP2[2]}
                <strong className="text-pearl-100">{t.behindP2[3]}</strong>
                {t.behindP2[4]}
                <strong className="text-pearl-100">{t.behindP2[5]}</strong>
                {t.behindP2[6]}
                <strong className="text-pearl-100">{t.behindP2[7]}</strong>
                {t.behindP2[8]}
                <strong className="text-pearl-100">{t.behindP2[9]}</strong>
                {t.behindP2[10]}
              </p>
            </div>

            {/* testimonial */}
            <figure className="frame-hairline mt-8 bg-ink-900/50 p-6">
              <blockquote className="font-display text-lg italic leading-relaxed text-pearl-100/90">
                {t.testimonial}
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-pearl-100/50">
                {t.testimonialBy}
              </figcaption>
            </figure>

            <a
              href={TEDX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-semibold text-fuchsia-400 underline-offset-4 hover:underline"
            >
              {t.seasonLink}
            </a>
          </div>

          {/* Gallery */}
          <div className="stagger grid grid-cols-2 gap-4" data-reveal>
            {GALLERY.map((g, i) => (
              <div
                key={g.src}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  g.span ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={g.src}
                  alt={t.gallery[i]}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/8 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(42rem_24rem_at_50%_120%,rgba(192,26,51,0.25),transparent_65%)]" />
        <Sparkle className="absolute left-[14%] top-14 h-8 w-8 text-fuchsia-400/50" />
        <Sparkle className="absolute right-[12%] bottom-14 h-10 w-10 text-cyan-400/50" />
        <div className="relative mx-auto max-w-2xl px-5">
          <h2 className="font-display text-4xl leading-tight text-pearl-100">
            {t.ctaHeading1}
            <br />
            <span className="font-display text-neon-red text-[1.15em] font-extralight uppercase tracking-[0.2em]">
              {t.ctaHeading2}
            </span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-pearl-100/70">
            {t.ctaLead}
          </p>
          <Btn href={localePath(locale, "/join")} variant="red" className="mt-9">
            {t.ctaBtn} ▪
          </Btn>
        </div>
      </section>
    </>
  );
}
