import type { Metadata } from "next";
import Link from "next/link";
import { getDb, publishedPieces } from "@/lib/voices/store";
import { TOPIC_STATUS_LABEL } from "@/lib/voices/types";

export const metadata: Metadata = { title: "Chủ đề theo tháng" };
export const dynamic = "force-dynamic";

const STATUS_ORDER = { open: 0, upcoming: 1, closed: 2, archived: 3 } as const;

export default function TopicsPage() {
  const db = getDb();
  const published = publishedPieces(db);
  const topics = [...db.topics].sort(
    (a, b) =>
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
      b.month.localeCompare(a.month)
  );

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl text-ink-900">
          <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">C</span>
          hủ đề theo tháng
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          Mỗi tháng, một câu hỏi — một lời mời kể lại trải nghiệm của chính bạn.
        </p>
      </header>

      <div className="grid gap-6">
        {topics.map((t) => {
          const count = published.filter((p) => p.topicId === t.id).length;
          const date = new Date(t.month);
          return (
            <Link
              key={t.id}
              href={`/voices/topics/${t.slug}`}
              className="group grid gap-4 rounded-2xl border border-hairline bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[7rem_1fr_auto] sm:items-center"
            >
              <div className="text-center sm:border-r sm:border-hairline sm:pr-4">
                <p className="font-display text-3xl font-bold text-crimson-600">
                  {String(date.getMonth() + 1).padStart(2, "0")}
                </p>
                <p className="text-xs uppercase tracking-widest text-ink-500">
                  {date.getFullYear()}
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl leading-snug text-ink-900 group-hover:text-crimson-700">
                  {t.title}
                </h2>
                <p className="mt-2 text-sm italic leading-relaxed text-ink-700">
                  “{t.prompt}”
                </p>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                    t.status === "open"
                      ? "bg-crimson-600 text-white"
                      : t.status === "upcoming"
                        ? "bg-violet-100 text-violet-800"
                        : "bg-stone-200 text-stone-600"
                  }`}
                >
                  {TOPIC_STATUS_LABEL[t.status]}
                </span>
                <span className="text-xs text-ink-500">{count} bài viết</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
