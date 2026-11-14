/**
 * Join / recruitment page copy.
 *
 * The page has two states, switched by `RECRUITING` in `lib/site-state.ts`:
 *   `closed` — between rounds: says the last round has closed and points to
 *              Facebook for news of the next one
 *   `open`   — applications are being taken: invites, links to the form
 * Everything outside those two blocks is shared by both states.
 *
 * When a new round opens: update the cohort name and the dates in `open`
 * (`h1Mark`, `period`), check `JOIN_FORM`, then flip `RECRUITING`.
 * When it closes: update the cohort name and dates in `closed`
 * (`h1a`, `statusDates`), then flip it back.
 */
export const join = {
  vi: {
    /* evergreen: chat apps cache these for weeks — no cohort, no season */
    meta: {
      title: "Gia nhập ReThink",
      description:
        "Gia nhập ReThink, tổ chức sinh viên của VinUni: sáu ban bạn có thể tham gia và nơi theo dõi thông tin tuyển thành viên.",
    },

    /* the invitation (owner copy) */
    leadA: "Trở thành ReThinker để cùng ",
    leadB: "kiến tạo những dự án tác động",
    leadC: ", gặp gỡ các chuyên gia hàng đầu, và để ",
    leadD: "tiếng nói của bạn được lắng nghe",
    leadE: ".",

    closed: {
      label: "Gia nhập ReThink",
      /*   keeps "Gen 5" and "đã đóng" from breaking across lines */
      h1a: "Đợt tuyển thành viên Gen 5 ",
      h1Mark: "đã đóng",
      h1b: ".",
      statusA: "Đơn ứng tuyển mở từ ",
      statusDates: "20/09/2026 đến 30/09/2026",
      statusB:
        " và hiện đã đóng. Theo dõi ReThink trên Facebook để biết khi đơn mở lại.",
      mainCta: "Theo dõi ReThink trên Facebook",
      secondCta: "Tìm hiểu về ReThink",
      deptHeading: "Sáu ban bạn có thể gia nhập",
      nextA: "Đợt tuyển kế tiếp chưa được công bố.",
      nextB: "Bạn vẫn có thể làm quen trước.",
      tileNote: "Để biết khi đơn ứng tuyển mở lại",
      tileTitle: "Facebook ReThink",
    },
    open: {
      label: "Đang mở đơn ứng tuyển",
      h1a: "Gia nhập ReThink ",
      h1Mark: "Gen 5",
      h1b: ".",
      mainCta: "Điền form ứng tuyển",
      secondCta: "Facebook ReThink",
      deptHeading: "6 vị trí đang mở",
      nextA: "Đơn ứng tuyển đang mở.",
      nextB: "Và có thể đóng sớm.",
      tileNote: "20/09/2026 – 30/09/2026",
      tileTitle: "Điền form ứng tuyển",
    },
    period: "Thời gian tuyển thành viên: 20/09/2026 – 30/09/2026",
    periodNote:
      "Lưu ý: Đơn đăng ký có thể đóng sớm khi chúng mình đã tuyển đủ số lượng thành viên.",

    altHero: "Đội ngũ tổ chức trên sân khấu The Firsts",
    heroCaption: "Đội ngũ tổ chức trên sân khấu TEDx VinUniversity “The Firsts”, 2025",
    altMembers: "Chín thành viên ReThink tựa lan can hành lang, tạo dáng trước ống kính",
    membersCaption: "Thành viên ReThink",

    /* one line per department, in the order of POSITIONS in JoinPage.tsx */
    positions: [
      "Core idea, narrative, nghiên cứu chủ đề và phát triển diễn giả.",
      "Vận hành sự kiện và thiết kế hành trình trải nghiệm khán giả.",
      "Xây văn hoá, chăm sóc và gắn kết thành viên.",
      "Quan hệ nhà tài trợ, đối tác và các bên liên quan.",
      "Chiến lược truyền thông, messaging và các chiến dịch.",
      "Thiết kế, ảnh, video, audio — các chiến dịch sáng tạo.",
    ],

    quote:
      "“Join us as a ReThinker to co-create impactful projects, meet top professionals, and let your voice be heard.”",
    quoteBy: "ReThink · Since 2022 · VinUniversity",

    aboutTileNote: "Câu chuyện, sáu ban và văn hoá của ReThinkers",
    aboutTile: "Tìm hiểu về ReThink",
  },
  en: {
    meta: {
      title: "Join ReThink",
      description:
        "Join ReThink, a student organisation at VinUni: the six departments you can join and where to follow member recruitment.",
    },

    leadA: "Become a ReThinker to ",
    leadB: "co-create projects with real impact",
    leadC: ", meet leading professionals, and ",
    leadD: "let your voice be heard",
    leadE: ".",

    closed: {
      label: "Join ReThink",
      h1a: "Gen 5 applications have ",
      h1Mark: "closed",
      h1b: ".",
      statusA: "Applications were open ",
      statusDates: "September 20–30, 2026",
      statusB:
        " and are now closed. Follow ReThink on Facebook to hear when applications reopen.",
      mainCta: "Follow ReThink on Facebook",
      secondCta: "Get to know ReThink",
      deptHeading: "The six departments you can join",
      nextA: "The next round hasn't been announced yet.",
      nextB: "You can still get to know us.",
      tileNote: "To hear when applications reopen",
      tileTitle: "ReThink on Facebook",
    },
    open: {
      label: "Applications are open",
      h1a: "Join ReThink ",
      h1Mark: "Gen 5",
      h1b: ".",
      mainCta: "Fill in the application",
      secondCta: "ReThink on Facebook",
      deptHeading: "Six positions open",
      nextA: "Applications are open.",
      nextB: "And may close early.",
      tileNote: "September 20–30, 2026",
      tileTitle: "Fill in the application",
    },
    period: "Recruitment period: September 20–30, 2026",
    periodNote:
      "Note: Applications may close early once all available positions have been filled.",

    altHero: "The organising team on The Firsts stage",
    heroCaption: "The organising team on the TEDx VinUniversity “The Firsts” stage, 2025",
    altMembers: "Nine ReThink members leaning on a walkway railing, posing for the camera",
    membersCaption: "ReThink members",

    positions: [
      "Core idea, narrative, subject research and speaker development.",
      "Event operations and designing the audience experience.",
      "Building culture, supporting and connecting members.",
      "Relationships with sponsors, partners and stakeholders.",
      "Communication strategy, messaging and campaigns.",
      "Design, photography, video, audio — creative campaigns.",
    ],

    quote:
      "“Join us as a ReThinker to co-create impactful projects, meet top professionals, and let your voice be heard.”",
    quoteBy: "ReThink · Since 2022 · VinUniversity",

    aboutTileNote: "The story, six departments and the culture of ReThinkers",
    aboutTile: "Get to know ReThink",
  },
} as const;
