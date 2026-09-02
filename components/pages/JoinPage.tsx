import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { SectionHeading } from "@/components/SectionHeading";
import { Sparkle } from "@/components/Sparkle";
import { Starfield } from "@/components/Starfield";
import { dict, type Locale } from "@/lib/i18n";

/** department names stay in English in both locales — they are the org's own labels */
const POSITIONS = [
  "Content",
  "Event",
  "Human Resources",
  "External Engagement",
  "MarCom",
  "Art",
];

const FB = "https://www.facebook.com/rethink.vinuni";

export function JoinPage({ locale }: { locale: Locale }) {
  const t = dict[locale].join;

  return (
    <>
      <section className="smoke grain relative overflow-hidden pt-16">
        <Aurora sweep />
        <Starfield density={0.8} />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="inline-block rounded-full border border-pearl-200/30 bg-ink-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-pearl-200">
                {t.badge}
              </p>
              <h1 className="mt-6 font-display leading-tight">
                <span className="block font-display text-neon text-6xl font-extralight tracking-[0.16em] sm:text-7xl">
                  Gen 5
                </span>
                <span className="mt-2 block text-5xl font-bold text-pearl-100 sm:text-6xl">
                  {t.heading2}
                </span>
              </h1>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-pearl-100/75">
                {t.leadA}
                <strong className="text-pearl-100">{t.leadB}</strong>
                {t.leadC}
                <strong className="text-pearl-100">{t.leadD}</strong>
                {t.leadE}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Btn href={FB} external variant="primary">
                  {t.btnForm} <span className="text-cyan-300">▪</span>
                </Btn>
                <Btn href={FB} external variant="ghost">
                  {t.btnFb}
                </Btn>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                {t.deadline}
              </p>
            </div>

            <div className="relative">
              <Image
                src="/photos/community-3.jpg"
                alt={t.altGen}
                width={1434}
                height={956}
                className="rounded-2xl border border-white/10 object-cover shadow-2xl shadow-violet-800/30"
              />
              <Image
                src="/photos/balcony.jpg"
                alt={t.altBalcony}
                width={806}
                height={454}
                className="-mt-12 ml-auto w-2/3 rotate-2 rounded-2xl border border-white/10 object-cover shadow-2xl"
              />
              <Sparkle className="absolute -left-4 -top-5 h-10 w-10 text-cyan-300/80" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading script="O" rest={t.posHeading.slice(1)} kicker={t.posKicker} />
          <div className="stagger mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {POSITIONS.map((name, i) => (
              <div
                key={name}
                className="hang frame-hairline group bg-ink-900/50 p-6 transition hover:bg-ink-800/60"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-pearl-100 group-hover:text-lilac-200">
                    {name}
                  </h3>
                  <span className="font-display text-lg font-light tracking-[0.2em] text-cyan-400/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {t.positions[i]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-ink-900 via-ink-800/80 to-ink-900 p-10 text-center">
            <p className="font-display text-2xl italic text-pearl-100/90">
              {t.quote}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              {t.quoteBy}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
