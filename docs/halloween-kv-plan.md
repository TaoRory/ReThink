# Plan — Adapt KV "Halloween ReThink" lên `/halloween` + dựng khung AI tiết kiệm token

> File làm việc chung của dự án — sửa trực tiếp ở đây. Mỗi phase xong thì tick `[x]` và ghi commit hash.

## Context

Designer vừa giao KV Halloween chính thức tại `KV/kv halloween - ReThink/Halloween ReThink/`. KV này **khác hẳn** trang `/halloween` đang live (xanh + hồng pale, "Pale Lake", SVG tự vẽ). KV mới là nguồn chuẩn, nên trang hiện tại sẽ được **thay toàn bộ phần hình ảnh**; giữ lại khung kỹ thuật đã chạy tốt (route song ngữ, theme cách ly `.hlw`, chrome nav/footer đổi theo route, luật chống lag).

Song song, user muốn tổ chức project theo sơ đồ: **CLAUDE.md/AGENTS.md gọn luôn nạp → skills nạp theo nhu cầu → subagents chỉ thấy brief → agent chính làm → kiểm bằng chứng**, để mỗi phiên tốn ít token và không mất công cụ (script verify từng bị mất 2 lần vì nằm ở scratchpad).

### Quyết định đã chốt (từ câu hỏi)
| Vấn đề | Chốt |
|---|---|
| Mức máu me | **Giữ đúng như KV** — tay đứt, búa, nhãn cầu, vệt máu đều dùng |
| Wordmark "RETHINK" viết tay | **Xin designer PNG/SVG nền trong**; trong lúc chờ dùng tạm font Google gần giống, đổi sau bằng 1 dòng |
| Chỗ đặt khung AI | **`web/.claude/`** (vào git). CLAUDE.md/AGENTS.md chuyển vào `web/` |
| Hero | **Đường hầm vòm cỏ, cuộn để đi vào** |

### Giả định (sửa nếu sai)
- Bỏ tên bịa "Pale Lake" (gắn với cái hồ, không còn hợp). Dùng placeholder trung tính "Halloween 2026" cho tới khi có docs.
- Header/footer tiếp tục đổi theo KV mới khi ở `/halloween`.
- Nội dung chữ vẫn là mẫu; docs thật đến sau.

## Phân tích KV

**Mood:** đường hầm vòm cỏ xanh axit, cành cây trụ tròn xanh rêu sẫm đan chéo, mặt nạ thú pixel-art (mèo, chó, cú, sọ chim), nhãn cầu, tai/tay đứt, búa dính máu, vệt máu dưới sàn, la bàn phát sáng cam, cô gái váy xám mắt phát sáng đứng cuối hầm, đom đóm ô vuông vàng-chanh. Phong cách **trộn 3D render + pixel-art bị dither**.

**Bảng màu (ước lượng bằng mắt — Phase 1 sẽ sample số chính xác từ PNG):** cỏ axit `~#7aa51e` / `~#5f8a1a`, bóng tối rêu `~#0c140c`, cành cây `~#1e3328`, chữ script vàng-chanh nhạt `~#e6ec7a`, đom đóm `~#f2f56a`, máu `~#7a0a0a` → `~#a01212`, xương/mặt nạ `~#d9d6c4`, la bàn cam ấm `~#e0702a`.

**Tài nguyên** (tất cả PNG đều có alpha `32bppArgb`):

| File | Kích thước | Dùng cho |
|---|---|---|
| `Vòm Cỏ.png` | 2377×2504 · 2.4MB | Lớp vòm, xếp lồng 4–5 lần tạo đường hầm (hero, CTA) |
| `Background Vòm Cỏ.png` | 722×947 | Nền phía trong vòm sâu nhất |
| `Background cỏ.png` | 2564×1920 · 4.2MB | Nền cỏ toàn trang (tile/cover) |
| `Texture_.jpg` | 580×908 | Texture lặp nhẹ |
| `Cành Cây.png` | 2504×1901 · 1.5MB | Cành đan chéo khung hero, đỡ wordmark |
| `Nhân Vật Chính.png` | 380×624 | Cô gái cuối hầm |
| `Mask Mèo/Chó/Cú.png` | ≤647×818 | 3 trong 4 "phòng"; phòng 4 dùng sọ chim cắt từ avatar hoặc xin thêm |
| `Eyeball 1–3.png` | ≤388 | Nhãn cầu nhìn theo con trỏ |
| `Light 1–3.png` | ~130 | Đom đóm ô vuông |
| `Compass Logo.png` · `Compass Full 3D.png` | 957×1000 · 290×153 | Biểu tượng sự kiện, kim chỉ tiến độ cuộn |
| `Máu_.png` · `Trail Máu.png` | 1152×2048 · 2226×616 | Máu nhỏ giọt ở mép section; vệt máu làm trục timeline |
| `Tay.png` · `Chân.png` | 804×472 · 791×524 | Tay/chân đứt trang trí |
| `Background Tay_.jpg` | 736×1104 | Tay sau kính ướt — nền section FAQ |
| `Bộ Nhận Diện/*` | 5047×1920 · 2504² | Tham chiếu bố cục + OG image; không nhúng nguyên |

## Phase 0 — Khung AI theo sơ đồ (làm trước, vì các phase sau dùng nó)

- [x] **0.1** Chép plan này vào `web/docs/halloween-kv-plan.md`.
- [x] **0.2** Chuyển `CLAUDE.md` + `AGENTS.md` từ thư mục gốc vào `web/`, rút gọn còn ~60 dòng chỉ gồm điều *mọi* phiên cần (stack, song ngữ, luật lag, commit≠push, tên tổ chức, TEDx đỏ). Chi tiết chuyển xuống skills. Ở gốc để lại CLAUDE.md 3 dòng: "mở session trong `web/`".
- [x] **0.3** Skills (`web/.claude/skills/<tên>/SKILL.md` — chỉ tên + mô tả nạp sẵn, thân nạp khi khớp việc):
  - `verify-ui` — build, kill port 3000, chụp màn hình CDP 390/1440, đo vị trí; **script lưu cố định trong `web/scripts/cdp/`** (shot.js, measure.js…) để không mất nữa.
  - `deploy` — commit≠push, push, poll `rethinkorg.com`, kiểm marker trên production.
  - `i18n-copy` — thêm chuỗi đủ `vi`+`en`, giọng văn, tên brand giữ nguyên, nạp docs vào dict.
  - `halloween-kv` — bảng màu đã sample, bảng tài nguyên ở trên, catalog animation, luật pixel-art, danh sách placeholder.
- [x] **0.4** Subagents (`web/.claude/agents/*.md`, có `model:` rẻ + `tools:` giới hạn, chỉ nhận brief):
  - `asset-optimizer` (haiku) — chạy script tối ưu ảnh, báo bảng kích thước. Không sửa code.
  - `ui-verifier` (sonnet) — chạy skill `verify-ui`, trả về danh sách lỗi + đường dẫn ảnh chụp, không trả nguyên ảnh.
  - `copy-loader` (sonnet) — khi có docs: map chữ vào `dict.*.halloween` cả 2 ngôn ngữ.
- [x] **0.5** Cập nhật memory: `rethink-halloween-page.md` (theme mới, bỏ Pale Lake), trỏ tới skills.
- Commit: `chore: AI workspace (skills, agents, slim CLAUDE.md)`.

## Phase 1 — Pipeline tài nguyên

- [x] Script `web/scripts/optimize-kv.mjs` dùng **sharp 0.34.5 (đã có sẵn trong node_modules)**: đọc KV gốc → `web/public/halloween/*.webp` (alpha giữ nguyên), resize theo kích thước hiển thị tối đa ×2. Tên file ASCII (`vom-co.webp`, `mask-meo.webp`…) để tránh lỗi đường dẫn tiếng Việt.
- [x] Pixel-art (mặt nạ, la bàn, đom đóm, nhãn cầu): **resize bằng nearest-neighbor** và CSS `image-rendering: pixelated` để giữ hạt pixel sắc.
- [x] Sample bảng màu thật từ PNG → token `--hlw-*` mới.
- [x] OG image 1200×630 từ cover FB.
- **Ngân sách:** tổng ảnh trang < 1.8MB desktop, < 900KB mobile; ảnh LCP hero < 250KB. Hiển thị qua `next/image` (Vercel tự phục vụ AVIF/WebP theo `sizes`).
- Giao cho subagent `asset-optimizer`; agent chính chỉ đọc bảng kết quả.

## Phase 2 — Theme + chrome

- [x] Viết lại token trong `web/app/halloween.css` theo màu KV (giữ cấu trúc `.hlw` / `.hlw-page` và luật tiền tố).
- [x] Font: script vàng-chanh tạm thời bằng font Google gần giống (chọn ở bước này, ví dụ dòng handwriting/script) cho wordmark; body giữ Be Vietnam Pro (dấu tiếng Việt). Wordmark để trong 1 component `<HalloweenWordmark>` để thay bằng PNG/SVG designer chỉ ở 1 chỗ.
- [x] Chrome nav/footer (`components/halloween/Chrome.tsx`): bỏ mạng nhện/sáp hồng; thay bằng mép cỏ, đom đóm, 1 nhãn cầu ở góc nhìn theo chuột, quầng vàng-chanh cho chữ RETHINK.

## Phase 3 — Hero: đường hầm vòm cỏ

- [x] 5 lớp `vom-co.webp` ở scale giảm dần về điểm tụ; cô gái ở cuối hầm; cành cây đan chéo phía trước, một cành mang wordmark nghiêng như avatar; la bàn sáng dưới sàn; vệt máu.
- [x] **Cuộn để bước vào:** section `position: sticky` cao ~250vh; một listener cuộn (rAF, passive) ghi tiến độ `--p` (0→1); mỗi lớp vòm `transform: scale()` theo `--p` với hệ số khác nhau → cảm giác đi vào hầm. Mắt cô gái sáng dần (opacity). Hết hầm thì nhả sticky sang phần nội dung.
- [x] Đom đóm trôi + nhấp nháy (transform/opacity), cành đung đưa rất nhẹ (rotate).
- [x] Mobile: giảm còn 3 lớp vòm, tắt sticky dài nếu máy yếu; `prefers-reduced-motion` → hiện khung tĩnh như avatar.

## Phase 4 — Các phần còn lại (map nội dung vào element KV)

| Phần | Element KV | Animation |
|---|---|---|
| Câu chuyện | Nền cỏ + texture, chữ script | Chữ hiện lần lượt 1 lần khi vào khung |
| 4 căn phòng | Mặt nạ Mèo/Chó/Cú/Sọ chim treo trên cành | Đung đưa; hover → mặt nạ rung, mắt loé |
| Lịch trình | `Trail Máu` làm trục, la bàn ở đầu | Vệt máu "chảy" tới từng mốc khi cuộn (1 lần, scaleX) |
| FAQ | `Background Tay_` (tay sau kính) | Parallax nhẹ; mở câu hỏi → một bàn tay áp vào kính (scale) |
| CTA | Vòm sâu nhất + cô gái | Nhãn cầu khắp nơi quay về phía nút |
| Trang trí rải rác | Tay, chân, tai, búa, nhãn cầu | Nhãn cầu nhìn theo chuột (1 listener dùng chung, throttle rAF) |

- Gỡ code cũ không dùng nữa: `LakeSky`, `LakeShore`, `House`, `Portrait`, `Doorway`, `WaxSpine`… trong `components/halloween/Scene.tsx`.
- Chữ vẫn là mẫu trong `dict.*.halloween`; **xoá các chuỗi hardcode** (`TIMES`, nhãn ngày, ticker, dấu "PL") khỏi `HalloweenPage.tsx` và đưa vào dict.

## Phase 5 — Nạp nội dung thật (khi có docs + wordmark)

- [ ] Subagent `copy-loader` map docs vào dict 2 ngôn ngữ; agent chính duyệt.
- [ ] Thay font tạm bằng wordmark của designer.
- [ ] Xoá 2 dòng "nội dung mẫu", điền link form đăng ký.

## Kiểm bằng chứng (sau mỗi phase, qua `ui-verifier`)

1. `npm run build` xanh.
2. Ảnh chụp 390×844 và 1440×900 từng section; so với avatar/cover KV.
3. **Lag:** grep `@keyframes hlw-` không có `filter|box-shadow|text-shadow|background-position|width|height|top|left`. Chỉ 1 listener cuộn + 1 listener chuột, đều qua rAF.
4. **Cách ly:** HTML build của `/`, `/about`, `/tedx`, `/join`, `/game` có 0 class `hlw-`.
5. **Trọng lượng:** tổng byte ảnh tải ở mobile < 900KB (đo bằng CDP Network).
6. `prefers-reduced-motion` hiện bố cục tĩnh đầy đủ.
7. Sau push: kiểm lại 3 mục trên **rethinkorg.com**, không phải localhost.

## Cách dùng AI tiết kiệm token trong dự án này

- Mỗi phase = 1 phiên ngắn: mở phiên trong `web/`, nói "làm Phase N theo `docs/halloween-kv-plan.md`". Agent chỉ nạp skill liên quan.
- Việc cơ học (tối ưu ảnh, chụp màn hình, nạp copy) giao subagent model rẻ; agent chính chỉ nhận bản tóm tắt.
- Không đọc lại ảnh KV gốc 10MB mỗi lần — skill `halloween-kv` đã ghi sẵn bảng màu và vai trò từng file.
- Ảnh chụp verify: chỉ mở ảnh khi `ui-verifier` báo có lỗi.

## Việc cần user / designer
- [ ] Wordmark "RETHINK" dạng PNG/SVG nền trong.
- [ ] (Tuỳ chọn) PNG sọ chim tách nền cho phòng thứ 4; nếu không có thì cắt từ avatar.
- [ ] Docs nội dung sự kiện + link form đăng ký.

## Nhật ký thực hiện (15/10/2026 — Phase 1–4 xong ở local, CHƯA push)

Khác với plan ban đầu, phát hiện khi đo tài nguyên thật:
- **Bảng màu ước lượng sai** ở 2 chỗ: chữ script là mù tạt-chanh `#d1c91e` (không phải vàng nhạt), bóng sàn là đen ấm `#140d05`. Đã thay bằng màu lấy mẫu từ pixel.
- **`Máu_.png` là vết máu pixel trên nền TRẮNG đặc, góc canvas xám** → script cắt góc + tách nền trắng (unmultiply). Dùng làm vết loang, không phải giọt chảy.
- **`Trail Máu.png` là thảm máu sàn hầm vẽ phối cảnh** → đặt ở sàn đường hầm dưới chân cô gái (đúng avatar KV). Trục lịch trình dùng đường máu CSS.
- **`Compass Logo.png` là hình mờ (mọi pixel ≤ 20% alpha)** → script chuẩn hoá alpha.
- `Texture_.jpg` bỏ (170KB nhiễu, trùng vai trò `bg-co`). Tổng ảnh ≈ 1,08MB.
- Wordmark tạm: font **Mystery Quest** (chỉ Latin). Trạm 4 dùng nhãn cầu nhìn theo chuột thay sọ chim.
- Gate `check:hlw` từng **bỏ sót keyframe viết một dòng** → đã sửa sang đếm ngoặc, thử cả 2 dạng sai đều bị chặn.
- `halloween.css` không thuộc layer Tailwind nên **đè lên utility responsive** (`lg:hidden`) → không đặt `display` trong class `.hlw-*`.
- Subagent chưa chạy được trong phiên mở ở thư mục gốc `Rethink/` — phải mở phiên trong `web/`.

Đã kiểm: build xanh · `check:hlw` (8 keyframe, 0 rò rỉ) · ảnh chụp 1440 + 390 từng section · hero ở p = 0 / 0,5 / 1 · không tràn ngang mobile · reduced-motion: hầm thu còn 1 màn hình, 0 animation chạy.

### Vòng 2 (15/10 tối) — "kéo vào hầm chưa thật" → đã THAY BẰNG hướng 2D (xem vòng 3)
Cành/mặt nạ không phóng theo vòm, thảm máu như nhãn dán. Đã thử dựng cảnh CSS 3D thật (đo khớp công thức 0px) — nhưng **bị bỏ ở vòng 3** vì lỗi hiển thị trên GPU thật của chủ dự án.

### Vòng 3 (16/10) — "ko cần xịn tới vậy, lỗi tùm lum, giữ bố cục như Avatar"
Phản hồi: kéo lên xuống mất đồ, lỗi tùm lum; hầm không cần đi xa; muốn giữ hiệu ứng nhìn từ dưới lên (thảm máu phối cảnh) và bố cục đúng ảnh Avatar.
- **Bỏ hoàn toàn 3D.** Trên GPU thật Chrome xén các lớp lớn khi chúng đi qua mặt phẳng camera (cành bị cắt đôi, cô gái mất đầu). Headless không bao giờ lộ ra → bài học: thử trên trình duyệt thật của chủ dự án trước khi dựng thứ phức tạp.
- Dựng lại 2D: một điểm tụ chung, mỗi lớp scale quanh đó theo `d/(d−p·Tn)`, `Tn = 0,42` (đi nông: vật gần nhất ≈ 2,3x, cô gái ≈ 1,1x). Bố cục lấy toạ độ từ chính ảnh Avatar. Bỏ `floor-mau`/`unwarp-floor` (không cần nữa).
- **Lỗi thật tìm ra giữa chừng:** `.hlw-chrome { position: relative }` (CSS không nằm trong layer Tailwind) đè lên `fixed` của header → thanh nav **trôi mất khi cuộn** trên trang Halloween và hero bắt đầu thấp 65px. Đây rất có thể là một phần của "kéo lên xuống nó bị mất".
- Vòm "biến mất" vì nền cỏ sáng nuốt vòng vòm sẫm màu → nền sân khấu tối + tường cỏ sáng nằm trong mỗi vòm; tường vẽ sau cùng thì che mất vòm trong → vẽ tường trước, vòng vòm sau.
- Chữ trên desktop đè lên chữ RETHINK trên cành → dải chữ nằm ngang phía dưới; mobile dành sẵn 300px dưới tranh.
- Đo: ảnh mobile 560KB / laptop 619KB; cuộn qua hầm trung vị 4,2ms (GPU thật), p95 5,3ms; giảm chuyển động → 0 animation, header vẫn fixed.

### Vòng 4 (16/10) — "vẫn bị lỗi ấy, cho tôi về bản như cũ lúc mới adapt KV xong"
Bản 2D theo Avatar vẫn bị xén thành hình chữ nhật trên máy chủ dự án (chữ cắt dọc, cô gái mất nửa người). **Đã khôi phục `app/halloween.css`, `Scene.tsx`, `HalloweenPage.tsx` về đúng commit `b5c7191`**, chỉ giữ lại một sửa lỗi độc lập: `.hlw-chrome { position: relative }` đè `fixed` của header (nav trôi mất khi cuộn).
- Hai hướng dựng lại (CSS 3D thật; 2D theo Avatar) đều bị bỏ. Nguyên nhân xén **chưa xác định**: không tái hiện được ở headless Chrome (cả có và không GPU thật).
- Nếu lỗi xén còn xuất hiện ở bản cũ: kiểm tra trên bản build thật (`npm run build && npm run start`), và xem các trang nặng khác trên máy đó có bị không, trước khi sửa code.
