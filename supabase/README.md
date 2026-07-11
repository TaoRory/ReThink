# ReThink Voices — Production (Supabase)

Bản MVP đang chạy trên **local JSON store** (`web/data/runtime/voices.json`, tự sinh từ seed)
với demo auth — chạy được ngay, không cần dịch vụ ngoài. Khi sẵn sàng lên production
(deploy Vercel), chuyển sang Supabase theo các bước sau:

## 1. Tạo project Supabase
1. Tạo project tại [supabase.com](https://supabase.com).
2. Mở **SQL Editor**, chạy toàn bộ [`schema.sql`](./schema.sql) — tạo bảng, trigger, RLS
   cho cả MVP lẫn Phase 2 (tags, sponsors, speaker_pipeline).

## 2. Cấu hình env
Tạo `web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>   # chỉ dùng server-side
SESSION_SECRET=<chuỗi ngẫu nhiên dài>
```

## 3. Đổi data layer
Toàn bộ truy cập dữ liệu đi qua `web/lib/voices/store.ts` và auth qua
`web/lib/voices/auth.ts`. Cách chuyển:

1. `npm install @supabase/supabase-js @supabase/ssr`
2. Viết `lib/voices/supabase-store.ts` implement cùng các hàm
   (`publishedPieces`, `pieceBySlug`, …) trên bảng Supabase.
3. Thay demo cookie-auth bằng Supabase Auth (`@supabase/ssr`,
   magic link hoặc email/password) — bảng `profiles` tự sinh
   qua trigger `on_auth_user_created`.
4. Server actions trong `app/voices/actions.ts` giữ nguyên chữ ký,
   chỉ đổi phần đọc/ghi sang Supabase client.

## 4. Phân quyền
RLS trong `schema.sql` đã khớp đúng spec sản phẩm:

- Bài `published` public; draft/submitted/in_review/curated chỉ tác giả + editor/admin.
- Writer chỉ sửa bài của mình khi chưa publish; không tự set `published`/`is_spotlight`.
- `topics`/`sponsors`/`tags`: đọc public, ghi bởi editor+.
- `reactions`: mỗi user tự thêm/xoá reaction của mình.
- `speaker_pipeline`: chỉ editor+ đọc/ghi bảng gốc; public đọc qua view
  `speaker_journey` (ẩn `notes` nội bộ).
- Đổi `role` chỉ admin làm được.

## 5. Seed
Tạo 2 topic + vài bài mẫu bằng Studio (`/voices/studio`) sau khi login
bằng tài khoản đã được set role `editor` trong bảng `profiles`.
