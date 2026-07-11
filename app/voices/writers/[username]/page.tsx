import { notFound } from "next/navigation";
import { AuthorAvatar } from "@/components/voices/AuthorAvatar";
import { PieceCard } from "@/components/voices/PieceCard";
import {
  clapCount,
  getDb,
  profileByUsername,
  publishedPieces,
  topicById,
} from "@/lib/voices/store";

export const dynamic = "force-dynamic";

export default async function WriterPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const db = getDb();
  const profile = profileByUsername(db, username);
  if (!profile) notFound();

  const pieces = publishedPieces(db).filter(
    (p) => p.authorId === profile.id
  );
  const totalClaps = pieces.reduce((sum, p) => sum + clapCount(db, p.id), 0);
  const spotlights = pieces.filter((p) => p.isSpotlight).length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="mb-12 flex flex-col items-center rounded-3xl border border-hairline bg-white p-10 text-center shadow-sm">
        <AuthorAvatar profile={profile} size={88} />
        <h1 className="mt-5 font-display text-3xl text-ink-900">
          {profile.displayName}
        </h1>
        <p className="mt-1 text-sm text-ink-500">@{profile.username}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {profile.isAlumni && (
            <span className="rounded-full bg-violet-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-800">
              Alumni · Returning writer
            </span>
          )}
          {spotlights > 0 && (
            <span className="rounded-full bg-crimson-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              ✦ {spotlights} bài Spotlight
            </span>
          )}
        </div>
        {profile.bio && (
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-700">
            {profile.bio}
          </p>
        )}
        <div className="mt-6 flex gap-10 border-t border-hairline pt-5 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-ink-900">
              {pieces.length}
            </p>
            <p className="text-xs uppercase tracking-widest text-ink-500">
              Bài viết
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-ink-900">
              {totalClaps}
            </p>
            <p className="text-xs uppercase tracking-widest text-ink-500">
              Vỗ tay
            </p>
          </div>
        </div>
      </header>

      {pieces.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {pieces.map((p) => (
            <PieceCard
              key={p.id}
              piece={p}
              author={profile}
              topic={topicById(db, p.topicId)}
              claps={clapCount(db, p.id)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-hairline bg-white p-12 text-center text-sm italic text-ink-500">
          {profile.displayName} chưa có bài viết nào được xuất bản.
        </p>
      )}
    </div>
  );
}
