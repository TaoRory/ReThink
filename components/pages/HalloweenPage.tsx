import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import {
  Bat,
  Candle,
  Ghost,
  LakeScene,
  Lantern,
  Portrait,
  Spider,
} from "@/components/halloween/Scene";
import { dict, localePath, type Locale } from "@/lib/i18n";

/**
 * The Halloween event page.
 *
 * It deliberately shares nothing with the ReThink KV but the shell: its own
 * serif, its own palette, its own background. Everything is scoped under the
 * `.hlw` class (see app/halloween.css) so the rest of the site is untouched.
 *
 * All copy is placeholder and lives in `dict.*.halloween`, ready to be
 * swapped for the real brief.
 */
const eventFont = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-hlw",
  display: "swap",
});

/** which sitter hangs in which frame — not translatable, so it stays here */
const ROOM_ART = ["crow", "owl", "deer", "rabbit"] as const;
/** the running order's clock times */
const TIMES = ["18:00", "18:30", "20:45", "21:40"];

export function HalloweenPage({ locale }: { locale: Locale }) {
  const t = dict[locale].halloween;

  return (
    <div className={`hlw hlw-page ${eventFont.variable}`}>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-16">
        <LakeScene />
        <Bat top="22%" size={38} />
        <Bat className="hlw-bat-2" top="34%" size={26} />
        <Bat className="hlw-bat-3" top="15%" size={30} />

        <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-5xl flex-col items-center justify-center px-5 pb-56 pt-24 text-center">
          <p className="hlw-kicker">{t.kicker}</p>

          <h1 className="hlw-title mt-7 text-[clamp(3rem,13vw,8.5rem)] leading-[0.92]">
            {t.eventName}
          </h1>

          <p className="hlw-display mt-7 max-w-2xl text-[clamp(1.05rem,2.4vw,1.5rem)] italic leading-relaxed text-[color:var(--hlw-blue-soft)]">
            {t.tagline}
          </p>

          <dl className="mt-10 flex flex-wrap items-start justify-center gap-x-14 gap-y-6 text-sm">
            <div>
              <dt className="hlw-kicker">{t.whenLabel}</dt>
              <dd className="mt-2 text-[color:var(--hlw-paper)]">{t.when}</dd>
            </div>
            <div>
              <dt className="hlw-kicker">{t.whereLabel}</dt>
              <dd className="mt-2 text-[color:var(--hlw-paper)]">{t.where}</dd>
            </div>
          </dl>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <a href="#dang-ky" className="hlw-btn">
              {t.ctaJoin}
            </a>
            <a href="#rooms" className="hlw-btn hlw-btn-ghost">
              {t.ctaRooms}
            </a>
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[color:var(--hlw-pink-deep)]">
            {t.draftNote}
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="relative z-10 border-t border-[rgba(159,208,227,0.14)] py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-14 px-5 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="hlw-kicker">
              <span className="hlw-rule mr-3" />
              {t.storyKicker}
            </p>
            <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.2rem)] leading-tight">
              {t.storyHeading}
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[color:var(--hlw-blue-soft)]/85">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
          </div>

          <div className="relative flex min-h-[17rem] items-end justify-center gap-12">
            {/* the lantern hangs from the ceiling; the other two stand */}
            <Lantern className="absolute right-4 top-0" size={40} />
            <Ghost size={92} />
            <Candle size={48} />
          </div>
        </div>
      </section>

      {/* ================= ROOMS ================= */}
      <section
        id="rooms"
        className="relative z-10 border-t border-[rgba(159,208,227,0.14)] py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <p className="hlw-kicker">
            <span className="hlw-rule mr-3" />
            {t.roomsKicker}
          </p>
          <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.2rem)]">
            {t.roomsHeading}
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[color:var(--hlw-blue-soft)]/80">
            {t.roomsLead}
          </p>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {t.roomNames.map((name, i) => (
              <article key={name} className="hlw-card hlw-frame p-5">
                <Spider />
                <div className="aspect-[6/7] overflow-hidden bg-[rgba(8,15,22,0.6)]">
                  <Portrait kind={ROOM_ART[i]} />
                </div>
                <div className="mt-5 text-center">
                  <span className="hlw-plaque">{t.roomTags[i]}</span>
                  <h3 className="hlw-title mt-4 text-lg leading-snug">{name}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--hlw-blue-soft)]/75">
                    {t.roomDescs[i]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RUNNING ORDER ================= */}
      <section className="relative z-10 border-t border-[rgba(159,208,227,0.14)] py-24">
        <div className="mx-auto max-w-4xl px-5">
          <p className="hlw-kicker">
            <span className="hlw-rule mr-3" />
            {t.scheduleKicker}
          </p>
          <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.2rem)]">
            {t.scheduleHeading}
          </h2>

          <ol className="mt-12 border-l border-[rgba(230,221,205,0.2)] pl-8">
            {t.scheduleTitles.map((title, i) => (
              <li key={title} className="relative pb-11 last:pb-0">
                <span className="absolute -left-[2.3rem] top-1.5 h-2.5 w-2.5 rotate-45 border border-[rgba(240,182,204,0.7)] bg-[color:var(--hlw-ink)]" />
                <p className="hlw-display text-2xl text-[color:var(--hlw-pink)]">
                  {TIMES[i]}
                </p>
                <h3 className="hlw-title mt-2 text-base">{title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[color:var(--hlw-blue-soft)]/75">
                  {t.scheduleDescs[i]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= HOUSE RULES ================= */}
      <section className="relative z-10 border-t border-[rgba(159,208,227,0.14)] py-24">
        <div className="mx-auto max-w-4xl px-5">
          <p className="hlw-kicker">
            <span className="hlw-rule mr-3" />
            {t.rulesKicker}
          </p>
          <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.2rem)]">
            {t.rulesHeading}
          </h2>

          <dl className="mt-12 space-y-7">
            {t.ruleQs.map((q, i) => (
              <div key={q} className="hlw-frame p-6">
                <dt className="hlw-title text-base text-[color:var(--hlw-paper)]">
                  {q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-[color:var(--hlw-blue-soft)]/78">
                  {t.ruleAs[i]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        id="dang-ky"
        className="relative z-10 overflow-hidden border-t border-[rgba(159,208,227,0.14)] py-28"
      >
        <div className="hlw-fog absolute bottom-0" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <div className="flex justify-center gap-10">
            <Candle size={40} />
            <Candle size={52} />
            <Candle size={40} />
          </div>
          <h2 className="hlw-title mt-10 text-[clamp(1.8rem,4.6vw,3rem)]">
            {t.ctaHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[color:var(--hlw-blue-soft)]/80">
            {t.ctaLead}
          </p>
          <div className="mt-10 flex justify-center">
            <Link href={localePath(locale, "/halloween")} className="hlw-btn">
              {t.ctaBtn}
            </Link>
          </div>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[color:var(--hlw-pink-deep)]">
            {t.ctaNote}
          </p>
        </div>
      </section>
    </div>
  );
}
