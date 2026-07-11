import type { Metadata } from "next";
import Link from "next/link";
import { getSessionUser, atLeast } from "@/lib/voices/auth";
import { logoutAction } from "./actions";

export const metadata: Metadata = {
  title: {
    default: "ReThink Voices — Một chủ đề mỗi tháng. Từ trang viết, đến sân khấu.",
    template: "%s | ReThink Voices",
  },
  description:
    "Nền tảng viết & chia sẻ của cộng đồng ReThink: mỗi tháng một chủ đề, bài hay được tuyển chọn xuất bản, người viết xuất sắc bước lên sân khấu Salon và TEDx.",
};

export default async function VoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="voices-light min-h-screen pt-16">
      {/* Voices sub-nav */}
      <div className="sticky top-16 z-40 border-b border-hairline bg-ivory-50/92 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <Link
              href="/voices"
              className="font-display text-lg text-ink-900"
            >
              <span className="font-script text-[1.45em] align-[-0.1em] text-crimson-600">Re</span>
              Think <span className="italic">Voices</span>
            </Link>
            <nav className="hidden items-center gap-5 text-[13px] font-medium text-ink-700 sm:flex">
              <Link className="hover:text-crimson-600" href="/voices/topics">
                Chủ đề
              </Link>
              <Link className="hover:text-crimson-600" href="/voices/about">
                Cách hoạt động
              </Link>
              {user && (
                <Link className="hover:text-crimson-600" href="/voices/dashboard">
                  Bài của tôi
                </Link>
              )}
              {atLeast(user, "editor") && (
                <Link className="hover:text-crimson-600" href="/voices/studio">
                  Studio
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden text-xs text-ink-500 sm:inline">
                  {user.displayName}
                </span>
                <form action={logoutAction}>
                  <button className="text-xs font-semibold text-ink-500 hover:text-crimson-600">
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/voices/login"
                className="text-xs font-semibold text-ink-700 hover:text-crimson-600"
              >
                Đăng nhập
              </Link>
            )}
            <Link
              href="/voices/submit"
              className="btn-lux btn-lux-light !px-4 !py-1.5 !text-[10px]"
            >
              Gửi bài ✍
            </Link>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
