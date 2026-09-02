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

- `app/` — trang chủ, `/about`, `/tedx`, `/join`.
- `components/` — Logo, Sparkle, SectionHeading, Btn, Cradle (con lắc ở hero)
  + các lớp hiệu ứng nền (Aurora, Starfield, PointerGlow, Reveal).
- `app/globals.css` — toàn bộ theme Tailwind v4 khai báo trong khối `@theme`
  (không có `tailwind.config`).

## Brand

Toàn bộ màu sắc, typography và motif lấy từ **KV mới `KV/New KV/`** (AY 26-27):
concept con lắc `Default Orbit → Encounter → Pause → Choice`, logotype neon
monoline, quả cầu treo trên dây, beam giao cắt, ô vuông sáng ▪, film grain.
Fonts: Lexend (display) + Be Vietnam Pro (body), đều hỗ trợ đầy đủ tiếng Việt.
