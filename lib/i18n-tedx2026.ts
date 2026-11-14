/**
 * TEDxVinUniversity 2026 — "The Limitless Decade" (09/05/2026).
 *
 * Source: the season's own site, https://v0-tedxvinuni.vercel.app/ (its EN and
 * VI dictionaries). Welcome note, talk summaries, schedule descriptions and the
 * TED licence line are verbatim from there. Where that site left Vietnamese
 * untranslated (speaker roles for 3 of 5, all biographies) the Vietnamese here
 * is ours and waits for the owner's check; "Bác" in Nguyễn Lâm Thanh's summary
 * became "Ông". Generated once by a script — edit this file directly from now on.
 */

export type Tedx2026Speaker = {
  name: string;
  role: string;
  org: string;
  talk: string;
  summary: string;
  bio: string[];
  img: string;
};

export type Tedx2026Slot = {
  time: string;
  kind: "open" | "ceremony" | "talk" | "break";
  /** index into `speakers` for a talk, -1 otherwise */
  speaker: number;
  title: string;
  desc: string;
};

export type Tedx2026Copy = {
  meta: { title: string; description: string };
  badge: string;
  title: string;
  titleAlt: string;
  tagline: string;
  place: string;
  date: string;
  pastBadge: string;
  btnSpeakers: string;
  btnTimeline: string;
  organisedBy: string;
  welcomeKicker: string;
  welcomeTitle: string;
  welcomeText: string;
  welcomeBy: string;
  speakersKicker: string;
  speakersHeading: string;
  speakersCount: string;
  talkLabel: string;
  bioLabel: string;
  timelineKicker: string;
  timelineHeading: string;
  timelineWhere: string;
  speakers: Tedx2026Speaker[];
  timeline: Tedx2026Slot[];
  seasonsLink: string;
  license: string;
};

export const tedx2026: { vi: Tedx2026Copy; en: Tedx2026Copy } = {
  "vi": {
    "meta": {
      "title": "TEDxVinUniversity 2026 — The Limitless Decade",
      "description": "TEDxVinUniversity 2026 — The Limitless Decade, 09/05/2026 tại VinUniversity: 5 diễn giả, chương trình và lịch trình của sự kiện do ReThink tổ chức."
    },
    "badge": "TEDxVinUniversity · 2026",
    "title": "The Limitless Decade",
    "titleAlt": "Thập Kỷ Không Giới Hạn",
    "tagline": "Những ý tưởng đáng lan tỏa cho thế hệ tiếp theo",
    "place": "VinUniversity, Hà Nội",
    "date": "09/05/2026",
    "pastBadge": "Đã diễn ra",
    "btnSpeakers": "Khám phá diễn giả",
    "btnTimeline": "Lịch trình sự kiện",
    "organisedBy": "Tổ chức bởi ReThink",
    "welcomeKicker": "Chào mừng",
    "welcomeTitle": "Chào mừng đến với TEDxVinUniversity",
    "welcomeText": "Chúng tôi rất vui được chào đón bạn đến với Thập Kỷ Không Giới Hạn — nơi quy tụ những bộ óc tò mò, các nhà đổi mới và những người mơ mộng cùng chung một niềm tin: ý tưởng có sức mạnh thay đổi thế giới. Sự kiện hôm nay được thiết kế để khám phá những ý tưởng, thách thức và cơ hội sẽ định hình mười năm tới của thế giới — từ AI và sáng tạo đến phát triển bền vững và kết nối con người. Qua các bài nói truyền cảm hứng và những cuộc trò chuyện ý nghĩa, chúng tôi hy vọng trải nghiệm này sẽ khơi dậy những ý tưởng đọng lại với bạn rất lâu sau khi sự kiện kết thúc.",
    "welcomeBy": "— Ban Tổ chức TEDxVinUniversity",
    "speakersKicker": "Diễn giả",
    "speakersHeading": "Những Ý Tưởng Định Hình Tương Lai",
    "speakersCount": "5 diễn giả · Thập Kỷ Không Giới Hạn · 09/05/2026",
    "talkLabel": "Bài nói",
    "bioLabel": "Tiểu sử",
    "timelineKicker": "Chương trình",
    "timelineHeading": "Lịch Trình Sự Kiện",
    "timelineWhere": "09/05/2026 · VinUniversity",
    "speakers": [
      {
        "name": "Dr. Lê Nguyên Phương",
        "role": "Ed.D in Educational Leadership and Psychology",
        "org": "University of Southern California",
        "talk": "Beyond the Comfort Zone",
        "summary": "Tiến sĩ Lê Nguyên Phương mở ra góc nhìn về não bộ như một hệ thống dự đoán và lý giải vì sao nhiều giới hạn đến từ thói quen tư duy chứ không phải năng lực thực sự.",
        "bio": [
          "Tiến sĩ Giáo dục (Ed.D) chuyên ngành Lãnh đạo Giáo dục và Tâm lý học",
          "Người Việt đầu tiên và duy nhất nhận Giải thưởng Nhà tâm lý học đường quốc tế xuất sắc (Outstanding International School Psychologist Award) của Hiệp hội Tâm lý học đường Quốc tế (ISPA) năm 2011",
          "Tiến sĩ Lãnh đạo Giáo dục (Tâm lý học Giáo dục), University of Southern California (Hoa Kỳ)",
          "Hơn 20 năm kinh nghiệm về tâm lý học đường tại các học khu lớn ở California",
          "Sáng lập CASP-V (Consortium for the Advancement of School Psychology in Vietnam)",
          "Tác giả bộ sách đoạt giải “Teaching Children in Uncertainty” (Giải thưởng Sách Giáo dục Việt Nam 2018)",
          "Chuyên gia Fulbright (Fulbright Specialist) giai đoạn 2014–2019",
          "Từ năm 2020, tích cực đào tạo doanh nghiệp cho các tổ chức trong và ngoài nước tại Việt Nam"
        ],
        "img": "/tedx/2026/le-nguyen-phuong.webp"
      },
      {
        "name": "Ms. Lê Minh Thi",
        "role": "Cựu sinh viên Khóa 1",
        "org": "VinUniversity",
        "talk": "Bạn Là Hậu Duệ",
        "summary": "Trong thời đại AI, Lê Minh Thi khám phá lợi thế thật sự của con người nằm ở khả năng nhìn thấy và thấu hiểu người khác.",
        "bio": [
          "Cựu sinh viên khóa đầu tiên ngành Quản trị Kinh doanh tại VinUniversity; nhận học bổng toàn phần (100%) theo thành tích",
          "Hiện là Trade & PMO Senior Executive tại Masan Group, điều phối các chương trình mở rộng thị trường quốc tế, xây dựng chiến lược thương mại và các sáng kiến chiến lược cấp tập đoàn",
          "Cựu Phó Chủ tịch kiêm Phó Chủ tịch Hội đồng Quản trị (Vice Chair of the Board of Trustees) tại UpYouth, hệ sinh thái khởi nghiệp trẻ ứng dụng công nghệ hỗ trợ các nhà sáng lập Việt Nam",
          "Cùng xây dựng một vườn ươm khởi nghiệp từ con số không; hỗ trợ 22 startup qua 2 khóa; danh mục có giá trị hơn 5 triệu USD, trong đó có một startup gọi vốn seed 1 triệu USD",
          "Xây dựng mạng lưới hơn 50 nhà lãnh đạo và quỹ đầu tư khắp Đông Nam Á; huy động khoảng 13.000 USD tài trợ và 20.000 USD vốn seed từ VinUniversity",
          "Đồng tổ chức một hackathon toàn quốc phối hợp cùng HackMIT, tiếp cận hơn 12.000 sinh viên và được VTV đưa tin",
          "Từng làm việc tại Dentons LuatViet, KPMG, EY và Đại sứ quán Hoa Kỳ tại Hà Nội; nền tảng đa ngành gồm chiến lược, tư vấn, pháp lý và công vụ (public affairs)"
        ],
        "img": "/tedx/2026/le-minh-thi.webp"
      },
      {
        "name": "Mr. Nguyễn Lâm Thanh",
        "role": "Tổng Giám đốc",
        "org": "TikTok Việt Nam",
        "talk": "Việt Nam Trong Bức Tranh Số Toàn Cầu",
        "summary": "Ông Nguyễn Lâm Thanh đặt truyền thông số trong bối cảnh toàn cầu hóa, nơi Việt Nam chủ động định hình thay vì thụ động tiếp nhận.",
        "bio": [
          "Giám đốc quốc gia TikTok Việt Nam kiêm Trưởng bộ phận Chính sách công Việt Nam tại ByteDance từ năm 2018",
          "Hơn 20 năm kinh nghiệm trong CNTT, truyền thông, chính sách công và phát triển hệ sinh thái số",
          "Phụ trách chính sách nền tảng, an toàn số, thương mại điện tử và quản trị nội dung tại TikTok Việt Nam",
          "Phó Chủ tịch kiêm Tổng Thư ký Hiệp hội Truyền thông Số Việt Nam (VDCA) từ năm 2011",
          "Cựu Phó Chủ tịch Hiệp hội Internet Việt Nam (2010–2015)",
          "Từng giữ các vị trí lãnh đạo cấp cao tại Intel, Samsung, 3M, VTC, Intel Vietnam và FPT Corporation"
        ],
        "img": "/tedx/2026/nguyen-lam-thanh.webp"
      },
      {
        "name": "Ms. Mook Karnruethai Tassabut",
        "role": "Á hậu Miss Cosmo 2024",
        "org": "",
        "talk": "Sự Can Đảm Của Bản Thân: Khi Là Chính Mình Là Đủ",
        "summary": "Mook chia sẻ hành trình bước ra khỏi vùng an toàn, đối diện thất bại, và xây dựng nội lực để tự định nghĩa giá trị của mình.",
        "bio": [
          "Á hậu Miss Cosmo 2024 (mùa đầu tiên)",
          "Đại diện Thái Lan tại Miss Cosmo 2024",
          "Tốt nghiệp Đại học Silpakorn (học viện nghệ thuật hàng đầu Thái Lan)",
          "Người mẫu, MC song ngữ (Thái – Anh) và chuyên gia tư vấn làm đẹp",
          "Từng là tiếp viên hàng không cho một hãng hàng không Trung Đông",
          "Đại sứ thương hiệu, trong đó có Tuần lễ Du lịch TP. Hồ Chí Minh 2024 và World Tea Festival 2025",
          "Xuất hiện tại các sự kiện thời trang và truyền thông quốc tế như Harbin Fashion Week 2025"
        ],
        "img": "/tedx/2026/mook.webp"
      },
      {
        "name": "Mr. Thierry Nguyễn",
        "role": "Đồng sáng lập",
        "org": "BadClay và AIOI Studio",
        "talk": "Sáng Tạo Trong Kỷ Nguyên Không Giới Hạn",
        "summary": "Thierry Nguyễn nhìn lại 25 năm trong ngành VFX và đặt câu hỏi về điều gì sẽ dẫn dắt tư duy sáng tạo khi AI xóa bỏ những giới hạn truyền thống.",
        "bio": [
          "CEO của AIOI Studios, đồng sáng lập BadClay Studio và VAVA",
          "25 năm kinh nghiệm VFX và hoạt hình tại châu Âu và châu Á",
          "Từng làm việc tại các studio hàng đầu như BUF Paris và DNEG London",
          "Đóng góp cho các tác phẩm quốc tế lớn gồm X-Men: Days of Future Past, Mad Max: Fury Road, Thor, John Carter và nhiều phim khác",
          "Các dự án nổi bật tại Việt Nam và châu Á: Furie, Dreamy Eyes, Sweet Home, All of Us Are Dead, Parasyte, Bloodhounds và Boyfriend on Demand"
        ],
        "img": "/tedx/2026/thierry-nguyen.webp"
      }
    ],
    "timeline": [
      {
        "time": "12:30 – 13:30",
        "kind": "open",
        "speaker": -1,
        "title": "Check-in & Hoạt động trải nghiệm",
        "desc": "Đến nơi, đăng ký và khám phá các hoạt động trải nghiệm tương tác trước khi chương trình chính bắt đầu."
      },
      {
        "time": "13:30 – 14:15",
        "kind": "ceremony",
        "speaker": -1,
        "title": "Lễ Khai Mạc",
        "desc": "Lễ khai mạc chính thức của TEDxVinUniversity — Thập Kỷ Không Giới Hạn."
      },
      {
        "time": "14:15 – 14:35",
        "kind": "talk",
        "speaker": 0,
        "title": "",
        "desc": ""
      },
      {
        "time": "14:35 – 14:55",
        "kind": "talk",
        "speaker": 1,
        "title": "",
        "desc": ""
      },
      {
        "time": "14:55 – 15:15",
        "kind": "talk",
        "speaker": 2,
        "title": "",
        "desc": ""
      },
      {
        "time": "15:25 – 15:40",
        "kind": "break",
        "speaker": -1,
        "title": "Giải Lao",
        "desc": "Dành thời gian để bổ sung năng lượng và kết nối với những người khác."
      },
      {
        "time": "15:45 – 16:05",
        "kind": "talk",
        "speaker": 3,
        "title": "",
        "desc": ""
      },
      {
        "time": "16:05 – 16:25",
        "kind": "talk",
        "speaker": 4,
        "title": "",
        "desc": ""
      },
      {
        "time": "16:25 – 16:45",
        "kind": "ceremony",
        "speaker": -1,
        "title": "Lễ Bế Mạc",
        "desc": "Lời cảm ơn, bế mạc và chụp ảnh lưu niệm."
      }
    ],
    "seasonsLink": "Xem mùa 2025 — The Firsts →",
    "license": "Sự kiện TEDx độc lập này được vận hành theo giấy phép của TED. TED là một tổ chức phi lợi nhuận với sứ mệnh lan tỏa Những Ý Tưởng Đáng Giá."
  },
  "en": {
    "meta": {
      "title": "TEDxVinUniversity 2026 — The Limitless Decade",
      "description": "TEDxVinUniversity 2026 — The Limitless Decade, May 09, 2026 at VinUniversity: the 5 speakers, the programme and the timeline of the event organised by ReThink."
    },
    "badge": "TEDxVinUniversity · 2026",
    "title": "The Limitless Decade",
    "titleAlt": "",
    "tagline": "Ideas worth spreading for the next generation",
    "place": "VinUniversity, Hà Nội",
    "date": "May 09, 2026",
    "pastBadge": "Past event",
    "btnSpeakers": "Explore the speakers",
    "btnTimeline": "Event timeline",
    "organisedBy": "Organised by ReThink",
    "welcomeKicker": "Welcome",
    "welcomeTitle": "Welcome to TEDxVinUniversity",
    "welcomeText": "We are delighted to have you join us for The Limitless Decade — a gathering of curious minds, innovators, and dreamers united by one belief: ideas have the power to change the world. Today's event is designed to explore the ideas, challenges, and opportunities that will shape the next ten years of our world — from AI and creativity to sustainable development and human connection. Through inspiring talks and meaningful conversations, we hope this experience will spark ideas that linger with you long after the event ends.",
    "welcomeBy": "— TEDx VinUniversity Organizing Team",
    "speakersKicker": "Speakers",
    "speakersHeading": "Ideas That Shape Tomorrow",
    "speakersCount": "5 speakers · The Limitless Decade · May 09, 2026",
    "talkLabel": "Talk",
    "bioLabel": "Biography",
    "timelineKicker": "Programme",
    "timelineHeading": "Event Timeline",
    "timelineWhere": "May 09, 2026 · VinUniversity",
    "speakers": [
      {
        "name": "Dr. Lê Nguyên Phương",
        "role": "Ed.D in Educational Leadership and Psychology",
        "org": "University of Southern California",
        "talk": "Beyond the Comfort Zone",
        "summary": "Dr. Lê Nguyên Phương reframes the brain as a predictive system and reveals how perceived limits emerge from ingrained patterns rather than true ability.",
        "bio": [
          "Ed.D in Educational Leadership and Psychology",
          "The first and only Vietnamese recipient of the Outstanding International School Psychologist Award by the International School Psychology Association (ISPA) in 2011",
          "Doctorate in Educational Leadership (Educational Psychology), University of Southern California (USA)",
          "Over 20 years of experience in school psychology across major districts in California",
          "Founder of CASP-V (Consortium for the Advancement of School Psychology in Vietnam)",
          "Author of the award-winning book series \"Teaching Children in Uncertainty\" (Vietnam's Education Book Award 2018)",
          "Fulbright Specialist (2014–2019)",
          "Since 2020, actively engaged in corporate training for both local and international organizations in Vietnam"
        ],
        "img": "/tedx/2026/le-nguyen-phuong.webp"
      },
      {
        "name": "Ms. Lê Minh Thi",
        "role": "Alumna, Cohort 1",
        "org": "VinUniversity",
        "talk": "You Are the Descendant",
        "summary": "In an AI-driven era, Lê Minh Thi explores how true human advantage lies in the ability to truly see and understand others.",
        "bio": [
          "Inaugural cohort alumna of the Business Administration program at VinUniversity; awarded a full (100%) merit-based scholarship",
          "Currently a Trade & PMO Senior Executive at Masan Group, coordinating international market expansion programs, commercial strategy development, and group-level strategic initiatives",
          "Former Vice President and Vice Chair of the Board of Trustees at UpYouth, a tech-driven youth entrepreneurship ecosystem supporting Vietnamese founders",
          "Co-built a startup incubator from the ground up; supported 22 startups across 2 batches; portfolio valued at over $5 million, including a startup that raised a $1 million seed round",
          "Built a network of 50+ leaders and funds across Southeast Asia; secured ~$13,000 in sponsorships and $20,000 in seed funding from VinUniversity",
          "Co-organized a nationwide hackathon in collaboration with HackMIT, reaching 12,000+ students and featured on VTV",
          "Experience across Dentons LuatViet, KPMG, EY, and the U.S. Embassy in Hanoi; multidisciplinary background spanning strategy, consulting, legal, and public affairs"
        ],
        "img": "/tedx/2026/le-minh-thi.webp"
      },
      {
        "name": "Mr. Nguyễn Lâm Thanh",
        "role": "General Director",
        "org": "TikTok Vietnam",
        "talk": "Vietnam in the Global Digital Landscape",
        "summary": "Mr. Nguyễn Lâm Thanh positions digital media in a globalized era where Vietnam is shifting from passive consumer to active shaper.",
        "bio": [
          "Country Director of TikTok Vietnam & Head of Public Policy, Vietnam at ByteDance since 2018",
          "Over 20 years of experience in IT, communications, public policy, and digital ecosystem development",
          "Leads platform policy, digital safety, e-commerce, and content governance at TikTok Vietnam",
          "Vice President & Secretary General of the Vietnam Digital Communications Association (VDCA) since 2011",
          "Former Vice President of the Vietnam Internet Association (2010–2015)",
          "Previously held senior leadership roles at Intel, Samsung, 3M, VTC, Intel Vietnam, and FPT Corporation"
        ],
        "img": "/tedx/2026/nguyen-lam-thanh.webp"
      },
      {
        "name": "Ms. Mook Karnruethai Tassabut",
        "role": "Runner-up, Miss Cosmo 2024",
        "org": "Miss Cosmo 2024",
        "talk": "The Audacity of the Self",
        "summary": "Mook shares her journey of stepping out of comfort zones, embracing rejection, and building inner strength to define her own value.",
        "bio": [
          "Runner-up, Miss Cosmo 2024 (First Season)",
          "Representative of Thailand at Miss Cosmo 2024",
          "Graduate of Silpakorn University (Thailand's leading arts institution)",
          "Model, bilingual MC (Thai–English), and beauty consultant",
          "Former flight attendant for a Middle Eastern airline",
          "Brand ambassador, including Ho Chi Minh City Tourism Week 2024 and World Tea Festival 2025",
          "Featured in international fashion and media events such as Harbin Fashion Week 2025"
        ],
        "img": "/tedx/2026/mook.webp"
      },
      {
        "name": "Mr. Thierry Nguyễn",
        "role": "Co-founder",
        "org": "BadClay and AIOI Studio",
        "talk": "Creativity in a Limitless Era",
        "summary": "Thierry Nguyễn reflects on 25 years of VFX and asks what will guide creative thinking when AI removes traditional limitations.",
        "bio": [
          "CEO of AIOI Studios, Co-founder of BadClay Studio & VAVA",
          "25 years of experience in VFX and animation across Europe and Asia",
          "Worked at leading studios such as BUF Paris and DNEG London",
          "Contributed to major international productions including X-Men: Days of Future Past, Mad Max: Fury Road, Thor, John Carter, and more",
          "Notable projects in Vietnam and Asia: Furie, Dreamy Eyes, Sweet Home, All of Us Are Dead, Parasyte, Bloodhounds, and Boyfriend on Demand"
        ],
        "img": "/tedx/2026/thierry-nguyen.webp"
      }
    ],
    "timeline": [
      {
        "time": "12:30 – 13:30",
        "kind": "open",
        "speaker": -1,
        "title": "Check-in & Experience Activities",
        "desc": "Arrive, register, and explore interactive experience activities before the main program begins."
      },
      {
        "time": "13:30 – 14:15",
        "kind": "ceremony",
        "speaker": -1,
        "title": "Opening Ceremony",
        "desc": "Official opening of TEDxVinUniversity — The Limitless Decade."
      },
      {
        "time": "14:15 – 14:35",
        "kind": "talk",
        "speaker": 0,
        "title": "",
        "desc": ""
      },
      {
        "time": "14:35 – 14:55",
        "kind": "talk",
        "speaker": 1,
        "title": "",
        "desc": ""
      },
      {
        "time": "14:55 – 15:15",
        "kind": "talk",
        "speaker": 2,
        "title": "",
        "desc": ""
      },
      {
        "time": "15:25 – 15:40",
        "kind": "break",
        "speaker": -1,
        "title": "Break",
        "desc": "Take a moment to recharge and connect with fellow attendees."
      },
      {
        "time": "15:45 – 16:05",
        "kind": "talk",
        "speaker": 3,
        "title": "",
        "desc": ""
      },
      {
        "time": "16:05 – 16:25",
        "kind": "talk",
        "speaker": 4,
        "title": "",
        "desc": ""
      },
      {
        "time": "16:25 – 16:45",
        "kind": "ceremony",
        "speaker": -1,
        "title": "Closing Ceremony",
        "desc": "Closing remarks, acknowledgements, and group photo."
      }
    ],
    "seasonsLink": "See the 2025 season — The Firsts →",
    "license": "This independent TEDx event is operated under license by TED. TED is a nonprofit organization devoted to spreading Ideas Worth Sharing."
  }
};
