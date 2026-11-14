import Image from "next/image";
import { Btn } from "@/components/Btn";
import { SectionHeading } from "@/components/SectionHeading";
import { dict, localePath, type Locale } from "@/lib/i18n";

/** "TEDxVinUniversity" → the word "TEDx" in TED red neon, the rest in white */
function Tedx({ text }: { text: string }) {
  return (
    <>
      {text.split(/(TEDx)/).map((part, i) =>
        part === "TEDx" ? (
          <span key={i} className="text-neon-red">
            TEDx
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Tedx2026Page({ locale }: { locale: Locale }) {
  const t = dict[locale].tedx2026;

  return (
    <div className="tedx-scope">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden pt-16">
        <div className="ted-spot" aria-hidden="true" />
        {/* the season's stage-light KV: four beams crossing behind the title */}
        <div
          data-parallax="0.18"
          data-parallax-anchor="top"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="relative h-[125%] w-auto">
            <Image
              src="/tedx/2026/light.webp"
              alt=""
              width={960}
              height={1200}
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="h-full w-auto max-w-none opacity-80"
            />
            {/* the picture is a rectangle: melt its four edges into the black stage */}
            <span className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-black via-black/70 to-transparent" />
            <span className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-black via-black/70 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black to-transparent" />
          </div>
        </div>
        <div className="ted-rug" aria-hidden="true" />

        <div
          data-hero-out
          className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-5 py-24 text-center"
        >
          <p className="rise text-xs font-semibold uppercase tracking-[0.45em] text-pearl-100/80">
            <Tedx text={t.badge} />
          </p>

          <h1 className="rise mt-6 font-display text-[clamp(2.4rem,9.5vw,6.5rem)] font-extralight uppercase leading-[1.02] tracking-[0.14em] text-neon-red [animation-delay:0.1s]">
            {t.title}
          </h1>
          {t.titleAlt && (
            <p
              lang="vi"
              className="rise mt-4 font-display text-lg font-light uppercase tracking-[0.32em] text-pearl-100/85 sm:text-xl [animation-delay:0.2s]"
            >
              {t.titleAlt}
            </p>
          )}

          <p className="rise mx-auto mt-8 max-w-xl font-display text-xl italic leading-relaxed text-pearl-100/90 sm:text-2xl [animation-delay:0.3s]">
            {t.tagline}
          </p>

          <ul className="rise mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-[0.2em] text-pearl-100/80 [animation-delay:0.4s]">
            <li>{t.date}</li>
            <li aria-hidden="true" className="text-ted">
              ▪
            </li>
            <li>{t.place}</li>
            <li aria-hidden="true" className="text-ted">
              ▪
            </li>
            <li className="rounded-full border border-ted/60 px-3 py-1 text-[11px] text-ted-soft">
              {t.pastBadge}
            </li>
          </ul>

          <div className="rise mt-11 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.5s]">
            <span data-magnetic>
              <Btn href="#speakers" variant="ted">
                {t.btnSpeakers} ↓
              </Btn>
            </span>
            <Btn href="#timeline" variant="ghost">
              {t.btnTimeline}
            </Btn>
          </div>
        </div>
      </section>

      {/* ============ WELCOME ============ */}
      <section className="border-y border-white/10 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="ted"
              script={t.welcomeTitle.charAt(0)}
              rest={t.welcomeTitle.slice(1)}
              kicker={t.welcomeKicker}
            />
          </div>
          <div data-reveal className="border-l-2 border-ted pl-6 sm:pl-8">
            <p className="text-[17px] leading-[1.85] text-pearl-100/90">{t.welcomeText}</p>
            <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ted-soft">
              <Tedx text={t.welcomeBy} />
            </p>
          </div>
        </div>
      </section>

      {/* ============ SPEAKERS ============ */}
      <section id="speakers" className="scroll-mt-16 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            tone="ted"
            script={t.speakersHeading.charAt(0)}
            rest={t.speakersHeading.slice(1)}
            kicker={t.speakersKicker}
          />
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-pearl-100/70">
            {t.speakersCount}
          </p>

          <ol className="mt-14 space-y-20">
            {t.speakers.map((s, i) => (
              <li
                key={s.name}
                className="grid items-center gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14"
              >
                <div className={`relative ${i % 2 ? "md:order-2" : ""}`}>
                  <div
                    data-reveal-img
                    className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ted/30 bg-black"
                  >
                    <Image
                      src={s.img}
                      alt={`${s.name} — ${s.role}${s.org ? `, ${s.org}` : ""}`}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute -top-5 left-5 font-display text-5xl font-extralight tracking-[0.1em] text-ted"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div data-reveal>
                  <h3 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-pearl-100/80">
                    {s.role}
                    {s.org && (
                      <>
                        <span aria-hidden="true" className="mx-2 text-ted">
                          ▪
                        </span>
                        {s.org}
                      </>
                    )}
                  </p>

                  <div className="frame-ted mt-6 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ted-soft">
                      {t.talkLabel}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold leading-snug text-white">
                      {s.talk}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-pearl-100/80">{s.summary}</p>
                  </div>

                  <details className="group mt-5">
                    <summary className="flex w-fit cursor-pointer list-none items-center gap-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-ted-soft hover:text-white [&::-webkit-details-marker]:hidden">
                      {t.bioLabel}
                      <span aria-hidden="true" className="text-lg leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-pearl-100/80">
                      {s.bio.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span aria-hidden="true" className="mt-[0.15em] text-ted">
                            ▪
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ TIMELINE ============ */}
      <section id="timeline" className="relative scroll-mt-16 overflow-hidden border-t border-white/10 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="ted"
              script={t.timelineHeading.charAt(0)}
              rest={t.timelineHeading.slice(1)}
              kicker={t.timelineKicker}
            />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-pearl-100/70">
              {t.timelineWhere}
            </p>
          </div>

          <ol className="stagger relative border-l border-ted/50 pl-7 sm:pl-9" data-reveal>
            {t.timeline.map((slot, k) => {
              const sp = slot.speaker >= 0 ? t.speakers[slot.speaker] : null;
              const major = slot.kind === "talk";
              return (
                <li key={k} className="relative pb-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[calc(1.75rem+5px)] top-1.5 block h-2.5 w-2.5 rotate-45 sm:-left-[calc(2.25rem+5px)] ${
                      major ? "bg-ted" : "border border-ted/70 bg-black"
                    }`}
                  />
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-ted-soft">
                    {slot.time}
                  </p>
                  {sp ? (
                    <>
                      <p className="mt-2 font-display text-2xl font-semibold leading-snug text-white">{sp.talk}</p>
                      <p className="mt-1 text-[15px] font-semibold text-pearl-100/90">{sp.name}</p>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-pearl-100/75">{sp.summary}</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-2 font-display text-xl font-medium leading-snug text-pearl-100/90">
                        <Tedx text={slot.title} />
                      </p>
                      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-pearl-100/70">
                        <Tedx text={slot.desc} />
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ============ FOOT ============ */}
      <section className="relative overflow-hidden border-t border-white/10 py-20 text-center">
        <div className="ted-rug opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-5">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-pearl-100/85">
            <Tedx text={t.organisedBy} />
          </p>
          <Btn href={localePath(locale, "/tedx")} variant="ted" className="mt-8">
            {t.seasonsLink}
          </Btn>
          <p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-pearl-100/60">
            {t.license}
          </p>
        </div>
      </section>
    </div>
  );
}
