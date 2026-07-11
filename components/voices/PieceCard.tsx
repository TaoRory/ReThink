import Link from "next/link";
import type { Piece, Profile, Topic } from "@/lib/voices/types";
import { AuthorAvatar } from "./AuthorAvatar";
import { LengthBadge, SpotlightBadge } from "./Badges";

export function PieceCard({
  piece,
  author,
  topic,
  claps,
  featured = false,
}: {
  piece: Piece;
  author: Profile;
  topic?: Topic;
  claps: number;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${
        featured
          ? "border-crimson-600/30 shadow-md sm:p-8"
          : "border-hairline shadow-sm"
      }`}
    >
      {piece.isSpotlight && <SpotlightBadge className="mb-4 self-start" />}

      {topic && (
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-500">
          {topic.title}
        </p>
      )}

      <h3
        className={`font-display leading-snug text-ink-900 group-hover:text-crimson-700 ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        <Link href={`/voices/pieces/${piece.slug}`}>
          <span className="absolute inset-0" aria-hidden="true" />
          {piece.title}
        </Link>
      </h3>

      <p
        className={`mt-3 leading-relaxed text-ink-700 ${
          featured ? "text-[15px]" : "text-sm"
        }`}
      >
        {piece.excerpt}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <AuthorAvatar profile={author} size={32} />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink-900">
              {author.displayName}
              {author.isAlumni && (
                <span className="ml-1.5 text-[10px] font-bold uppercase text-violet-700">
                  Alumni
                </span>
              )}
            </p>
            <p className="text-[11px] text-ink-500">
              {piece.readingTimeMin} phút đọc
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LengthBadge type={piece.lengthType} />
          <span className="text-[12px] font-semibold text-ink-500">
            👏 {claps}
          </span>
        </div>
      </div>
    </article>
  );
}
