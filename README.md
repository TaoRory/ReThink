# ReThink — Website chính thức

Website của CLB **ReThink (VinUniversity)**: giới thiệu CLB, showcase
**TEDxVinUniversity**, và nền tảng viết **ReThink Voices** (mỗi tháng một chủ đề —
từ trang viết, đến sân khấu).

## Chạy local

```bash
cd web
npm install
npm run dev
# mở http://localhost:3000
```

## Tài khoản demo (ReThink Voices)

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Writer | `writer@rethink.vn` | `rethink2025` |
| Editor | `editor@rethink.vn` | `rethink2025` |
| Admin | `admin@rethink.vn` | `rethink2025` |

Đăng ký tài khoản mới tại `/voices/signup` (mặc định role writer).

## Cấu trúc

- `app/` — trang chủ, `/about`, `/tedx`, `/join` (dark luxe theo brand KV)
  và `/voices/**` (editorial ivory).
- `components/` — Logo, Sparkle, SectionHeading + components riêng của Voices.
- `lib/voices/` — data layer (JSON store local, tự seed) + demo auth (cookie HMAC).
- `data/runtime/voices.json` — dữ liệu runtime (gitignored). **Xoá file này để
  reset về seed demo.**
- `supabase/` — schema + RLS production và hướng dẫn chuyển từ demo store sang
  Supabase khi deploy thật.

## Luồng chính của Voices

1. Writer đăng nhập → `/voices/submit` → lưu nháp hoặc gửi bài.
2. Editor vào `/voices/studio` → Review queue → Tuyển chọn → **Xuất bản** →
   gắn ✦ Spotlight.
3. Độc giả đọc `/voices`, `/voices/topics/[slug]`, `/voices/pieces/[slug]`,
   vỗ tay (cần đăng nhập), xem profile tác giả `/voices/writers/[username]`.
4. Editor quản lý chủ đề tháng (tạo / mở / đóng) trong tab **Chủ đề** của Studio.

## Brand

Toàn bộ màu sắc, typography, motif (sparkle ✦, khung nét đứt, chrome text,
smoke gradient) lấy từ **KV/RETHINK BOOKLET AY 25-26**. Fonts:
Great Vibes (script) + Playfair Display (display serif) + Be Vietnam Pro (body),
đều hỗ trợ đầy đủ tiếng Việt.
