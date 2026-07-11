import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/voices/Badges";
import { atLeast, getSessionUser } from "@/lib/voices/auth";
import { clapCount, getDb, profileById, topicById } from "@/lib/voices/store";
import type { Piece } from "@/lib/voices/types";
import { TOPIC_STATUS_LABEL } from "@/lib/voices/types";
import {
  setPieceStatusAction,
  setTopicStatusAction,
  toggleSpotlightAction,
} from "../actions";
import { TopicForm } from "./TopicForm";

export const metadata: Metadata = { title: "Studio — Ban biên tập" };
export const dynamic = "force-dynamic";

function ActionButton({
  action,
  label,
  tone = "neutral",
}: {
  action: () => Promise<void>;
  label: string;
  tone?: "neutral" | "primary" | "danger";
}) {
  const cls =
    tone === "primary"
      ? "bg-crimson-600 text-white hover:bg-crimson-700"
      : tone === "danger"
        ? "border border-ink-900/15 text-ink-500 hover:border-crimson-600 hover:text-crimson-600"
        : "border border-ink-900/15 text-ink-700 hover:border-ink-900";
  return (
    <form action={action} className="inline">
      <button
        className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition ${cls}`}
      >
        {label}
      </button>
    </form>
  );
}

function PieceRow({ piece }: { piece: Piece }) {
  const db = getDb();
  const author = profileById(db, piece.authorId);
  const topic = topicById(db, piece.topicId);

  return (
    <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/voices/pieces/${piece.slug}`}
            className="truncate font-display text-base text-ink-900 hover:text-crimson-700"
          >
            {piece.title}
          </Link>
          <StatusBadge status={piece.status} />
          {piece.isSpotlight && (
            <span className="text-[11px] font-bold text-crimson-600">
              ✦ Spotlight
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-ink-500">
          {author?.displayName} · {topic?.title} ·{" "}
          {piece.lengthType === "long" ? "Essay" : "Reflection"} ·{" "}
          {piece.readingTimeMin} phút
          {piece.status === "published" &&
            ` · 👏 ${clapCount(db, piece.id)}`}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {piece.status === "submitted" && (
          <ActionButton
            action={setPieceStatusAction.bind(null, piece.id, "in_review")}
            label="Nhận review"
          />
        )}
        {(piece.status === "submitted" || piece.status === "in_review") && (
          <ActionButton
            action={setPieceStatusAction.bind(null, piece.id, "curated")}
            label="Tuyển chọn"
          />
        )}
        {piece.status !== "published" && piece.status !== "draft" && (
          <ActionButton
            action={setPieceStatusAction.bind(null, piece.id, "published")}
            label="Xuất bản ✦"
            tone="primary"
          />
        )}
        {piece.status === "published" && (
          <>
            <ActionButton
              action={toggleSpotlightAction.bind(null, piece.id)}
              label={piece.isSpotlight ? "Bỏ spotlight" : "Đặt spotlight ✦"}
            />
            <ActionButton
              action={setPieceStatusAction.bind(null, piece.id, "archived")}
              label="Gỡ bài"
              tone="danger"
            />
          </>
        )}
        {piece.status === "archived" && (
          <ActionButton
            action={setPieceStatusAction.bind(null, piece.id, "published")}
            label="Khôi phục"
          />
        )}
      </div>
    </div>
  );
}

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getSessionUser();
  if (!atLeast(user, "editor")) redirect("/voices/login");

  const { tab = "queue" } = await searchParams;
  const db = getDb();

  const queue = db.pieces
    .filter((p) => ["submitted", "in_review", "curated"].includes(p.status))
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
  const live = db.pieces
    .filter((p) => ["published", "archived"].includes(p.status))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  const topics = [...db.topics].sort((a, b) =>
    b.month.localeCompare(a.month)
  );

  const tabs = [
    { key: "queue", label: `Review queue (${queue.length})` },
    { key: "live", label: `Đã xuất bản (${live.length})` },
    { key: "topics", label: `Chủ đề (${topics.length})` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-ink-900">
          <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">S</span>
          tudio
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Console của ban biên tập — curate, xuất bản và quản lý chủ đề.
        </p>
      </header>

      <nav className="mb-8 flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/voices/studio?tab=${t.key}`}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              tab === t.key
                ? "bg-ink-900 text-ivory-50"
                : "border border-hairline bg-white text-ink-700 hover:border-ink-900"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {tab === "queue" && (
        <section className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
          {queue.length > 0 ? (
            <div className="divide-y divide-hairline">
              {queue.map((p) => (
                <PieceRow key={p.id} piece={p} />
              ))}
            </div>
          ) : (
            <p className="p-12 text-center text-sm italic text-ink-500">
              Hàng chờ trống — mọi bài gửi đến đã được xử lý. ✦
            </p>
          )}
        </section>
      )}

      {tab === "live" && (
        <section className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
          {live.length > 0 ? (
            <div className="divide-y divide-hairline">
              {live.map((p) => (
                <PieceRow key={p.id} piece={p} />
              ))}
            </div>
          ) : (
            <p className="p-12 text-center text-sm italic text-ink-500">
              Chưa có bài nào được xuất bản.
            </p>
          )}
        </section>
      )}

      {tab === "topics" && (
        <section className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
            <div className="divide-y divide-hairline">
              {topics.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/voices/topics/${t.slug}`}
                        className="font-display text-base text-ink-900 hover:text-crimson-700"
                      >
                        {t.title}
                      </Link>
                      <span className="rounded-full bg-ivory-50 px-2.5 py-0.5 text-[11px] font-semibold text-ink-500 border border-hairline">
                        {TOPIC_STATUS_LABEL[t.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">
                      Tháng {new Date(t.month).getMonth() + 1}/
                      {new Date(t.month).getFullYear()} ·{" "}
                      {
                        db.pieces.filter(
                          (p) =>
                            p.topicId === t.id && p.status === "published"
                        ).length
                      }{" "}
                      bài đã đăng
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    {t.status !== "open" && (
                      <ActionButton
                        action={setTopicStatusAction.bind(null, t.id, "open")}
                        label="Mở nhận bài"
                        tone="primary"
                      />
                    )}
                    {t.status === "open" && (
                      <ActionButton
                        action={setTopicStatusAction.bind(null, t.id, "closed")}
                        label="Đóng chủ đề"
                      />
                    )}
                    {t.status === "closed" && (
                      <ActionButton
                        action={setTopicStatusAction.bind(
                          null,
                          t.id,
                          "archived"
                        )}
                        label="Lưu trữ"
                        tone="danger"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TopicForm />
        </section>
      )}
    </div>
  );
}
