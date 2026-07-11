import type { LengthType, PieceStatus } from "@/lib/voices/types";
import { PIECE_STATUS_LABEL } from "@/lib/voices/types";

export function SpotlightBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-crimson-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${className}`}
    >
      ✦ Bài được ReThink chọn
    </span>
  );
}

export function LengthBadge({ type }: { type: LengthType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-hairline bg-white px-2.5 py-0.5 text-[11px] font-semibold text-ink-500">
      {type === "long" ? "Essay" : "Reflection"}
    </span>
  );
}

const STATUS_STYLES: Record<PieceStatus, string> = {
  draft: "bg-ivory-50 text-ink-500 border border-hairline",
  submitted: "bg-amber-100 text-amber-900",
  in_review: "bg-sky-100 text-sky-900",
  curated: "bg-violet-100 text-violet-900",
  published: "bg-emerald-100 text-emerald-900",
  archived: "bg-stone-200 text-stone-600",
};

export function StatusBadge({ status }: { status: PieceStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {PIECE_STATUS_LABEL[status]}
    </span>
  );
}
