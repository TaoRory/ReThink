"use client";

import { useActionState, useEffect, useRef } from "react";
import { savePieceAction } from "../actions";
import type { Piece, Topic } from "@/lib/voices/types";

const LS_KEY = "voices-draft-backup";

export function SubmitForm({
  topics,
  piece,
}: {
  topics: Topic[];
  piece?: Piece;
}) {
  const [state, action, pending] = useActionState(savePieceAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Local backup: restore on mount (new pieces only), save while typing
  useEffect(() => {
    const form = formRef.current;
    if (!form || piece) return;
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "null");
      if (saved) {
        for (const [k, v] of Object.entries(saved)) {
          const field = form.elements.namedItem(k);
          if (
            (field instanceof HTMLInputElement ||
              field instanceof HTMLTextAreaElement) &&
            !field.value
          ) {
            field.value = v as string;
          }
        }
      }
    } catch {
      /* ignore corrupt backup */
    }
  }, [piece]);

  function backup() {
    const form = formRef.current;
    if (!form || piece) return;
    const data = new FormData(form);
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        title: data.get("title"),
        excerpt: data.get("excerpt"),
        body: data.get("body"),
      })
    );
  }

  return (
    <form ref={formRef} action={action} onInput={backup} className="space-y-6">
      {piece && <input type="hidden" name="id" value={piece.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
            Chủ đề
          </label>
          <select
            name="topicId"
            defaultValue={piece?.topicId ?? topics[0]?.id}
            className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-crimson-600"
          >
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
            Thể loại
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["short", "Reflection ngắn"],
                ["long", "Essay dài"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-hairline bg-white px-3 py-3 text-sm font-medium text-ink-700 transition has-checked:border-crimson-600 has-checked:bg-crimson-600 has-checked:text-white"
              >
                <input
                  type="radio"
                  name="lengthType"
                  value={value}
                  defaultChecked={(piece?.lengthType ?? "short") === value}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
          Tiêu đề
        </label>
        <input
          name="title"
          required
          defaultValue={piece?.title}
          placeholder="Một tiêu đề khiến người ta muốn dừng lại…"
          className="w-full rounded-xl border border-hairline bg-white px-4 py-3.5 font-display text-lg text-ink-900 outline-none transition focus:border-crimson-600"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
          Tóm tắt <span className="font-normal normal-case text-ink-500">(tuỳ chọn — hiện trên thẻ bài viết)</span>
        </label>
        <input
          name="excerpt"
          defaultValue={piece?.excerpt}
          placeholder="Một-hai câu tóm lại tinh thần bài viết"
          className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-crimson-600"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-ink-700">
          Nội dung{" "}
          <span className="font-normal normal-case text-ink-500">
            (hỗ trợ Markdown: ## tiêu đề, **đậm**, *nghiêng*, &gt; trích dẫn)
          </span>
        </label>
        <textarea
          name="body"
          required
          rows={18}
          defaultValue={piece?.body}
          placeholder="Viết điều đáng nghĩ…"
          className="w-full rounded-xl border border-hairline bg-white px-5 py-4 text-[15px] leading-relaxed text-ink-900 outline-none transition focus:border-crimson-600"
        />
        <p className="mt-1.5 text-xs text-ink-500">
          Bài của bạn được tự động sao lưu trên trình duyệt này.
        </p>
      </div>

      {state?.error && (
        <p className="rounded-xl bg-crimson-600/10 px-4 py-3 text-sm text-crimson-700">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          name="intent"
          value="submit"
          disabled={pending}
          className="btn-lux btn-lux-light disabled:opacity-60"
        >
          {pending ? "Đang gửi…" : "Gửi bài cho ban biên tập ✦"}
        </button>
        <button
          name="intent"
          value="draft"
          disabled={pending}
          className="btn-lux btn-lux-light-ghost disabled:opacity-60"
        >
          Lưu nháp
        </button>
      </div>
    </form>
  );
}
