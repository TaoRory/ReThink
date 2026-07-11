"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, {});

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <div className="rounded-3xl border border-hairline bg-white p-9 shadow-sm">
        <h1 className="text-center font-display text-3xl text-ink-900">
          <span className="font-script text-[1.5em] align-[-0.1em] mr-1 text-crimson-600">Đ</span>
          ăng nhập
        </h1>
        <p className="mt-2 text-center text-sm text-ink-500">
          Chào mừng quay lại ReThink Voices.
        </p>

        <form action={action} className="mt-8 space-y-4">
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
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
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
            {pending ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Chưa có tài khoản?{" "}
          <Link
            href="/voices/signup"
            className="font-semibold text-crimson-600 hover:underline underline-offset-4"
          >
            Đăng ký viết
          </Link>
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-hairline bg-white/70 p-5 text-xs leading-relaxed text-ink-500">
        <p className="font-bold uppercase tracking-wider text-ink-700">
          Tài khoản demo
        </p>
        <p className="mt-2">
          Writer: <code className="text-ink-900">writer@rethink.vn</code> ·
          Editor: <code className="text-ink-900">editor@rethink.vn</code> ·
          Admin: <code className="text-ink-900">admin@rethink.vn</code>
          <br />
          Mật khẩu chung: <code className="text-ink-900">rethink2025</code>
        </p>
      </div>
    </div>
  );
}
