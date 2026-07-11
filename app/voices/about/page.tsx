import type { Metadata } from "next";
import { Btn } from "@/components/Btn";
import { Flywheel } from "@/components/voices/Flywheel";

export const metadata: Metadata = { title: "Cách hoạt động" };

const steps = [
  {
    q: "Ai được viết?",
    a: "Bất kỳ ai — sinh viên VinUni hay bạn trẻ ở bất cứ đâu. Chỉ cần đăng ký một tài khoản là bạn trở thành người viết của Voices.",
  },
  {
    q: "Viết gì và viết bao nhiêu?",
    a: "Mỗi tháng Voices mở một chủ đề dưới dạng câu hỏi. Bạn chọn viết Reflection ngắn (vài trăm chữ) hoặc Essay dài — miễn là câu chuyện thật của bạn.",
  },
  {
    q: "Bài của mình đi đâu sau khi gửi?",
    a: "Ban Content của ReThink đọc mọi bài được gửi. Bài phù hợp được biên tập nhẹ và xuất bản; bài nổi bật nhất nhận huy hiệu “Bài được ReThink chọn”.",
  },
  {
    q: "Rồi sao nữa?",
    a: "Tác giả của những bài hay nhất mỗi mùa được mời kể câu chuyện của mình tại ReThink Salon — và những tiếng nói xuất sắc nhất sẽ được đề cử cho sân khấu TEDxVinUniversity.",
  },
];

export default function VoicesAboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <header className="text-center">
        <p className="font-script text-5xl text-crimson-600">ReThink Voices</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink-900">
          Một chủ đề mỗi tháng.
          <br />
          Từ trang viết, đến sân khấu.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-700">
          Voices là nền tảng viết &amp; chia sẻ của cộng đồng ReThink. Nhưng
          khác với mọi trang viết online khác, Voices có một thứ mà không nơi
          nào có: <strong className="text-ink-900">một sân khấu thật</strong>.
          Mỗi bài viết là một bước trên hành trình người viết → diễn giả.
        </p>
      </header>

      <section className="mt-14">
        <Flywheel />
        <p className="mt-4 text-center text-xs italic text-ink-500">
          Mỗi vòng quay, cộng đồng lớn thêm — và tự kéo lứa người viết mới.
        </p>
      </section>

      <section className="mt-16 space-y-5">
        {steps.map((s) => (
          <div
            key={s.q}
            className="rounded-2xl border border-hairline bg-white p-7 shadow-sm"
          >
            <h2 className="font-display text-xl font-semibold text-ink-900">
              {s.q}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{s.a}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-3xl bg-ink-900 p-10 text-center text-ivory-50">
        <p className="font-script text-4xl text-pink-200">
          Sẵn sàng chưa?
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory-50/70">
          Chủ đề tháng này đang mở. Bài đầu tiên không cần hoàn hảo — nó chỉ
          cần thật.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Btn href="/voices/signup" variant="red">
            Đăng ký viết ✍
          </Btn>
          <Btn href="/voices/topics" variant="ghost">
            Xem chủ đề tháng này
          </Btn>
        </div>
      </section>
    </div>
  );
}
