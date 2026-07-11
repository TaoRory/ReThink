import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/voices/Badges";
import { getSessionUser } from "@/lib/voices/auth";
import { clapCount, getDb, topicById } from "@/lib/voices/store";

export const metadata: Metadata = { title: "Bài của tôi" };
export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/voices/login");

  const { sent } = await searchParams;
  const db = getDb();
  const mine = db.pieces
    .filter((p) => p.authorId === user.id)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-ink-900">
            <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">B</span>
            ài của tôi
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Xin chào, {user.displayName}. Theo dõi hành trình các bài viết của
            bạn tại đây.
          </p>
        </div>
        <Link href="/voices/submit" className="btn-lux btn-lux-light">
          Viết bài mới ✍
        </Link>
      </header>

      {sent && (
        <p className="mb-8 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
          ✦ Bài của bạn đã được gửi tới ban biên tập. Cảm ơn vì đã chia sẻ —
          chúng mình sẽ đọc kỹ và phản hồi sớm!
        </p>
      )}

      {mine.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-hairline bg-ivory-50 text-[11px] uppercase tracking-wider text-ink-500">
              <tr>
                <th className="px-5 py-3.5 font-bold">Bài viết</th>
                <th className="hidden px-5 py-3.5 font-bold sm:table-cell">
                  Chủ đề
                </th>
                <th className="px-5 py-3.5 font-bold">Trạng thái</th>
                <th className="px-5 py-3.5 text-right font-bold">👏</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {mine.map((p) => (
                <tr key={p.id} className="transition hover:bg-ivory-50/60">
                  <td className="px-5 py-4">
                    <p className="font-display text-base text-ink-900">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-500">
                      Cập nhật{" "}
                      {new Date(p.updatedAt).toLocaleDateString("vi-VN")}
                      {p.isSpotlight && (
                        <span className="ml-2 font-bold text-crimson-600">
                          ✦ Spotlight
                        </span>
                      )}
                    </p>
                  </td>
                  <td className="hidden px-5 py-4 text-xs text-ink-700 sm:table-cell">
                    {topicById(db, p.topicId)?.title ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-5 py-4 text-right text-ink-700">
                    {p.status === "published" ? clapCount(db, p.id) : "—"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {p.status === "published" ? (
                      <Link
                        href={`/voices/pieces/${p.slug}`}
                        className="text-xs font-semibold text-crimson-600 hover:underline underline-offset-4"
                      >
                        Xem bài →
                      </Link>
                    ) : (
                      <Link
                        href={`/voices/submit?id=${p.id}`}
                        className="text-xs font-semibold text-ink-700 hover:text-crimson-600"
                      >
                        Sửa ✎
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-hairline bg-white p-14 text-center">
          <p className="font-script text-4xl text-crimson-600">
            Trang giấy đang chờ
          </p>
          <p className="mt-3 text-sm italic text-ink-500">
            Bạn chưa có bài viết nào. Chủ đề tháng này đang mở — là người đầu
            tiên chia sẻ nhé.
          </p>
          <Link
            href="/voices/submit"
            className="btn-lux btn-lux-light mt-6"
          >
            Viết bài đầu tiên ✍
          </Link>
        </div>
      )}
    </div>
  );
}
