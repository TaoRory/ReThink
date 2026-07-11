const steps = [
  {
    label: "Viết",
    desc: "Gửi bài theo chủ đề tháng — reflection ngắn hoặc essay dài. Bài hay được curate và xuất bản.",
    cls: "bg-ink-900 text-ivory-50",
  },
  {
    label: "Salon",
    desc: "Tác giả của những bài nổi bật được mời lên kể câu chuyện của mình tại ReThink Salon.",
    cls: "bg-crimson-600 text-white",
  },
  {
    label: "TEDx",
    desc: "Những tiếng nói xuất sắc nhất bước lên sân khấu TEDxVinUniversity — và truyền cảm hứng cho lứa người viết tiếp theo.",
    cls: "bg-violet-700 text-white",
  },
];

export function Flywheel() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.label} className="relative rounded-2xl border border-hairline bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold ${s.cls}`}
            >
              {i + 1}
            </span>
            <h3 className="font-display text-xl font-semibold text-ink-900">
              {s.label}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">{s.desc}</p>
          {i < steps.length - 1 && (
            <span className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-xl text-ink-500 sm:block">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
