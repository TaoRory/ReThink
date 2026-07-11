import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { atLeast, getSessionUser } from "@/lib/voices/auth";
import { getDb } from "@/lib/voices/store";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = { title: "Gửi bài" };
export const dynamic = "force-dynamic";

export default async function SubmitPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/voices/login");

  const { id } = await searchParams;
  const db = getDb();
  const openTopics = db.topics.filter((t) => t.status === "open");

  const piece = id ? db.pieces.find((p) => p.id === id) : undefined;
  if (piece && piece.authorId !== user.id && !atLeast(user, "editor")) {
    redirect("/voices/dashboard");
  }
  if (piece && piece.status === "published") {
    redirect("/voices/dashboard");
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <header className="mb-10 text-center">
        <h1 className="font-display text-4xl text-ink-900">
          <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">V</span>
          iết điều đáng nghĩ
        </h1>
        <p className="mt-3 text-sm text-ink-700">
          {piece
            ? "Chỉnh sửa bài viết của bạn."
            : "Bài không cần hoàn hảo — nó chỉ cần thật. Ban biên tập sẽ đọc mọi bài được gửi."}
        </p>
      </header>

      {openTopics.length > 0 ? (
        <div className="rounded-3xl border border-hairline bg-white/80 p-7 shadow-sm sm:p-10">
          <SubmitForm topics={openTopics} piece={piece} />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-hairline bg-white p-12 text-center">
          <p className="text-sm italic text-ink-500">
            Hiện chưa có chủ đề nào đang mở nhận bài. Quay lại đầu tháng sau
            nhé!
          </p>
          <Link
            href="/voices/topics"
            className="mt-4 inline-block text-sm font-semibold text-crimson-600 hover:underline underline-offset-4"
          >
            Xem các chủ đề →
          </Link>
        </div>
      )}
    </div>
  );
}
