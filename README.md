# ReThink — Website chính thức

Website của **ReThink** — tổ chức sinh viên của VinUni: giới thiệu tổ chức, showcase
**TEDxVinUniversity**, và tuyển thành viên Gen 5.

## Chạy local

```bash
cd web
npm install
npm run dev
# mở http://localhost:3000
```

## Cấu trúc

- `app/` — route mỏng cho 2 ngôn ngữ: tiếng Việt ở `/`, `/about`, `/tedx`,
  `/join`; tiếng Anh ở `/en/...`. Mỗi file chỉ set metadata rồi render
  component tương ứng với `locale`.
- `components/pages/` — thân 4 trang, nhận prop `locale`.
- `lib/i18n.ts` — toàn bộ copy hai thứ tiếng + helper đường dẫn theo locale.
- `components/` — Logo, Sparkle, SectionHeading, Btn, LangToggle (nút VI/EN),
  Cradle (con lắc ở hero), Galaxy + các lớp nền (Aurora, Starfield,
  PointerGlow, Reveal).
- `app/globals.css` — toàn bộ theme Tailwind v4 khai báo trong khối `@theme`
  (không có `tailwind.config`).

## Brand

Toàn bộ màu sắc, typography và motif lấy từ **KV mới `KV/New KV/`** (AY 26-27):
concept con lắc `Default Orbit → Encounter → Pause → Choice`, logotype neon
monoline, quả cầu treo trên dây, beam giao cắt, ô vuông sáng ▪, film grain.
Fonts: Lexend (display) + Be Vietnam Pro (body), đều hỗ trợ đầy đủ tiếng Việt.
