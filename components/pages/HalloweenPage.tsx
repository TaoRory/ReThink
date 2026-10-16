import { Homemade_Apple, Mystery_Quest } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { EyeTracker } from "@/components/halloween/EyeTracker";
import { HalloweenGames } from "@/components/halloween/Games";
import {
  Branch,
  Eyeball,
  Motes,
  TunnelStage,
} from "@/components/halloween/Scene";
import { TunnelProgress } from "@/components/halloween/TunnelProgress";
import { Wound } from "@/components/halloween/Wound";
import { dict, localePath, type Locale } from "@/lib/i18n";

/**
 * The Halloween ReThink event page, built from the designer's KV
 * (../KV/kv halloween - ReThink). See .claude/skills/halloween-kv.
 *
 * You scroll INTO a tunnel of grass arches toward the girl at its end, then
 * out into the sections: the story, four masks hanging from a branch, the
 * night's running order along a trail of blood, hands behind wet glass for
 * the FAQ, and a last arch to register through.
 *
 * All copy is placeholder in dict.*.halloween.
 */

/** Temporary stand-in for the KV's hand-drawn script (see Scene.tsx).
 *  Latin only — use it for ASCII/English strings, never Vietnamese. */
/** handwriting for the lettering on the hero branch — close to the KV's hand-drawn RETHINK */
const handFont = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hlw-hand",
  display: "swap",
});

const scriptFont = Mystery_Quest({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hlw-script",
  display: "swap",
});

export function HalloweenPage({ locale }: { locale: Locale }) {
  const t = dict[locale].halloween;

  return (
    <div className={`hlw hlw-page ${scriptFont.variable} ${handFont.variable}`}>
      <EyeTracker />

      {/* ================= the tunnel ================= */}
      <TunnelProgress>
        <TunnelStage>
          {/* The first screen is the Avatar and nothing else. The event details are
              waiting at the end of the tunnel: they fade in as the picture fades out. */}
          <div className="hlw-arrival absolute inset-0 z-10 flex items-center justify-center px-5 pt-[65px]">
            <div className="mx-auto grid w-full max-w-5xl items-center gap-4 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
              {/* the two hosts, same width and same weight: neither is the "main" one */}
              <div
                className="mx-auto flex w-full max-w-[360px] items-center justify-center gap-3 md:flex-col md:gap-4"
                role="group"
                aria-label="ReThink × VinUniversity Student Council"
              >
                <Image
                  src="/halloween/kv/rethink-script.webp"
                  alt="ReThink"
                  width={600}
                  height={127}
                  sizes="(max-width: 768px) 40vw, 340px"
                  className="w-[40%] md:w-full"
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-[color:var(--hlw-script)] md:h-6 md:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                >
                  <path d="M4.5 4.2 C9 8.5 14.5 15.5 19.8 20.2" />
                  <path d="M19.2 3.6 C14.5 8.8 9.5 14.8 4.2 20.4" />
                </svg>
                <Image
                  src="/halloween/kv/logo-sc.webp"
                  alt="VinUniversity Student Council"
                  width={1079}
                  height={227}
                  sizes="(max-width: 768px) 40vw, 340px"
                  className="w-[40%] md:w-full"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="hlw-kicker">{t.kicker}</p>
                <h1 className="hlw-title mt-3 text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.02]">
                  <span className="sr-only">ReThink — </span>
                  {t.eventName}
                </h1>
                <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[color:var(--hlw-bone)]/90 md:mx-0">
                  {t.tagline}
                </p>
                <dl className="mt-5 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="hlw-kicker">{t.whenLabel}</dt>
                    <dd className="mt-1.5">{t.when}</dd>
                  </div>
                  <div>
                    <dt className="hlw-kicker">{t.whereLabel}</dt>
                    <dd className="mt-1.5">{t.where}</dd>
                  </div>
                </dl>
                <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                  <a href="#games" className="hlw-btn">
                    {t.ctaJoin}
                  </a>
                  <a href="#schedule" className="hlw-btn hlw-btn-ghost">
                    {t.ctaRooms}
                  </a>
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--hlw-bone)]/55">
                  {t.draftNote}
                </p>
              </div>
            </div>
          </div>

          <p className="hlw-hint hlw-bob absolute bottom-[3.5vh] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--hlw-script)]">
            {t.scrollHint} ↓
          </p>
        </TunnelStage>
      </TunnelProgress>

      {/* ================= ticker ================= */}
      <div className="relative z-10 overflow-hidden border-y border-[rgba(209,201,30,0.3)] bg-[color:var(--hlw-grass-2)] py-3">
        <div className="hlw-ticker flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex gap-10">
              {[...t.tickerWords, ...t.tickerWords].map((word, i) => (
                <span key={i} className="hlw-script flex items-center gap-10 text-lg">
                  {word}
                  <span className="text-[color:var(--hlw-blood)]">▪</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= the story ================= */}
      <section className="hlw-grass relative overflow-hidden px-5 py-28" data-reveal>
        <Motes count={6} />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="hlw-kicker">
              <span className="hlw-rule mr-3" />
              {t.storyKicker}
            </p>
            <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{t.storyHeading}</h2>
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-[1.85] text-[color:var(--hlw-bone)]/90">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[340px]" aria-hidden="true">
            {/* blood on the floor under the compass */}
            <Image
              src="/halloween/mau.webp"
              alt=""
              width={480}
              height={651}
              unoptimized
              className="hlw-pixel hlw-splat absolute -bottom-10 -left-6 w-44 -rotate-12"
            />
            {/* a dark pool so the pale compass reads against the grass */}
            <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(10,15,4,0.85),rgba(10,15,4,0.5)_60%,transparent)]" />
            <Image
              src="/halloween/compass-logo.webp"
              alt=""
              width={480}
              height={502}
              unoptimized
              className="hlw-pixel hlw-spin relative h-auto w-full"
            />
            <Eyeball track size={74} className="absolute -left-6 top-6" />
            <Eyeball variant={2} size={56} className="absolute -right-2 bottom-10 rotate-45" />
            <Eyeball variant={3} size={40} className="absolute bottom-0 left-12 -rotate-12" />
          </div>
        </div>
      </section>

      {/* ================= the two games ================= */}
      <HalloweenGames
        kicker={t.gamesKicker}
        heading={t.gamesHeading}
        lead={t.gamesLead}
        copy={t.games}
      />

      {/* ================= the night, along a trail of blood ================= */}
      <section id="schedule" className="hlw-grass relative overflow-hidden px-5 py-28" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="hlw-kicker">{t.scheduleKicker}</p>
            <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{t.scheduleHeading}</h2>
          </div>

          <div className="relative mt-16">
            {/* a gash across the page with blood running down from it; the text sits on top */}
            <div className="pointer-events-none absolute inset-x-0 top-[1.7rem] hidden h-[15rem] lg:block" aria-hidden="true">
              <Wound uid="d" className="h-full w-full" />
            </div>
            {/* phone: the gash lies across the top of the stacked stops */}
            <div className="pointer-events-none relative -mx-2 -mb-8 -mt-6 h-[9rem] lg:hidden" aria-hidden="true">
              <Wound uid="m" className="h-full w-full" />
            </div>

            <ol className="relative z-10 grid gap-10 lg:grid-cols-4">
              {t.scheduleTitles.map((title, i) => (
                <li key={title} className="hlw-stop relative pl-8 lg:pl-0 lg:text-center">
                  <span className="hlw-blood-drop absolute left-0 top-2 lg:hidden" aria-hidden="true" />
                  <p className="hlw-script text-4xl">{t.scheduleTimes[i]}</p>
                  <div className="hlw-stop-text lg:mt-[3.4rem]">
                    <h3 className="hlw-title mt-3 text-sm">{title}</h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--hlw-bone)]/80">
                      {t.scheduleDescs[i]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= house rules: hands behind the glass ================= */}
      <section className="hlw-faq relative overflow-hidden px-5 py-28">
        <div className="absolute inset-0" aria-hidden="true">
          {/* fixed height, centred: opening a question grows the section but never resizes this image */}
          <div className="absolute inset-x-0 top-1/2 h-[1000px] -translate-y-1/2">
            <Image
              src="/halloween/bg-tay.webp"
              alt=""
              fill
              sizes="100vw"
              className="hlw-hands object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--hlw-ink),rgba(10,15,4,0.35)_30%,rgba(10,15,4,0.35)_70%,var(--hlw-ink))]" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <p className="hlw-kicker">
            <span className="hlw-rule mr-3" />
            {t.rulesKicker}
          </p>
          <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{t.rulesHeading}</h2>

          <div className="mt-12 space-y-4">
            {t.ruleQs.map((q, i) => (
              <details key={q} className="hlw-card overflow-hidden">
                <summary className="hlw-q flex items-center justify-between gap-6 px-6 py-5">
                  <span className="hlw-title text-sm">{q}</span>
                  <span className="hlw-q-mark text-2xl leading-none text-[color:var(--hlw-script)]">+</span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-[color:var(--hlw-bone)]/85">
                  {t.ruleAs[i]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= the last arch ================= */}
      <section id="dang-ky" className="relative overflow-hidden px-5 pb-32 pt-20 text-center">
        <Motes count={8} />

        <div className="relative mx-auto max-w-3xl">
          {/* the last arch, with her waiting inside */}
          <div className="relative mx-auto w-[min(420px,86vw)]" aria-hidden="true">
            <Image
              src="/halloween/bg-vom-co.webp"
              alt=""
              width={720}
              height={944}
              sizes="420px"
              className="absolute left-[18%] top-[20%] h-auto w-[64%]"
            />
            <Image
              src="/halloween/nhan-vat.webp"
              alt=""
              width={380}
              height={624}
              unoptimized
              className="absolute bottom-[6%] left-1/2 h-[46%] w-auto -translate-x-1/2"
            />
            <Image
              src="/halloween/vom-co.webp"
              alt=""
              width={1400}
              height={1475}
              sizes="420px"
              className="relative h-auto w-full"
            />
            <Eyeball track size={58} className="absolute -left-4 top-[30%]" />
            <Eyeball track size={46} className="absolute -right-2 top-[18%]" />
            <Eyeball track size={38} className="absolute right-[6%] bottom-[14%]" />
          </div>

          <h2 className="hlw-title mt-10 text-[clamp(1.6rem,4.4vw,2.6rem)]">{t.ctaHeading}</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[color:var(--hlw-bone)]/85">
            {t.ctaLead}
          </p>
          <div className="mt-9 flex justify-center">
            <a href="#games" className="hlw-btn">
              {t.ctaBtn}
            </a>
          </div>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--hlw-bone)]/55">
            {t.ctaNote}
          </p>
        </div>
      </section>
    </div>
  );
}
