"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction } from "../actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupAction, {});

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-3xl border border-hairline bg-white p-9 shadow-sm">
        <h1 className="text-center font-display text-3xl text-ink-900">
          <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">T</span>
          rở thành người viết
        </h1>
        <p className="mt-2 text-center text-sm text-ink-500">
          Mỗi tháng một chủ đề. Giọng của bạn xứng đáng được nghe.
        </p>

        <form action={action} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
              Tên hiển thị
            </label>
            <input
              name="displayName"
              required
              placeholder="Nguyễn Khánh Linh"
              className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-crimson-600"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="ban@example.com"
              className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-crimson-600"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
              Mật khẩu (tối thiểu 6 ký tự)
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-crimson-600"
            />
          </div>

          {state?.error && (
            <p className="rounded-xl bg-crimson-600/10 px-4 py-3 text-sm text-crimson-700">
              {state.error}
            </p>
          )}

          <button
            disabled={pending}
            className="btn-lux btn-lux-light w-full disabled:opacity-60"
          >
            {pending ? "Đang tạo tài khoản…" : "Đăng ký ✍"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Đã có tài khoản?{" "}
          <Link
            href="/voices/login"
            className="font-semibold text-crimson-600 hover:underline underline-offset-4"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
