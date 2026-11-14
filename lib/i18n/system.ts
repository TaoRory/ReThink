/**
 * Copy for the site basics that belong to no page: the 404 and the share
 * card. Not registered in `lib/i18n.ts` on purpose — the 404 view is a client
 * component and imports this file directly, so only these strings ship.
 */
export const system = {
  vi: {
    notFound: {
      metaTitle: "Không tìm thấy trang",
      code: "Lỗi 404",
      /* h1: what this page is, then the brand's verb ("nhìn lại") as the hint */
      h1: "Không tìm thấy trang này.",
      h1HintA: "Thử ",
      h1Mark: "nhìn lại",
      h1HintB: " đường dẫn.",
      lead:
        "Đường dẫn có thể đã đổi hoặc bị gõ nhầm. Từ đây bạn có thể về trang chủ, hoặc đi thẳng tới phần giới thiệu ReThink và TEDx VinUniversity.",
      home: "Về trang chủ",
      more: "Các trang khác",
      aboutTitle: "Về ReThink",
      aboutDesc: "Tổ chức sinh viên của VinUni, hoạt động từ 2022.",
      tedxTitle: "TEDx VinUniversity",
      tedxDesc: "Sự kiện thường niên do ReThink tổ chức.",
    },
    share: {
      siteName: "ReThink — VinUniversity",
      ogAlt:
        "Chữ RETHINK 26-27 trên nền đen, dòng Rethink & Let Rethink, VinUniversity và bảy quả cầu của con lắc Newton chuyển màu từ tím hồng sang xanh lơ.",
    },
  },
  en: {
    notFound: {
      metaTitle: "Page not found",
      code: "Error 404",
      h1: "Page not found.",
      h1HintA: "Take ",
      h1Mark: "another look",
      h1HintB: " at the address.",
      lead:
        "The link may have changed, or there is a typo in it. From here you can go back to the home page, or straight to About ReThink and TEDx VinUniversity.",
      home: "Back to home",
      more: "Other pages",
      aboutTitle: "About ReThink",
      aboutDesc: "A student organisation at VinUni, running since 2022.",
      tedxTitle: "TEDx VinUniversity",
      tedxDesc: "The annual event ReThink organises.",
    },
    share: {
      siteName: "ReThink — VinUniversity",
      ogAlt:
        "The RETHINK 26-27 wordmark on a near-black ground, the line Rethink & Let Rethink, VinUniversity, and the seven weights of a Newton's cradle running from fuchsia to cyan.",
    },
  },
} as const;
