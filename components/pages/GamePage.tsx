import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { Starfield } from "@/components/Starfield";
import { WheelGame } from "@/components/WheelGame";
import { dict, localePath, type Locale } from "@/lib/i18n";

export function GamePage({ locale }: { locale: Locale }) {
  const t = dict[locale].game;

  return (
    <>
      <section className="smoke grain relative overflow-hidden pt-16">
        <Aurora sweep />
        <Starfield density={0.7} />

        <div className="relative z-10 mx-auto max-w-6xl px-5 py-20">
          <div className="text-center">
            <p className="inline-block rounded-full border border-pearl-200/30 bg-ink-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-pearl-200">
              {t.badge}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.2rem,8vw,4.5rem)] font-light leading-none">
              <span className="text-neon-red">TEDx</span>
              <span className="text-pearl-100">{t.headingRest}</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-[15px] leading-relaxed text-pearl-100/75">
              {t.lead}
            </p>
          </div>

          <div className="mt-16">
            <WheelGame t={t} />
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-light text-pearl-50">
            {t.ctaHeading}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-pearl-100/70">
            {t.ctaLead}
          </p>
          <div className="mt-9 flex justify-center">
            <Btn href={localePath(locale, "/join")} variant="primary">
              {t.ctaBtn} <span className="text-cyan-300">&#9642;</span>
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
