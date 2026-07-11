import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AuthorAvatar } from "@/components/voices/AuthorAvatar";
import { LengthBadge, SpotlightBadge } from "@/components/voices/Badges";
import { ClapButton } from "@/components/voices/ClapButton";
import { PieceCard } from "@/components/voices/PieceCard";
import { atLeast, getSessionUser } from "@/lib/voices/auth";
import {
  clapCount,
  getDb,
  hasClapped,
  pieceBySlug,
  profileById,
  publishedPieces,
  topicById,
} from "@/lib/voices/store";

export const dynamic = "force-dynamic";

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = getDb();
  const piece = pieceBySlug(db, slug);
  const user = await getSessionUser();

  // Unpublished pieces are only visible to their author and editors+
  const canPreview =
    piece &&
    (piece.authorId === user?.id || atLeast(user, "editor"));
  if (!piece || (piece.status !== "published" && !canPreview)) notFound();

  const author = profileById(db, piece.authorId)!;
  const topic = topicById(db, piece.topicId);
  const claps = clapCount(db, piece.id);
  const related = publishedPieces(db)
    .filter((p) => p.topicId === piece.topicId && p.id !== piece.id)
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      {piece.status !== "published" && (
        <p className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bản xem trước — bài này chưa được xuất bản.
        </p>
      )}

      <header className="text-center">
        {topic && (
          <Link
            href={`/voices/topics/${topic.slug}`}
            className="text-xs font-bold uppercase tracking-[0.25em] text-crimson-600 hover:underline underline-offset-4"
          >
            {topic.title}
          </Link>
        )}
        <h1 className="mt-5 font-display text-4xl leading-tight text-ink-900 sm:text-[2.75rem]">
          {piece.title}
        </h1>
        {piece.isSpotlight && <SpotlightBadge className="mt-5" />}

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href={`/voices/writers/${author.username}`}>
            <AuthorAvatar profile={author} size={44} />
          </Link>
          <div className="text-left">
            <Link
              href={`/voices/writers/${author.username}`}
              className="text-sm font-bold text-ink-900 hover:text-crimson-600"
            >
              {author.displayName}
              {author.isAlumni && (
                <span className="ml-1.5 text-[10px] font-bold uppercase text-violet-700">
                  Alumni
                </span>
              )}
            </Link>
            <p className="text-xs text-ink-500">
              {piece.publishedAt &&
                new Date(piece.publishedAt).toLocaleDateString("vi-VN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
              · {piece.readingTimeMin} phút đọc
            </p>
          </div>
          <LengthBadge type={piece.lengthType} />
        </div>
      </header>

      <hr className="mx-auto my-10 w-24 border-hairline" />

      <div className="prose-voices">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{piece.body}</ReactMarkdown>
      </div>

      <footer className="mt-12 flex flex-col items-center gap-6 border-t border-hairline pt-10">
        {piece.status === "published" &&
          (user ? (
            <ClapButton
              pieceId={piece.id}
              count={claps}
              clapped={hasClapped(db, piece.id, user.id)}
              loggedIn
            />
          ) : (
            <Link
              href="/voices/login"
              className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 bg-white px-6 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-crimson-600 hover:text-crimson-600"
            >
              👏 {claps} · Đăng nhập để vỗ tay
            </Link>
          ))}

        {/* Author card */}
        <div className="flex w-full items-start gap-4 rounded-2xl border border-hairline bg-white p-6">
          <AuthorAvatar profile={author} size={52} />
          <div>
            <Link
              href={`/voices/writers/${author.username}`}
              className="font-display text-lg font-semibold text-ink-900 hover:text-crimson-600"
            >
              {author.displayName}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">
              {author.bio || "Một cây viết của cộng đồng ReThink Voices."}
            </p>
            <Link
              href={`/voices/writers/${author.username}`}
              className="mt-2 inline-block text-xs font-semibold text-crimson-600 hover:underline underline-offset-4"
            >
              Xem tất cả bài viết →
            </Link>
          </div>
        </div>
      </footer>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-6 font-display text-2xl text-ink-900">
            Cùng chủ đề
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PieceCard
                key={p.id}
                piece={p}
                author={profileById(db, p.authorId)!}
                claps={clapCount(db, p.id)}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
