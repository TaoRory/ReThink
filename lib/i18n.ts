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
      halloween: "Halloween 2026",
      tedx: "TEDx VinUniversity",
      join: "Gia nhập Gen 5",
      menu: "Mở menu",
      seasonFirsts: "Mùa 2025 — hành trình của ReThink",
      seasonLimitless: "Mùa 2026 — website chính thức ↗",
      seasonArchive: "Nội dung đang được cập nhật",
      langLabel: "Chuyển sang tiếng Anh",
    },
    footer: {
      quote:
        "“If you want a place to gather diverse ideas and take them to drive social innovation, you come to ReThink.”",
      since: "Since 2022 · VinUniversity",
      exploreHead: "Khám phá",
      connectHead: "Kết nối",
      about: "Về ReThink",
      tedx: "TEDx VinUniversity",
      join: "Tuyển thành viên Gen 5",
      halloween: "Halloween 2026",
      game: "Game — Club Fair",
      fb: "Facebook — ReThink",
      tedxSite: "Website TEDx VinUniversity",
      address: "VinUniversity, Gia Lâm, Hà Nội",
      rights: "ReThink — VinUniversity. Rethink & Let Rethink.",
    },

    home: {
      meta: {
        title: "ReThink — VinUniversity | Rethink & Let Rethink",
        description:
          "ReThink — tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDx VinUniversity thường niên.",
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
      whatP1b: "tổ chức do sinh viên VinUni thành lập",
      whatP1c:
        ", bước vào hoạt động từ năm 2022. Chúng mình tạo ra không gian để những người trẻ nhìn lại một vấn đề quen thuộc từ nhiều lăng kính khác nhau — qua podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý tưởng.",
      whatP2a: "ReThink cũng là ",
      whatP2b: "đơn vị độc quyền tổ chức TEDx VinUniversity",
      whatP2c:
        " — sự kiện thường niên lan toả ý tưởng lớn (ideas worth spreading) tại VinUni, do sinh viên vận hành trọn vẹn từ khâu tuyển chọn diễn giả tới đêm sự kiện.",
      whatP3a:
        "Nhìn lại 4 năm hoạt động, niềm tự hào lớn nhất của ReThink không chỉ nằm ở những con số nổi bật, mà chính ở ",
      whatP3b: "yếu tố con người, một cộng đồng tài giỏi và đáng tin cậy",
      whatP3c:
        ". Tụi mình luôn tin rằng một tổ chức chỉ thực sự phát triển bền vững khi từng cá nhân được trao cơ hội cống hiến và tìm thấy một chốn thuộc về. Bước sang năm thứ 5 hoạt động, ReThink tiếp tục bồi đắp và lan toả những giá trị văn hoá cốt lõi sau:",
      /* the three culture names are brand phrases — verbatim in both locales */
      bullets: [
        [
          "",
          "Championship Culture",
          ": tinh thần chịu trách nhiệm trọn vẹn với công việc, từ đầu đến cuối.",
        ],
        [
          "",
          "Fellowship Culture",
          ": chúng mình cùng nhau làm việc, cùng nhau phát triển, sẵn sàng giúp đỡ và hỗ trợ lẫn nhau.",
        ],
        [
          "",
          "Breakership Culture",
          ": chúng mình không mặc định đi theo lối mòn — chúng mình đặt câu hỏi, nhìn nhận lại và không ngừng cải tiến.",
        ],
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
        "Sự kiện lan toả ý tưởng lớn nhất tại VinUni — “The Firsts” 2025 với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác mạng xã hội.",
        "Mùa 3 tiếp tục hành trình “rethink” những điều quen thuộc qua góc nhìn mới — mỗi tập là một cuộc gặp với những vị khách truyền cảm hứng như Hà Chu, Nguyễn Quốc Hoàng Anh.",
        "Sân chơi viết cho người trẻ cả nước: 100+ thí sinh, ban giám khảo uy tín, tổng giải thưởng 88 triệu đồng cho 4 bài viết xuất sắc.",
      ],
      activityKickers: ["Flagship Event", "Podcast", "Online Writing Contest"],
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
          "ReThink là tổ chức sinh viên của VinUni, hoạt động từ 2022 và là đơn vị tổ chức TEDx VinUniversity thường niên — làm podcast, cuộc thi viết, workshop và các sự kiện chia sẻ ý tưởng.",
      },
      heroKicker: "Rethink — Relearn — Reinvent",
      heroHeading: "What is ReThink?",
      heroLead:
        "Tổ chức sinh viên của VinUni từ 2022 — nơi một vấn đề quen thuộc được nhìn lại từ nhiều góc, và là đơn vị tổ chức TEDx VinUniversity thường niên.",
      storyP1a: "ReThink là ",
      storyP1b: "tổ chức sinh viên của VinUni",
      storyP1c:
        ", hoạt động từ năm 2022. Chúng mình tạo ra những không gian để người trẻ nhìn lại một vấn đề quen thuộc từ nhiều góc khác nhau, và đưa những góc nhìn ấy tới đúng người cần nghe.",
      storyP2a:
        "Cụ thể, ReThink làm nội dung và sự kiện: podcast Reinventors, cuộc thi viết Rethink Reality, các workshop và toạ đàm. Và trên hết, ReThink là ",
      storyP2b: "đơn vị tổ chức TEDx VinUniversity thường niên",
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
        title: "TEDx VinUniversity — The Firsts",
        description:
          "ReThink là đơn vị đứng sau TEDx VinUniversity — sự kiện lan toả ý tưởng lớn nhất tại VinUni với 7 diễn giả, 500+ khán giả và 19.000 lượt tương tác.",
      },
      presents: "ReThink proudly presents",
      heroLeadA: "Với chủ đề ",
      heroTheme: "“The Firsts — Người Tiên Phong”",
      heroLeadB:
        ", ReThink mang đến những câu chuyện truyền cảm hứng từ các chuyên gia hàng đầu về những khoảnh khắc tiên phong đã tạo nên giá trị đột phá và mở ra chân trời mới bất chấp thử thách.",
      heroBtn1: "Khám phá các mùa TEDx",
      heroBtn2: "Đồng hành cùng BTC mùa tới →",
      stats: [
        ["7", "Diễn giả xuất sắc từ nhiều lĩnh vực"],
        ["500+", "Khán giả tham dự trực tiếp"],
        ["19.000", "Lượt tương tác mạng xã hội"],
        ["60+", "Thành viên BTC — hơn 5 tháng chuẩn bị"],
        ["9", "Nhà tài trợ đồng hành"],
        ["28", "Đại sứ truyền thông"],
      ] as [string, string][],

      seasonsKicker: "Bốn mùa · Một hành trình",
      pastKicker: "Các mùa trước",
      pastNote: "Nội dung đang được cập nhật",
      seasonsHeading: "Chọn mùa TEDx của bạn",
      s1Badge: "Mùa 2025 · Đã diễn ra",
      s1Desc:
        "Người Tiên Phong — 7 diễn giả, 500+ khán giả và những câu chuyện về khoảnh khắc dám làm điều đầu tiên. Bạn đang xem hành trình của mùa này ngay tại trang này.",
      s1Cue: "Cuộn xuống để khám phá ↓",
      s2Badge: "Mùa 2026 · Mới",
      s2Desc:
        "Thập kỷ không giới hạn — mùa TEDx VinUniversity tiếp theo đã khởi động. Khám phá chủ đề, diễn giả và đặt chỗ trên website chính thức của mùa mới.",
      s2Cue: "Mở website chính thức ↗",

      behindKicker: "Behind the stage",
      behindHeading1: "ReThink đứng sau",
      behindHeading2: "sân khấu đỏ",
      behindP1:
        "TEDx VinUniversity là sự kiện chia sẻ ý tưởng lớn nhất tại VinUniversity, được tổ chức và vận hành hoàn toàn bởi đội ngũ ReThink — từ tuyển chọn diễn giả, xây dựng nội dung, thiết kế trải nghiệm, đến vận hành đêm sự kiện.",
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
        " đưa tin. TEDx VinUniversity nhận về những phản hồi tích cực và để lại trải nghiệm đáng nhớ cho cả người tổ chức lẫn người tham dự.",
      ],
      testimonial:
        "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
      testimonialBy: "— Khán giả TEDx VinUniversity 2025",
      seasonLink: "Mùa 2026 — Limitless Decade: website chính thức ↗",
      gallery: [
        "Toàn cảnh sân khấu TEDx VinUniversity — The Firsts",
        "Các diễn giả TEDx VinUniversity nhận hoa",
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
      period: "Thời gian tuyển thành viên: 20/09/2026 – 30/09/2026",
      periodNote:
        "Lưu ý: Đơn đăng ký có thể đóng sớm khi chúng mình đã tuyển đủ số lượng thành viên.",
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
    game: {
      meta: {
        title: "Game — Club Fair",
        description:
          "TEDx in 30s — vòng quay chủ đề của ReThink tại Club Fair. Quay một chủ đề, rồi có 30 giây để nói quan điểm của mình.",
      },
      badge: "Club Fair · ReThink",
      headingRest: " in 30s",
      lead:
        "Quay vòng để nhận một chủ đề, rồi có đúng 30 giây để bảo vệ quan điểm của mình — một TEDx talk thu nhỏ ngay tại gian hàng ReThink.",
      spin: "Quay",
      spinning: "Đang quay",
      hint: "Nhấn vào tâm vòng quay để bắt đầu",
      idleTitle: "Sẵn sàng chưa?",
      idleLead: "Quay vòng và nhận chủ đề đầu tiên của bạn.",
      topicLabel: "Chủ đề của bạn",
      again: "Quay lần nữa",
      markDone: "Đánh dấu đã nói",
      reset: "Chơi lại từ đầu",
      timerStart: "Bấm giờ 30 giây",
      timerReset: "Dừng & đặt lại",
      timerDone: "Hết giờ!",
      remaining: "chủ đề còn lại",
      allDoneTitle: "Hết chủ đề rồi!",
      allDoneLead:
        "Cả 11 chủ đề đều đã được nói. Chơi lại từ đầu để tiếp tục.",
      listKicker: "11 chủ đề",
      listHeading: "Topics On The Wheel",
      done: "Đã nói",
      ctaHeading: "Thích cách chúng mình đặt câu hỏi?",
      ctaLead:
        "Đó cũng là cách ReThink làm việc: lấy một điều quen thuộc, lật nó lại, rồi kể thành một câu chuyện đáng nghe. Gen 5 đang mở đơn.",
      ctaBtn: "Gia nhập Gen 5",
    },
    /* ----------------------------------------------------------------
       Halloween event. PLACEHOLDER COPY — every string below is a stand-in
       written to show the layout working; it gets replaced from the real
       event brief. Fitted to the Halloween KV (grass tunnel, masks, compass).
       ---------------------------------------------------------------- */
    halloween: {
      meta: {
        title: "Halloween 2026",
        description:
          "Halloween 2026 của ReThink tại VinUniversity — một đường hầm cỏ, hai trò chơi và một chiếc la bàn. (Nội dung mẫu.)",
      },
      draftNote: "Nội dung mẫu — đang chờ bản chính thức",
      kicker: "Halloween 2026 · VinUniversity",
      eventName: "Halloween 2026",
      tagline:
        "Đi hết đường hầm cỏ. Chiếc la bàn sẽ chỉ lối — nhưng chưa chắc đó là lối ra.",
      whenLabel: "Thời gian",
      when: "Thứ Sáu, 30/10/2026 · 17:00 – 22:30",
      dateShort: "30.10",
      timeShort: "17:00 – 22:30",
      whereLabel: "Địa điểm",
      where: "Sảnh chính — VinUniversity, Gia Lâm, Hà Nội",
      ctaJoin: "Đăng ký tham gia",
      ctaRooms: "Xem trình tự đêm diễn",
      scrollHint: "Cuộn để bước vào",
      tickerWords: ["Halloween 2026", "30 · 10 · 2026", "VinUniversity", "ReThink", "Student Council"],

      storyKicker: "Câu chuyện",
      storyHeading: "Into the Tunnel",
      storyP1:
        "Cuối khuôn viên có một đường hầm bằng cỏ mà ban ngày không ai nhìn thấy. Đêm 30/10, những vòm cỏ ấy mở ra — vòm sau nhỏ hơn vòm trước, và ở tận cùng có một người đang đứng đợi.",
      storyP2:
        "Hãy mang theo chiếc la bàn. Nó luôn chỉ đúng hướng, nhưng không bao giờ cho bạn biết điều gì đang chờ ở đó.",

      gamesKicker: "Hai trò chơi",
      gamesHeading: "Two Games",
      gamesLead:
        "Hai trò chơi chính của đêm Halloween. Cả hai đều đăng ký trước — bấm vào trò chơi bạn muốn để điền thông tin.",
      games: {
        hunt: {
          tag: "Scavenger hunt",
          name: "The Last Summer Camp",
          desc: "Pinewood, 1996. Một cuộc điều tra cuối cùng trước khi khu trại bị phá dỡ.",
          facts: ["18:20 – 22:20", "Mỗi ca 30 phút chơi", "Tối đa 32 người mỗi ca", "Đăng ký lẻ hoặc nhóm 2 – 4 người"],
          cta: "Chọn ca & đăng ký",
          storyCta: "Cốt truyện",
          formTitle: "Đăng ký Scavenger Hunt",
          types: {
            solo: { name: "Đăng ký lẻ", note: "1 người" },
            group: { name: "Đăng ký nhóm", note: "2 – 4 người" },
          },
          slotNote: "Mỗi ca 30 phút chơi, tối đa 32 người. Giờ ca kế tiếp cách 40 phút.",
          story: {
            kicker: "Pinewood, 1996",
            heading: "The Last Summer Camp",
            blocks: [
              {
                paras: [
                  "Năm 1996, Pinewood Summer Camp nổi tiếng với The Lost Camper Challenge — thử thách ban đêm mà các trại viên phải tự tìm đường qua khu rừng bằng bản đồ, la bàn và đèn pin, dưới sự giám sát của đội Night Watch.",
                  "Thế nhưng, mùa hè năm ấy đã kết thúc bằng một bi kịch. Một trại viên được tìm thấy đã chết trong rừng khi tham gia thử thách. Vụ việc được kết luận là tai nạn, khiến Lost Camper Challenge bị hủy bỏ và Pinewood dần đóng cửa. Suốt ba mươi năm, những nghi vấn vẫn chưa có lời giải đáp.",
                ],
              },
              {
                paras: [
                  "Ba mươi năm sau, Pinewood sắp bị phá dỡ để xây một khu nghỉ dưỡng. Nhưng hàng loạt hiện tượng kỳ lạ bất ngờ xuất hiện tại khu trại bỏ hoang: tiếng trẻ con khóc, tiếng còi vang lên giữa rừng, ánh đèn pin di chuyển quanh những cabin trống — và một bóng người đeo mặt nạ nai xuất hiện vào mỗi đêm.",
                ],
              },
              {
                heading: "Nhiệm vụ của bạn",
                paras: [
                  "Các bạn là một nhóm điều tra được mời đến Pinewood trước khi khu trại bị phá dỡ. Hãy khám phá các khu vực trong trại, vượt qua thử thách và thu thập bằng chứng còn sót lại từ năm 1996.",
                  "Một bức ảnh tập thể chụp vào ngày khai mạc trại hè năm ấy đã bị xé thành nhiều mảnh và thất lạc khắp Pinewood. Hãy thu thập các mảnh ảnh, ghép chúng lại và giải mã bí mật được giấu phía sau.",
                ],
              },
            ],
            outro: "Đây là cuộc điều tra cuối cùng trước khi Pinewood biến mất. Liệu các bạn có thể khám phá sự thật đã bị chôn vùi suốt ba mươi năm?",
          },
        },
        escape: {
          tag: "Escape room",
          name: "Căn Phòng Khoá Kín",
          desc: "Một căn phòng khoá kín và bốn mươi phút để thoát ra. Chọn đúng ca chơi của bạn.",
          facts: ["17:00 – 22:30", "Tối đa 15 người mỗi ca", "Vé 67.000đ / người", "Đăng ký lẻ hoặc nhóm 2 – 6 người"],
          cta: "Chọn ca & đăng ký",
          formTitle: "Đăng ký Escape Room",
          types: {
            solo: { name: "Đăng ký lẻ", note: "1 người" },
            group: { name: "Đăng ký nhóm", note: "2 – 6 người" },
          },
          slotNote: "Mỗi ca 40 phút chơi, tối đa 15 người. Giờ ca kế tiếp cách 50 phút.",
          storyCta: "Cốt truyện",
          story: {
            kicker: "Căn phòng khoá kín",
            heading: "Sắp được hé lộ",
            blocks: [{ paras: ["Câu chuyện của căn phòng sẽ sớm được hé lộ. Hãy chờ nhé."] }],
            outro: "",
          },
        },
        form: {
          name: "Họ và tên",
          email: "Email VinUni",
          studentId: "Mã số sinh viên",
          phone: "Số điện thoại (không bắt buộc)",
          typeLegend: "Hình thức đăng ký",
          seatsLeft: "Còn {n} chỗ",
          seatsLoading: "Đang tải số chỗ…",
          full: "Hết chỗ",
          noRoomForType: "Ca này không đủ chỗ cho hình thức bạn chọn.",
          teamName: "Tên nhóm (không bắt buộc)",
          members: "Danh sách thành viên + Email VinUni",
          membersHint: "Mỗi dòng một người, gồm cả bạn, theo dạng: Họ tên – email VinUni.",
          membersEmail: "Mỗi dòng cần có email VinUni của thành viên.",
          payTitle: "Thanh toán",
          payLead: "Quét mã QR dưới đây, nhập đúng số tiền ở dòng \"Tổng cần chuyển\" rồi tải ảnh chứng minh lên.",
          groupSizeLabel: "Số người trong nhóm",
          conflictIntro: "TRÙNG LỊCH — những người sau (theo email VinUni) đã đăng ký trò chơi còn lại vào giờ trùng:",
          conflictLine: "{who} ({email}) — {game} lúc {time}",
          conflictOutro: "Một người không thể tham gia hai trò chơi cùng lúc. Hãy chọn ca khác hoặc bỏ họ khỏi danh sách.",
          dupMember: "Danh sách có người bị trùng email.",
          priceLabel: "Giá vé",
          perPerson: "/ người",
          peopleCount: "Số người",
          totalLabel: "Tổng cần chuyển",
          promoLabel: "Mã giảm giá",
          promoApply: "Áp dụng",
          promoOk: "Đã áp dụng mã — giảm 25%.",
          promoBad: "Mã giảm giá không hợp lệ.",
          payQrMissing: "Mã QR thanh toán sẽ được cập nhật.",
          proofLabel: "Ảnh chứng minh chuyển khoản",
          proofChoose: "Chọn ảnh",
          proofChange: "Đổi ảnh",
          proofRequired: "Vui lòng tải ảnh chứng minh chuyển khoản.",
          proofBad: "Không đọc được ảnh này. Hãy thử ảnh khác (JPG hoặc PNG).",
          proofReading: "Đang xử lý ảnh…",
          proofRejected: "Ảnh chưa được nhận. Hãy thử ảnh khác hoặc ảnh nhỏ hơn.",
          membersCount: "Cần đúng {n} người — hiện có {c}.",
          contactNote: "Thông tin người đại diện — chúng mình liên hệ qua người này.",
          slotFullNow: "Ca này vừa hết chỗ. Hãy chọn ca khác.",
          slotLegend: "Chọn ca chơi",
          slotRequired: "Hãy chọn một ca chơi.",
          required: "Vui lòng điền mục này.",
          submit: "Gửi đăng ký",
          sending: "Đang gửi…",
          close: "Đóng",
          registerNow: "Đăng ký ngay",
          successTitle: "Đã nhận đăng ký!",
          successBody: "Chúng mình sẽ liên hệ qua email nếu cần xác nhận thêm.",
          successSlot: "Ca của bạn:",
          error: "Chưa gửi được. Bạn thử lại sau ít phút nhé.",
          notOpen: "Biểu mẫu đăng ký sẽ được mở sớm — đường dẫn đang được cập nhật.",
        },
      },

      scheduleKicker: "Trình tự đêm diễn",
      scheduleHeading: "The Night",
      scheduleTimes: ["17:00", "17:00 – 21:50", "22:00", "22:30"],
      scheduleTitles: [
        "Mở cửa & nhận la bàn",
        "Hai trò chơi cùng mở",
        "Vòm cuối cùng",
        "Đóng cửa",
      ],
      scheduleDescs: [
        "Nhận thẻ khách và chiếc la bàn. Trang phục hoá trang được khuyến khích, không bắt buộc.",
        "Săn manh mối chơi tự do; escape room chạy theo ca đã đăng ký, mỗi ca 40 phút.",
        "Lời giải của đêm được công bố tại đây.",
        "Chụp ảnh tập thể trong đường hầm, trao giải cho ba bộ hoá trang được bình chọn nhiều nhất.",
      ],

      rulesKicker: "Trước khi vào",
      rulesHeading: "House Rules",
      ruleQs: [
        "Có cần đăng ký trước không?",
        "Có bắt buộc hoá trang không?",
        "Sự kiện có đáng sợ không?",
      ],
      ruleAs: [
        "Có. Cả hai trò chơi đều đăng ký trước. Escape room phải chọn đúng ca chơi, mỗi ca tối đa 15 người.",
        "Không bắt buộc, nhưng đêm này sinh ra là để hoá trang. Ba bộ được bình chọn nhiều nhất sẽ có giải.",
        "Có máu giả và hình ảnh kinh dị, nhưng không có jumpscare hay diễn viên đuổi theo bạn. Hợp với người thích giải đố hơn người thích bị doạ.",
      ],

      ctaHeading: "Cửa hầm mở lúc 17:00",
      ctaLead:
        "Số chỗ mỗi ca có hạn. Đăng ký trước để chắc chắn có một chỗ trong đường hầm.",
      ctaBtn: "Đăng ký tham gia",
      ctaNote: "Đường dẫn đăng ký sẽ được cập nhật.",
    },
  },

  /* ================================================================= */

  en: {
    nav: {
      about: "About ReThink",
      halloween: "Halloween 2026",
      tedx: "TEDx VinUniversity",
      join: "Join Gen 5",
      menu: "Open menu",
      seasonFirsts: "2025 season — ReThink's own story",
      seasonLimitless: "2026 season — official site ↗",
      seasonArchive: "Details coming soon",
      langLabel: "Switch to Vietnamese",
    },
    footer: {
      quote:
        "“If you want a place to gather diverse ideas and take them to drive social innovation, you come to ReThink.”",
      since: "Since 2022 · VinUniversity",
      exploreHead: "Explore",
      connectHead: "Connect",
      about: "About ReThink",
      tedx: "TEDx VinUniversity",
      join: "Join Gen 5",
      halloween: "Halloween 2026",
      game: "Game — Club Fair",
      fb: "Facebook — ReThink",
      tedxSite: "TEDx VinUniversity site",
      address: "VinUniversity, Gia Lam, Hanoi",
      rights: "ReThink — VinUniversity. Rethink & Let Rethink.",
    },

    home: {
      meta: {
        title: "ReThink — VinUniversity | Rethink & Let Rethink",
        description:
          "ReThink — a student organisation at VinUni, running since 2022 and the team behind TEDx VinUniversity every year.",
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
      whatP1a: "ReThink is an ",
      whatP1b: "organisation founded by VinUni students",
      whatP1c:
        ", running since 2022. We create spaces where young people can look again at a familiar problem through different lenses — through podcasts, writing contests, workshops and events built around sharing ideas.",
      whatP2a: "ReThink is also the ",
      whatP2b: "sole organiser of TEDx VinUniversity",
      whatP2c:
        " — the annual event for ideas worth spreading at VinUni, run end to end by students, from choosing the speakers to the night itself.",
      whatP3a:
        "Looking back on four years, what ReThink is proudest of is not the headline numbers but ",
      whatP3b: "its people — a community that is both capable and dependable",
      whatP3c:
        ". We believe an organisation only grows sustainably when each person is given the chance to contribute and finds a place to belong. Entering its fifth year, ReThink keeps building and spreading these core cultural values:",
      bullets: [
        [
          "",
          "Championship Culture",
          ": owning the work completely, from the first step to the last.",
        ],
        [
          "",
          "Fellowship Culture",
          ": we work together and grow together, ready to help and support one another.",
        ],
        [
          "",
          "Breakership Culture",
          ": we don't default to the beaten path — we ask questions, look again and keep improving.",
        ],
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
        "The largest idea-sharing event at VinUni — “The Firsts” 2025, with 7 speakers, 500+ in the audience and 19,000 social interactions.",
        "Season 3 continues the habit of rethinking the familiar through a new lens — each episode a conversation with guests like Ha Chu and Nguyen Quoc Hoang Anh.",
        "A national writing contest for young people: 100+ entrants, a respected panel of judges, and 88 million VND in prizes across four winning pieces.",
      ],
      activityKickers: ["Flagship Event", "Podcast", "Online Writing Contest"],
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
          "ReThink is a student organisation at VinUni, running since 2022 and the team behind TEDx VinUniversity every year — podcasts, writing contests, workshops and idea-sharing events.",
      },
      heroKicker: "Rethink — Relearn — Reinvent",
      heroHeading: "What is ReThink?",
      heroLead:
        "A student organisation at VinUni since 2022 — where a familiar problem gets looked at from several angles, and the team behind TEDx VinUniversity every year.",
      storyP1a: "ReThink is ",
      storyP1b: "a student organisation at VinUni",
      storyP1c:
        ", running since 2022. We build spaces where young people can look at a familiar problem from several angles, and carry those perspectives to the people who need to hear them.",
      storyP2a:
        "Concretely, ReThink makes content and events: the Reinventors podcast, the Rethink Reality writing contest, workshops and panels. Above all, ReThink is ",
      storyP2b: "the team behind TEDx VinUniversity every year",
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
        title: "TEDx VinUniversity — The Firsts",
        description:
          "ReThink is the team behind TEDx VinUniversity — the largest idea-sharing event at VinUni, with 7 speakers, 500+ attendees and 19,000 social interactions.",
      },
      presents: "ReThink proudly presents",
      heroLeadA: "Under the theme ",
      heroTheme: "“The Firsts”",
      heroLeadB:
        ", ReThink brought together stories from leading experts about the pioneering moments that created breakthrough value and opened new ground in spite of the odds.",
      heroBtn1: "Explore the TEDx seasons",
      heroBtn2: "Join the next organising team →",
      stats: [
        ["7", "Speakers across several fields"],
        ["500+", "Attendees in the room"],
        ["19,000", "Social interactions"],
        ["60+", "Organisers — over 5 months of prep"],
        ["9", "Sponsors on board"],
        ["28", "Media ambassadors"],
      ] as [string, string][],

      seasonsKicker: "Four seasons · One journey",
      pastKicker: "Earlier seasons",
      pastNote: "Details coming soon",
      seasonsHeading: "Pick your TEDx season",
      s1Badge: "2025 season · Past",
      s1Desc:
        "The Firsts — 7 speakers, 500+ in the audience, and stories about the moment someone dared to do a thing first. You're looking at that season's story right now.",
      s1Cue: "Scroll to explore ↓",
      s2Badge: "2026 season · New",
      s2Desc:
        "A decade without limits — the next TEDx VinUniversity season is under way. Explore the theme, the speakers and book a seat on the season's official site.",
      s2Cue: "Open the official site ↗",

      behindKicker: "Behind the stage",
      behindHeading1: "ReThink behind",
      behindHeading2: "the red stage",
      behindP1:
        "TEDx VinUniversity is the largest idea-sharing event at VinUniversity, organised and run entirely by the ReThink team — from choosing speakers and building content to designing the experience and running the night.",
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
        ". TEDx VinUniversity drew warm feedback and left a memorable experience for organisers and attendees alike.",
      ],
      testimonial:
        "“Huge congratulations! Such an amazing and inspiring event! Well done guys!”",
      testimonialBy: "— A TEDx VinUniversity 2025 attendee",
      seasonLink: "2026 — Limitless Decade: official site ↗",
      gallery: [
        "The TEDx VinUniversity stage — The Firsts",
        "TEDx VinUniversity speakers receiving flowers",
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
      period: "Recruitment period: September 20–30, 2026",
      periodNote:
        "Note: Applications may close early once all available positions have been filled.",
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
    game: {
      meta: {
        title: "Game — Club Fair",
        description:
          "TEDx in 30s — ReThink's topic wheel for Club Fair. Spin a topic, then take 30 seconds to make your case.",
      },
      badge: "Club Fair · ReThink",
      headingRest: " in 30s",
      lead:
        "Spin for a topic, then take exactly 30 seconds to make your case — a TEDx talk in miniature, right at the ReThink booth.",
      spin: "Spin",
      spinning: "Spinning",
      hint: "Tap the hub to spin",
      idleTitle: "Ready?",
      idleLead: "Give the wheel a spin and take your first topic.",
      topicLabel: "Your topic",
      again: "Spin again",
      markDone: "Mark as spoken",
      reset: "Start over",
      timerStart: "Start 30 seconds",
      timerReset: "Stop & reset",
      timerDone: "Time!",
      remaining: "topics left",
      allDoneTitle: "That's all of them!",
      allDoneLead: "All 11 topics have been spoken. Start over to keep playing.",
      listKicker: "11 topics",
      listHeading: "Topics On The Wheel",
      done: "Spoken",
      ctaHeading: "Like the way we ask questions?",
      ctaLead:
        "That is how ReThink works every day: take something familiar, turn it over, then tell it as a story worth hearing. Gen 5 applications are open.",
      ctaBtn: "Join Gen 5",
    },
    /* Halloween event — PLACEHOLDER COPY, see the Vietnamese block above. */
    halloween: {
      meta: {
        title: "Halloween 2026",
        description:
          "ReThink's Halloween 2026 at VinUniversity — a tunnel of grass, two games and a compass. (Placeholder copy.)",
      },
      draftNote: "Placeholder copy — final text to come",
      kicker: "Halloween 2026 · VinUniversity",
      eventName: "Halloween 2026",
      tagline:
        "Walk to the end of the grass tunnel. The compass will point the way — not necessarily the way out.",
      whenLabel: "When",
      when: "Friday 30 October 2026 · 17:00 – 22:30",
      dateShort: "30.10",
      timeShort: "17:00 – 22:30",
      whereLabel: "Where",
      where: "Main hall — VinUniversity, Gia Lam, Hanoi",
      ctaJoin: "Reserve a place",
      ctaRooms: "See the running order",
      scrollHint: "Scroll to walk in",
      tickerWords: ["Halloween 2026", "30 · 10 · 2026", "VinUniversity", "ReThink", "Student Council"],

      storyKicker: "The story",
      storyHeading: "Into the Tunnel",
      storyP1:
        "At the far end of campus there is a tunnel of grass nobody sees by day. On the night of 30 October its arches open — each one smaller than the last, and at the very end someone is waiting.",
      storyP2:
        "Bring the compass. It always points the right way, but it never tells you what is waiting there.",

      gamesKicker: "Two games",
      gamesHeading: "Two Games",
      gamesLead:
        "The two main games of Halloween night. Both need a reservation — pick the one you want and fill in your details.",
      games: {
        hunt: {
          tag: "Scavenger hunt",
          name: "The Last Summer Camp",
          desc: "Pinewood, 1996. One last investigation before the camp is torn down.",
          facts: ["18:20 – 22:20", "30 minutes of play per session", "Up to 32 people per session", "Register alone or as a group of 2 – 4"],
          cta: "Pick a session & register",
          storyCta: "The story",
          formTitle: "Scavenger Hunt registration",
          types: {
            solo: { name: "Individual", note: "1 person" },
            group: { name: "Group", note: "2 – 4 people" },
          },
          slotNote: "Each session is 30 minutes of play for up to 32 people. A new session starts every 40 minutes.",
          story: {
            kicker: "Pinewood, 1996",
            heading: "The Last Summer Camp",
            blocks: [
              {
                paras: [
                  "In 1996, Pinewood Summer Camp was famous for the Lost Camper Challenge — a night-time test in which campers had to find their own way through the forest with a map, a compass and a flashlight, watched over by the Night Watch.",
                  "But that summer ended in tragedy. A camper was found dead in the forest during the challenge. It was ruled an accident; the Lost Camper Challenge was cancelled and Pinewood slowly closed. For thirty years the doubts have gone unanswered.",
                ],
              },
              {
                paras: [
                  "Thirty years on, Pinewood is about to be demolished to make way for a resort. Then strange things begin to happen in the abandoned camp: children crying, a whistle blowing in the forest, flashlight beams moving around the empty cabins — and a figure in a deer mask who appears every night.",
                ],
              },
              {
                heading: "Your mission",
                paras: [
                  "You are an investigation team invited to Pinewood before the camp is demolished. Explore the camp, pass its challenges and collect the evidence left behind from 1996.",
                  "A group photograph taken on the camp's opening day that summer was torn into pieces and scattered across Pinewood. Collect the pieces, put them back together and decode the secret hidden behind them.",
                ],
              },
            ],
            outro: "This is the last investigation before Pinewood disappears. Can you uncover the truth buried for thirty years?",
          },
        },
        escape: {
          tag: "Escape room",
          name: "The Locked Room",
          desc: "One locked room and forty minutes to get out. Pick the session that suits you.",
          facts: ["17:00 – 22:30", "Up to 15 people per session", "Ticket 67,000đ / person", "Register alone or as a group of 2 – 6"],
          cta: "Pick a session & register",
          formTitle: "Escape Room registration",
          types: {
            solo: { name: "Individual", note: "1 person" },
            group: { name: "Group", note: "2 – 6 people" },
          },
          slotNote: "Each session is 40 minutes of play for up to 15 people. A new session starts every 50 minutes.",
          storyCta: "The story",
          story: {
            kicker: "The locked room",
            heading: "Coming soon",
            blocks: [{ paras: ["The room's story will be revealed soon. Stay tuned."] }],
            outro: "",
          },
        },
        form: {
          name: "Full name",
          email: "VinUni email",
          studentId: "Student ID",
          phone: "Phone number (optional)",
          typeLegend: "How are you registering?",
          seatsLeft: "{n} left",
          seatsLoading: "Loading seats…",
          full: "Full",
          noRoomForType: "This session does not have room for the option you chose.",
          teamName: "Team name (optional)",
          members: "Member list + VinUni email",
          membersHint: "One person per line, including you, as: Full name – VinUni email.",
          membersEmail: "Each line needs the member's VinUni email.",
          payTitle: "Payment",
          payLead: "Scan the QR code below, enter the amount shown as \"Total to transfer\", then upload a photo of the proof.",
          groupSizeLabel: "People in the group",
          conflictIntro: "SCHEDULE CONFLICT — these people (matched by VinUni email) are already registered for the other game at an overlapping time:",
          conflictLine: "{who} ({email}) — {game} at {time}",
          conflictOutro: "Nobody can be in two games at once. Pick another session or take them off the list.",
          dupMember: "Someone appears twice in the list (same email).",
          priceLabel: "Ticket price",
          perPerson: "/ person",
          peopleCount: "People",
          totalLabel: "Total to transfer",
          promoLabel: "Promo code",
          promoApply: "Apply",
          promoOk: "Code applied — 25% off.",
          promoBad: "That promo code is not valid.",
          payQrMissing: "The payment QR code will be added soon.",
          proofLabel: "Proof of bank transfer",
          proofChoose: "Choose a photo",
          proofChange: "Change photo",
          proofRequired: "Please upload your proof of transfer.",
          proofBad: "That image could not be read. Try another (JPG or PNG).",
          proofReading: "Processing photo…",
          proofRejected: "The photo was not accepted. Try another or a smaller one.",
          membersCount: "Exactly {n} people needed — you have {c}.",
          contactNote: "Contact person's details — we will get in touch through them.",
          slotFullNow: "That session just filled up. Please pick another.",
          slotLegend: "Choose your session",
          slotRequired: "Please choose a session.",
          required: "Please fill this in.",
          submit: "Send registration",
          sending: "Sending…",
          close: "Close",
          registerNow: "Register now",
          successTitle: "Registration received!",
          successBody: "We will email you if we need anything else.",
          successSlot: "Your session:",
          error: "Could not send. Please try again in a few minutes.",
          notOpen: "Registration opens soon — the link is being set up.",
        },
      },

      scheduleKicker: "Running order",
      scheduleHeading: "The Night",
      scheduleTimes: ["17:00", "17:00 – 21:50", "22:00", "22:30"],
      scheduleTitles: [
        "Doors open & compasses issued",
        "Both games open",
        "The last arch",
        "Closing",
      ],
      scheduleDescs: [
        "Pick up your guest card and a compass. Costumes encouraged, never required.",
        "The scavenger hunt is play-as-you-go; the escape room runs in the sessions you registered for, 40 minutes each.",
        "The answer to the night is given here.",
        "Group photograph inside the tunnel, and prizes for the three most-voted costumes.",
      ],

      rulesKicker: "Before you come",
      rulesHeading: "House Rules",
      ruleQs: [
        "Do I need to register?",
        "Are costumes compulsory?",
        "Is it actually scary?",
      ],
      ruleAs: [
        "Yes. Both games need a reservation. For the escape room you pick your session, with up to 15 people in each.",
        "Not compulsory — but this is the night for it. The three most-voted costumes win prizes.",
        "There is fake blood and horror imagery, but no jumpscares and no actors chasing anyone. Better suited to people who like puzzles than to people who like being startled.",
      ],

      ctaHeading: "The tunnel opens at 17:00",
      ctaLead:
        "Places per session are limited. Reserve ahead to be sure of a spot inside the tunnel.",
      ctaBtn: "Reserve a place",
      ctaNote: "Registration link to follow.",
    },
  },
} as const;

export type Dict = (typeof dict)["vi"];
