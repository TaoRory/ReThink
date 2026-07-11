import { notFound } from "next/navigation";
import { Btn } from "@/components/Btn";
import { PieceCard } from "@/components/voices/PieceCard";
import {
  clapCount,
  getDb,
  profileById,
  publishedPieces,
  topicBySlug,
} from "@/lib/voices/store";
import { TOPIC_STATUS_LABEL } from "@/lib/voices/types";

export const dynamic = "force-dynamic";

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = getDb();
  const topic = topicBySlug(db, slug);
  if (!topic) notFound();

  const pieces = publishedPieces(db).filter((p) => p.topicId === topic.id);
  const date = new Date(topic.month);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="relative mb-14 overflow-hidden rounded-3xl border border-hairline bg-white p-10 text-center shadow-sm sm:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(30rem_14rem_at_90%_-10%,rgba(158,18,38,0.07),transparent_60%)]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-ink-500">
            Chủ đề tháng {date.getMonth() + 1}/{date.getFullYear()} ·{" "}
            <span
              className={
                topic.status === "open" ? "text-crimson-600" : "text-ink-500"
              }
            >
              {TOPIC_STATUS_LABEL[topic.status]}
            </span>
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-ink-900 sm:text-5xl">
            {topic.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-display text-lg italic text-ink-700">
            “{topic.prompt}”
          </p>
          {topic.description && (
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink-700">
              {topic.description}
            </p>
          )}
          {topic.status === "open" && (
            <Btn href="/voices/submit" variant="light" className="mt-8">
              Gửi bài cho chủ đề này ✍
            </Btn>
          )}
        </div>
      </header>

      {pieces.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {pieces.map((p) => (
            <PieceCard
              key={p.id}
              piece={p}
              author={profileById(db, p.authorId)!}
              claps={clapCount(db, p.id)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-hairline bg-white p-12 text-center text-sm italic text-ink-500">
          Chủ đề này vừa mở. Là người đầu tiên chia sẻ nhé. ✦
        </p>
      )}
    </div>
  );
}
