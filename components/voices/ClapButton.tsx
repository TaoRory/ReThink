"use client";

import { useOptimistic, useTransition } from "react";
import { clapAction } from "@/app/voices/actions";

export function ClapButton({
  pieceId,
  count,
  clapped,
  loggedIn,
}: {
  pieceId: string;
  count: number;
  clapped: boolean;
  loggedIn: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(
    { count, clapped },
    (state) => ({
      count: state.clapped ? state.count - 1 : state.count + 1,
      clapped: !state.clapped,
    })
  );

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          setOptimistic(null);
          await clapAction(pieceId);
        })
      }
      className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
        optimistic.clapped
          ? "border-crimson-600 bg-crimson-600 text-white"
          : "border-ink-900/20 bg-white text-ink-900 hover:border-crimson-600 hover:text-crimson-600"
      }`}
      title={loggedIn ? "Vỗ tay cho bài viết" : "Đăng nhập để vỗ tay"}
    >
      <span className="text-base leading-none">👏</span>
      {optimistic.count}
      <span className="hidden sm:inline">
        {optimistic.clapped ? "· Đã vỗ tay" : "· Vỗ tay"}
      </span>
    </button>
  );
}
