import type { Metadata } from "next";
import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { SectionHeading } from "@/components/SectionHeading";
import { Sparkle } from "@/components/Sparkle";
import { Starfield } from "@/components/Starfield";

export const metadata: Metadata = {
  title: "Gia nhập Gen 5",
  description:
    "ReThink Gen 5 Recruitment — trở thành ReThinker để cùng tạo ra những dự án tác động, gặp gỡ chuyên gia hàng đầu và để tiếng nói của bạn được lắng nghe.",
};

const positions = [
  {
    name: "Content",
    desc: "Core idea, narrative, nghiên cứu chủ đề và phát triển diễn giả.",
  },
  {
    name: "Event",
    desc: "Vận hành sự kiện và thiết kế hành trình trải nghiệm khán giả.",
  },
  {
    name: "Human Resources",
    desc: "Xây văn hoá, chăm sóc và gắn kết thành viên.",
  },
  {
    name: "External Engagement",
    desc: "Quan hệ nhà tài trợ, đối tác và các bên liên quan.",
  },
  {
    name: "MarCom",
    desc: "Chiến lược truyền thông, messaging và các chiến dịch.",
  },
  {
    name: "Art",
    desc: "Thiết kế, ảnh, video, audio — các chiến dịch sáng tạo.",
  },
];

export default function JoinPage() {
  return (
    <>
      <section className="smoke grain relative overflow-hidden pt-16">
        <Aurora sweep />
        <Starfield density={0.8} />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="inline-block rounded-full border border-pearl-200/30 bg-ink-900/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-pearl-200">
                Recruitment 2026 – 2027
              </p>
              <h1 className="mt-6 font-display leading-tight">
                <span className="block font-display text-neon text-6xl font-extralight tracking-[0.16em] sm:text-7xl">
                  Gen 5
                </span>
                <span className="mt-2 block text-5xl font-bold text-pearl-100 sm:text-6xl">
                  Recruitment
                </span>
              </h1>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-pearl-100/75">
                Trở thành ReThinker để cùng{" "}
                <strong className="text-pearl-100">
                  kiến tạo những dự án tác động
                </strong>
                , gặp gỡ các chuyên gia hàng đầu, và để{" "}
                <strong className="text-pearl-100">
                  tiếng nói của bạn được lắng nghe
                </strong>
                .
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Btn
                  href="https://www.facebook.com/rethink.vinuni"
                  external
                  variant="primary"
                >
                  Điền form ứng tuyển <span className="text-cyan-300">▪</span>
                </Btn>
                <Btn
                  href="https://www.facebook.com/rethink.vinuni"
                  external
                  variant="ghost"
                >
                  Facebook ReThink
                </Btn>
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
                Deadline: 22/09
              </p>
            </div>

            <div className="relative">
              <Image
                src="/photos/community-3.jpg"
                alt="ReThink Gen mới"
                width={1434}
                height={956}
                className="rounded-2xl border border-white/10 object-cover shadow-2xl shadow-violet-800/30"
              />
              <Image
                src="/photos/balcony.jpg"
                alt="Thành viên ReThink"
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
          <SectionHeading script="O" rest="pen Positions" kicker="6 vị trí đang mở" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {positions.map((p, i) => (
              <div
                key={p.name}
                className="frame-hairline group bg-ink-900/50 p-6 transition hover:bg-ink-800/60"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-pearl-100 group-hover:text-lilac-200">
                    {p.name}
                  </h3>
                  <span className="font-display text-lg font-light tracking-[0.2em] text-cyan-400/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-ink-900 via-ink-800/80 to-ink-900 p-10 text-center">
            <p className="font-display text-2xl italic text-pearl-100/90">
              “Join us as a ReThinker to co-create impactful projects, meet top
              professionals, and let your voice be heard.”
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-cyan-300/70">
              ReThink · Since 2022 · VinUniversity
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
