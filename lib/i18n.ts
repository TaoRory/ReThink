/**
 * Site copy in both languages.
 *
 * Vietnamese is the source of truth and keeps the bare URLs (`/`, `/about`,
 * …); English lives under `/en`. Brand phrases stay verbatim in both — the
 * core values, the culture names, "Rethink & Let Rethink" and so on are set
 * pieces, not strings to translate.
 */

export const LOCALES = ["vi", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "vi";

/** `/about` for vi, `/en/about` for en */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? `/en${clean}` || "/en" : clean || "/";
}

/** strip a leading `/en` so the toggle can point at the same page */
export function stripLocale(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "vi";
}

/* ================================================================= */

export const dict = {
  vi: {
    nav: {
      about: "Về ReThink",
      tedx: "TEDxVinUniversity",
      join: "Gia nhập Gen 5",
      menu: "Mở menu",
      seasonFirsts: "Mùa 2025 — hành trình của ReThink",
      seasonLimitless: "Mùa 2026 — website chính thức ↗",
      langLabel: "Chuyển sang tiếng Anh",
    },
    footer: {
      quote:
        "“If you want a place to gather diverse ideas and take them to drive social innovation, you come to ReThink.”",
      since: "Since 2022 · VinUniversity",
      exploreHead: "Khám phá",
      connectHead: "Kết nối",
      about: "Về ReThink",
      tedx: "TEDxVinUniversity",
      join: "Tuyển thành viên Gen 5",
      fb: "Facebook — ReThink",
      tedxSite: "Website TEDxVinUniversity",
      address: "VinUniversity, Gia Lâm, Hà Nội",
      rights: "ReThink — VinUniversity. Rethink & Let Rethink.",
    },

    home: {
      meta: {
        title: "ReThink — VinUniversity | Rethink & Let Rethink",
        description:
          "ReThink — tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDxVinUniversity thường niên.",
      },
      weAre: "We are…",
      since: "Since 2022 · VinUniversity",
      heroQuotePre: "“If you want a place to gather ",
      heroQuoteMid: " and take them to drive ",
      heroQuoteEnd: ", you come to ReThink.”",
      heroQuoteA: "diverse ideas",
      heroQuoteB: "social innovation",
      joinCta: "Gia nhập Gen 5",

      whatKicker: "Về chúng mình",
      whatHeading: "What is ReThink?",
      whatP1a: "ReThink là ",
      whatP1b: "tổ chức sinh viên của VinUni",
      whatP1c:
        ", hoạt động từ năm 2022. Chúng mình tạo ra những không gian để người trẻ nhìn lại một vấn đề quen thuộc từ nhiều góc khác nhau — qua podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý tưởng.",
      whatP2a: "ReThink cũng là ",
      whatP2b: "đơn vị tổ chức TEDxVinUniversity thường niên",
      whatP2c:
        " — sự kiện lan toả ý tưởng lớn nhất tại VinUni, do sinh viên vận hành trọn vẹn từ khâu tuyển chọn diễn giả tới đêm sự kiện.",
      whatP3a: "Điều làm ReThink khác biệt nằm ở cách làm: ",
      whatP3b: "mọi hoạt động đều bắt đầu từ nội dung.",
      whatP3c:
        " Một câu hỏi được nghiên cứu kỹ, một narrative được xây rõ ràng — rồi mới tới sân khấu, bài viết hay chiến dịch truyền thông.",
      bullets: [
        ["Chạm vào những ", "thế giới tư duy khác biệt", ""],
        ["Rèn luyện ", "thói quen rethink", " mỗi ngày"],
        ["Kết nối với ", "những người cùng tư duy", " trong cộng đồng ReThink"],
        ["Tiếp cận ", "nguồn lực & mạng lưới", " để tạo tác động thật lên xã hội"],
      ] as [string, string, string][],
      altCommunity: "Cộng đồng ReThink trên sân khấu",
      altTeam: "ReThinkers làm việc cùng nhau",
      altBalcony: "Thành viên ReThink",

      valuesKicker: "4 giá trị cốt lõi",
      valuesHeading: "Core Values",
      values: [
        "Không chấp nhận “mọi thứ vốn là vậy”. Chúng mình thách thức ý tưởng, không thách thức con người — vì thay đổi bắt đầu từ những câu hỏi can đảm.",
        "Mỗi tiếng nói — từ mọi ngành, mọi nền tảng, mọi góc nhìn — đều là nhiên liệu của sáng tạo. Đa dạng làm cộng đồng mạnh hơn giữa những bất định.",
        "Không ai chờ người khác hành động trước. Mỗi người nhận lấy ownership, và kéo mọi người cùng chia sẻ cả công việc lẫn thành quả.",
        "Không chỉ làm — mà dừng lại để học. Sự chiêm nghiệm giúp ReThink không lặp lại sai lầm và trưởng thành sau mỗi bước đi.",
      ],

      doKicker: "Hoạt động nổi bật",
      doHeading: "What We Do",
      activities: [
        "Mùa 3 tiếp tục hành trình “rethink” những điều quen thuộc qua góc nhìn mới — mỗi tập là một cuộc gặp với những vị khách truyền cảm hứng như Hà Chu, Nguyễn Quốc Hoàng Anh.",
        "Sân chơi viết cho người trẻ cả nước: 100+ thí sinh, ban giám khảo uy tín, tổng giải thưởng 88 triệu đồng cho 4 bài viết xuất sắc.",
        "Sự kiện lan toả ý tưởng lớn nhất tại VinUni — “The Firsts” 2025 với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác mạng xã hội.",
      ],
      activityKickers: ["Podcast", "Online Writing Contest", "Flagship Event"],
      exploreTedx: "Khám phá TEDx →",

      tedxBandKicker: "ReThink là đơn vị đứng sau",
      tedxBandP1: "Với chủ đề ",
      tedxBandTheme: "“The Firsts”",
      tedxBandP2:
        ", ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia hàng đầu về những khoảnh khắc tiên phong tạo nên giá trị đột phá.",
      tedxStats: [
        ["7", "Diễn giả"],
        ["500+", "Khán giả"],
        ["19K", "Tương tác MXH"],
        ["60+", "Thành viên BTC"],
      ] as [string, string][],
      tedxBtn1: "The Firsts · 2025 →",
      tedxBtn2: "Limitless Decade · 2026 ↗",

      thisYearKicker: "Năm học 2026–2027",
      thisYearHeading: "Projects This Year",
      thisYearLead:
        "Gia nhập ReThink năm nay, đây là hai dự án bạn sẽ trực tiếp bắt tay vào làm:",
      comingSoon: "Coming soon",
      thisYear: [
        {
          kicker: "Định dạng mới",
          desc: "Một định dạng ReThink chưa từng thử — nơi khán giả không chỉ ngồi xem, mà tham gia vào chính câu chuyện đang diễn ra trước mắt.",
        },
        {
          kicker: "Flagship Event",
          desc: "Mùa TEDx tiếp theo do ReThink tổ chức. Chủ đề, dàn diễn giả và ngày diễn ra sẽ được hé lộ dần trong năm nay.",
        },
      ],

      keyKicker: "Hoạt động tiếp diễn",
      keyHeading: "Key Activities",
      keyLead:
        "Ba hoạt động ReThink tiếp tục duy trì và phát triển bên cạnh các dự án chính:",
      future: [
        "Series video ngắn lần đầu ra mắt — chuyên gia từ nhiều ngành chia sẻ insight về những chủ đề nóng, mở đường cho ReThinkers kết nối và đào sâu đổi mới.",
        "Sự kiện quy tụ chuyên gia đa lĩnh vực cùng mổ xẻ một thách thức của thời đại từ nhiều lăng kính — nơi người trẻ gắn kết và network trực tiếp.",
        "Cộng đồng Facebook kết nối người trẻ toàn quốc — nơi mọi thành viên chia sẻ góc nhìn mới, luyện tư duy phản biện về những vấn đề quen thuộc.",
      ],

      ctaLead:
        "Bạn được khuyến khích bước ra khỏi vùng an toàn, phá vỡ giới hạn và khám phá toàn bộ tiềm năng của mình — cùng một cộng đồng luôn sẵn sàng đứng sau lưng bạn.",
      ctaBtn: "Ứng tuyển Gen 5",
    },

    about: {
      meta: {
        title: "Về ReThink",
        description:
          "ReThink là tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDxVinUniversity thường niên — làm podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý tưởng.",
      },
      heroKicker: "Rethink — Relearn — Reinvent",
      heroHeading: "What is ReThink?",
      heroLead:
        "Tổ chức sinh viên của VinUni từ 2022 — nơi một vấn đề quen thuộc được nhìn lại từ nhiều góc, và là đơn vị tổ chức TEDxVinUniversity thường niên.",
      storyP1a: "ReThink là ",
      storyP1b: "tổ chức sinh viên của VinUni",
      storyP1c:
        ", hoạt động từ năm 2022. Chúng mình tạo ra những không gian để người trẻ nhìn lại một vấn đề quen thuộc từ nhiều góc khác nhau, và đưa những góc nhìn ấy tới đúng người cần nghe.",
      storyP2a:
        "Cụ thể, ReThink làm nội dung và sự kiện: podcast Reinventors, cuộc thi viết Rethink Reality, các workshop và toạ đàm. Và trên hết, ReThink là ",
      storyP2b: "đơn vị tổ chức TEDxVinUniversity thường niên",
      storyP2c:
        " — sự kiện lan toả ý tưởng lớn nhất tại VinUni, do sinh viên vận hành trọn vẹn từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm đến đêm sự kiện.",
      storyP3a: "Điều làm ReThink khác biệt nằm ở cách làm: ",
      storyP3b: "mọi hoạt động đều bắt đầu từ nội dung.",
      storyP3c:
        " Một câu hỏi được nghiên cứu kỹ, một narrative được xây rõ ràng — rồi mới tới sân khấu, bài viết hay chiến dịch truyền thông.",
      altCommunity: "Cộng đồng ReThink",
      altWorkshop: "ReThinkers trong workshop",

      deptKicker: "6 phòng ban chính",
      deptHeading: "Organizational Structure",
      deptSuffix: "Department",
      departments: [
        "Xây dựng core idea và narrative cho từng hoạt động, nghiên cứu chủ đề, đồng thời phụ trách tuyển chọn và đồng hành phát triển nội dung cùng diễn giả.",
        "Hoạch định chiến lược truyền thông và hệ thống messaging, triển khai các chiến dịch đưa ReThink đến với công chúng rộng hơn.",
        "Những “kiến trúc sư thị giác” biến ý tưởng của ReThink thành các ấn phẩm truyền thông ấn tượng — thiết kế, ảnh, video, audio và các chiến dịch sáng tạo.",
        "“Chất keo” của tổ chức — theo sát và hỗ trợ thành viên, xây dựng văn hoá, giữ DNA của ReThink sống động qua các hoạt động gắn kết.",
        "Xây dựng và duy trì quan hệ với nhà tài trợ, đối tác và các bên liên quan bên ngoài — đồng hành trước, trong và sau mỗi sự kiện.",
        "Phụ trách logistics và vận hành, đồng thời thiết kế hành trình khán giả và luồng trải nghiệm xuyên suốt sự kiện — từ ngân sách đến thực thi.",
      ],

      cultureKicker: "Championship — Fellowship — Breakership",
      cultureHeading: "Culture của ReThinkers",
      cultureLead:
        "Mỗi ReThinker làm việc, hỗ trợ nhau và trưởng thành dựa trên 3 giá trị văn hoá:",
      cultures: [
        "Nhận full ownership với những gì mình làm — từ tầm nhìn đến bàn giao. Không dừng ở “vừa đủ”, luôn play to win với sự chỉn chu, bền bỉ và tâm huyết với việc mình làm.",
        "Chúng mình mạnh lên bằng cách lớn lên cùng nhau — tạo ra những không gian nơi mỗi người thấy an toàn, được trân trọng và được lắng nghe.",
        "Chúng mình không xem cách làm quen thuộc là điều hiển nhiên. Trước mỗi việc, ReThinkers cùng đặt câu hỏi vì sao nó được làm theo cách đó — và liệu có cách nào phù hợp hơn.",
      ],

      benefitKicker: "Bạn nhận được gì",
      benefitHeading: "Benefits of Being a ReThinker",
      benefits: [
        [
          "Học cách xây chiến lược cho dự án và chiến dịch thực tế.",
          "Rèn kỹ năng giao tiếp & pitching khi trình bày ý tưởng với stakeholder.",
          "Phát triển sáng tạo và giải quyết vấn đề qua thử thách thật, từ lên kế hoạch đến thực thi.",
          "Làm việc trực tiếp với chuyên gia — từ diễn giả Forbes Under 30 đến CEO các tập đoàn lớn.",
        ],
        [
          "Cộng tác với những sinh viên tài năng, cùng chí hướng từ nhiều trường đại học.",
          "Kết nối trực tiếp với giảng viên, lãnh đạo và nhân viên VinUni — những mentor giàu kinh nghiệm.",
          "Xây dựng quan hệ với chuyên gia và doanh nghiệp qua các sự kiện và sáng kiến của ReThink.",
        ],
        [
          "Mang ý tưởng “điên rồ” nhất lên bàn và nhận được lời động viên: “Go for it — we've got your back.”",
          "Được tin tưởng, lắng nghe và hỗ trợ ngay cả khi bạn chưa chắc chắn về chính mình.",
          "An toàn để thử, thất bại, và thử lại — bên cạnh những người cũng đang học và nỗ lực như bạn.",
        ],
      ],
      belongQuote:
        "“Belonging isn't just a feeling — it's the value ReThink puts at the very heart of its community.”",
      becomeBtn: "Trở thành ReThinker",
    },

    tedx: {
      meta: {
        title: "TEDxVinUniversity — The Firsts",
        description:
          "ReThink là đơn vị đứng sau TEDxVinUniversity — sự kiện lan toả ý tưởng lớn nhất tại VinUni với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác.",
      },
      presents: "ReThink proudly presents",
      heroLeadA: "Với chủ đề ",
      heroTheme: "“The Firsts — Người Tiên Phong”",
      heroLeadB:
        ", ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia hàng đầu về những khoảnh khắc tiên phong đã tạo nên giá trị đột phá và mở ra chân trời mới bất chấp thử thách.",
      heroBtn1: "Khám phá hai mùa TEDx",
      heroBtn2: "Đồng hành cùng BTC mùa tới →",
      stats: [
        ["7", "Diễn giả xuất sắc từ nhiều lĩnh vực"],
        ["500+", "Khán giả tham dự trực tiếp"],
        ["19.000", "Lượt tương tác mạng xã hội"],
        ["60+", "Thành viên BTC — hơn 5 tháng chuẩn bị"],
        ["9", "Nhà tài trợ đồng hành"],
        ["28", "Đại sứ truyền thông"],
      ] as [string, string][],

      seasonsKicker: "Hai mùa · Một hành trình",
      seasonsHeading: "Chọn mùa TEDx của bạn",
      s1Badge: "Mùa 2025 · Đã diễn ra",
      s1Desc:
        "Người Tiên Phong — 7 diễn giả, 500+ khán giả và những câu chuyện về khoảnh khắc dám làm điều đầu tiên. Bạn đang xem hành trình của mùa này ngay tại trang này.",
      s1Cue: "Cuộn xuống để khám phá ↓",
      s2Badge: "Mùa 2026 · Mới",
      s2Desc:
        "Thập kỷ không giới hạn — mùa TEDxVinUniversity tiếp theo đã khởi động. Khám phá chủ đề, diễn giả và đặt chỗ trên website chính thức của mùa mới.",
      s2Cue: "Mở website chính thức ↗",

      behindKicker: "Behind the stage",
      behindHeading1: "ReThink đứng sau",
      behindHeading2: "sân khấu đỏ",
      behindP1:
        "TEDxVinUniversity là sự kiện chia sẻ ý tưởng lớn nhất tại VinUniversity, được tổ chức và vận hành hoàn toàn bởi đội ngũ ReThink — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm, đến vận hành đêm sự kiện.",
      behindP2: [
        "Hơn ",
        "60 thành viên",
        " làm việc xuyên suốt ",
        "5 tháng",
        ", hợp tác cùng ",
        "9 nhà tài trợ",
        ", ",
        "28 đại sứ",
        " và được ",
        "VnEconomy",
        " đưa tin. TEDxVinUniversity nhận về những phản hồi tích cực và để lại trải nghiệm đáng nhớ cho cả người tổ chức lẫn người tham dự.",
      ],
      testimonial:
        "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
      testimonialBy: "— Khán giả TEDxVinUniversity 2025",
      seasonLink: "Mùa 2026 — Limitless Decade: website chính thức ↗",
      gallery: [
        "Toàn cảnh sân khấu TEDxVinUniversity — The Firsts",
        "Các diễn giả TEDxVinUniversity nhận hoa",
        "Khách mời trên thảm đỏ TEDx",
        "Đội ngũ tổ chức trên sân khấu The Firsts",
        "Chuyên gia trao đổi cùng sinh viên",
        "Backdrop The Firsts",
      ],
      ctaHeading1: "Sân khấu này được dựng lên",
      ctaHeading2: "bởi những người như bạn",
      ctaLead:
        "Đằng sau mỗi đêm TEDx là hơn 60 ReThinker làm việc suốt 5 tháng — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm đến vận hành đêm sự kiện. Mùa tới đang cần thêm những người sẵn sàng nhận lấy ownership và làm điều chưa ai làm.",
      ctaBtn: "Ứng tuyển Gen 5",
    },

    join: {
      meta: {
        title: "Gia nhập Gen 5",
        description:
          "ReThink Gen 5 Recruitment — trở thành ReThinker để cùng tạo ra những dự án tác động, gặp gỡ chuyên gia hàng đầu và để tiếng nói của bạn được lắng nghe.",
      },
      badge: "Recruitment 2026 – 2027",
      heading2: "Recruitment",
      leadA: "Trở thành ReThinker để cùng ",
      leadB: "kiến tạo những dự án tác động",
      leadC: ", gặp gỡ các chuyên gia hàng đầu, và để ",
      leadD: "tiếng nói của bạn được lắng nghe",
      leadE: ".",
      btnForm: "Điền form ứng tuyển",
      btnFb: "Facebook ReThink",
      deadline: "Deadline: 22/09",
      altGen: "ReThink Gen mới",
      altBalcony: "Thành viên ReThink",
      posKicker: "6 vị trí đang mở",
      posHeading: "Open Positions",
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
    },
  },

  /* ================================================================= */

  en: {
    nav: {
      about: "About ReThink",
      tedx: "TEDxVinUniversity",
      join: "Join Gen 5",
      menu: "Open menu",
      seasonFirsts: "2025 season — ReThink's own story",
      seasonLimitless: "2026 season — official site ↗",
      langLabel: "Switch to Vietnamese",
    },
    footer: {
      quote:
        "“If you want a place to gather diverse ideas and take them to drive social innovation, you come to ReThink.”",
      since: "Since 2022 · VinUniversity",
      exploreHead: "Explore",
      connectHead: "Connect",
      about: "About ReThink",
      tedx: "TEDxVinUniversity",
      join: "Join Gen 5",
      fb: "Facebook — ReThink",
      tedxSite: "TEDxVinUniversity site",
      address: "VinUniversity, Gia Lam, Hanoi",
      rights: "ReThink — VinUniversity. Rethink & Let Rethink.",
    },

    home: {
      meta: {
        title: "ReThink — VinUniversity | Rethink & Let Rethink",
        description:
          "ReThink — a student organisation at VinUni, running since 2022 and the team behind TEDxVinUniversity every year.",
      },
      weAre: "We are…",
      since: "Since 2022 · VinUniversity",
      heroQuotePre: "“If you want a place to gather ",
      heroQuoteMid: " and take them to drive ",
      heroQuoteEnd: ", you come to ReThink.”",
      heroQuoteA: "diverse ideas",
      heroQuoteB: "social innovation",
      joinCta: "Join Gen 5",

      whatKicker: "About us",
      whatHeading: "What is ReThink?",
      whatP1a: "ReThink is ",
      whatP1b: "a student organisation at VinUni",
      whatP1c:
        ", running since 2022. We build spaces where young people can look at a familiar problem from several angles at once — through podcasts, writing contests, workshops and events built around sharing ideas.",
      whatP2a: "ReThink is also ",
      whatP2b: "the team behind TEDxVinUniversity every year",
      whatP2c:
        " — the largest idea-sharing event at VinUni, run end to end by students, from choosing the speakers to running the night itself.",
      whatP3a: "What sets ReThink apart is how we work: ",
      whatP3b: "everything starts with the content.",
      whatP3c:
        " A question researched properly, a narrative built clearly — and only then the stage, the article or the campaign.",
      bullets: [
        ["Meet ", "genuinely different ways of thinking", ""],
        ["Build the ", "habit of rethinking", " day to day"],
        ["Find ", "people who think the way you do", " in the ReThink community"],
        ["Reach the ", "resources and networks", " to make real social impact"],
      ] as [string, string, string][],
      altCommunity: "The ReThink community on stage",
      altTeam: "ReThinkers working together",
      altBalcony: "A ReThink member",

      valuesKicker: "Four core values",
      valuesHeading: "Core Values",
      values: [
        "We don't accept that “this is just how things are”. We challenge ideas, never people — because change starts with a brave question.",
        "Every voice — from any discipline, any background, any point of view — is fuel for creativity. Diversity makes a community stronger in uncertain times.",
        "Nobody waits for someone else to move first. Each of us takes ownership, and brings everyone along to share both the work and the result.",
        "Not just doing — stopping to learn. Reflection is what keeps ReThink from repeating its mistakes, and what makes it grow with every step.",
      ],

      doKicker: "Featured work",
      doHeading: "What We Do",
      activities: [
        "Season 3 continues the habit of rethinking the familiar through a new lens — each episode a conversation with guests like Ha Chu and Nguyen Quoc Hoang Anh.",
        "A national writing contest for young people: 100+ entrants, a respected panel of judges, and 88 million VND in prizes across four winning pieces.",
        "The largest idea-sharing event at VinUni — “The Firsts” 2025, with 7 speakers, 500+ in the audience and 19,000 social interactions.",
      ],
      activityKickers: ["Podcast", "Online Writing Contest", "Flagship Event"],
      exploreTedx: "Explore TEDx →",

      tedxBandKicker: "ReThink is the team behind",
      tedxBandP1: "Under the theme ",
      tedxBandTheme: "“The Firsts”",
      tedxBandP2:
        ", ReThink brought together stories from leading experts about the pioneering moments that created breakthrough value.",
      tedxStats: [
        ["7", "Speakers"],
        ["500+", "Audience"],
        ["19K", "Social interactions"],
        ["60+", "Organisers"],
      ] as [string, string][],
      tedxBtn1: "The Firsts · 2025 →",
      tedxBtn2: "Limitless Decade · 2026 ↗",

      thisYearKicker: "Academic year 2026–2027",
      thisYearHeading: "Projects This Year",
      thisYearLead:
        "Join ReThink this year and these are the two projects you'll work on directly:",
      comingSoon: "Coming soon",
      thisYear: [
        {
          kicker: "New format",
          desc: "A format ReThink has never tried — where the audience doesn't just watch, but takes part in the story unfolding in front of them.",
        },
        {
          kicker: "Flagship Event",
          desc: "The next TEDx season run by ReThink. Theme, speaker line-up and date will be revealed through the year.",
        },
      ],

      keyKicker: "Ongoing work",
      keyHeading: "Key Activities",
      keyLead:
        "Three things ReThink keeps running and building alongside the main projects:",
      future: [
        "A new short-video series — experts from several fields sharing insight on the topics of the moment, opening the way for ReThinkers to connect and dig deeper.",
        "An event bringing experts from different fields together to take apart one challenge of our time from several angles — and a place for young people to meet in person.",
        "A Facebook community connecting young people nationwide — where members share new perspectives and practise thinking critically about familiar problems.",
      ],

      ctaLead:
        "You're encouraged to step outside your comfort zone, break your own limits and find out what you're actually capable of — alongside a community that has your back.",
      ctaBtn: "Apply for Gen 5",
    },

    about: {
      meta: {
        title: "About ReThink",
        description:
          "ReThink is a student organisation at VinUni, running since 2022 and the team behind TEDxVinUniversity every year — podcasts, writing contests, workshops and idea-sharing events.",
      },
      heroKicker: "Rethink — Relearn — Reinvent",
      heroHeading: "What is ReThink?",
      heroLead:
        "A student organisation at VinUni since 2022 — where a familiar problem gets looked at from several angles, and the team behind TEDxVinUniversity every year.",
      storyP1a: "ReThink is ",
      storyP1b: "a student organisation at VinUni",
      storyP1c:
        ", running since 2022. We build spaces where young people can look at a familiar problem from several angles, and carry those perspectives to the people who need to hear them.",
      storyP2a:
        "Concretely, ReThink makes content and events: the Reinventors podcast, the Rethink Reality writing contest, workshops and panels. Above all, ReThink is ",
      storyP2b: "the team behind TEDxVinUniversity every year",
      storyP2c:
        " — the largest idea-sharing event at VinUni, run end to end by students, from choosing speakers and building content to designing the experience and running the night.",
      storyP3a: "What sets ReThink apart is how we work: ",
      storyP3b: "everything starts with the content.",
      storyP3c:
        " A question researched properly, a narrative built clearly — and only then the stage, the article or the campaign.",
      altCommunity: "The ReThink community",
      altWorkshop: "ReThinkers at a workshop",

      deptKicker: "Six departments",
      deptHeading: "Organizational Structure",
      deptSuffix: "Department",
      departments: [
        "Builds the core idea and narrative for each activity, researches the subject, and owns speaker curation and content development alongside them.",
        "Sets communication strategy and the messaging system, and runs the campaigns that carry ReThink to a wider public.",
        "The “visual architects” who turn ReThink's ideas into striking published work — design, photography, video, audio and creative campaigns.",
        "The organisation's glue — following and supporting members, building the culture, keeping ReThink's DNA alive through the things that bring people together.",
        "Builds and keeps relationships with sponsors, partners and external stakeholders — before, during and after every event.",
        "Owns logistics and operations, and designs the audience journey and experience flow across the event — from budget to execution.",
      ],

      cultureKicker: "Championship — Fellowship — Breakership",
      cultureHeading: "The ReThinkers' Culture",
      cultureLead:
        "Every ReThinker works, supports one another and grows on three cultural values:",
      cultures: [
        "Take full ownership of what you do — from the vision to the handover. Never stop at “good enough”; play to win with care, persistence and real investment in the work.",
        "We get stronger by growing together — building spaces where each person feels safe, valued and heard.",
        "We don't treat the familiar way of doing things as a given. Before each piece of work, ReThinkers ask why it's done that way — and whether there's a better fit.",
      ],

      benefitKicker: "What you get",
      benefitHeading: "Benefits of Being a ReThinker",
      benefits: [
        [
          "Learn to build strategy for real projects and campaigns.",
          "Sharpen communication and pitching by taking ideas to stakeholders.",
          "Grow creative and problem-solving muscle on real challenges, from planning through execution.",
          "Work directly with experts — from Forbes Under 30 speakers to CEOs of major groups.",
        ],
        [
          "Collaborate with talented, like-minded students from a range of universities.",
          "Connect directly with VinUni faculty, leadership and staff — experienced mentors.",
          "Build relationships with experts and businesses through ReThink's events and initiatives.",
        ],
        [
          "Put your wildest idea on the table and hear back: “Go for it — we've got your back.”",
          "Be trusted, heard and supported even when you're not yet sure of yourself.",
          "Room to try, fail and try again — next to people who are learning and pushing just like you.",
        ],
      ],
      belongQuote:
        "“Belonging isn't just a feeling — it's the value ReThink puts at the very heart of its community.”",
      becomeBtn: "Become a ReThinker",
    },

    tedx: {
      meta: {
        title: "TEDxVinUniversity — The Firsts",
        description:
          "ReThink is the team behind TEDxVinUniversity — the largest idea-sharing event at VinUni, with 7 speakers, 500+ attendees and 19,000 social interactions.",
      },
      presents: "ReThink proudly presents",
      heroLeadA: "Under the theme ",
      heroTheme: "“The Firsts”",
      heroLeadB:
        ", ReThink brought together stories from leading experts about the pioneering moments that created breakthrough value and opened new ground in spite of the odds.",
      heroBtn1: "Explore both TEDx seasons",
      heroBtn2: "Join the next organising team →",
      stats: [
        ["7", "Speakers across several fields"],
        ["500+", "Attendees in the room"],
        ["19,000", "Social interactions"],
        ["60+", "Organisers — over 5 months of prep"],
        ["9", "Sponsors on board"],
        ["28", "Media ambassadors"],
      ] as [string, string][],

      seasonsKicker: "Two seasons · One journey",
      seasonsHeading: "Pick your TEDx season",
      s1Badge: "2025 season · Past",
      s1Desc:
        "The Firsts — 7 speakers, 500+ in the audience, and stories about the moment someone dared to do a thing first. You're looking at that season's story right now.",
      s1Cue: "Scroll to explore ↓",
      s2Badge: "2026 season · New",
      s2Desc:
        "A decade without limits — the next TEDxVinUniversity season is under way. Explore the theme, the speakers and book a seat on the season's official site.",
      s2Cue: "Open the official site ↗",

      behindKicker: "Behind the stage",
      behindHeading1: "ReThink behind",
      behindHeading2: "the red stage",
      behindP1:
        "TEDxVinUniversity is the largest idea-sharing event at VinUniversity, organised and run entirely by the ReThink team — from choosing speakers and building content to designing the experience and running the night.",
      behindP2: [
        "More than ",
        "60 members",
        " worked across ",
        "5 months",
        ", alongside ",
        "9 sponsors",
        ", ",
        "28 ambassadors",
        ", and the event was covered by ",
        "VnEconomy",
        ". TEDxVinUniversity drew warm feedback and left a memorable experience for organisers and attendees alike.",
      ],
      testimonial:
        "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
      testimonialBy: "— A TEDxVinUniversity 2025 attendee",
      seasonLink: "2026 — Limitless Decade: official site ↗",
      gallery: [
        "The TEDxVinUniversity stage — The Firsts",
        "TEDxVinUniversity speakers receiving flowers",
        "Guests on the TEDx red carpet",
        "The organising team on The Firsts stage",
        "An expert talking with students",
        "The Firsts backdrop",
      ],
      ctaHeading1: "This stage was built",
      ctaHeading2: "by people like you",
      ctaLead:
        "Behind every TEDx night are more than 60 ReThinkers working across five months — choosing speakers, building content, designing the experience and running the night. The next season needs more people ready to take ownership and do what hasn't been done.",
      ctaBtn: "Apply for Gen 5",
    },

    join: {
      meta: {
        title: "Join Gen 5",
        description:
          "ReThink Gen 5 Recruitment — become a ReThinker to co-create impactful projects, meet leading professionals and let your voice be heard.",
      },
      badge: "Recruitment 2026 – 2027",
      heading2: "Recruitment",
      leadA: "Become a ReThinker to ",
      leadB: "co-create projects with real impact",
      leadC: ", meet leading professionals, and ",
      leadD: "let your voice be heard",
      leadE: ".",
      btnForm: "Fill in the application",
      btnFb: "ReThink on Facebook",
      deadline: "Deadline: 22/09",
      altGen: "The new ReThink generation",
      altBalcony: "A ReThink member",
      posKicker: "Six positions open",
      posHeading: "Open Positions",
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
    },
  },
} as const;

export type Dict = (typeof dict)["vi"];
