# ReThink — Website chính thức

Website của **ReThink** — tổ chức sinh viên của VinUni: giới thiệu tổ chức, showcase
**TEDxVinUniversity**, và tuyển thành viên Gen 4.0.

## Chạy local

```bash
cd web
npm install
npm run dev
# mở http://localhost:3000
```

## Cấu trúc

- `app/` — trang chủ, `/about`, `/tedx`, `/join` (dark luxe theo brand KV).
- `components/` — Logo, Sparkle, SectionHeading, Btn + các lớp hiệu ứng nền
  (Aurora, Starfield, PointerGlow, Reveal).
- `app/globals.css` — toàn bộ theme Tailwind v4 khai báo trong khối `@theme`
  (không có `tailwind.config`).

## Brand

Toàn bộ màu sắc, typography, motif (sparkle ✦, khung nét đứt, chrome text,
smoke gradient) lấy từ **KV/RETHINK BOOKLET AY 25-26**. Fonts:
Great Vibes (script) + Playfair Display (display serif) + Be Vietnam Pro (body),
đều hỗ trợ đầy đủ tiếng Việt.
