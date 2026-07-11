import Link from "next/link";
import { Btn } from "@/components/Btn";
import { Flywheel } from "@/components/voices/Flywheel";
import { PieceCard } from "@/components/voices/PieceCard";
import {
  clapCount,
  currentOpenTopic,
  getDb,
  profileById,
  publishedPieces,
  topicById,
} from "@/lib/voices/store";

export const dynamic = "force-dynamic";

export default function VoicesHomePage() {
  const db = getDb();
  const topic = currentOpenTopic(db);
  const published = publishedPieces(db);
  const spotlight = published.filter((p) => p.isSpotlight);
  const latest = published.filter((p) => !p.isSpotlight);
  const topicPieceCount = topic
    ? published.filter((p) => p.topicId === topic.id).length
    : 0;

  return (
    <>
      {/* Hero — current topic */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_20rem_at_85%_-20%,rgba(158,18,38,0.08),transparent_60%),radial-gradient(34rem_18rem_at_0%_110%,rgba(69,16,158,0.07),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center">
          <p className="font-script text-4xl text-crimson-600">
            Một chủ đề mỗi tháng
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.4em] text-ink-500">
            Từ trang viết, đến sân khấu
          </p>

          {topic ? (
            <>
              <p className="mt-10 inline-block rounded-full border border-crimson-600/30 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-crimson-600">
                ✦ Chủ đề tháng {new Date(topic.month).getMonth() + 1} — đang mở
              </p>
              <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
                {topic.title}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl font-display text-lg italic leading-relaxed text-ink-700">
                “{topic.prompt}”
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Btn href="/voices/submit" variant="light">
                  Viết điều đáng nghĩ ✍
                </Btn>
                <Btn href={`/voices/topics/${topic.slug}`} variant="light-ghost">
                  {topicPieceCount > 0
                    ? `Đọc ${topicPieceCount} bài đã đăng`
                    : "Xem chi tiết chủ đề"}
                </Btn>
              </div>
              {topicPieceCount === 0 && (
                <p className="mt-5 text-sm italic text-ink-500">
                  Chủ đề tháng này vừa mở. Là người đầu tiên chia sẻ nhé.
                </p>
              )}
            </>
          ) : (
            <h1 className="mt-10 font-display text-4xl text-ink-900">
              Chủ đề mới sắp mở — quay lại sớm nhé!
            </h1>
          )}
        </div>
      </section>

      {/* Flywheel */}
      <section className="border-b border-hairline bg-white/60">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl text-ink-900">
              <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">V</span>
              òng quay Voices
            </h2>
            <p className="mt-3 text-sm text-ink-700">
              Không chỉ là trang viết — Voices là bậc thang đầu tiên của hành
              trình người viết → diễn giả.
            </p>
          </div>
          <Flywheel />
        </div>
      </section>

      {/* Spotlight */}
      {spotlight.length > 0 && (
        <section className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-display text-3xl text-ink-900">
              <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">S</span>
              potlight
            </h2>
            <p className="text-sm italic text-ink-500">Bài được ReThink chọn</p>
          </div>
          <div className="grid gap-6">
            {spotlight.map((p) => (
              <PieceCard
                key={p.id}
                piece={p}
                author={profileById(db, p.authorId)!}
                topic={topicById(db, p.topicId)}
                claps={clapCount(db, p.id)}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="font-display text-3xl text-ink-900">
            <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">M</span>
            ới xuất bản
          </h2>
          <Link
            href="/voices/topics"
            className="text-sm font-semibold text-crimson-600 hover:underline underline-offset-4"
          >
            Xem tất cả chủ đề →
          </Link>
        </div>
        {latest.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {latest.map((p) => (
              <PieceCard
                key={p.id}
                piece={p}
                author={profileById(db, p.authorId)!}
                topic={topicById(db, p.topicId)}
                claps={clapCount(db, p.id)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-hairline bg-white p-10 text-center text-sm italic text-ink-500">
            Chưa có bài nào — hãy là người đầu tiên chia sẻ nhé.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-hairline bg-ink-900 text-ivory-50">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <p className="font-script text-5xl text-pink-200">Viết đi, đừng sợ</p>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ivory-50/70">
            Mỗi diễn giả TEDx đều từng có một bài viết đầu tiên. Bài của bạn
            không cần hoàn hảo — nó chỉ cần thật.
          </p>
          <Btn href="/voices/submit" variant="red" className="mt-8">
            Gửi bài tháng này ✍
          </Btn>
        </div>
      </section>
    </>
  );
}
