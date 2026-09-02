import type { Metadata } from "next";
import Image from "next/image";
import { Aurora } from "@/components/Aurora";
import { Btn } from "@/components/Btn";
import { SectionHeading } from "@/components/SectionHeading";
import { Sparkle } from "@/components/Sparkle";
import { Starfield } from "@/components/Starfield";

export const metadata: Metadata = {
  title: "Về ReThink",
  description:
    "ReThink là tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDxVinUniversity thường niên — làm podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý tưởng.",
};

const departments = [
  {
    name: "Content",
    desc: "Xây dựng core idea và narrative cho từng hoạt động, nghiên cứu chủ đề, đồng thời phụ trách tuyển chọn và đồng hành phát triển nội dung cùng diễn giả.",
  },
  {
    name: "MarCom",
    desc: "Hoạch định chiến lược truyền thông và hệ thống messaging, triển khai các chiến dịch đưa ReThink đến với công chúng rộng hơn.",
  },
  {
    name: "Art",
    desc: "Những “kiến trúc sư thị giác” biến ý tưởng của ReThink thành các ấn phẩm truyền thông ấn tượng — thiết kế, ảnh, video, audio và các chiến dịch sáng tạo.",
  },
  {
    name: "Human Resources",
    desc: "“Chất keo” của tổ chức — theo sát và hỗ trợ thành viên, xây dựng văn hoá, giữ DNA của ReThink sống động qua các hoạt động gắn kết.",
  },
  {
    name: "External Engagement",
    desc: "Xây dựng và duy trì quan hệ với nhà tài trợ, đối tác và các bên liên quan bên ngoài — đồng hành trước, trong và sau mỗi sự kiện.",
  },
  {
    name: "Event",
    desc: "Phụ trách logistics và vận hành, đồng thời thiết kế hành trình khán giả và luồng trải nghiệm xuyên suốt sự kiện — từ ngân sách đến thực thi.",
  },
];

const cultures = [
  {
    title: "Championship Culture",
    desc: "Nhận full ownership với những gì mình làm — từ tầm nhìn đến bàn giao. Không dừng ở “vừa đủ”, luôn play to win với sự chỉn chu, bền bỉ và tâm huyết với việc mình làm.",
  },
  {
    title: "Fellowship Culture",
    desc: "Chúng mình mạnh lên bằng cách lớn lên cùng nhau — tạo ra những không gian nơi mỗi người thấy an toàn, được trân trọng và được lắng nghe.",
  },
  {
    title: "Breakership Culture",
    desc: "Chúng mình không xem cách làm quen thuộc là điều hiển nhiên. Trước mỗi việc, ReThinkers cùng đặt câu hỏi vì sao nó được làm theo cách đó — và liệu có cách nào phù hợp hơn.",
  },
];

const benefits = [
  {
    title: "Skill Development & Career Orientation",
    items: [
      "Học cách xây chiến lược cho dự án và chiến dịch thực tế.",
      "Rèn kỹ năng giao tiếp & pitching khi trình bày ý tưởng với stakeholder.",
      "Phát triển sáng tạo và giải quyết vấn đề qua thử thách thật, từ lên kế hoạch đến thực thi.",
      "Làm việc trực tiếp với chuyên gia — từ diễn giả Forbes Under 30 đến CEO các tập đoàn lớn.",
    ],
  },
  {
    title: "Building Impact Networks",
    items: [
      "Cộng tác với những sinh viên tài năng, cùng chí hướng từ nhiều trường đại học.",
      "Kết nối trực tiếp với giảng viên, lãnh đạo và nhân viên VinUni — những mentor giàu kinh nghiệm.",
      "Xây dựng quan hệ với chuyên gia và doanh nghiệp qua các sự kiện và sáng kiến của ReThink.",
    ],
  },
  {
    title: "A Community Where You Belong",
    items: [
      "Mang ý tưởng “điên rồ” nhất lên bàn và nhận được lời động viên: “Go for it — we've got your back.”",
      "Được tin tưởng, lắng nghe và hỗ trợ ngay cả khi bạn chưa chắc chắn về chính mình.",
      "An toàn để thử, thất bại, và thử lại — bên cạnh những người cũng đang học và nỗ lực như bạn.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="smoke grain relative overflow-hidden pt-16">
        <Aurora sweep />
        <Starfield density={0.8} />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
          <Sparkle className="absolute left-[10%] top-32 h-8 w-8 text-cyan-300/60" />
          <Sparkle className="absolute right-[12%] top-52 h-12 w-12 text-cyan-400/50" />
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300/80">
            Rethink — Relearn — Reinvent
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-pearl-100 sm:text-6xl">
            What is ReThink?
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic leading-relaxed text-pearl-100/85">
            Tổ chức sinh viên của VinUni từ 2022 — nơi một vấn đề quen
            thuộc được nhìn lại từ nhiều góc, và là đơn vị tổ chức
            TEDxVinUniversity thường niên.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-pearl-100/75">
            <p>
              ReThink là{" "}
              <strong className="text-pearl-100">
                tổ chức sinh viên của VinUni
              </strong>
              , hoạt động từ năm 2022. Chúng mình tạo ra những không gian để
              người trẻ nhìn lại một vấn đề quen thuộc từ nhiều góc khác nhau,
              và đưa những góc nhìn ấy tới đúng người cần nghe.
            </p>
            <p>
              Cụ thể, ReThink làm nội dung và sự kiện: podcast Reinventors,
              cuộc thi viết Rethink Reality, các workshop và toạ đàm. Và trên
              hết, ReThink là{" "}
              <strong className="text-pearl-100">
                đơn vị tổ chức TEDxVinUniversity thường niên
              </strong>{" "}
              — sự kiện lan toả ý tưởng lớn nhất tại VinUni, do sinh viên vận
              hành trọn vẹn từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế
              trải nghiệm đến đêm sự kiện.
            </p>
            <p>
              Điều làm ReThink khác biệt nằm ở cách làm:{" "}
              <strong className="text-cyan-300">
                mọi hoạt động đều bắt đầu từ nội dung.
              </strong>{" "}
              Một câu hỏi được nghiên cứu kỹ, một narrative được xây rõ ràng —
              rồi mới tới sân khấu, bài viết hay chiến dịch truyền thông.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/photos/community-1.jpg"
              alt="Cộng đồng ReThink"
              width={820}
              height={548}
              className="rounded-2xl border border-white/10 object-cover"
            />
            <Image
              src="/photos/workshop.jpg"
              alt="ReThinkers trong workshop"
              width={615}
              height={410}
              className="-mt-10 ml-auto w-3/4 rotate-2 rounded-2xl border border-white/10 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="smoke grain relative overflow-hidden border-y border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="O"
            rest="rganizational Structure"
            kicker="6 phòng ban chính"
          />
          <div className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {departments.map((d) => (
              <div
                key={d.name}
                className="hang frame-hairline bg-ink-900/50 p-6 backdrop-blur-sm transition hover:bg-ink-800/60"
              >
                <h3 className="font-display text-lg font-semibold text-lilac-200">
                  {d.name}{" "}
                  <span className="text-sm font-normal text-pearl-100/50">
                    Department
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultures */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="C"
            rest="ulture của ReThinkers"
            kicker="Championship — Fellowship — Breakership"
          />
          <p className="mt-5 max-w-2xl text-[15px] text-pearl-100/70">
            Mỗi ReThinker làm việc, hỗ trợ nhau và trưởng thành dựa trên 3 giá
            trị văn hoá:
          </p>
          <div className="stagger mt-12 grid gap-6 md:grid-cols-3" data-reveal>
            {cultures.map((c, i) => (
              <div
                key={c.title}
                className="hang relative rounded-2xl border border-white/10 bg-gradient-to-b from-ink-800/60 to-ink-900/60 p-7"
              >
                <Sparkle
                  animate={false}
                  className="h-6 w-6 text-cyan-300/70"
                />
                <h3 className="mt-4 font-display text-xl font-semibold text-pearl-100">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-100/70">
                  {c.desc}
                </p>
                <span className="absolute right-6 top-5 font-display text-2xl font-light tracking-[0.2em] text-cyan-400/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="smoke grain relative overflow-hidden border-t border-white/8 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHeading
            script="B"
            rest="enefits of Being a ReThinker"
            kicker="Bạn nhận được gì"
          />
          <div className="mt-14 space-y-8" data-reveal>
            {benefits.map((b) => (
              <div
                key={b.title}
                className="frame-hairline grid gap-6 bg-ink-900/40 p-8 md:grid-cols-[1fr_1.6fr]"
              >
                <h3 className="font-display text-2xl font-semibold text-lilac-200">
                  {b.title}
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-pearl-100/75">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-0.5 text-cyan-400">▪</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mx-auto max-w-xl font-display text-xl italic text-pearl-100/85">
              “Belonging isn&apos;t just a feeling — it&apos;s the value ReThink
              puts at the very heart of its community.”
            </p>
            <Btn href="/join" variant="primary" className="mt-8">
              Trở thành ReThinker <span className="text-cyan-300">▪</span>
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
