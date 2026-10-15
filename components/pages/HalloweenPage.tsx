import { Mystery_Quest } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { EyeTracker } from "@/components/halloween/EyeTracker";
import { Branch, Eyeball, Motes, TunnelStage } from "@/components/halloween/Scene";
import { TunnelProgress } from "@/components/halloween/TunnelProgress";
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

/** Temporary stand-in for the KV's hand-drawn script (see HalloweenWordmark).
 *  Latin only — use it for ASCII/English strings, never Vietnamese. */
const scriptFont = Mystery_Quest({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hlw-script",
  display: "swap",
});

const MASKS = [
  { src: "mask-meo.webp", w: 150, h: 189 },
  { src: "mask-cho.webp", w: 142, h: 180 },
  { src: "mask-cu.webp", w: 104, h: 163 },
  null, // the fourth station is the eye
] as const;
const SWAYS = ["", "hlw-sway-b", "hlw-sway-c", "hlw-sway-b"];

export function HalloweenPage({ locale }: { locale: Locale }) {
  const t = dict[locale].halloween;

  return (
    <div className={`hlw hlw-page ${scriptFont.variable}`}>
      <EyeTracker />

      {/* ================= the tunnel ================= */}
      <TunnelProgress>
        <TunnelStage>
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-[12vh]">
            <div className="hlw-hero-copy relative max-w-xl">
              <div className="absolute -inset-x-10 -inset-y-8 -z-10 bg-[radial-gradient(closest-side,rgba(10,15,4,0.9),rgba(10,15,4,0.55)_60%,transparent)]" />
              <p className="hlw-kicker">{t.kicker}</p>
              <h1 className="hlw-title mt-4 text-[clamp(2rem,6vw,3.6rem)] leading-[1.02]">
                <span className="sr-only">ReThink — </span>
                {t.eventName}
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[color:var(--hlw-bone)]/90">
                {t.tagline}
              </p>
              <dl className="mt-6 grid gap-x-10 gap-y-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="hlw-kicker">{t.whenLabel}</dt>
                  <dd className="mt-1.5">{t.when}</dd>
                </div>
                <div>
                  <dt className="hlw-kicker">{t.whereLabel}</dt>
                  <dd className="mt-1.5">{t.where}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#dang-ky" className="hlw-btn">
                  {t.ctaJoin}
                </a>
                <a href="#rooms" className="hlw-btn hlw-btn-ghost">
                  {t.ctaRooms}
                </a>
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--hlw-bone)]/55">
                {t.draftNote}
              </p>
            </div>
          </div>

          <p className="hlw-hint hlw-bob absolute bottom-[3.5vh] left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--hlw-script)]">
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

      {/* ================= the four masks ================= */}
      <section id="rooms" className="relative overflow-hidden px-5 pb-28 pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="hlw-kicker">
                <span className="hlw-rule mr-3" />
                {t.roomsKicker}
              </p>
              <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{t.roomsHeading}</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--hlw-bone)]/80">
              {t.roomsLead}
            </p>
          </div>

          {/* the branch the masks hang from */}
          <div className="relative mt-16">
            <Branch className="absolute -left-[8%] top-0 hidden h-6 w-[116%] -rotate-[1.2deg] lg:block" />

            <div className="grid gap-x-6 gap-y-14 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.roomNames.map((name, i) => {
                const mask = MASKS[i];
                return (
                  <div key={name} className={`hlw-sway ${SWAYS[i]}`}>
                    <span className="mx-auto hidden h-10 w-px bg-[rgba(222,217,196,0.45)] lg:block" />
                    <article className="hlw-card px-5 pb-6 pt-7 text-center">
                      <div className="flex h-[190px] items-center justify-center">
                        {mask ? (
                          <Image
                            src={`/halloween/${mask.src}`}
                            alt=""
                            width={mask.w}
                            height={mask.h}
                            unoptimized
                            className="hlw-pixel hlw-mask h-auto max-h-[180px] w-auto"
                          />
                        ) : (
                          <Eyeball track size={150} />
                        )}
                      </div>
                      <span className="hlw-plaque mt-5">{t.roomTags[i]}</span>
                      <h3 className="hlw-title mt-4 text-base">{name}</h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--hlw-bone)]/75">
                        {t.roomDescs[i]}
                      </p>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= the night, along a trail of blood ================= */}
      <section className="hlw-grass relative overflow-hidden px-5 py-28" data-reveal>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="hlw-kicker">{t.scheduleKicker}</p>
            <h2 className="hlw-script mt-5 text-[clamp(2.4rem,6vw,4.4rem)]">{t.scheduleHeading}</h2>
          </div>

          <div className="relative mt-16">
            {/* a line of blood running out left to right when the section arrives */}
            <div className="absolute left-[6%] right-[6%] top-[3.6rem] hidden lg:block" aria-hidden="true">
              <div className="hlw-bloodline hlw-trail" />
            </div>

            <ol className="relative grid gap-10 lg:grid-cols-4">
              {t.scheduleTitles.map((title, i) => (
                <li key={title} className="hlw-stop relative pl-8 lg:pl-0 lg:text-center">
                  <span className="hlw-blood-drop absolute left-0 top-2 lg:hidden" aria-hidden="true" />
                  <p className="hlw-script text-4xl">{t.scheduleTimes[i]}</p>
                  <span className="hlw-blood-drop mx-auto mt-3 hidden lg:block" aria-hidden="true" />
                  <div className="lg:mt-6">
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
          <Image
            src="/halloween/bg-tay.webp"
            alt=""
            fill
            sizes="100vw"
            className="hlw-hands object-cover"
          />
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
            <Link href={localePath(locale, "/halloween")} className="hlw-btn">
              {t.ctaBtn}
            </Link>
          </div>
          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[color:var(--hlw-bone)]/55">
            {t.ctaNote}
          </p>
        </div>

        {/* what is left on the floor */}
        <Image
          src="/halloween/tay.webp"
          alt=""
          width={600}
          height={352}
          sizes="280px"
          className="pointer-events-none absolute -left-10 bottom-4 w-52 opacity-90 sm:w-72"
          aria-hidden="true"
        />
        <Image
          src="/halloween/chan.webp"
          alt=""
          width={600}
          height={397}
          sizes="260px"
          className="pointer-events-none absolute -right-10 bottom-2 hidden w-64 -scale-x-100 opacity-80 sm:block"
          aria-hidden="true"
        />
      </section>
    </div>
  );
}
