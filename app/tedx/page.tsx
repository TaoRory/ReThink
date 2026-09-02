import type { Metadata } from "next";
import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { Sparkle } from "@/components/Sparkle";

export const metadata: Metadata = {
  title: "TEDxVinUniversity — The Firsts",
  description:
    "ReThink là đơn vị đứng sau TEDxVinUniversity — sự kiện lan toả ý tưởng lớn nhất tại VinUni với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác.",
};

const TEDX_URL = "https://v0-tedxvinuni.vercel.app/";

const stats = [
  { n: "7", label: "Diễn giả xuất sắc từ nhiều lĩnh vực" },
  { n: "500+", label: "Khán giả tham dự trực tiếp" },
  { n: "19.000", label: "Lượt tương tác mạng xã hội" },
  { n: "60+", label: "Thành viên BTC — hơn 5 tháng chuẩn bị" },
  { n: "9", label: "Nhà tài trợ đồng hành" },
  { n: "28", label: "Đại sứ truyền thông" },
];

const gallery = [
  { src: "/photos/tedx-stage.jpg", alt: "Toàn cảnh sân khấu TEDxVinUniversity — The Firsts", span: true },
  { src: "/photos/tedx-speakers.jpg", alt: "Các diễn giả TEDxVinUniversity nhận hoa" },
  { src: "/photos/tedx-redcarpet.jpg", alt: "Khách mời trên thảm đỏ TEDx" },
  { src: "/photos/tedx-team.jpg", alt: "Đội ngũ tổ chức trên sân khấu The Firsts" },
  { src: "/photos/tedx-expert.jpg", alt: "Chuyên gia trao đổi cùng sinh viên" },
  { src: "/photos/tedx-backdrop.jpg", alt: "Backdrop The Firsts", span: true },
];

export default function TedxPage() {
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
            ReThink proudly presents
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,9.5vw,4.5rem)] font-bold leading-none sm:text-7xl">
            <span className="text-neon-cyan">TEDx</span>
            <span className="text-pearl-100">VinUniversity</span>
          </h1>
          <p className="mt-4 font-display text-[clamp(1.9rem,7vw,3.1rem)] font-extralight uppercase tracking-[0.3em] text-neon-cyan">
            The Firsts
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed text-pearl-100/80">
            Với chủ đề <strong className="text-pearl-100">“The Firsts — Người Tiên Phong”</strong>,
            ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia
            hàng đầu về những khoảnh khắc tiên phong đã tạo nên giá trị đột phá
            và mở ra chân trời mới bất chấp thử thách.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Btn href="#seasons" variant="red">
              Khám phá hai mùa TEDx ▪
            </Btn>
            <Btn href="/join" variant="ghost">
              Đồng hành cùng BTC mùa tới →
            </Btn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/8 bg-ink-900/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-16 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-fuchsia-400">
                {s.n}
              </p>
              <p className="mx-auto mt-2 max-w-[10rem] text-xs leading-relaxed text-pearl-100/60">
                {s.label}
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
              Hai mùa · Một hành trình
            </p>
            <h2 className="mt-4 font-display text-4xl text-pearl-100 sm:text-5xl">
              Chọn mùa TEDx của bạn
            </h2>
          </div>

          <div className="stagger grid gap-6 md:grid-cols-2" data-reveal>
            {/* The Firsts 2025 */}
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src="/photos/tedx-stage.jpg"
                  alt="Sân khấu The Firsts 2025"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-ink-950/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-pearl-100 backdrop-blur">
                  Mùa 2025 · Đã diễn ra
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-3xl font-bold">
                  <span className="text-neon-cyan">The</span>{" "}
                  <span className="text-pearl-100">Firsts</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  Người Tiên Phong — 7 diễn giả, 500+ khán giả và những câu
                  chuyện về khoảnh khắc dám làm điều đầu tiên. Bạn đang xem
                  hành trình của mùa này ngay tại trang này.
                </p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
                  Cuộn xuống để khám phá ↓
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
                <p className="relative font-display text-4xl font-extralight uppercase tracking-[0.28em] text-neon-cyan">
                  Limitless
                </p>
                <span className="absolute left-5 top-5 rounded-full border border-fuchsia-400/40 bg-ink-950/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-fuchsia-400 backdrop-blur">
                  Mùa 2026 · Mới
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-3xl font-bold">
                  <span className="text-neon-cyan">Limitless</span>{" "}
                  <span className="text-pearl-100">Decade</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  Thập kỷ không giới hạn — mùa TEDxVinUniversity tiếp theo đã
                  khởi động. Khám phá chủ đề, diễn giả và đặt chỗ trên website
                  chính thức của mùa mới.
                </p>
                <p className="mt-auto pt-5 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-400 transition group-hover:text-fuchsia-300">
                  Mở website chính thức ↗
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
              Behind the stage
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-pearl-100 sm:text-5xl">
              ReThink đứng sau
              <br />
              sân khấu đỏ
            </h2>
            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
              <p>
                TEDxVinUniversity là sự kiện chia sẻ ý tưởng lớn nhất tại
                VinUniversity, được tổ chức và vận hành hoàn toàn bởi đội ngũ
                ReThink — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế
                trải nghiệm, đến vận hành đêm sự kiện.
              </p>
              <p>
                Hơn <strong className="text-pearl-100">60 thành viên</strong>{" "}
                làm việc xuyên suốt{" "}
                <strong className="text-pearl-100">5 tháng</strong>, hợp tác
                cùng <strong className="text-pearl-100">9 nhà tài trợ</strong>,{" "}
                <strong className="text-pearl-100">28 đại sứ</strong> và được{" "}
                <strong className="text-pearl-100">VnEconomy</strong> đưa tin.
                TEDxVinUniversity nhận về những phản hồi tích cực và để lại trải
                nghiệm đáng nhớ cho cả người tổ chức lẫn người tham dự.
              </p>
            </div>

            {/* testimonial */}
            <figure className="frame-hairline mt-8 bg-ink-900/50 p-6">
              <blockquote className="font-display text-lg italic leading-relaxed text-pearl-100/90">
                “Huge congratulations! Such an amazing and inspiring event!
                Well done guys!”
              </blockquote>
              <figcaption className="mt-3 text-xs uppercase tracking-[0.25em] text-pearl-100/50">
                — Khán giả TEDxVinUniversity 2025
              </figcaption>
            </figure>

            <a
              href={TEDX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm font-semibold text-fuchsia-400 underline-offset-4 hover:underline"
            >
              Mùa 2026 — Limitless Decade: website chính thức ↗
            </a>
          </div>

          {/* Gallery */}
          <div className="stagger grid grid-cols-2 gap-4" data-reveal>
            {gallery.map((g) => (
              <div
                key={g.src}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                  g.span ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={g.src}
                  alt={g.alt}
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
            Sân khấu này được dựng lên
            <br />
            <span className="font-display text-neon-cyan text-[1.15em] font-extralight uppercase tracking-[0.2em]">
              bởi những người như bạn
            </span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-pearl-100/70">
            Đằng sau mỗi đêm TEDx là hơn 60 ReThinker làm việc suốt 5 tháng —
            từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm đến
            vận hành đêm sự kiện. Mùa tới đang cần thêm những người sẵn sàng
            nhận lấy ownership và làm điều chưa ai làm.
          </p>
          <Btn href="/join" variant="red" className="mt-9">
            Ứng tuyển Gen 5 ▪
          </Btn>
        </div>
      </section>
    </>
  );
}
