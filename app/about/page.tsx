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
    "ReThink là cộng đồng sinh viên VinUniversity nơi người trẻ Việt rèn thói quen rethink, kết nối những người cùng tư duy và tạo tác động thật lên xã hội.",
};

const departments = [
  {
    name: "Content",
    desc: "Nghiên cứu và phát triển nội dung cốt lõi cho các hoạt động, phụ trách speaker outreach và hỗ trợ hoạch định chiến lược cùng các team khác.",
  },
  {
    name: "MarCom",
    desc: "Sáng tạo theme & concept, chắp bút thông điệp, và là cầu nối đưa ReThink đến với công chúng rộng hơn.",
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
    desc: "Xây dựng quan hệ đối ngoại với nhà tài trợ, đối tác và diễn giả — đồng hành trước, trong và sau mỗi sự kiện.",
  },
  {
    name: "Event",
    desc: "Phụ trách logistics và vận hành, tổ chức sự kiện từ A đến Z — từ ngân sách đến thực thi.",
  },
];

const cultures = [
  {
    title: "Championship Culture",
    desc: "Nhận full ownership với những gì mình làm — từ tầm nhìn đến bàn giao. Không dừng ở “vừa đủ”, luôn play to win với sự chỉn chu, bền bỉ và tâm huyết với nghề.",
  },
  {
    title: "Fellowship Culture",
    desc: "Chúng mình mạnh lên bằng cách lớn lên cùng nhau — tạo ra những không gian nơi mỗi người thấy an toàn, được trân trọng và được lắng nghe.",
  },
  {
    title: "Breakership Culture",
    desc: "Từ chối tư duy mặc định. Chúng mình đặt câu hỏi vì sao mọi thứ được làm theo cách đó — và liệu có nên tiếp tục như vậy.",
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
          <Sparkle className="absolute left-[10%] top-32 h-8 w-8 text-lavender-300/60" />
          <Sparkle className="absolute right-[12%] top-52 h-12 w-12 text-lavender-400/50" />
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-lavender-300/80">
            Rethink — Relearn — Reinvent
          </p>
          <h1 className="mt-6 font-display text-5xl leading-tight text-cream-100 sm:text-6xl">
            <span className="font-script text-chrome text-[1.6em] align-[-0.12em] mr-2">W</span>
            hat is ReThink?
          </h1>
          <p className="mx-auto mt-8 max-w-2xl font-display text-xl italic leading-relaxed text-cream-100/85">
            Nơi người trẻ Việt chạm vào những thế giới tư duy khác biệt, rèn
            thói quen rethink, và biến ý tưởng đa chiều thành đổi mới xã hội.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-cream-100/75">
            <p>
              Chúng ta đều đang <strong className="text-cream-100">mắc kẹt</strong>{" "}
              trong những <strong className="text-cream-100">chiếc hộp tư duy</strong>{" "}
              được định hình bởi chuẩn mực xã hội, những điều ta được dạy, và
              thiên kiến thuật toán trên mạng xã hội ngày nay. Vì thế, thật khó
              để đón nhận quan điểm trái chiều, nghĩ vượt những khung quen
              thuộc, hay kết nối ý tưởng giữa các lĩnh vực khác nhau.
            </p>
            <p>
              Nhưng <strong className="text-cream-100">kỷ nguyên AI</strong> mà
              chúng ta đang sống đòi hỏi những bộ óc dám phá vỡ giới hạn — những
              bộ óc hiểu được nhiều góc nhìn, xử lý các dòng suy nghĩ phức tạp
              và tạo ra ý nghĩa mới từ những tín hiệu rời rạc.{" "}
              <strong className="text-lavender-300">
                Tương lai, vì vậy, thuộc về những người làm chủ tư duy.
              </strong>
            </p>
            <p>
              Nhận ra điều đó, ReThink chủ động tìm kiếm ý tưởng và tri thức
              của những early adopter, những thought leader — và khuếch đại
              tiếng nói của họ, để những tia sáng ấy chạm tới những người có
              khả năng hiện thực hoá chúng.
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
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {departments.map((d) => (
              <div
                key={d.name}
                className="frame-dashed bg-plum-900/50 p-6 backdrop-blur-sm transition hover:bg-plum-800/60"
              >
                <h3 className="font-display text-lg font-semibold text-lavender-200">
                  {d.name}{" "}
                  <span className="text-sm font-normal text-cream-100/50">
                    Department
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/70">
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
          <p className="mt-5 max-w-2xl text-[15px] text-cream-100/70">
            Mỗi ReThinker làm việc, hỗ trợ nhau và trưởng thành dựa trên 3 giá
            trị văn hoá:
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal>
            {cultures.map((c, i) => (
              <div
                key={c.title}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-plum-800/60 to-plum-900/60 p-7"
              >
                <Sparkle
                  animate={false}
                  className="h-6 w-6 text-lavender-300/70"
                />
                <h3 className="mt-4 font-display text-xl font-semibold text-cream-100">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/70">
                  {c.desc}
                </p>
                <span className="absolute right-6 top-5 font-script text-3xl text-lavender-400/40">
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
            rest="enefits of Being a Rethinker"
            kicker="Bạn nhận được gì"
          />
          <div className="mt-14 space-y-8" data-reveal>
            {benefits.map((b) => (
              <div
                key={b.title}
                className="frame-dashed grid gap-6 bg-plum-900/40 p-8 md:grid-cols-[1fr_1.6fr]"
              >
                <h3 className="font-display text-2xl font-semibold text-lavender-200">
                  {b.title}
                </h3>
                <ul className="space-y-3 text-sm leading-relaxed text-cream-100/75">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-0.5 text-lavender-400">✦</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mx-auto max-w-xl font-display text-xl italic text-cream-100/85">
              “Belonging isn&apos;t just a feeling — it&apos;s the value ReThink
              puts at the very heart of its community.”
            </p>
            <Btn href="/join" variant="primary" className="mt-8">
              Trở thành ReThinker <span className="text-lavender-300">✦</span>
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
