import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import {
  Bat,
  Candle,
  Crow,
  Doorway,
  Ghost,
  LakeShore,
  LakeSky,
  Lantern,
  Portrait,
  Sconce,
  Spider,
  WaxSpine,
  Web,
} from "@/components/halloween/Scene";
import { dict, localePath, type Locale } from "@/lib/i18n";

/**
 * The Halloween event page.
 *
 * Laid out as a walk rather than a stack of equal sections: you arrive at the
 * lake, read a letter pinned to the wall, pass a wall of crooked portraits,
 * follow a candle burning down through the night's running order, and leave
 * through a lit door. Sections overlap, tilt and break their own grid on
 * purpose — nothing here sits in a tidy three-column row.
 *
 * Shares nothing with the ReThink KV but the shell. All copy is placeholder
 * and lives in `dict.*.halloween`.
 */
const eventFont = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-hlw",
  display: "swap",
});

/** which sitter hangs in which frame, and how that frame hangs on the wall */
const WALL = [
  { art: "crow", span: "lg:col-span-4", offset: "lg:mt-0", tilt: "-1.8deg", wire: "2.6rem" },
  { art: "owl", span: "lg:col-span-3", offset: "lg:mt-20", tilt: "1.4deg", wire: "5.2rem" },
  { art: "deer", span: "lg:col-span-5", offset: "lg:mt-6", tilt: "-0.9deg", wire: "3.4rem" },
  { art: "rabbit", span: "lg:col-span-4 lg:col-start-3", offset: "lg:-mt-6", tilt: "2.1deg", wire: "4.4rem" },
] as const;

const TIMES = ["18:00", "18:30", "20:45", "21:40"];

export function HalloweenPage({ locale }: { locale: Locale }) {
  const t = dict[locale].halloween;
  const ticker = [t.eventName, "30 · 10 · 2026", t.kicker, "Trick or Treat"];

  return (
    <div className={`hlw hlw-page ${eventFont.variable}`}>
      {/* ============ ACT I — arrival ============ */}
      <section className="relative overflow-hidden pt-16">
        <LakeSky />
        <Bat top="20%" size={40} />
        <Bat className="hlw-bat-2" top="31%" size={26} />
        <Bat className="hlw-bat-3" top="13%" size={32} />
        <Bat className="hlw-bat-4" top="26%" size={20} />

        {/* the date, on a label pinned at an angle */}
        <div className="absolute right-[7%] top-[34%] z-20 hidden rotate-[6deg] lg:block">
          <div className="hlw-paper-card px-6 py-5 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#7c5a46]">
              {t.whenLabel}
            </p>
            <p className="hlw-display mt-2 text-2xl leading-none text-[#2b2118]">30.10</p>
            <p className="mt-1 text-[11px] tracking-[0.2em] text-[#5c4636]">18:00 – 22:00</p>
          </div>
        </div>

        {/* a vertical rail of caps up the left edge */}
        <div className="absolute left-5 top-[34%] z-20 hidden lg:block">
          <p className="hlw-vrail">{t.kicker}</p>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-center px-5 pb-16 pt-24">
          <p className="hlw-kicker lg:hidden">{t.kicker}</p>

          {/* the title is pushed off-centre and overhangs the left margin */}
          <h1 className="hlw-hero-title mt-6 text-[clamp(3.2rem,15vw,11rem)] leading-[0.82] lg:-ml-2">
            {t.eventName}
          </h1>

          {/* kept to the left half: the pinned label owns the right-hand side */}
          <div className="mt-8 max-w-xl">
            <p className="hlw-display text-[clamp(1.05rem,2.2vw,1.45rem)] italic leading-relaxed text-[color:var(--hlw-blue-soft)]">
              {t.tagline}
            </p>

            <div className="mt-7 text-sm">
              <p className="hlw-kicker">{t.whereLabel}</p>
              <p className="mt-2 text-[color:var(--hlw-paper)]">{t.where}</p>
              <p className="mt-3 text-[color:var(--hlw-paper)] lg:hidden">{t.when}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
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

        <LakeShore />
      </section>

      {/* ---- a tilted ticker, cutting across the seam ---- */}
      <div className="hlw-slant relative z-20 -my-8 overflow-hidden border-y border-[rgba(243,188,210,0.3)] bg-[rgba(243,188,210,0.1)] py-3">
        <div className="hlw-ticker flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((pass) => (
            <div key={pass} className="flex gap-10">
              {ticker.map((word) => (
                <span
                  key={word}
                  className="hlw-title flex items-center gap-10 text-xs text-[color:var(--hlw-pink-soft)]"
                >
                  {word}
                  <span className="text-[color:var(--hlw-pink)]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============ ACT II — the letter ============ */}
      <section className="relative z-10 overflow-hidden px-5 pb-28 pt-36">
        <div className="hlw-fog absolute right-[-20%] top-10 opacity-60" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* the letter, pinned slightly crooked */}
            <div className="hlw-paper-card relative rotate-[-1.4deg] px-8 py-10 sm:px-12 sm:py-14">
              {/* wax seal */}
              <span className="absolute -right-5 -top-5 flex h-16 w-16 rotate-[12deg] items-center justify-center rounded-full bg-[color:var(--hlw-pink-mid)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3a2342] shadow-lg">
                PL
              </span>

              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#8a6450]">
                {t.storyKicker}
              </p>
              <h2 className="hlw-display mt-4 text-[clamp(1.8rem,4.4vw,3rem)] uppercase leading-tight tracking-[0.06em] text-[#241b14]">
                {t.storyHeading}
              </h2>
              <div className="mt-7 space-y-5 text-[15px] leading-[1.85] text-[#3f3227]">
                <p className="first-letter:hlw-display first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-[#8a3f5e]">
                  {t.storyP1}
                </p>
                <p>{t.storyP2}</p>
              </div>
              <p className="hlw-display mt-9 text-right text-2xl italic text-[#6b4a3a]">
                {t.eventName}
              </p>
            </div>

            {/* the vignette beside it, overlapping the letter's edge */}
            <div className="relative flex min-h-[22rem] items-end justify-center gap-10 lg:-ml-16 lg:mt-24">
              <Web className="absolute -top-6 right-0 text-[rgba(243,188,210,0.22)]" size={110} />
              <Lantern className="absolute right-10 top-0" size={42} sway="hlw-sway-slow" />
              <Ghost size={96} tint="pink" />
              <Candle size={50} flame="hlw-flame-b" />
              <Crow className="absolute bottom-0 left-2" size={52} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACT III — the portrait wall ============ */}
      <section
        id="rooms"
        className="hlw-wallpaper hlw-drip relative z-10 overflow-hidden border-y border-[rgba(243,188,210,0.22)] px-5 py-28"
      >
        <Web className="hlw-web hlw-web-l" size={140} />
        <Web className="hlw-web hlw-web-r" size={140} />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="hlw-kicker">
                <span className="hlw-rule mr-3" />
                {t.roomsKicker}
              </p>
              <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.4rem)]">
                {t.roomsHeading}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--hlw-blue-soft)]/75">
              {t.roomsLead}
            </p>
          </div>

          {/* the picture rail the frames hang from */}
          <div className="relative mt-20">
            <span className="absolute inset-x-0 top-0 hidden h-px bg-[rgba(243,188,210,0.35)] lg:block" />

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16">
              {WALL.map((slot, i) => (
                <article
                  key={t.roomNames[i]}
                  className={`hlw-frame relative p-4 ${slot.span} ${slot.offset}`}
                  style={{ transform: `rotate(${slot.tilt})` }}
                >
                  <span
                    className="hlw-wire hidden lg:block"
                    style={{ height: slot.wire }}
                  />
                  <Spider />
                  <div className="aspect-[6/7] overflow-hidden bg-[rgba(8,15,22,0.55)]">
                    <Portrait kind={slot.art} />
                  </div>
                  <div className="mt-5 text-center">
                    <span className="hlw-plaque">{t.roomTags[i]}</span>
                    <h3 className="hlw-title mt-4 text-lg leading-snug">
                      {t.roomNames[i]}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--hlw-blue-soft)]/75">
                      {t.roomDescs[i]}
                    </p>
                  </div>
                </article>
              ))}

              {/* a sconce burning in the gap the frames leave open */}
              <div className="hidden items-center justify-center lg:col-span-2 lg:col-start-8 lg:row-start-2 lg:flex">
                <Sconce flame="hlw-flame-c" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ACT IV — the night, down a burning candle ============ */}
      <section className="relative z-10 overflow-hidden px-5 py-32">
        <div className="hlw-fog hlw-fog-blue absolute left-[-20%] top-20 opacity-70" />
        <Bat className="hlw-bat-2" top="12%" size={24} />

        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <p className="hlw-kicker">{t.scheduleKicker}</p>
            <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.4rem)]">
              {t.scheduleHeading}
            </h2>
          </div>

          <div className="relative mt-20">
            {/* the candle burning down the middle */}
            <div className="absolute left-1/2 top-0 hidden h-full -translate-x-1/2 sm:block">
              <Candle size={44} />
              <WaxSpine className="-mt-2 h-[calc(100%-4rem)] w-[46px]" />
            </div>

            <ol className="space-y-16 sm:space-y-20">
              {t.scheduleTitles.map((title, i) => {
                const right = i % 2 === 1;
                return (
                  <li
                    key={title}
                    className={`relative sm:w-[calc(50%-3.5rem)] ${
                      right ? "sm:ml-auto sm:text-left" : "sm:text-right"
                    }`}
                  >
                    <p
                      className={`hlw-display text-4xl leading-none text-[color:var(--hlw-pink)] ${
                        right ? "" : "sm:text-right"
                      }`}
                    >
                      {TIMES[i]}
                    </p>
                    <h3 className="hlw-title mt-3 text-base">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--hlw-blue-soft)]/75">
                      {t.scheduleDescs[i]}
                    </p>
                    {/* the thread out to the candle */}
                    <span
                      className={`absolute top-4 hidden h-px w-14 bg-[rgba(243,188,210,0.4)] sm:block ${
                        right ? "-left-14" : "-right-14"
                      }`}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ============ ACT V — the doors ============ */}
      <section className="relative z-10 border-t border-[rgba(243,188,210,0.18)] px-5 py-28">
        <div className="mx-auto max-w-4xl">
          <p className="hlw-kicker">
            <span className="hlw-rule mr-3" />
            {t.rulesKicker}
          </p>
          <h2 className="hlw-title mt-5 text-[clamp(1.9rem,5vw,3.4rem)]">
            {t.rulesHeading}
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {t.ruleQs.map((q, i) => (
              <details key={q} className="group">
                <summary className="hlw-door hlw-frame flex min-h-[11rem] flex-col justify-between p-6">
                  <span className="hlw-plaque self-start">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hlw-title mt-6 block text-[15px] leading-snug">{q}</span>
                  <span className="mt-4 block h-2.5 w-2.5 rounded-full bg-[color:var(--hlw-pink)] opacity-70" />
                </summary>
                <p className="hlw-door-answer mt-4 border-l border-[rgba(243,188,210,0.4)] pl-5 text-sm leading-relaxed text-[color:var(--hlw-blue-soft)]/80">
                  {t.ruleAs[i]}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ACT VI — the way out ============ */}
      <section
        id="dang-ky"
        className="relative z-10 overflow-hidden px-5 pb-32 pt-24 text-center"
      >
        <div className="hlw-fog absolute bottom-0" />
        <div className="hlw-fog hlw-fog-blue absolute bottom-10 opacity-60" />

        <div className="relative mx-auto max-w-3xl">
          <Doorway className="mx-auto w-48 sm:w-64" />

          <div className="-mt-10 flex justify-center gap-12">
            <Candle size={38} />
            <Candle size={30} flame="hlw-flame-c" />
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
