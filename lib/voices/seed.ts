import type { VoicesDb } from "./types";

/**
 * Seed data for the local demo store. In production this content lives in
 * Supabase (see web/supabase/seed.sql).
 */
export function buildSeed(): VoicesDb {
  const now = "2026-07-01T09:00:00.000Z";

  return {
    profiles: [
      {
        id: "u-admin",
        username: "rethink",
        displayName: "ReThink Core",
        email: "admin@rethink.vn",
        password: "rethink2025",
        bio: "Tài khoản quản trị của ReThink.",
        role: "admin",
        isAlumni: false,
        avatarHue: 268,
        createdAt: now,
      },
      {
        id: "u-editor",
        username: "an.editor",
        displayName: "Ngọc An",
        email: "editor@rethink.vn",
        password: "rethink2025",
        bio: "Trưởng ban Content, ReThink Gen 4.0. Tin rằng mọi ý tưởng đáng lan toả đều bắt đầu từ một trang viết tử tế.",
        role: "editor",
        isAlumni: false,
        avatarHue: 335,
        createdAt: now,
      },
      {
        id: "u-linh",
        username: "khanhlinh",
        displayName: "Khánh Linh",
        email: "writer@rethink.vn",
        password: "rethink2025",
        bio: "Sinh viên năm 2, thích quan sát những điều nhỏ và viết về chúng trước khi chúng biến mất.",
        role: "writer",
        isAlumni: false,
        avatarHue: 210,
        createdAt: now,
      },
      {
        id: "u-minh",
        username: "minh.dao",
        displayName: "Đào Quang Minh",
        email: "minh@rethink.vn",
        password: "rethink2025",
        bio: "Cựu thành viên ReThink Gen 2.0, hiện làm product tại một startup giáo dục. Thỉnh thoảng quay về viết như một guest.",
        role: "writer",
        isAlumni: true,
        avatarHue: 25,
        createdAt: now,
      },
    ],

    topics: [
      {
        id: "t-comfort-zone",
        slug: "buoc-ra-khoi-vung-an-toan",
        title: "Lần đầu mình dám bước ra khỏi vùng an toàn",
        prompt:
          "Có những ranh giới chỉ tồn tại trong đầu chúng ta. Hãy kể về lần đầu tiên bạn dám bước qua nó — dù chân vẫn run.",
        description:
          "Vùng an toàn không có hàng rào thật. Nó được dựng bằng những câu “mình không phải kiểu người đó”, “để lần sau”, “người khác làm tốt hơn”. Tháng này, ReThink Voices mời bạn kể lại khoảnh khắc bạn quyết định bước qua ranh giới ấy: một lần giơ tay phát biểu, một chuyến đi một mình, một lời từ chối, một lời mời. Điều gì đã xảy ra — và bạn nhìn lại nó như thế nào?",
        month: "2026-07-01",
        status: "open",
        createdAt: now,
      },
      {
        id: "t-small-decision",
        slug: "mot-quyet-dinh-nho-doi-huong-doi-minh",
        title: "Một quyết định nhỏ đã đổi hướng đời mình",
        prompt:
          "Không phải mọi bước ngoặt đều ồn ào. Kể về một quyết định tưởng chừng rất nhỏ nhưng đã âm thầm đổi hướng cuộc đời bạn.",
        description:
          "Một tin nhắn dám gửi đi. Một buổi workshop đăng ký vào phút chót. Một cuốn sách cầm lên vì bìa đẹp. Nhìn lại, đâu là quyết định bé xíu đã dẫn bạn đến chỗ hôm nay?",
        month: "2026-08-01",
        status: "upcoming",
        createdAt: now,
      },
    ],

    pieces: [
      {
        id: "p-200-nguoi-la",
        slug: "minh-da-noi-gi-khi-dung-truoc-200-nguoi-la",
        topicId: "t-comfort-zone",
        authorId: "u-minh",
        title: "Mình đã nói gì khi đứng trước 200 người lạ",
        excerpt:
          "Tay mình cầm mic mà như cầm một con cá còn sống. Nhưng câu đầu tiên thoát ra được, thì 200 người lạ bỗng thành 200 người đang lắng nghe.",
        lengthType: "long",
        status: "published",
        isSpotlight: true,
        readingTimeMin: 6,
        publishedAt: "2026-07-08T14:00:00.000Z",
        createdAt: "2026-07-05T10:00:00.000Z",
        updatedAt: "2026-07-08T14:00:00.000Z",
        body: `Mình từng tin rằng có hai loại người: người sinh ra để đứng trên sân khấu, và người sinh ra để vỗ tay bên dưới. Suốt mười chín năm, mình yên phận ở nhóm thứ hai.

## Lời mời mình suýt từ chối

Tháng ba năm ngoái, sau khi bài viết của mình được đăng trên ReThink Voices, một bạn trong ban Content nhắn: *"Salon tháng này tụi mình muốn mời cậu lên kể lại câu chuyện đó, 15 phút thôi."*

Mình soạn sẵn một tin nhắn từ chối rất lịch sự. Đại ý là cảm ơn, nhưng mình viết được chứ không nói được, hai kỹ năng đó khác nhau lắm. Ngón tay mình lơ lửng trên nút gửi đúng một đêm.

Sáng hôm sau mình xoá tin nhắn đó đi. Không phải vì hết sợ — mà vì mình chợt nhận ra câu "mình viết được chứ không nói được" giống hệt câu "mình không phải dân viết lách" mà mình từng nói trước khi gửi bài đầu tiên. Cùng một hàng rào, chỉ khác chỗ đứng.

## Ba tuần tập nói một mình

Mình tập trong phòng trọ, trước gương, trước camera điện thoại. Lần đầu xem lại video, mình xấu hổ đến mức phải úp điện thoại xuống. Giọng mình đều đều như đọc chính tả, tay thì không biết để đâu.

Nhưng có một điều buồn cười: đến video thứ mười mấy, mình bắt đầu... nghe được chính mình. Mình biết chỗ nào cần dừng, chỗ nào giọng phải chùng xuống. Hoá ra nói trước đám đông không phải năng khiếu trời cho — nó là một bản nháp được sửa nhiều lần, giống hệt một bài viết.

## Đêm Salon

Đứng sau cánh gà, tay mình cầm mic mà như cầm một con cá còn sống. MC giới thiệu tên, đèn quét về phía mình, và trong hai giây đầu tiên mình quên sạch mọi thứ đã tập.

Rồi mình nhìn thấy một bạn ngồi hàng ba gật đầu — kiểu gật đầu "cứ nói đi, tụi mình nghe". Câu đầu tiên thoát ra được. Câu thứ hai bám theo. Và 200 người lạ bỗng thành 200 người đang lắng nghe.

Mười lăm phút đó không hoàn hảo. Mình nói vấp ba lần, có một đoạn quên mất phải chiếu slide. Nhưng khi bước xuống, một bạn năm nhất chạy lại bảo: *"Anh ơi, em cũng đang soạn một tin nhắn từ chối giống anh."*

## Điều mình mang về

Vùng an toàn của mình không biến mất sau đêm đó. Nó chỉ rộng ra thêm đúng một sân khấu.

Và mình nghĩ đó là cách nó hoạt động: không ai phá được hàng rào trong một đêm. Nhưng mỗi lần bạn bước qua, hàng rào lùi lại một chút. Viết là bước đầu tiên của mình. Sân khấu là bước thứ hai. Mình chưa biết bước thứ ba là gì — nhưng lần này, mình sẽ không soạn sẵn tin nhắn từ chối nữa.`,
      },
      {
        id: "p-hoc-bong",
        slug: "cai-gia-cua-viec-khong-dam-hoi",
        topicId: "t-comfort-zone",
        authorId: "u-linh",
        title: "Cái giá của việc không dám hỏi",
        excerpt:
          "Mình đã mất một học bổng vì không dám gửi một email bốn dòng. Đó là bài học đắt nhất năm nhất của mình.",
        lengthType: "short",
        status: "published",
        isSpotlight: false,
        readingTimeMin: 3,
        publishedAt: "2026-07-10T09:30:00.000Z",
        createdAt: "2026-07-07T08:00:00.000Z",
        updatedAt: "2026-07-10T09:30:00.000Z",
        body: `Năm nhất, mình thấy thông báo về một học bổng trao đổi ngắn hạn. Yêu cầu ghi "ưu tiên sinh viên năm hai trở lên". Mình là năm nhất, nên mình đóng tab lại.

Ba tháng sau, mình biết một bạn cùng khoá — cũng năm nhất — đã nhận học bổng đó. Bạn ấy kể: *"Mình cũng tưởng không được, nên mình email hỏi thẳng ban tổ chức. Họ trả lời: ưu tiên chứ không phải bắt buộc, cứ nộp đi."*

Một email bốn dòng. Đó là toàn bộ khoảng cách giữa mình và bạn ấy.

Mình nhận ra "vùng an toàn" của mình không phải là sợ sân khấu hay sợ đám đông — nó tinh vi hơn nhiều. Nó là thói quen **tự trả lời thay người khác**. Tự đoán "chắc họ từ chối", "chắc mình không đủ điều kiện", "chắc câu hỏi này ngớ ngẩn lắm" — rồi tự rút lui trước khi ai kịp nói gì.

Từ học kỳ đó, mình đặt một luật cho bản thân: **không bao giờ từ chối thay người khác**. Muốn gì thì cứ hỏi. Việc nói "không" là việc của họ, không phải việc của mình.

Kết quả sau một năm: hai lần bị từ chối thẳng, một lần bị ngó lơ. Nhưng cũng một lần được nhận vào dự án nghiên cứu mình tưởng "chỉ dành cho sinh viên xuất sắc", và một buổi cà phê với người mentor mà mình ngưỡng mộ từ lâu.

Tỷ lệ đó, mình nghĩ, là món hời nhất mình từng có.`,
      },
      {
        id: "p-di-mot-minh",
        slug: "chuyen-di-mot-minh-dau-tien",
        topicId: "t-comfort-zone",
        authorId: "u-linh",
        title: "Chuyến đi một mình đầu tiên và ba điều mình mang về",
        excerpt:
          "Mình từng nghĩ đi một mình là cô đơn. Hoá ra đó là lần đầu tiên mình thực sự nghe được suy nghĩ của chính mình.",
        lengthType: "long",
        status: "published",
        isSpotlight: false,
        readingTimeMin: 5,
        publishedAt: "2026-07-11T16:00:00.000Z",
        createdAt: "2026-07-09T11:00:00.000Z",
        updatedAt: "2026-07-11T16:00:00.000Z",
        body: `Mình lớn lên trong một gia đình mà mọi chuyến đi đều là kế hoạch tập thể. Đi đâu, ăn gì, mấy giờ về — luôn có người quyết định giúp. Nên đến năm hai đại học, mình chưa từng một mình rời khỏi Hà Nội quá 30 cây số.

## Quyết định trong 10 phút

Một chiều thứ sáu, deadline vừa xong, mình ngồi nhìn màn hình và thấy trống rỗng kiểu lạ. Không mệt, không buồn — chỉ là cảm giác đã lâu rồi mình không tự quyết định một điều gì cho riêng mình.

Mình mở app đặt vé, chọn Ninh Bình vì... vé rẻ nhất. Đặt homestay trong 10 phút. Không hỏi ai, không rủ ai. Đó có lẽ là quyết định "một mình" đầu tiên của mình theo đúng nghĩa đen.

## Ba điều mình mang về

**Một — sự im lặng không đáng sợ như mình tưởng.** Bữa tối đầu tiên, ngồi ăn một mình giữa quán đông, mình cầm điện thoại lên theo phản xạ. Rồi mình thử một điều: úp nó xuống. Mười phút đầu rất khó chịu. Nhưng sau đó mình bắt đầu để ý — tiếng mưa ngoài hiên, câu chuyện bàn bên, vị của món ăn. Hoá ra bấy lâu mình không sợ im lặng; mình chỉ chưa từng ở trong nó đủ lâu.

**Hai — mình có khả năng xử lý nhiều hơn mình nghĩ.** Ngày thứ hai, mình lạc đường giữa cánh đồng, điện thoại còn 8% pin. Không có ai để hỏi "giờ sao đây". Và chính vì không có ai, mình... tự xử được. Hỏi đường một bác nông dân, sạc nhờ ở quán nước, về đến homestay trước khi trời tối. Chuyện rất nhỏ, nhưng mình nhớ mãi cảm giác lúc đó: à, thì ra mình tự lo được.

**Ba — suy nghĩ của mình có âm lượng riêng.** Đêm cuối, ngồi ở bậc thềm homestay, mình nghĩ được rõ ràng về những thứ đã lùng bùng suốt cả học kỳ — chuyện chọn chuyên ngành, chuyện một tình bạn đang nhạt đi. Không phải vì Ninh Bình có phép màu, mà vì lần đầu tiên, xung quanh đủ yên để suy nghĩ của mình được nói hết câu.

## Nếu bạn cũng chưa từng

Mình không khuyên bạn phải đi xa hay đi lâu. Chuyến đi của mình vỏn vẹn hai ngày và tốn chưa đến một triệu đồng.

Nhưng nếu đã lâu rồi mọi quyết định của bạn đều có người khác tham gia, thử một lần tự quyết từ đầu đến cuối — kể cả khi quyết định đó chỉ là "tối nay ăn gì". Vùng an toàn của mình, hoá ra, chưa bao giờ là một địa điểm. Nó là thói quen luôn có ai đó đứng giữa mình và thế giới.`,
      },
      {
        id: "p-cau-hoi-dau-tien",
        slug: "gio-tay-o-giang-duong-500-cho",
        topicId: "t-comfort-zone",
        authorId: "u-minh",
        title: "Giơ tay ở giảng đường 500 chỗ",
        excerpt:
          "Câu hỏi của mình kéo dài đúng 11 giây. Nỗi sợ trước đó kéo dài 11 tuần.",
        lengthType: "short",
        status: "submitted",
        isSpotlight: false,
        readingTimeMin: 2,
        publishedAt: null,
        createdAt: "2026-07-11T20:00:00.000Z",
        updatedAt: "2026-07-11T20:00:00.000Z",
        body: `Có một nghịch lý mình mất bốn năm đại học mới hiểu: trong giảng đường càng đông, câu hỏi càng ít.

Học kỳ đầu, mình ngồi trong một lớp 500 sinh viên. Giáo sư giảng xong mỗi phần đều dừng lại: "Ai có câu hỏi không?" Và 500 con người im lặng. Không phải vì ai cũng hiểu — giờ nghỉ, câu hỏi nổ ra khắp các nhóm nhỏ. Chỉ là không ai muốn làm người duy nhất đứng lên.

Mình cũng vậy, suốt 11 tuần. Câu hỏi của mình thường chết ở cổ họng, kèm một loạt lý do: câu này chắc ngớ ngẩn, chắc slide sau sẽ giải thích, để về nhà tự tìm.

Tuần thứ 12, giáo sư nói một câu làm mình đứng hình: *"Các em không hỏi vì sợ cả lớp nghĩ mình kém. Nhưng thống kê của tôi sau 20 năm dạy: cứ một người hỏi, ít nhất ba mươi người thầm cảm ơn."*

Hôm đó mình giơ tay. Tim đập như trống hội. Câu hỏi kéo dài đúng 11 giây, giọng hơi run ở chữ đầu tiên. Giáo sư trả lời ba phút — và sau buổi học, hai bạn lạ chạy đến: "May quá cậu hỏi, tớ cũng đang mắc đúng chỗ đó."

11 giây so với 11 tuần. Từ đó mỗi lần định im lặng, mình lại nhớ tỷ lệ ấy.`,
      },
    ],

    reactions: [
      { id: "r1", pieceId: "p-200-nguoi-la", userId: "u-linh", type: "clap" },
      { id: "r2", pieceId: "p-200-nguoi-la", userId: "u-editor", type: "clap" },
      { id: "r3", pieceId: "p-200-nguoi-la", userId: "u-admin", type: "clap" },
      { id: "r4", pieceId: "p-hoc-bong", userId: "u-minh", type: "clap" },
      { id: "r5", pieceId: "p-hoc-bong", userId: "u-editor", type: "clap" },
      { id: "r6", pieceId: "p-di-mot-minh", userId: "u-minh", type: "clap" },
    ],
  };
}
