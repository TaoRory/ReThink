import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { SectionHeading } from "@/components/SectionHeading";
import { Sparkle } from "@/components/Sparkle";
import { Starfield } from "@/components/Starfield";
import { dict, localePath, type Locale } from "@/lib/i18n";

/** org's own labels — English in both locales */
const DEPARTMENTS = [
  "Content",
  "MarCom",
  "Art",
  "Human Resources",
  "External Engagement",
  "Event",
];
const CULTURES = [
  "Championship Culture",
  "Fellowship Culture",
  "Breakership Culture",
];
const BENEFIT_TITLES = [
  "Skill Development & Career Orientation",
  "Building Impact Networks",
  "A Community Where You Belong",
];

export function AboutPage({ locale }: { locale: Locale }) {
  const t = dict[locale].about;

  return (
    <>
      {/* Hero */}
      <section className="smoke grain relative overflow-hidden pt-16">
        <Aurora sweep />
        <Starfield density={0.8} />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
          <Sparkle className="absolute left-[10%] top-32 h-8 w-8 text-cyan-300/60" />
          <Sparkle className="absolute right-[12%] top-52 h-12 w-12 text-cyan-400/50" />
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80">
            {t.heroKicker}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-pearl-100 sm:text-6xl">
            {t.heroHeading}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic leading-relaxed text-pearl-100/85">
            {t.heroLead}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
            <p>
              {t.storyP1a}
              <strong className="text-pearl-100">{t.storyP1b}</strong>
              {t.storyP1c}
            </p>
            <p>
              {t.storyP2a}
              <strong className="text-pearl-100">{t.storyP2b}</strong>
              {t.storyP2c}
            </p>
            <p>
              {t.storyP3a}
              <strong className="text-cyan-300">{t.storyP3b}</strong>
              {t.storyP3c}
            </p>
          </div>
          <div className="relative">
            <Image
              src="/photos/community-1.jpg"
              alt={t.altCommunity}
              width={820}
              height={548}
              className="rounded-2xl border border-white/10 object-cover"
            />
            <Image
              src="/photos/workshop.jpg"
              alt={t.altWorkshop}
              width={615}
              height={410}
              className="-mt-10 ml-auto w-3/4 rotate-2 rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="smoke grain relative overflow-hidden border-y border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="O"
            rest={t.deptHeading.slice(1)}
            kicker={t.deptKicker}
          />
          <div className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {DEPARTMENTS.map((name, i) => (
              <div
                key={name}
                className="hang frame-hairline bg-ink-900/50 p-6 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <h3 className="font-display text-lg font-semibold text-lilac-200">
                  {name}{" "}
                  <span className="text-sm font-normal text-pearl-100/50">
                    {t.deptSuffix}
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.departments[i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultures */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script={t.cultureHeading.charAt(0)}
            rest={t.cultureHeading.slice(1)}
            kicker={t.cultureKicker}
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            {t.cultureLead}
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-3" data-reveal>
            {CULTURES.map((title, i) => (
              <div
                key={title}
                className="hang relative rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/60 p-7"
              >
                <Sparkle animate={false} className="h-6 w-6 text-cyan-300/70" />
                <h3 className="mt-4 font-display text-xl font-semibold text-pearl-100">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.cultures[i]}
                </p>
                <span className="absolute right-6 top-5 font-display text-2xl font-light tracking-[0.2em] text-cyan-400/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="smoke grain relative overflow-hidden border-t border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="B"
            rest={t.benefitHeading.slice(1)}
            kicker={t.benefitKicker}
          />
          <div className="mt-14 space-y-8" data-reveal>
            {BENEFIT_TITLES.map((title, i) => (
              <div
                key={title}
                className="frame-hairline grid gap-6 bg-ink-900/40 p-8 md:grid-cols-[1fr_1.6fr]"
              >
                <h3 className="font-display text-2xl font-semibold text-lilac-200">
                  {title}
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-pearl-100/75">
                  {t.benefits[i].map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-0.5 text-cyan-400">▪</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mx-auto max-w-xl font-display text-xl italic text-pearl-100/85">
              {t.belongQuote}
            </p>
            <Btn
              href={localePath(locale, "/join")}
              variant="primary"
              className="mt-8"
            >
              {t.becomeBtn} <span className="text-cyan-300">▪</span>
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
