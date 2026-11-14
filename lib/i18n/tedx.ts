/**
 * TEDx VinUniversity page copy.
 *
 * Truth rules for this page (docs/design-system.md):
 *  - every number belongs to The Firsts, 2025, and is shown next to that label
 *  - Limitless Decade 2026: name, year and the link to its official site only
 *  - 2023 and 2024 have no write-up yet: say so, add nothing
 * Theme names ("The Firsts", "Limitless Decade"…) are brand phrases and live in
 * the component, verbatim in both languages.
 */
export const tedx = {
  vi: {
    meta: {
      title: "TEDx VinUniversity qua từng mùa",
      description:
        "ReThink là đơn vị tổ chức TEDx VinUniversity — sự kiện chia sẻ ý tưởng lớn nhất tại VinUni. Xem lại các mùa TEDx VinUniversity từ 2023 đến nay.",
    },

    /* hero */
    presents: "ReThink proudly presents",
    h1Rest: "qua từng mùa",
    heroLead:
      "Sự kiện thường niên lan toả ý tưởng lớn tại VinUni, do ReThink — tổ chức sinh viên của VinUni — độc quyền tổ chức. Trang này lưu lại từng mùa, mới nhất ở trên.",
    heroBtn1: "Xem các mùa",
    heroBtn2: "Đồng hành cùng BTC mùa tới",
    heroBtnFirsts: "The Firsts · 2025",
    altHero:
      "Ảnh tập thể trên sân khấu TEDx VinUniversity, màn hình phía sau ghi “The Firsts”",
    heroCaption: "Sân khấu The Firsts, 2025",

    /* season spine */
    seasonsHeadingA: "Bốn mùa,",
    seasonsHeadingB: "một hành trình",
    s2026Desc: "Mùa 2026 có website chính thức riêng.",
    s2026Btn: "Website chính thức",
    s1Desc:
      "Người Tiên Phong — 7 diễn giả, 500+ khán giả và những câu chuyện về khoảnh khắc dám làm điều đầu tiên.",
    s1Btn: "Xem mùa này",
    pastNote: "Nội dung đang được cập nhật.",
    altThumb2025:
      "Ảnh cảm ơn của mùa The Firsts: mọi người đứng trên sân khấu, màn hình ghi “The Firsts”",
    altThumb2024:
      "Ảnh tập thể trên sân khấu TEDx VinUniversity 2024, màn hình ghi “The New Dawn”",
    altThumb2023:
      "Ảnh tập thể trên sân khấu TEDx VinUniversity 2023, màn hình ghi “Reinvent the Wheel”",

    /* The Firsts, 2025 */
    heroLeadA: "Với chủ đề ",
    heroTheme: "“The Firsts — Người Tiên Phong”",
    heroLeadB:
      ", ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia hàng đầu về những khoảnh khắc tiên phong đã tạo nên giá trị đột phá và mở ra chân trời mới bất chấp thử thách.",
    altAudience: "Khán giả ngồi kín các hàng ghế đỏ trong khán phòng The Firsts",
    audienceCaption: "Khán giả tại The Firsts, 2025",
    stats: [
      ["7", "Diễn giả xuất sắc từ nhiều lĩnh vực"],
      ["500+", "Khán giả tham dự trực tiếp"],
      ["19.000", "Lượt tương tác mạng xã hội"],
      ["60+", "Thành viên BTC — hơn 5 tháng chuẩn bị"],
      ["9", "Nhà tài trợ đồng hành"],
      ["28", "Đại sứ truyền thông"],
    ] as [string, string][],
    statsSource: "Số liệu của mùa The Firsts, 2025",

    /* behind the stage */
    behindKicker: "Behind the stage",
    behindHeading1: "ReThink đứng sau",
    behindHeading2: "sân khấu đỏ",
    behindP1:
      "TEDx VinUniversity là sự kiện chia sẻ ý tưởng lớn nhất tại VinUniversity, được tổ chức và vận hành hoàn toàn bởi đội ngũ ReThink — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm, đến vận hành đêm sự kiện.",
    behindP2: [
      "Ở mùa The Firsts 2025, hơn ",
      "60 thành viên",
      " làm việc xuyên suốt ",
      "5 tháng",
      ", hợp tác cùng ",
      "9 nhà tài trợ",
      ", ",
      "28 đại sứ",
      " và được ",
      "VnEconomy",
      " đưa tin. TEDx VinUniversity nhận về những phản hồi tích cực và để lại trải nghiệm đáng nhớ cho cả người tổ chức lẫn người tham dự.",
    ],
    testimonial:
      "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
    testimonialBy: "Khán giả TEDx VinUniversity 2025",

    /* photos */
    galleryHeading: "Hình ảnh từ",
    galleryCaption: "Ảnh: TEDx VinUniversity — The Firsts, 2025",
    altRedcarpet:
      "Hai thành viên ban tổ chức đi cùng một khách mời trên thảm đỏ The Firsts",
    altTeam: "Chín thành viên ban tổ chức tạo dáng trước màn hình The Firsts",
    altSpeakers: "Diễn giả và khách mời TEDx VinUniversity cầm hoa chụp ảnh chung",
    altBackdrop: "Một khách mời chụp ảnh selfie cùng một nhóm bạn trẻ trước backdrop The Firsts",
    altExpert: "Một khách mời trò chuyện với hai thành viên ban tổ chức đang cầm túi The Firsts",

    /* closing */
    ctaHeading1: "Sân khấu này được dựng lên",
    ctaHeading2: "bởi những người như bạn",
    ctaLead:
      "Đằng sau đêm The Firsts 2025 là hơn 60 ReThinker làm việc suốt 5 tháng — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm đến vận hành đêm sự kiện.",
    /* shown only while RECRUITING is true */
    ctaLeadOpen:
      "Mùa tới đang cần thêm những người sẵn sàng nhận lấy ownership và làm điều chưa ai làm.",
    ctaAbout: "Tìm hiểu về ReThink",
    ctaAboutNote: "Câu chuyện, sáu ban và văn hoá của ReThinkers",
    ctaJoin: "Gia nhập ReThink",
    ctaJoinClosed: "Đợt tuyển thành viên Gen 5 (20/09/2026 – 30/09/2026) đã kết thúc",
    ctaJoinOpen: "Đang mở đơn ứng tuyển",
    ctaBtn: "Ứng tuyển Gen 5",
  },
  en: {
    meta: {
      title: "TEDx VinUniversity, season by season",
      description:
        "ReThink is the team behind TEDx VinUniversity — the largest idea-sharing event at VinUni. Look back at every TEDx VinUniversity season since 2023.",
    },

    presents: "ReThink proudly presents",
    h1Rest: "season by season",
    heroLead:
      "The annual event for ideas worth spreading at VinUni, organised solely by ReThink, a VinUni student organisation. This page keeps every season, newest first.",
    heroBtn1: "See the seasons",
    heroBtn2: "Join the next organising team",
    heroBtnFirsts: "The Firsts · 2025",
    altHero:
      "A group photo on the TEDx VinUniversity stage, the screen behind reading “The Firsts”",
    heroCaption: "The Firsts stage, 2025",

    seasonsHeadingA: "Four seasons,",
    seasonsHeadingB: "one journey",
    s2026Desc: "The 2026 season has its own official site.",
    s2026Btn: "Official site",
    s1Desc:
      "The Firsts — 7 speakers, 500+ in the audience, and stories about the moment someone dared to do a thing first.",
    s1Btn: "See this season",
    pastNote: "Details coming soon.",
    altThumb2025:
      "The Firsts thank-you image: everyone on stage under a screen reading “The Firsts”",
    altThumb2024:
      "A group photo on the TEDx VinUniversity 2024 stage, the screen reading “The New Dawn”",
    altThumb2023:
      "A group photo on the TEDx VinUniversity 2023 stage, the screen reading “Reinvent the Wheel”",

    heroLeadA: "Under the theme ",
    heroTheme: "“The Firsts”",
    heroLeadB:
      ", ReThink brought together stories from leading experts about the pioneering moments that created breakthrough value and opened new ground in spite of the odds.",
    altAudience: "The audience filling rows of red seats in the hall at The Firsts",
    audienceCaption: "The audience at The Firsts, 2025",
    stats: [
      ["7", "Speakers across several fields"],
      ["500+", "Attendees in the room"],
      ["19,000", "Social interactions"],
      ["60+", "Organisers — over 5 months of prep"],
      ["9", "Sponsors on board"],
      ["28", "Media ambassadors"],
    ] as [string, string][],
    statsSource: "Figures from The Firsts season, 2025",

    behindKicker: "Behind the stage",
    behindHeading1: "ReThink behind",
    behindHeading2: "the red stage",
    behindP1:
      "TEDx VinUniversity is the largest idea-sharing event at VinUniversity, organised and run entirely by the ReThink team — from choosing speakers and building content to designing the experience and running the night.",
    behindP2: [
      "For The Firsts in 2025, more than ",
      "60 members",
      " worked across ",
      "5 months",
      ", alongside ",
      "9 sponsors",
      ", ",
      "28 ambassadors",
      ", and the event was covered by ",
      "VnEconomy",
      ". TEDx VinUniversity drew warm feedback and left a memorable experience for organisers and attendees alike.",
    ],
    testimonial:
      "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
    testimonialBy: "A TEDx VinUniversity 2025 attendee",

    galleryHeading: "Photos from",
    galleryCaption: "Photos: TEDx VinUniversity — The Firsts, 2025",
    altRedcarpet: "Two organisers walking a guest along the red carpet at The Firsts",
    altTeam: "Nine organisers posing in front of The Firsts screen",
    altSpeakers: "TEDx VinUniversity speakers and guests holding flowers in a group photo",
    altBackdrop: "A guest taking a selfie with a group of young people in front of The Firsts backdrop",
    altExpert: "A guest talking with two organisers who are holding a The Firsts tote bag",

    ctaHeading1: "This stage was built",
    ctaHeading2: "by people like you",
    ctaLead:
      "Behind the night of The Firsts 2025 were more than 60 ReThinkers working across five months — choosing speakers, building content, designing the experience and running the night.",
    ctaLeadOpen:
      "The next season needs more people ready to take ownership and do what hasn't been done.",
    ctaAbout: "Get to know ReThink",
    ctaAboutNote: "The story, six departments and the culture of ReThinkers",
    ctaJoin: "Join ReThink",
    ctaJoinClosed: "Gen 5 applications (20/09/2026 – 30/09/2026) have closed",
    ctaJoinOpen: "Applications are open",
    ctaBtn: "Apply for Gen 5",
  },
} as const;
