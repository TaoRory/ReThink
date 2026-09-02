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

const coreValues = [
  {
    title: "Rethink & Let Rethink",
    desc: "Không chấp nhận “mọi thứ vốn là vậy”. Chúng mình thách thức ý tưởng, không thách thức con người — vì thay đổi bắt đầu từ những câu hỏi can đảm.",
  },
  {
    title: "Embrace Diversity",
    desc: "Mỗi tiếng nói — từ mọi ngành, mọi nền tảng, mọi góc nhìn — đều là nhiên liệu của sáng tạo. Đa dạng làm cộng đồng mạnh hơn giữa những bất định.",
  },
  {
    title: "Own & Act Together",
    desc: "Không ai chờ người khác hành động trước. Mỗi người nhận lấy ownership, và kéo mọi người cùng chia sẻ cả công việc lẫn thành quả.",
  },
  {
    title: "Reflect to Evolve",
    desc: "Không chỉ làm — mà dừng lại để học. Sự chiêm nghiệm giúp ReThink không lặp lại sai lầm và trưởng thành sau mỗi bước đi.",
  },
];

const activities = [
  {
    img: "/photos/podcast-cover.jpg",
    kicker: "Podcast",
    title: "Reinventors",
    desc: "Mùa 3 tiếp tục hành trình “rethink” những điều quen thuộc qua góc nhìn mới — mỗi tập là một cuộc gặp với những vị khách truyền cảm hứng như Hà Chu, Nguyễn Quốc Hoàng Anh.",
  },
  {
    img: "/photos/contest-reality.jpg",
    kicker: "Online Writing Contest",
    title: "Rethink Reality",
    desc: "Sân chơi viết cho người trẻ cả nước: 100+ thí sinh, ban giám khảo uy tín, tổng giải thưởng 88 triệu đồng cho 4 bài viết xuất sắc.",
  },
  {
    img: "/photos/tedx-stage.jpg",
    kicker: "Flagship Event",
    title: "TEDxVinUniversity",
    desc: "Sự kiện lan toả ý tưởng lớn nhất tại VinUni — “The Firsts” 2025 với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác mạng xã hội.",
    href: "/tedx",
  },
];

const thisYear = [
  {
    kicker: "Định dạng mới",
    title: "Interactive Cinematic Experience",
    desc: "Một định dạng ReThink chưa từng thử — nơi khán giả không chỉ ngồi xem, mà tham gia vào chính câu chuyện đang diễn ra trước mắt.",
  },
  {
    kicker: "Flagship Event",
    title: "TEDxVinUniversity 2027",
    desc: "Mùa TEDx tiếp theo do ReThink tổ chức. Chủ đề, dàn diễn giả và ngày diễn ra sẽ được hé lộ dần trong năm nay.",
  },
];

const future = [
  {
    num: "01",
    title: "Science Under 15 Minutes",
    desc: "Series video ngắn lần đầu ra mắt — chuyên gia từ nhiều ngành chia sẻ insight về những chủ đề nóng, mở đường cho ReThinkers kết nối và đào sâu đổi mới.",
  },
  {
    num: "02",
    title: "ReThink Offline Event",
    desc: "Sự kiện quy tụ chuyên gia đa lĩnh vực cùng mổ xẻ một thách thức của thời đại từ nhiều lăng kính — nơi người trẻ gắn kết và network trực tiếp.",
  },
  {
    num: "03",
    title: "ReThinkers Community Building",
    desc: "Cộng đồng Facebook kết nối người trẻ toàn quốc — nơi mọi thành viên chia sẻ góc nhìn mới, luyện tư duy phản biện về những vấn đề quen thuộc.",
  },
];

export default function HomePage() {
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

        <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-5 py-24 text-center">
          <p className="rise mb-6 text-xs font-semibold uppercase tracking-[0.5em] text-cyan-300/80">
            We are…
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
            Since 2022 · VinUniversity
          </p>

          <p className="rise mx-auto mt-10 max-w-2xl font-display text-xl leading-relaxed text-pearl-100/90 italic sm:text-2xl [animation-delay:0.3s]">
            “If you want a place to gather{" "}
            <span className="text-cyan-300">diverse ideas</span> and take
            them to drive{" "}
            <span className="text-cyan-300">social innovation</span>, you
            come to ReThink.”
          </p>

          <div className="rise mt-12 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.4s]">
            <Btn href="/join" variant="primary">
              Gia nhập Gen 5 <span className="text-cyan-300">▪</span>
            </Btn>
          </div>
        </div>

        {/* value marquee */}
        <div className="relative border-y border-white/10 bg-ink-900/60 py-4 overflow-hidden">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12 text-sm font-medium uppercase tracking-[0.3em] text-pearl-100/60">
                <span>Rethink &amp; Let Rethink</span>
                <span className="text-cyan-400">▪</span>
                <span>Embrace Diversity</span>
                <span className="text-cyan-400">▪</span>
                <span>Own &amp; Act Together</span>
                <span className="text-cyan-400">▪</span>
                <span>Reflect to Evolve</span>
                <span className="text-cyan-400">▪</span>
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
              rest="hat is ReThink?"
              kicker="Về chúng mình"
            />
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
              <p>
                ReThink là{" "}
                <strong className="text-pearl-100">
                  tổ chức sinh viên của VinUni
                </strong>
                , hoạt động từ năm 2022. Chúng mình tạo ra những không gian để
                người trẻ nhìn lại một vấn đề quen thuộc từ nhiều góc khác nhau
                — qua podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý
                tưởng.
              </p>
              <p>
                ReThink cũng là{" "}
                <strong className="text-pearl-100">
                  đơn vị tổ chức TEDxVinUniversity thường niên
                </strong>{" "}
                — sự kiện lan toả ý tưởng lớn nhất tại VinUni, do sinh viên vận
                hành trọn vẹn từ khâu tuyển chọn diễn giả tới đêm sự kiện.
              </p>
              <p>
                Điều làm ReThink khác biệt nằm ở cách làm:{" "}
                <em className="text-cyan-300 not-italic font-semibold">
                  mọi hoạt động đều bắt đầu từ nội dung.
                </em>{" "}
                Một câu hỏi được nghiên cứu kỹ, một narrative được xây rõ ràng —
                rồi mới tới sân khấu, bài viết hay chiến dịch truyền thông.
              </p>
            </div>

            <ul className="frame-hairline mt-8 grid gap-3 p-6 text-sm text-pearl-100/80">
              <li className="flex gap-3"><span className="text-cyan-400">▪</span><span>Chạm vào những <strong>thế giới tư duy khác biệt</strong></span></li>
              <li className="flex gap-3"><span className="text-cyan-400">▪</span><span>Rèn luyện <strong>thói quen rethink</strong> mỗi ngày</span></li>
              <li className="flex gap-3"><span className="text-cyan-400">▪</span><span>Kết nối với <strong>những người cùng tư duy</strong> trong cộng đồng ReThink</span></li>
              <li className="flex gap-3"><span className="text-cyan-400">▪</span><span>Tiếp cận <strong>nguồn lực &amp; mạng lưới</strong> để tạo tác động thật lên xã hội</span></li>
            </ul>
          </div>

          <div className="relative" data-reveal style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="/photos/community-3.jpg"
                alt="Cộng đồng ReThink trên sân khấu"
                width={717}
                height={478}
                className="col-span-2 rounded-2xl border border-white/10 object-cover shadow-2xl shadow-violet-800/20"
              />
              <Image
                src="/photos/team-table.jpg"
                alt="ReThinkers làm việc cùng nhau"
                width={614}
                height={410}
                className="rounded-2xl border border-white/10 object-cover"
              />
              <Image
                src="/photos/balcony.jpg"
                alt="Thành viên ReThink"
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
            rest="ore Values"
            kicker="4 giá trị cốt lõi"
            className="text-center [&>p]:justify-center"
          />
          <div className="stagger mt-14 grid gap-5 sm:grid-cols-2" data-reveal>
            {coreValues.map((v, i) => (
              <div
                key={v.title}
                className="hang frame-hairline group relative bg-ink-900/50 p-7 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <span className="font-display text-2xl font-light tracking-[0.25em] text-cyan-300/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-pearl-100">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {v.desc}
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
          <SectionHeading script="W" rest="hat We Do" kicker="Hoạt động nổi bật" />
          <div className="stagger mt-14 grid gap-6 md:grid-cols-3" data-reveal>
            {activities.map((a) => {
              const card = (
                <article
                  key={a.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 transition hover:border-cyan-400/40"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                      {a.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-pearl-100">
                      {a.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                      {a.desc}
                    </p>
                    {a.href && (
                      <p className="mt-4 text-sm font-semibold text-cyan-300 group-hover:text-lilac-200">
                        Khám phá TEDx →
                      </p>
                    )}
                  </div>
                </article>
              );
              return a.href ? (
                <Link key={a.title} href={a.href}>
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
            ReThink là đơn vị đứng sau
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold leading-tight sm:text-6xl">
            <span className="text-neon-cyan">TEDx</span>
            <span className="text-pearl-100">VinUniversity</span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-pearl-100/80">
            Với chủ đề <strong className="text-pearl-100">“The Firsts”</strong>,
            ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia
            hàng đầu về những khoảnh khắc tiên phong tạo nên giá trị đột phá.
          </p>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["7", "Diễn giả"],
              ["500+", "Khán giả"],
              ["19K", "Tương tác MXH"],
              ["60+", "Thành viên BTC"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-4xl font-bold text-pearl-100">{n}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-pearl-100/60">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Btn href="/tedx" variant="red">
              The Firsts · 2025 →
            </Btn>
            <Btn href="https://v0-tedxvinuni.vercel.app/" external variant="ghost">
              Limitless Decade · 2026 ↗
            </Btn>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS THIS YEAR ============ */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="P"
            rest="rojects This Year"
            kicker="Năm học 2026–2027"
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            Gia nhập ReThink năm nay, đây là hai dự án bạn sẽ trực tiếp bắt tay
            vào làm:
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-2" data-reveal>
            {thisYear.map((p) => (
              <article
                key={p.title}
                className="hang frame-hairline relative bg-ink-900/50 p-8 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <div className="flex items-center gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-400">
                    {p.kicker}
                  </p>
                  <span className="rounded-full border border-cyan-400/40 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                    Coming soon
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-pearl-100">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {p.desc}
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

      {/* ============ FUTURE ACTIVITIES ============ */}
      <section className="smoke grain relative overflow-hidden py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="K"
            rest="ey Activities"
            kicker="Hoạt động tiếp diễn"
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            Ba hoạt động ReThink tiếp tục duy trì và phát triển bên cạnh các dự
            án chính:
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-3" data-reveal>
            {future.map((f) => (
              <div
                key={f.num}
                className="hang relative rounded-2xl border border-white/10 bg-ink-900/50 p-7 backdrop-blur-sm"
              >
                <span className="font-display text-5xl font-bold text-violet-500/50">
                  {f.num}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-lilac-200">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {f.desc}
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
            Bạn được khuyến khích bước ra khỏi vùng an toàn, phá vỡ giới hạn và
            khám phá toàn bộ tiềm năng của mình — cùng một cộng đồng luôn sẵn
            sàng đứng sau lưng bạn.
          </p>
          <Btn href="/join" variant="primary" className="mt-10">
            Ứng tuyển Gen 5 <span className="text-cyan-300">▪</span>
          </Btn>
        </div>
      </section>
    </>
  );
}
