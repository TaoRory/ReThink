/**
 * Script inline đặt ở đầu <head> của layout gốc, chạy TRƯỚC khi trang được vẽ:
 * - html[data-js="on"]: trình duyệt có JavaScript;
 * - html[data-motion="on"]: người dùng KHÔNG bật "giảm chuyển động".
 *
 * Mọi trạng thái chờ animation trong CSS chỉ được viết dưới [data-motion="on"] (xem motion.css).
 * Nhờ vậy: không JS hoặc giảm chuyển động thì nội dung hiện đủ, đứng yên, không có phần tử nào bị kẹt ở trạng thái ẩn.
 *
 * Dùng trong src/app/layout.tsx:
 *   <html lang="vi" suppressHydrationWarning>
 *     <head><script dangerouslySetInnerHTML={{ __html: motionBootScript }} /></head>
 *     <body>…<MotionProvider /></body>
 *   </html>
 * (suppressHydrationWarning trên <html> vì script đổi thuộc tính trước khi React hydrate.)
 */
export const motionBootScript = `(function(){var d=document.documentElement;d.dataset.js="on";try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.dataset.motion="on"}catch(e){}})();`;
