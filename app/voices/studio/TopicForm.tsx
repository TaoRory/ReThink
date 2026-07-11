"use client";

import { useActionState } from "react";
import { createTopicAction } from "../actions";

export function TopicForm() {
  const [state, action, pending] = useActionState(createTopicAction, {});

  return (
    <form
      action={action}
      className="grid gap-4 rounded-2xl border border-hairline bg-white p-6 shadow-sm"
    >
      <h3 className="font-display text-xl text-ink-900">Tạo chủ đề mới</h3>

      <div className="grid gap-4 sm:grid-cols-[1fr_10rem_9rem]">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
            Tiêu đề
          </label>
          <input
            name="title"
            required
            placeholder="Chủ đề tháng tới…"
            className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-crimson-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
            Tháng
          </label>
          <input
            name="month"
            type="month"
            required
            className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-crimson-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
            Trạng thái
          </label>
          <select
            name="status"
            className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-crimson-600"
          >
            <option value="upcoming">Sắp mở</option>
            <option value="open">Mở ngay</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
          Lời mời viết (prompt)
        </label>
        <input
          name="prompt"
          required
          placeholder="Câu hỏi / lời mời kể trải nghiệm…"
          className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-crimson-600"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
          Mô tả dài <span className="font-normal normal-case text-ink-500">(tuỳ chọn)</span>
        </label>
        <textarea
          name="description"
          rows={3}
          className="w-full rounded-xl border border-hairline bg-ivory-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-crimson-600"
        />
      </div>

      {state?.error && (
        <p className="rounded-xl bg-crimson-600/10 px-4 py-3 text-sm text-crimson-700">
          {state.error}
        </p>
      )}

      <button
        disabled={pending}
        className="btn-lux btn-lux-light justify-self-start disabled:opacity-60"
      >
        {pending ? "Đang tạo…" : "Tạo chủ đề ✦"}
      </button>
    </form>
  );
}
