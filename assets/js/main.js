/**
 * PHAT TRAN (RiSH) — PORTFOLIO
 * Interactive engine: Trilingual i18n (EN/VI/JP), Film-Leader Preloader,
 * Lenis + GSAP ScrollTrigger + SplitText, Interactive Genga Loupe,
 * Pinned 5-Stage X-Sheet Process Scrubber, Showreel & High-Res Lightbox.
 */
(function () {
  'use strict';

  /* =====================================================================
     1. TRILINGUAL DICTIONARY (EN / VI / JA)
     ===================================================================== */
  const I18N = {
    en: {
      'a11y.skip': 'Skip to content',
      'a11y.menu': 'Open menu',
      'nav.reel': 'Reel',
      'nav.process': 'Process',
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      status: 'Available for work',

      'hero.eyebrow': '2D Animator & Illustrator',
      'hero.lede': 'Bringing imagination to life — <em>one frame</em> at a time.',
      'hero.sub': 'Key animation, character design and anime-inspired illustration. Based in Vietnam — drawing my way toward the studios of Tokyo.',
      'hero.ctaWork': 'Selected work',
      'hero.ctaReel': 'Play showreel',
      'hero.hint': 'Move over the frame to peek at the rough · Click to lock',
      'hero.badge': 'FINAL CUT ● 24FPS (撮影)',
      'hero.badgeAkari': 'KEY ANIMATION ● LO',
      'hero.cutShinkai': 'SHINKAI (VIDEO)',
      'hero.cutAkari': 'AKARI (SPRINT)',
      'hero.expand': 'Expand',
      'hero.expandAria': 'Expand video in lightbox',
      'hero.expandAkariAria': 'Expand Akari sprint in lightbox',
      'hero.scroll': 'Scroll',

      'reel.title': 'Showreel',
      'reel.play': 'Play reel',
      'reel.note': 'A selection of my animation work from 2024 to 2026 — commercial key animation, character acting, dynamic sports motion, and 2D effects.',
      'reel.youtube': 'Watch on YouTube',

      'process.title': 'Process',
      'process.meta': 'Rough → Final',
      'process.s1.t': 'Rough key (Genga)',
      'process.s1.d': 'Weight, line of action and the energy of the sprint come first — loose lines, big decisions.',
      'process.s2.t': 'Clean-up & shadow guides',
      'process.s2.d': 'Tightening the line, adding in-betweens and marking shadow and highlight areas with colour pencil.',
      'process.s3.t': 'Colour (Sai-shiki)',
      'process.s3.d': "Painting the cel with the character's original palette — base, shadow and highlight tones.",
      'process.s4.t': 'Composite',
      'process.s4.d': 'Combining every cel with the speed-line background into a single, readable shot.',
      'process.s5.t': 'Photography & FX (Satsuei)',
      'process.s5.d': 'Light bloom, motion blur and filters for the final look — the frame finally feels alive.',

      'work.title': 'Selected Work',
      'case.kicker': 'Featured project · 2025',
      'case.desc': 'An original short sports animation produced by the Shiguma Dakkusu team at FPT University. Serving as Project Director and Lead Key Animator, I spearheaded the visual direction, layout (LO), and high-impact sprint sakuga sequences — capturing the raw physical weight, momentum, and emotional drive of Akari chasing a finish line only she can see.',
      'case.role': 'Role',
      'case.roleVal': 'Director · Key Animation (Genga) · Key Visual',
      'case.team': 'Team',
      'case.art': 'Art Lead',
      'case.color': 'Color Lead',
      'case.date': 'Released',
      'cap.poster': 'Key visual poster — Get Set Run',
      'cap.standee': 'Event standee design — Get Set Run',
      'cap.breakdown': '5-layer production breakdown of the sprint cut',

      'work.douga': 'Genga & Douga',
      'w.genga.t': 'Key Animation (Genga) & Layout Study',
      'w.genga.d': 'Rough-to-clean key animation and layout construction focusing on perspective shifts, timing charts (tsume), and weight transfer in Clip Studio Paint EX.',
      'tag.genga': 'Genga (原画)',
      'tag.lo': 'Layout (LO)',
      'tag.xsheet': 'X-Sheet / Timesheet',
      'w.douga.t': 'Douga & Final Cut Study',
      'w.douga.d': '26-drawing clean-up and in-between study of a wind-swept head turn — from raw closed trace lines (iro-toresu) to final Makoto Shinkai-style compositing, sunset lighting and bokeh.',
      'douga.tabLine': 'Line Art',
      'douga.tabFinal': 'Final Cut',
      'douga.kMain': 'Main line',
      'douga.kHi': 'Highlight',
      'douga.kSh': 'Shadow',
      'douga.kTr': 'Colour trace',
      'douga.expand': 'Expand',
      'douga.expandAria': 'Expand animation in lightbox',
      'douga.stageAria': 'Play or pause animation',
      'douga.onion': 'Onion',
      'genga.expand': 'Expand',
      'genga.expandAria': 'Expand Genga layout sheet in lightbox',
      'tag.douga': 'Douga · 26 drawings',
      'tag.iro': 'Iro-toresu (色トレス)',
      'tag.satsuei': 'Composite & FX (撮影)',

      'work.illust': 'Illustration & Character Design',
      'w.fern.t': 'Fern & Frieren',
      'w.fern.d': 'Fan art for “Frieren: Beyond Journey’s End” — a quiet, warm moment rendered with soft light and chromatic bloom.',
      'w.aoi.t': 'Aoi — Character Sheet',
      'w.aoi.d': 'Original character turnaround for a personal animation project: front, back and profile views, built to stay on-model across hundreds of drawings.',
      'tag.fanart': 'Fan art',
      'tag.painting': 'Digital painting',
      'tag.original': 'Original character',
      'tag.turnaround': 'Turnaround',
      'work.more': 'More artwork on Pixiv',

      'about.title': 'About',
      'about.lead': "Hi, I'm Phat Tran — <em>RiSH</em>, or <em>Hachi (八)</em> to colleagues and friends.",
      'about.p1': "I'm a commercial <strong>Key Animator (Genga / 原画) and Digital Paint artist</strong> currently working at an anime production studio in Ho Chi Minh City. Bypassing the traditional in-between (Douga) stage, I advanced directly into commercial Key Animation (1st &amp; 2nd Key) and Digital Paint (Shiage), contributing to television anime and commercial productions.",
      'about.p2': "I hold a <strong>Bachelor's Degree in Graphic Design (With Distinction / Honours) from FPT University</strong>. Combining a rigorous academic foundation in visual composition and anatomy with Japanese studio pipeline mastery, I focus on dynamic character acting, sakuga action sequences, and disciplined timesheet (X-sheet) timing.",

      'id.name': 'Name',
      'id.alias': 'Alias',
      'id.role': 'Role',
      'id.roleVal': 'Key Animator (原画) & Digital Paint (仕上げ)',
      'id.base': 'Based in',
      'id.baseVal': 'Ho Chi Minh City, Vietnam (GMT+7)',
      'id.credits': 'Credits',
      'id.creditsVal': 'Phat Tan — KeyFrame Staff List ↗',
      'id.edu': 'Education',
      'id.eduVal': 'B.A. Graphic Design (Honours) · FPT University',
      'id.goal': 'Goal',
      'id.goalVal': 'Commercial Anime — Tokyo & Global',
      'id.status': 'Status',
      'id.statusVal': 'Active Studio Artist · Open for select Genga',

      'sk.anim': 'Animation',
      'sk.anim1': 'Layout (LO) & Key Animation (Genga / 原画)',
      'sk.anim2': '2D Character Acting & Sakuga Action',
      'sk.anim3': 'In-betweening (Douga / 動画) & Clean-up',
      'sk.anim4': 'Digital Paint & Colour Styling (Shiage / 仕上げ)',
      'sk.illu': 'Illustration',
      'sk.illu1': 'Character design & turnarounds',
      'sk.illu2': 'Anime-style illustration',
      'sk.illu3': 'Digital painting & composition',
      'sk.illu4': 'Posters & key visuals',
      'sk.tools': 'Tools',
      'sk.csp': 'Clip Studio Paint EX (Custom Auto-Actions & X-Sheet workflow)',
      'sk.exploring': '(exploring)',
      'sk.lang': 'Languages',
      'sk.vi': 'Vietnamese',
      'sk.en': 'English',
      'sk.ja': 'Japanese',
      'sk.native': 'Native',
      'sk.fluent': 'Fluent',
      'sk.inter': 'Intermediate',

      'val.1': 'Passion for animation & constant learning',
      'val.2': 'Detail-oriented team player, open to feedback',
      'val.3': 'Proactive & adaptable under deadlines',
      'val.4': 'Clear, respectful communication',

      'contact.label': 'Contact',
      'contact.meta': 'Replies within 48h',
      'contact.title': "Let's make something <em>move.</em>",
      'contact.intro': 'Open for studio positions, freelance key/in-between animation, character design commissions and collaborations.',
      'contact.copy': 'Copy',
      'soc.pixiv': 'Illustrations',
      'soc.linkedin': 'Career',
      'soc.youtube': 'Showreel',

      'footer.made': 'Designed & animated frame by frame.',
      'footer.top': 'Back to top',
      'lb.close': 'Close',

      'alt.heroFinal': 'Akari sprinting — final composited frame from Get Set Run',
      'alt.step1': 'Step 1 — rough key drawing of a sprinting girl',
      'alt.step2': 'Step 2 — clean line art with shadow and highlight colour guides',
      'alt.step3': 'Step 3 — flat colour with the character palette',
      'alt.step4': 'Step 4 — character cel composited over a speed-line background',
      'alt.step5': 'Step 5 — final frame with lighting, blur and effects',
      'alt.poster': 'Get Set Run key visual poster — a runner leaps over a red track at sunset',
      'alt.standee': 'Get Set Run standee — a character reaching toward the viewer on a red background',
      'alt.breakdown': 'Layer breakdown of the sprint shot — background, colour, line and shadow layers side by side',
      'alt.douga': '26-frame clean-up douga animation of a girl in a sailor uniform turning her head in the breeze',
      'alt.fern': 'Fern hugging Frieren from behind, fan art illustration',
      'alt.aoi': 'Aoi character turnaround — front, back and side views in a light blue sailor uniform',
      'alt.portrait': 'Monochrome illustration of a character reaching a hand toward the viewer',

      'cursor.peek': 'PEEK',
      'cursor.play': 'PLAY',
      'cursor.view': 'VIEW',
      'cursor.open': 'PIXIV',
      'cursor.mail': 'EMAIL',
      'toast.copied': 'Copied rikun113@gmail.com to clipboard'
    },

    vi: {
      'a11y.skip': 'Chuyển đến nội dung chính',
      'a11y.menu': 'Mở menu',
      'nav.reel': 'Showreel',
      'nav.process': 'Quy trình',
      'nav.work': 'Tác phẩm',
      'nav.about': 'Hồ sơ',
      'nav.contact': 'Liên hệ',
      status: 'Sẵn sàng hợp tác',

      'hero.eyebrow': '2D Animator & Hoạ sĩ Minh hoạ',
      'hero.lede': 'Thổi hồn vào trí tưởng tượng — qua <em>từng khung hình.</em>',
      'hero.sub': 'Diễn hoạt chính (Key Animation), thiết kế nhân vật và minh hoạ phong cách Anime. Sống tại Việt Nam — đang từng nét vẽ tiến tới các studio tại Tokyo.',
      'hero.ctaWork': 'Xem tác phẩm',
      'hero.ctaReel': 'Xem showreel',
      'hero.hint': 'Di chuột lên tranh để soi nét phác (Genga) · Click để giữ',
      'hero.badge': 'FINAL CUT ● 24FPS (撮影)',
      'hero.badgeAkari': 'DIỄN HOẠT CHÍNH (GENGA) ● LO',
      'hero.cutShinkai': 'SHINKAI (VIDEO)',
      'hero.cutAkari': 'AKARI (SPRINT)',
      'hero.expand': 'Phóng to',
      'hero.expandAria': 'Mở xem video trong hộp phóng to',
      'hero.expandAkariAria': 'Mở xem bản vẽ Akari trong hộp phóng to',
      'hero.scroll': 'Cuộn xuống',

      'reel.title': 'Showreel',
      'reel.play': 'Phát reel',
      'reel.note': 'Tuyển tập các phân cảnh diễn hoạt từ năm 2024 đến 2026 — diễn hoạt chính (key animation) thương mại, diễn xuất nhân vật, chuyển động thể thao tốc độ cao và hiệu ứng 2D.',
      'reel.youtube': 'Xem trên YouTube',

      'process.title': 'Quy Trình',
      'process.meta': 'Phác thảo → Hoàn thiện',
      'process.s1.t': 'Phác thảo khung chính (Rough Key)',
      'process.s1.d': 'Trọng lượng, đường hướng chuyển động (line of action) và năng lượng cú bứt tốc được ưu tiên hàng đầu.',
      'process.s2.t': 'Đi nét sạch & chỉ định bóng',
      'process.s2.d': 'Làm sạch nét (clean-up), vẽ trung gian (in-between) và phân vùng sáng/tối bằng chì màu chuẩn studio Nhật.',
      'process.s3.t': 'Tô màu (Sai-shiki)',
      'process.s3.d': 'Phủ màu cel theo đúng bảng màu thiết kế nhân vật — gồm lớp nền, vùng tối và điểm bắt sáng.',
      'process.s4.t': 'Ghép lớp (Composite)',
      'process.s4.d': 'Kết hợp toàn bộ các lớp cel nhân vật với phông nền speed-line thành một khung cảnh hoàn chỉnh.',
      'process.s5.t': 'Hậu kỳ & Hiệu ứng (Satsuei)',
      'process.s5.d': 'Thêm ánh sáng môi trường, nhoè chuyển động (motion blur) và bộ lọc quang học để khung hình thực sự sống động.',

      'work.title': 'Tác Phẩm',
      'case.kicker': 'Dự án tiêu biểu · 2025',
      'case.desc': 'Phim ngắn hoạt hình thể thao nguyên tác thực hiện bởi nhóm Shiguma Dakkusu tại Đại học FPT. Đảm nhiệm vai trò Đạo diễn dự án kiêm Lead Key Animator, mình dẫn dắt định hướng hình ảnh, bố cục khung hình (layout - LO) và những trường đoạn sakuga bứt tốc đầy uy lực — truyền tải trọn vẹn sức nặng thể chất, động lượng và khát khao nội tâm của Akari trên hành trình chạm tới vạch đích của riêng cô.',
      'case.role': 'Vai trò',
      'case.roleVal': 'Đạo diễn · Diễn hoạt chính (Genga) · Key Visual',
      'case.team': 'Nhóm',
      'case.art': 'Art Lead',
      'case.color': 'Color Lead',
      'case.date': 'Ra mắt',
      'cap.poster': 'Poster Key Visual — Get Set Run',
      'cap.standee': 'Thiết kế Standee sự kiện — Get Set Run',
      'cap.breakdown': 'Bóc tách 5 lớp (layer breakdown) của phân cảnh bứt tốc',

      'work.douga': 'Genga & Douga',
      'w.genga.t': 'Nghiên Cứu Diễn Hoạt Genga & Bố Cục Layout (LO)',
      'w.genga.d': 'Nghiên cứu diễn hoạt từ phác thảo (rough key) đến genga hoàn thiện và dựng layout (LO) tập trung vào chuyển góc phối cảnh, biểu đồ nhịp (tsume) và lực truyền trọng lượng trong Clip Studio Paint EX.',
      'tag.genga': 'Genga (原画)',
      'tag.lo': 'Bố cục Layout (LO)',
      'tag.xsheet': 'Timesheet (タイムシート)',
      'w.douga.t': 'Nghiên Cứu Douga & Phim Hoàn Thiện',
      'w.douga.d': 'Nghiên cứu clean-up và vẽ trung gian (in-between) 26 tờ cho động tác quay đầu trong gió — từ nét vẽ khép kín kèm chỉ dẫn bóng màu (iro-toresu) đến thước phim hoàn thiện phong cách Shinkai với ánh sáng hoàng hôn và hiệu ứng bokeh.',
      'douga.tabLine': 'Nét vẽ Douga',
      'douga.tabFinal': 'Phim hoàn thiện',
      'douga.kMain': 'Nét chính',
      'douga.kHi': 'Vùng sáng',
      'douga.kSh': 'Chỉ định bóng',
      'douga.kTr': 'Đường màu phụ',
      'douga.expand': 'Phóng to',
      'douga.expandAria': 'Mở rộng hoạt ảnh toàn màn hình',
      'douga.stageAria': 'Phát hoặc tạm dừng diễn hoạt',
      'douga.onion': 'Soi nét',
      'genga.expand': 'Phóng to',
      'genga.expandAria': 'Mở rộng bản vẽ Genga layout trong lightbox',
      'tag.douga': 'Douga · 26 tờ',
      'tag.iro': 'Chỉ định bóng (色トレス)',
      'tag.satsuei': 'Hoàn thiện & Kỹ xảo (撮影)',

      'work.illust': 'Minh Hoạ & Thiết Kế Nhân Vật',
      'w.fern.t': 'Fern & Frieren',
      'w.fern.d': 'Tranh fan art lấy cảm hứng từ anime “Frieren: Pháp sư tiễn táng” — khoảnh khắc ấm áp, bình yên với ánh sáng mềm và hiệu ứng tán sắc.',
      'w.aoi.t': 'Aoi — Thiết Kế Nhân Vật (Character Sheet)',
      'w.aoi.d': 'Bảng xoay chiều nhân vật gốc (turnaround) cho dự án hoạt hình cá nhân: góc chính diện, sau lưng và góc nghiêng đảm bảo đồng nhất tỉ lệ khi diễn hoạt.',
      'tag.fanart': 'Fan art',
      'tag.painting': 'Digital painting',
      'tag.original': 'Nhân vật gốc',
      'tag.turnaround': 'Character sheet',
      'work.more': 'Xem thêm tranh trên Pixiv',

      'about.title': 'Hồ Sơ',
      'about.lead': 'Xin chào, mình là Phát Trần — đồng nghiệp và bạn bè thường gọi là <em>RiSH</em> hay <em>Hachi (八)</em>.',
      'about.p1': 'Mình là <strong>Key Animator (Hoạ sĩ Diễn hoạt chính - 原画) và Digital Paint artist</strong> hiện đang làm việc chuyên nghiệp tại một studio sản xuất Anime ở TP. Hồ Chí Minh. Vượt qua giai đoạn trung gian (Douga) truyền thống để bước thẳng lên vị trí Key Animation (Genga) và Digital Paint (Shiage), mình trực tiếp tham gia vào các dự án anime truyền hình và thương mại.',
      'about.p2': 'Mình tốt nghiệp <strong>Cử nhân Thiết kế Đồ hoạ loại Giỏi (With Distinction / Honours) tại Đại học FPT</strong>. Kết hợp nền tảng học thuật vững chắc về giải phẫu, bố cục hình ảnh với quy trình chuẩn của các xưởng phim hoạt hình Nhật Bản, mình chuyên sâu vào diễn xuất nhân vật có hồn, các phân cảnh hành động sakuga giàu động lượng và nhịp điệu timesheet (X-sheet) chuẩn xác.',

      'id.name': 'Họ tên',
      'id.alias': 'Nghệ danh',
      'id.role': 'Vai trò',
      'id.roleVal': 'Key Animator (原画) & Digital Paint (仕上げ)',
      'id.base': 'Nơi ở',
      'id.baseVal': 'TP. Hồ Chí Minh, Việt Nam (GMT+7)',
      'id.credits': 'Credit tác phẩm',
      'id.creditsVal': 'Phat Tan — KeyFrame Staff List ↗',
      'id.edu': 'Học vấn',
      'id.eduVal': 'Cử nhân Thiết kế Đồ hoạ (Tốt nghiệp loại Giỏi) · ĐH FPT',
      'id.goal': 'Mục tiêu',
      'id.goalVal': 'Ngành Anime thương mại — Tokyo & Quốc tế',
      'id.status': 'Trạng thái',
      'id.statusVal': 'Hoạ sĩ Studio chuyên nghiệp · Nhận đặt hàng Genga / LO chọn lọc',

      'sk.anim': 'Diễn hoạt (Animation)',
      'sk.anim1': 'Layout (LO) & Diễn hoạt chính (Genga / 原画)',
      'sk.anim2': 'Diễn xuất nhân vật 2D & Sakuga Action',
      'sk.anim3': 'Vẽ trung gian (Douga / 動画) & Clean-up',
      'sk.anim4': 'Tô màu kỹ thuật số (Shiage / 仕上げ)',
      'sk.illu': 'Minh hoạ & Thiết kế',
      'sk.illu1': 'Thiết kế nhân vật & Turnaround sheet',
      'sk.illu2': 'Minh hoạ phong cách Anime',
      'sk.illu3': 'Digital painting & bố cục ánh sáng',
      'sk.illu4': 'Thiết kế Poster & Key Visual',
      'sk.tools': 'Phần mềm',
      'sk.csp': 'Clip Studio Paint EX (Auto-Actions & Quy trình X-Sheet)',
      'sk.exploring': '(đang tìm hiểu)',
      'sk.lang': 'Ngôn ngữ',
      'sk.vi': 'Tiếng Việt',
      'sk.en': 'Tiếng Anh',
      'sk.ja': 'Tiếng Nhật',
      'sk.native': 'Bản ngữ',
      'sk.fluent': 'Thành thạo',
      'sk.inter': 'Trung cấp',

      'val.1': 'Đam mê hoạt hình & cam kết học hỏi không ngừng',
      'val.2': 'Tỉ mỉ, tinh thần đồng đội cao & luôn lắng nghe góp ý',
      'val.3': 'Chủ động & thích ứng nhanh với tiến độ sản xuất',
      'val.4': 'Giao tiếp rõ ràng, tôn trọng và chu đáo',

      'contact.label': 'Liên hệ',
      'contact.meta': 'Phản hồi trong 48h',
      'contact.title': 'Cùng tạo nên những khung hình <em>sống động.</em>',
      'contact.intro': 'Sẵn sàng cho vị trí tại các studio, dự án freelance diễn hoạt (Key / In-between), commission thiết kế nhân vật & minh hoạ.',
      'contact.copy': 'Sao chép',
      'soc.pixiv': 'Minh hoạ',
      'soc.linkedin': 'Hồ sơ nghề nghiệp',
      'soc.youtube': 'Showreel',

      'footer.made': 'Thiết kế & trau chuốt từng khung hình.',
      'footer.top': 'Lên đầu trang',
      'lb.close': 'Đóng',

      'alt.heroFinal': 'Akari bứt tốc — khung hình hoàn thiện từ dự án Get Set Run',
      'alt.step1': 'Bước 1 — bản vẽ phác thảo khung hình chính (rough key)',
      'alt.step2': 'Bước 2 — đi nét sạch và chỉ định vùng bóng/ánh sáng',
      'alt.step3': 'Bước 3 — tô màu phẳng theo bảng màu nhân vật',
      'alt.step4': 'Bước 4 — ghép lớp nhân vật lên phông nền speed-line',
      'alt.step5': 'Bước 5 — hoàn thiện ánh sáng, nhoè chuyển động và hiệu ứng',
      'alt.poster': 'Poster chính thức Get Set Run — nhân vật chạy trên đường đua dưới ánh hoàng hôn',
      'alt.standee': 'Thiết kế standee Get Set Run — nhân vật vươn tay về phía trước trên nền đỏ',
      'alt.breakdown': 'Bóc tách các lớp (layer breakdown) của cảnh chạy nước rút',
      'alt.douga': 'Diễn hoạt Douga 26 khung hình nhân vật nữ sinh xoay đầu đón gió với chỉ định bóng chuẩn anime',
      'alt.fern': 'Tranh fan art Fern ôm Frieren từ phía sau',
      'alt.aoi': 'Bảng thiết kế nhân vật Aoi — góc nhìn trước, sau và nghiêng',
      'alt.portrait': 'Tranh minh hoạ đơn sắc nhân vật vươn bàn tay về phía người xem',

      'cursor.peek': 'SOI NÉT',
      'cursor.play': 'PHÁT',
      'cursor.view': 'PHÓNG TO',
      'cursor.open': 'PIXIV',
      'cursor.mail': 'GỬI MAIL',
      'toast.copied': 'Đã sao chép rikun113@gmail.com'
    },

    ja: {
      'a11y.skip': '本文へスキップ',
      'a11y.menu': 'メニューを開く',
      'nav.reel': 'リール',
      'nav.process': '作画工程',
      'nav.work': '作品',
      'nav.about': 'プロフィール',
      'nav.contact': '連絡先',
      status: 'お仕事募集中',

      'hero.eyebrow': '2Dアニメーター・イラストレーター',
      'hero.lede': '想像に命を吹き込む — <em>1フレーム</em>ずつ。',
      'hero.sub': '原画・キャラクターデザイン・アニメ風イラスト制作。ベトナムを拠点に、東京のアニメスタジオを目指して日々描いています。',
      'hero.ctaWork': '作品を見る',
      'hero.ctaReel': 'リールを再生',
      'hero.hint': 'フレームに重ねるとラフ原画を表示・クリックで固定',
      'hero.badge': 'ファイナルカット ● 24FPS (撮影)',
      'hero.badgeAkari': '原画・レイアウト (LO)',
      'hero.cutShinkai': '新海風（動画）',
      'hero.cutAkari': 'アカリ（疾走）',
      'hero.expand': '拡大',
      'hero.expandAria': 'ライトボックスで動画を拡大',
      'hero.expandAkariAria': 'ライトボックスでアカリの原画を拡大',
      'hero.scroll': 'スクロール',

      'reel.title': 'Showreel',
      'reel.play': 'リールを再生',
      'reel.note': '2024年〜2026年の商業アニメーション作品集 — 商業原画（キーアニメーション）、キャラクター芝居、躍動感あるスポーツアクション、2Dエフェクト作画。',
      'reel.youtube': 'YouTubeで見る',

      'process.title': 'Process',
      'process.meta': 'ラフ原画 → 撮影完パケ',
      'process.s1.t': 'ラフ原画',
      'process.s1.d': '重心、アクションライン、疾走の勢いを最優先に、ラフな線で動きの芯を捉えます。',
      'process.s2.t': 'クリンナップ・影指定',
      'process.s2.d': '線を整えて中割りを加え、色鉛筆でハイライトと影の境界を指定します。',
      'process.s3.t': '彩色（仕上げ）',
      'process.s3.d': 'キャラクターの色指定に基づき、ノーマル・影・ハイライトを塗り分けます。',
      'process.s4.t': '合成（コンポジット）',
      'process.s4.d': '流線背景とセル画を重ね合わせ、ひとつのカットとして統合します。',
      'process.s5.t': '撮影・エフェクト',
      'process.s5.d': '透過光やモーションブラー、フィルター処理を施し、画面に空気感と躍動感を与えます。',

      'work.title': 'Selected Work',
      'case.kicker': '代表プロジェクト · 2025',
      'case.desc': 'FPT大学のチーム「Shiguma Dakkusu」によるオリジナル短編スポーツアニメーション。プロジェクト監督およびリード原画（Key Animator）として、ビジュアルディレクション、レイアウト（LO）、迫力あるスプリント作画（sakuga）を牽引。自分にしか見えないゴールを目指すランナー・明（アカリ）のリアルな体重移動、躍動感、そして情熱を描き出しました。',
      'case.role': '担当',
      'case.roleVal': '監督・原画（原画・LO）・キービジュアル',
      'case.team': 'チーム',
      'case.art': '美術監督',
      'case.color': '色彩設計',
      'case.date': '公開日',
      'cap.poster': 'キービジュアルポスター — Get Set Run',
      'cap.standee': 'イベント用スタンディ — Get Set Run',
      'cap.breakdown': '疾走カットのレイヤー分解（背景・彩色・線画・影指定）',

      'work.douga': '原画・動画',
      'w.genga.t': '原画・レイアウト（LO / 二原）習作',
      'w.genga.d': 'ラフ原画から二原・クリンナップへの作画工程、パース変化、ツメ指示（中割りの加減速）、体重移動を意識したレイアウト・原画習作（Clip Studio Paint EX）。',
      'tag.genga': '原画（Genga）',
      'tag.lo': 'レイアウト（LO）',
      'tag.xsheet': 'タイムシート（X-Sheet）',
      'w.douga.t': '動画・完成カット習作',
      'w.douga.d': '風に揺れる振り向きの動画・クリンナップ26枚の習作。色トレス指定（影・ハイライト・境界線）の線画から、新海誠風の夕景ライティング・ボケ・撮影処理を施した完成カットまで。',
      'douga.tabLine': '動画・線画',
      'douga.tabFinal': '完成カット',
      'douga.kMain': '主線',
      'douga.kHi': 'ハイライト',
      'douga.kSh': '影指定',
      'douga.kTr': '色トレス',
      'douga.expand': '拡大',
      'douga.expandAria': 'アニメーションを拡大表示',
      'douga.stageAria': 'アニメーションを再生・一時停止',
      'douga.onion': '透かし',
      'genga.expand': '拡大',
      'genga.expandAria': '原画・レイアウトシートを拡大表示',
      'tag.douga': '動画 · 26枚',
      'tag.iro': '色トレス・影指定',
      'tag.satsuei': '撮影・仕上げ (Satsuei)',

      'work.illust': 'イラスト・キャラクターデザイン',
      'w.fern.t': 'フェルンとフリーレン',
      'w.fern.d': 'アニメ『葬送のフリーレン』のファンアート。柔らかな光と色収差で穏やかなひとときを表現しました。',
      'w.aoi.t': '葵（アオイ）— キャラクター設定画',
      'w.aoi.d': '個人アニメーション制作のためのオリジナルキャラクター三面図（正面・背面・側面）。作画崩壊を防ぐバランス設計。',
      'tag.fanart': 'ファンアート',
      'tag.painting': 'デジタルペイント',
      'tag.original': 'オリジナル',
      'tag.turnaround': '設定画・三面図',
      'work.more': 'Pixivでさらに作品を見る',

      'about.title': 'About',
      'about.lead': 'こんにちは、ファット・トラン（<em>RiSH</em> / <em>Hachi 八</em>）です。',
      'about.p1': 'ホーチミン市のアニメ制作スタジオにて、商業<strong>原画マン（Key Animator）およびデジタルペイント（仕上げ）</strong>として活動しています。動画工程を飛び級し、商業作品の原画（一原・二原）および仕上げへ直属配属され、TVアニメ等の制作に携わっています。',
      'about.p2': '<strong>FPT大学グラフィックデザイン学部を優秀賞（With Distinction / Honours）で卒業</strong>。大学でのデッサン・画面構成の知見と、日本のアニメ制作パイプライン（作画・タイムシート・RETAS）を融合させ、説得力あるキャラクター芝居、ケレン味あるアクション作画、正確なツメ指示を追求しています。',

      'id.name': '氏名',
      'id.alias': '名義',
      'id.role': '役職',
      'id.roleVal': '原画マン（Genga） & デジタルペイント（仕上げ）',
      'id.base': '拠点',
      'id.baseVal': 'ベトナム・ホーチミン市 (GMT+7)',
      'id.credits': '作画クレジット',
      'id.creditsVal': '作画スタッフリスト（Phat Tan / ID: 400619） ↗',
      'id.edu': '学歴',
      'id.eduVal': 'FPT大学 グラフィックデザイン学部 優秀卒業（Honours）',
      'id.goal': '目標',
      'id.goalVal': '日本および世界のアニメ業界',
      'id.status': 'ステータス',
      'id.statusVal': '商業スタジオ所属 · 指名原画・二原のご相談受付中',

      'sk.anim': 'アニメーション',
      'sk.anim1': 'レイアウト（LO） & 原画（Genga / 一原・二原）',
      'sk.anim2': '2Dキャラクター芝居 & アクション作画（Sakuga）',
      'sk.anim3': '動画（Douga） & クリンナップ・影指定',
      'sk.anim4': 'デジタルペイント・色彩指定（仕上げ / Shiage）',
      'sk.illu': 'イラスト・デザイン',
      'sk.illu1': 'キャラクターデザイン・三面図',
      'sk.illu2': 'アニメ調イラストレーション',
      'sk.illu3': 'デジタルペイント・構図設計',
      'sk.illu4': 'ポスター・キービジュアル制作',
      'sk.tools': '使用ツール',
      'sk.csp': 'Clip Studio Paint EX (オートアクション & タイムシート運用)',
      'sk.exploring': '(習得中)',
      'sk.lang': '言語',
      'sk.vi': 'ベトナム語',
      'sk.en': '英語',
      'sk.ja': '日本語',
      'sk.native': 'ネイティブ',
      'sk.fluent': '流暢',
      'sk.inter': '中級',

      'val.1': 'アニメーションへの情熱と継続的な向上心',
      'val.2': '細部へのこだわりとフィードバックを歓迎する協調性',
      'val.3': '制作スケジュールに柔軟かつ主体的に対応',
      'val.4': '丁寧で明確、敬意を大切にしたコミュニケーション',

      'contact.label': 'Contact',
      'contact.meta': '48時間以内に返信',
      'contact.title': '一緒に、心を動かす<em>映像を。</em>',
      'contact.intro': 'スタジオ採用、原画・動画のフリーランス案件、キャラクターデザイン・イラストのご依頼をお受けしています。',
      'contact.copy': 'コピー',
      'soc.pixiv': 'イラスト一覧',
      'soc.linkedin': '経歴',
      'soc.youtube': 'ショーリール',

      'footer.made': '1フレームずつ心を込めて制作。',
      'footer.top': 'トップへ戻る',
      'lb.close': '閉じる',

      'alt.heroFinal': '疾走する明（アカリ）— Get Set Run 完成フレーム',
      'alt.step1': '工程1 — ラフ原画',
      'alt.step2': '工程2 — クリンナップと影指定',
      'alt.step3': '工程3 — 彩色',
      'alt.step4': '工程4 — 背景との合成',
      'alt.step5': '工程5 — 撮影・エフェクト処理',
      'alt.poster': 'Get Set Run キービジュアルポスター',
      'alt.standee': 'Get Set Run スタンディデザイン',
      'alt.breakdown': '疾走カットのレイヤー分解図',
      'alt.douga': '風になびく振り向きカットの動画・クリンナップアニメーション（全26枚）',
      'alt.fern': 'フリーレンを抱きしめるフェルンのファンアート',
      'alt.aoi': 'オリジナルキャラクター葵の三面図',
      'alt.portrait': '手を差し伸べるキャラクターのモノクロイラスト',

      'cursor.peek': '原画を見る',
      'cursor.play': '再生',
      'cursor.view': '拡大',
      'cursor.open': 'PIXIV',
      'cursor.mail': 'メール',
      'toast.copied': 'rikun113@gmail.com をコピーしました'
    }
  };

  /* =====================================================================
     2. STATE & ENVIRONMENT
     ===================================================================== */
  const html = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
  const hasSplitText = typeof window.SplitText !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  if (hasGSAP && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (hasGSAP && hasSplitText) {
    gsap.registerPlugin(SplitText);
  }
  if (!prefersReducedMotion && hasGSAP) {
    html.classList.add('motion');
  }

  let currentLang = I18N[html.lang] ? html.lang : 'en';
  let lenis = null;
  let splitInstances = [];
  let scrollTriggers = [];

  /* =====================================================================
     3. YEAR & LIVE HCMC CLOCK
     ===================================================================== */
  const yearStr = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = yearStr;
  });

  const clockEl = document.querySelector('[data-clock]');
  function updateClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockEl.textContent = fmt.format(now);
    } catch (_) {
      const d = new Date();
      clockEl.textContent = d.toTimeString().slice(0, 8);
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* =====================================================================
     4. LANGUAGE SWITCHER (TRILINGUAL I18N)
     ===================================================================== */
  const langButtons = document.querySelectorAll('[data-lang]');

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
  }

  function applyTranslations(lang, isInitial) {
    if (!I18N[lang]) lang = 'en';
    currentLang = lang;
    html.lang = lang;

    try {
      localStorage.setItem('rish:lang', lang);
    } catch (_) {}

    langButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // Revert any SplitText wrappers before mutating text content
    if (!isInitial && splitInstances.length) {
      splitInstances.forEach((s) => {
        try { s.revert(); } catch (_) {}
      });
      splitInstances = [];
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key);
      if (val) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) {
          el.setAttribute(attr, t(key));
        }
      });
    });

    if (!isInitial) {
      setupTextSplits(true);
      if (hasScrollTrigger) ScrollTrigger.refresh();
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== currentLang) {
        applyTranslations(btn.dataset.lang, false);
      }
    });
  });

  applyTranslations(currentLang, true);

  /* =====================================================================
     5. LENIS SMOOTH SCROLL & HUD FRAME COUNTER
     ===================================================================== */
  const hud = document.querySelector('.hud');
  const hudFrame = document.querySelector('[data-hud-frame]');
  const hudTotal = document.querySelector('[data-hud-total]');
  const TOTAL_FRAMES = 1440;
  if (hudTotal) hudTotal.textContent = String(TOTAL_FRAMES);

  const header = document.querySelector('[data-header]');
  let lastScrollY = window.scrollY;

  function onScrollUpdate(scrollY) {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    if (hud) {
      hud.classList.toggle('is-visible', scrollY > 60);
    }
    if (hudFrame) {
      const frame = Math.max(1, Math.round(progress * TOTAL_FRAMES));
      hudFrame.textContent = String(frame).padStart(4, '0');
    }

    if (header) {
      header.classList.toggle('is-scrolled', scrollY > 30);
      const delta = scrollY - lastScrollY;
      if (scrollY > 180 && delta > 6) {
        header.classList.add('is-hidden');
      } else if (delta < -6 || scrollY <= 180) {
        header.classList.remove('is-hidden');
      }
    }
    lastScrollY = scrollY;
  }

  if (hasLenis && !prefersReducedMotion) {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1
    });

    lenis.on('scroll', (e) => {
      if (hasScrollTrigger) ScrollTrigger.update();
      onScrollUpdate(e.scroll);
    });

    if (hasGSAP) {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  } else {
    window.addEventListener('scroll', () => onScrollUpdate(window.scrollY), { passive: true });
  }

  // Smooth anchor jumps
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = href === '#top' ? document.body : document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      if (lenis) {
        lenis.scrollTo(href === '#top' ? 0 : target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* =====================================================================
     6. MOBILE MENU
     ===================================================================== */
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-menu]');

  function openMobileMenu() {
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.hidden = false;
    requestAnimationFrame(() => {
      mobileMenu.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    });
    if (lenis) lenis.stop();
  }

  function closeMobileMenu() {
    if (!menuBtn || !mobileMenu || !mobileMenu.classList.contains('is-open')) return;
    mobileMenu.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (lenis) lenis.start();
    setTimeout(() => {
      if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
    }, 800);
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  /* =====================================================================
     7. HERO INTERACTIVE CEL LENS (GENGA X-RAY LOUPE & VIDEO HERO)
     ===================================================================== */
  const cel = document.querySelector('[data-lens]');
  let sweepDemoHeroLens = function () {};

  if (cel) {
    const frame = cel.querySelector('.cel__frame');
    const sketches = cel.querySelectorAll('.cel__sketch');
    const ring = cel.querySelector('[data-lens-ring]');
    const ringLabel = ring ? ring.querySelector('span') : null;
    const cutBtns = cel.querySelectorAll('[data-hero-cut]');
    const cutLayers = cel.querySelectorAll('[data-layer]');
    const heroVideo = cel.querySelector('.cel__video');
    let isLockedFull = false;

    const LENS_RADIUS = () => (window.innerWidth < 640 ? 85 : 135);

    function setLensPos(xPct, yPct, rPx) {
      sketches.forEach((sketch) => {
        sketch.style.setProperty('--x', `${xPct}%`);
        sketch.style.setProperty('--y', `${yPct}%`);
        sketch.style.setProperty('--r', `${rPx}px`);
      });
      if (ring) {
        ring.style.left = `${xPct}%`;
        ring.style.top = `${yPct}%`;
        const showRing = !isLockedFull && rPx > 8;
        const d = showRing ? rPx * 2 : 0;
        ring.style.width = `${d}px`;
        ring.style.height = `${d}px`;
        ring.classList.toggle('is-active', showRing);
      }
    }

    if (frame && sketches.length) {
      let currentR = 0;
      let targetR = 0;
      let curX = 55;
      let curY = 42;
      let targetX = 55;
      let targetY = 42;
      let rafId = null;

      function tickLens() {
        curX += (targetX - curX) * 0.22;
        curY += (targetY - curY) * 0.22;
        currentR += (targetR - currentR) * 0.2;
        setLensPos(curX, curY, currentR);
        if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05 || Math.abs(targetR - currentR) > 0.2) {
          rafId = requestAnimationFrame(tickLens);
        } else {
          rafId = null;
        }
      }

      function requestLensTick() {
        if (!rafId) rafId = requestAnimationFrame(tickLens);
      }

      function handlePointer(e) {
        const rect = frame.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        targetX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        targetY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        if (!isLockedFull) targetR = LENS_RADIUS();
        requestLensTick();
      }

      frame.addEventListener('pointerenter', handlePointer);
      frame.addEventListener('pointermove', handlePointer);
      frame.addEventListener('pointerleave', () => {
        if (!isLockedFull) {
          targetR = 0;
          requestLensTick();
        }
      });

      // Click toggles full rough keyframe vs loupe (ignores expand button or cut pills)
      frame.addEventListener('click', (e) => {
        if (e.target.closest('.cel__expand') || e.target.closest('[data-hero-cut]')) return;
        isLockedFull = !isLockedFull;
        const rect = frame.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width) * 100;
        targetY = ((e.clientY - rect.top) / rect.height) * 100;
        targetR = isLockedFull ? Math.hypot(rect.width, rect.height) : LENS_RADIUS();
        if (ringLabel) {
          ringLabel.textContent = isLockedFull ? 'FINAL ✦' : 'ROUGH ✎';
        }
        requestLensTick();
      });

      // Hero cut switching (Shinkai Video vs Akari Sprint)
      function setHeroCut(cutKey) {
        cutBtns.forEach((btn) => {
          const isTarget = btn.getAttribute('data-hero-cut') === cutKey;
          btn.classList.toggle('is-active', isTarget);
          btn.setAttribute('aria-selected', String(isTarget));
        });
        cutLayers.forEach((layer) => {
          const isTarget = layer.getAttribute('data-layer') === cutKey;
          layer.classList.toggle('is-active', isTarget);
        });
        if (heroVideo) {
          if (cutKey === 'shinkai') {
            heroVideo.play().catch(() => {});
          } else {
            heroVideo.pause();
          }
        }
        isLockedFull = false;
        targetR = 0;
        if (ringLabel) ringLabel.textContent = 'ROUGH ✎';
        requestLensTick();
      }

      cutBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cut = btn.getAttribute('data-hero-cut');
          if (cut) setHeroCut(cut);
        });
      });

      // Robust autoplay handling for hero video
      if (heroVideo) {
        const startHeroVideo = () => {
          heroVideo.play().catch(() => {
            const unlock = () => {
              heroVideo.play().catch(() => {});
              window.removeEventListener('pointerdown', unlock);
              window.removeEventListener('touchstart', unlock);
            };
            window.addEventListener('pointerdown', unlock, { once: true });
            window.addEventListener('touchstart', unlock, { once: true });
          });
        };
        startHeroVideo();
      }

      // Brief automatic demo sweep after hero loads so user sees the X-ray effect immediately
      sweepDemoHeroLens = function () {
        if (!hasGSAP || prefersReducedMotion) return;
        const demo = { x: 26, y: 58, r: 0 };
        gsap.timeline({ delay: 0.25 })
          .to(demo, {
            r: LENS_RADIUS() * 0.9,
            x: 48,
            y: 40,
            duration: 0.75,
            ease: 'power3.out',
            onUpdate: () => {
              if (targetR === 0 && !isLockedFull) setLensPos(demo.x, demo.y, demo.r);
            }
          })
          .to(demo, {
            x: 68,
            y: 35,
            duration: 0.7,
            ease: 'sine.inOut',
            onUpdate: () => {
              if (targetR === 0 && !isLockedFull) setLensPos(demo.x, demo.y, demo.r);
            }
          })
          .to(demo, {
            r: 0,
            duration: 0.55,
            ease: 'power2.in',
            onUpdate: () => {
              if (targetR === 0 && !isLockedFull) setLensPos(demo.x, demo.y, demo.r);
            }
          });
      };
    }
  }

  /* =====================================================================
     8. SPLIT TEXT & SCROLL ANIMATIONS
     ===================================================================== */
  function setupTextSplits(immediateVisible) {
    if (!hasGSAP || !hasSplitText || prefersReducedMotion) return;

    scrollTriggers.forEach((st) => {
      try { st.kill(); } catch (_) {}
    });
    scrollTriggers = [];

    // Section titles — character split
    document.querySelectorAll('[data-split="chars"]').forEach((el) => {
      const split = new SplitText(el, { type: 'chars', charsClass: 'char' });
      splitInstances.push(split);
      if (immediateVisible) {
        gsap.set(split.chars, { yPercent: 0, opacity: 1 });
        return;
      }
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 86%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            split.chars,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power4.out' }
          );
        }
      });
      scrollTriggers.push(st);
    });

    // Body leads — line split
    document.querySelectorAll('[data-split="lines"]').forEach((el) => {
      if (el.closest('.hero')) return; // Hero lede is handled by hero entrance
      const split = new SplitText(el, { type: 'lines', linesClass: 'split-line' });
      splitInstances.push(split);
      if (immediateVisible) {
        gsap.set(split.lines, { yPercent: 0, opacity: 1 });
        return;
      }
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            split.lines,
            { yPercent: 105, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'power3.out' }
          );
        }
      });
      scrollTriggers.push(st);
    });
  }

  /* =====================================================================
     9. PRELOADER & HERO ENTRANCE CHOREOGRAPHY
     ===================================================================== */
  const loader = document.querySelector('[data-loader]');
  const loaderNum = document.querySelector('[data-loader-num]');

  function dismissLoader() {
    if (window.__loaderSafety) {
      clearTimeout(window.__loaderSafety);
      window.__loaderSafety = null;
    }
    if (loader) loader.classList.add('is-done');
  }

  function runHeroEntrance() {
    if (!hasGSAP || prefersReducedMotion) {
      dismissLoader();
      html.classList.remove('motion');
      return;
    }

    const heroNameEl = document.querySelector('[data-hero-name]');
    const heroLedeEl = document.querySelector('.hero__lede');
    const heroFades = document.querySelectorAll('[data-hero-fade]');
    const heroCel = document.querySelector('.cel');

    let nameChars = [];
    if (heroNameEl && hasSplitText) {
      heroNameEl.style.visibility = 'visible';
      const s = new SplitText(heroNameEl, { type: 'chars', charsClass: 'char' });
      nameChars = s.chars;
    } else if (heroNameEl) {
      heroNameEl.style.visibility = 'visible';
    }

    let ledeLines = [];
    if (heroLedeEl && hasSplitText) {
      const s = new SplitText(heroLedeEl, { type: 'lines', linesClass: 'split-line' });
      splitInstances.push(s);
      ledeLines = s.lines;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        dismissLoader();
        sweepDemoHeroLens();
        if (hasScrollTrigger) ScrollTrigger.refresh();
      }
    });

    // 1. Film-leader counter 000 -> 100
    if (loader && loaderNum) {
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 0.55,
        ease: 'power2.inOut',
        onUpdate: () => {
          loaderNum.textContent = String(Math.round(counter.val)).padStart(3, '0');
        }
      });
      tl.to(loader, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'expo.inOut',
        onComplete: dismissLoader
      }, '+=0.04');
    } else {
      dismissLoader();
    }

    // 2. Hero Cel reveal
    if (heroCel) {
      tl.fromTo(
        heroCel,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.05, ease: 'expo.out' },
        '-=0.45'
      );
    }

    // 3. Giant PHAT TRAN display title
    if (nameChars.length) {
      tl.fromTo(
        nameChars,
        { yPercent: 115, rotateZ: 4 },
        { yPercent: 0, rotateZ: 0, duration: 0.95, stagger: 0.03, ease: 'power4.out' },
        '-=0.85'
      );
    }

    // 4. Hero lede + fades
    if (ledeLines.length) {
      tl.fromTo(
        ledeLines,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        '-=0.75'
      );
    }
    if (heroFades.length) {
      tl.fromTo(
        heroFades,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
        '-=0.65'
      );
    }
  }

  /* =====================================================================
     10. INFINITE MARQUEE
     ===================================================================== */
  const marquee = document.querySelector('[data-marquee]');
  if (marquee) {
    const track = marquee.querySelector('.marquee__track');
    if (track) {
      // Clone children twice for seamless loop on ultra-wide monitors
      const clone1 = track.innerHTML;
      track.insertAdjacentHTML('beforeend', clone1 + clone1);

      if (hasGSAP && !prefersReducedMotion) {
        gsap.to(track, {
          xPercent: -33.3333,
          duration: 22,
          ease: 'none',
          repeat: -1
        });
      }
    }
  }

  /* =====================================================================
     11. SHOWREEL SECTION (24FPS TIMECODE & YOUTUBE EMBED)
     ===================================================================== */
  const timecodeEl = document.querySelector('[data-timecode]');
  if (timecodeEl) {
    let ticks = 0;
    setInterval(() => {
      ticks = (ticks + 1) % (24 * 60);
      const secs = Math.floor(ticks / 24);
      const frames = ticks % 24;
      timecodeEl.textContent = `00:00:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
    }, 1000 / 24);
  }

  const reelContainer = document.querySelector('[data-reel]');
  const reelPlayBtn = document.querySelector('[data-reel-play]');
  const reelJumpBtn = document.querySelector('[data-reel-jump]');

  function mountShowreel() {
    if (!reelContainer || reelContainer.dataset.playing === 'true') return;
    reelContainer.dataset.playing = 'true';
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/dxZP3VsqWcM?autoplay=1&rel=0&modestbranding=1&playsinline=1';
    iframe.title = 'Phat Tran (RiSH) — 2D Animation Showreel';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    reelContainer.innerHTML = '';
    reelContainer.appendChild(iframe);
  }

  if (reelPlayBtn) {
    reelPlayBtn.addEventListener('click', mountShowreel);
  }
  if (reelJumpBtn) {
    reelJumpBtn.addEventListener('click', () => {
      const reelSec = document.getElementById('reel');
      if (reelSec) {
        if (lenis) {
          lenis.scrollTo(reelSec, {
            duration: 1.1,
            onComplete: mountShowreel
          });
        } else {
          reelSec.scrollIntoView({ behavior: 'smooth' });
          setTimeout(mountShowreel, 650);
        }
      }
    });
  }

  if (hasGSAP && hasScrollTrigger && !prefersReducedMotion) {
    const reelPlayer = document.querySelector('.reel__player');
    if (reelPlayer) {
      gsap.fromTo(
        reelPlayer,
        { rotateX: 12, scale: 0.92 },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.reel__stage',
            start: 'top bottom',
            end: 'top 30%',
            scrub: true
          }
        }
      );
    }
  }

  /* =====================================================================
     12. PINNED 5-STAGE ANIMATION PROCESS (X-SHEET SCRUBBER)
     ===================================================================== */
  const processPin = document.querySelector('[data-process]');
  const processTicks = document.querySelector('[data-process-ticks]');

  if (processTicks) {
    const TOTAL_TICKS = 49;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < TOTAL_TICKS; i++) {
      const tick = document.createElement('i');
      if (i % 12 === 0) tick.className = 'major';
      frag.appendChild(tick);
    }
    processTicks.appendChild(frag);
  }

  if (processPin) {
    const frames = Array.from(processPin.querySelectorAll('.process__frame'));
    const steps = Array.from(processPin.querySelectorAll('.process__step'));
    const marks = Array.from(processPin.querySelectorAll('[data-process-go]'));
    const countEl = processPin.querySelector('[data-process-count]');
    const labelEl = processPin.querySelector('[data-process-label]');
    const wipeEl = processPin.querySelector('.process__wipe');
    const playheadEl = processPin.querySelector('[data-process-playhead]');
    const frameTagEl = processPin.querySelector('[data-process-frame]');
    const sheetEl = processPin.querySelector('.process__sheet');

    const STAGE_CODES = ['RAFU', 'CLEAN', 'SAI-SHIKI', 'GOUSEI', 'SATSUEI'];
    let processST = null;
    let currentProgress = 0;

    function renderProcessProgress(progress) {
      const clamped = Math.max(0, Math.min(1, progress));
      currentProgress = clamped;
      // 4 transitions across 5 frames (0..4)
      const scaled = clamped * (frames.length - 1);
      const activeIdx = Math.min(frames.length - 1, Math.round(scaled));

      frames.forEach((frame, idx) => {
        if (idx === 0) return;
        const local = Math.max(0, Math.min(1, scaled - (idx - 1)));
        const rightInset = (1 - local) * 100;
        frame.style.clipPath = `inset(0 ${rightInset.toFixed(2)}% 0 0)`;
      });

      // Red wipe laser line visibility during active transitions
      if (wipeEl) {
        const frac = scaled - Math.floor(scaled);
        if (frac > 0.01 && frac < 0.99) {
          wipeEl.style.opacity = '1';
          wipeEl.style.left = `${(frac * 100).toFixed(2)}%`;
        } else {
          wipeEl.style.opacity = '0';
        }
      }

      if (countEl) countEl.textContent = String(activeIdx + 1).padStart(2, '0');
      if (labelEl) labelEl.textContent = STAGE_CODES[activeIdx] || 'RAFU';

      steps.forEach((step, idx) => {
        step.classList.toggle('is-active', idx === activeIdx);
      });
      marks.forEach((mark, idx) => {
        mark.classList.toggle('is-active', idx === activeIdx);
      });

      if (playheadEl && sheetEl) {
        const w = sheetEl.clientWidth;
        playheadEl.style.transform = `translateX(${(clamped * w).toFixed(1)}px)`;
        playheadEl.style.setProperty('--p', clamped.toFixed(3));
      }
      if (frameTagEl) {
        const fNum = Math.max(1, Math.round(clamped * 120));
        frameTagEl.textContent = `F ${String(fNum).padStart(3, '0')}`;
      }
    }

    if (hasGSAP && hasScrollTrigger && !prefersReducedMotion) {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 901px)', () => {
        processST = ScrollTrigger.create({
          trigger: processPin,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.35,
          onUpdate: (self) => renderProcessProgress(self.progress)
        });
        return () => {
          if (processST) processST.kill();
          processST = null;
        };
      });
    }

    // Click on KEY / CLEAN / COLOR / COMP / FX buttons
    marks.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetIdx = Number(btn.getAttribute('data-process-go')) || 0;
        const targetProgress = targetIdx / Math.max(1, frames.length - 1);

        if (processST && window.innerWidth >= 901) {
          const targetScroll = processST.start + (processST.end - processST.start) * targetProgress;
          if (lenis) {
            lenis.scrollTo(targetScroll, { duration: 0.9 });
          } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }
        } else if (hasGSAP && !prefersReducedMotion) {
          const proxy = { p: currentProgress };
          gsap.to(proxy, {
            p: targetProgress,
            duration: 0.55,
            ease: 'power3.out',
            onUpdate: () => renderProcessProgress(proxy.p)
          });
        } else {
          renderProcessProgress(targetProgress);
        }
      });
    });

    // Touch & mouse horizontal drag scrubbing on artwork frame & timeline ticks
    const framesBox = processPin.querySelector('.process__frames');
    [framesBox, processTicks].forEach((scrubSurface) => {
      if (!scrubSurface) return;
      let isScrubbing = false;

      function updateFromPointer(e) {
        const rect = scrubSurface.getBoundingClientRect();
        if (!rect.width) return;
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (processST && window.innerWidth >= 901) {
          const targetScroll = processST.start + (processST.end - processST.start) * ratio;
          window.scrollTo({ top: targetScroll, behavior: 'auto' });
        } else {
          renderProcessProgress(ratio);
        }
      }

      scrubSurface.addEventListener('pointerdown', (e) => {
        isScrubbing = true;
        try { scrubSurface.setPointerCapture(e.pointerId); } catch (_) {}
        updateFromPointer(e);
      });
      scrubSurface.addEventListener('pointermove', (e) => {
        if (!isScrubbing) return;
        updateFromPointer(e);
      });
      const stopScrub = () => { isScrubbing = false; };
      scrubSurface.addEventListener('pointerup', stopScrub);
      scrubSurface.addEventListener('pointercancel', stopScrub);
    });

    window.addEventListener('resize', () => {
      renderProcessProgress(currentProgress);
    }, { passive: true });

    renderProcessProgress(0);
  }

  /* =====================================================================
     13. HEADER THEME & NAV ACTIVE SECTION TRACKING
     ===================================================================== */
  if (hasGSAP && hasScrollTrigger) {
    // Theme switches for dark (#reel) and red (#contact) sections
    document.querySelectorAll('.section[data-theme]').forEach((sec) => {
      const theme = sec.getAttribute('data-theme');
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60px',
        end: 'bottom 60px',
        onEnter: () => header && header.setAttribute('data-theme', theme),
        onEnterBack: () => header && header.setAttribute('data-theme', theme),
        onLeave: () => header && header.removeAttribute('data-theme'),
        onLeaveBack: () => header && header.removeAttribute('data-theme')
      });
    });

    // Active nav link indicator
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    ['reel', 'process', 'work', 'about', 'contact'].forEach((id) => {
      const sec = document.getElementById(id);
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (!self.isActive) return;
          navLinks.forEach((a) => {
            a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    });

    // Subtle parallax on case study items
    if (!prefersReducedMotion) {
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.05;
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // Language proficiency meters
      document.querySelectorAll('.meter i').forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              once: true
            }
          }
        );
      });
    }
  }

  /* =====================================================================
     13B. DOUGA LIGHT-TABLE INSPECTOR (26-DRAWING X-SHEET & ONION SKIN & FINAL CUT)
     ===================================================================== */
  const dougaEl = document.querySelector('[data-douga]');
  let dougaMode = 'line'; // 'line' | 'final'
  if (dougaEl) {
    const TOTAL = 26;
    const DELAYS = [
      125, 125, 125, 125, 125, 125,
      125, 125, 125, 125, 125, 125,
      125, 125, 125, 125, 125, 125,
      125, 250, 125, 125, 250, 125,
      125, 125
    ];
    const MAJOR_TICKS = new Set([0, 6, 12, 19, 22, 25]);

    // Cumulative timing map for exact frame-to-video synchronization (sum = 3.500s)
    const CUMULATIVE_TIMES = [0];
    for (let i = 0; i < TOTAL; i++) {
      CUMULATIVE_TIMES[i + 1] = CUMULATIVE_TIMES[i] + (DELAYS[i] || 125) / 1000;
    }
    const TOTAL_DURATION = CUMULATIVE_TIMES[TOTAL];

    const canvas = dougaEl.querySelector('[data-douga-canvas]');
    const onionCanvas = dougaEl.querySelector('[data-douga-onion]');
    const video = dougaEl.querySelector('[data-douga-video]');
    const stage = dougaEl.querySelector('[data-douga-stage]');
    const ticksHost = dougaEl.querySelector('[data-douga-ticks]');
    const playhead = dougaEl.querySelector('[data-douga-playhead]');
    const scrub = dougaEl.querySelector('[data-douga-scrub]');
    const curReadout = dougaEl.querySelector('[data-douga-cur]');
    const totReadout = dougaEl.querySelector('[data-douga-tot]');
    const sheetCode = dougaEl.querySelector('[data-douga-sheet-code]');
    const onionBadge = dougaEl.querySelector('[data-douga-onion-badge]');
    const specLabel = dougaEl.querySelector('[data-douga-spec-label]');
    const modeBtns = dougaEl.querySelectorAll('[data-douga-mode]');
    const prevBtn = dougaEl.querySelector('[data-douga-prev]');
    const nextBtn = dougaEl.querySelector('[data-douga-next]');
    const toggleBtn = dougaEl.querySelector('[data-douga-toggle]');
    const speedBtn = dougaEl.querySelector('[data-douga-speed]');
    const onionBtn = dougaEl.querySelector('[data-douga-onion-btn]');
    const expandBtn = dougaEl.querySelector('.douga__expand');

    const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
    const octx = onionCanvas ? onionCanvas.getContext('2d', { alpha: false }) : null;

    if (ticksHost) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < TOTAL; i++) {
        const tick = document.createElement('i');
        if (MAJOR_TICKS.has(i)) tick.className = 'major';
        frag.appendChild(tick);
      }
      ticksHost.appendChild(frag);
    }

    const frames = new Array(TOTAL);
    let loadPromise = null;
    let isReady = false;
    let isVisible = false;
    let isPlaying = !prefersReducedMotion;
    let isScrubbing = false;
    let isOnion = false;
    let speed = 1;
    let cur = prefersReducedMotion ? 10 : 0;
    let rafId = 0;
    let lastTime = 0;
    let accMs = 0;

    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(isPlaying));

    function updateReadout() {
      if (dougaMode === 'final') {
        const vTime = video ? (video.currentTime || 0) : (CUMULATIVE_TIMES[cur] || 0);
        const vDur = (video && video.duration && !isNaN(video.duration)) ? video.duration : TOTAL_DURATION;
        const ratio = Math.max(0, Math.min(1, vTime / Math.max(0.1, vDur)));
        if (curReadout) curReadout.textContent = `${vTime.toFixed(1)}s`;
        if (totReadout) totReadout.textContent = ` / ${vDur.toFixed(1)}s`;
        if (sheetCode) sheetCode.textContent = 'FINAL';
        if (specLabel) specLabel.textContent = '1080P · 24FPS';
        if (playhead) playhead.style.setProperty('--p', ratio.toFixed(4));
        if (scrub) scrub.setAttribute('aria-valuenow', String(Math.round(ratio * (TOTAL - 1)) + 1));
      } else {
        const label = String(cur + 1).padStart(2, '0');
        if (curReadout) curReadout.textContent = label;
        if (totReadout) totReadout.textContent = '/26';
        if (sheetCode) sheetCode.textContent = `A-${label}`;
        if (specLabel) specLabel.textContent = '24FPS · 3KOMA';
        if (playhead) playhead.style.setProperty('--p', (cur / (TOTAL - 1)).toFixed(4));
        if (scrub) scrub.setAttribute('aria-valuenow', String(cur + 1));
        if (onionBadge && isOnion) {
          const prevNum = String(((cur - 1 + TOTAL) % TOTAL) + 1).padStart(2, '0');
          onionBadge.textContent = `ONION · PREV A-${prevNum}`;
        }
      }
    }

    function draw() {
      updateReadout();
      if (!isReady || !ctx || !frames[cur]) return;
      ctx.drawImage(frames[cur], 0, 0, canvas.width, canvas.height);

      if (isOnion && octx && onionCanvas) {
        const prev = (cur - 1 + TOTAL) % TOTAL;
        if (frames[prev]) {
          octx.globalCompositeOperation = 'source-over';
          octx.drawImage(frames[prev], 0, 0, onionCanvas.width, onionCanvas.height);
          // Screen-tint dark strokes to studio light-table cyan while keeping #fff snow white
          octx.globalCompositeOperation = 'screen';
          octx.fillStyle = '#18b6ff';
          octx.fillRect(0, 0, onionCanvas.width, onionCanvas.height);
        }
      }
    }

    function stopLoop() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function tick(now) {
      if (!isPlaying || !isVisible || !isReady || isScrubbing || dougaMode === 'final') {
        rafId = 0;
        return;
      }
      if (!lastTime) lastTime = now;
      const dt = Math.min(now - lastTime, 300);
      lastTime = now;
      accMs += dt;

      const targetDelay = (DELAYS[cur] || 125) / speed;
      if (accMs >= targetDelay) {
        accMs %= targetDelay;
        cur = (cur + 1) % TOTAL;
        draw();
      }
      rafId = requestAnimationFrame(tick);
    }

    function syncLoop() {
      if (dougaMode === 'final') {
        stopLoop();
        if (video) {
          if (isPlaying && isVisible && !isScrubbing) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
        return;
      }

      if (isPlaying && isVisible && isReady && !isScrubbing) {
        if (!rafId) {
          lastTime = 0;
          rafId = requestAnimationFrame(tick);
        }
      } else {
        stopLoop();
      }
    }

    function preloadFrames() {
      if (loadPromise) return loadPromise;
      loadPromise = Promise.all(
        Array.from({ length: TOTAL }, (_, i) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = `assets/img/douga/f${String(i + 1).padStart(2, '0')}.webp`;
          frames[i] = img;
          return (img.decode ? img.decode() : new Promise((res) => { img.onload = res; img.onerror = res; })).catch(() => {});
        })
      ).then(() => {
        isReady = true;
        dougaEl.classList.add('is-ready');
        draw();
        syncLoop();
      });
      return loadPromise;
    }

    function setPlaying(nextState) {
      isPlaying = nextState;
      if (toggleBtn) toggleBtn.setAttribute('aria-pressed', String(isPlaying));
      if (dougaMode === 'final' && video) {
        if (isPlaying) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      } else {
        if (isPlaying) preloadFrames();
        syncLoop();
      }
    }

    function setMode(nextMode) {
      if (dougaMode === nextMode) return;
      dougaMode = nextMode;
      dougaEl.dataset.dougaMode = dougaMode;
      if (expandBtn) expandBtn.dataset.currentMode = dougaMode;

      modeBtns.forEach((b) => {
        const isAct = b.getAttribute('data-douga-mode') === dougaMode;
        b.classList.toggle('is-active', isAct);
        b.setAttribute('aria-selected', String(isAct));
      });
      dougaEl.classList.toggle('is-final', dougaMode === 'final');

      if (dougaMode === 'final') {
        stopLoop();
        if (video) {
          video.playbackRate = speed;
          const targetTime = Math.min(TOTAL_DURATION - 0.05, CUMULATIVE_TIMES[cur] || 0);
          try { video.currentTime = targetTime; } catch (_) {}
          if (isPlaying && isVisible) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      } else {
        if (video) {
          const vTime = video.currentTime || 0;
          let matchedIdx = 0;
          for (let i = 0; i < TOTAL; i++) {
            if (vTime >= CUMULATIVE_TIMES[i] && vTime < CUMULATIVE_TIMES[i + 1]) {
              matchedIdx = i;
              break;
            }
          }
          cur = matchedIdx;
          video.pause();
        }
        preloadFrames().then(() => {
          draw();
          syncLoop();
        });
      }
      updateReadout();
    }

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = btn.getAttribute('data-douga-mode');
        if (target) setMode(target);
      });
    });

    if (video) {
      video.addEventListener('timeupdate', () => {
        if (dougaMode === 'final' && !isScrubbing) {
          updateReadout();
        }
      });
      video.addEventListener('ended', () => {
        if (video.hasAttribute('loop')) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      });
    }

    function stepBy(delta) {
      setPlaying(false);
      if (dougaMode === 'final' && video) {
        const nextTime = Math.max(0, Math.min(TOTAL_DURATION - 0.04, (video.currentTime || 0) + delta * 0.125));
        video.currentTime = nextTime;
        updateReadout();
      } else {
        preloadFrames().then(() => {
          cur = (cur + delta + TOTAL) % TOTAL;
          draw();
        });
      }
    }

    if ('IntersectionObserver' in window) {
      const preloadIO = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          preloadFrames();
          if (video) video.load();
          preloadIO.disconnect();
        }
      }, { rootMargin: '1200px 0px' });
      preloadIO.observe(dougaEl);

      const visIO = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
          syncLoop();
        });
      }, { threshold: 0.05 });
      visIO.observe(dougaEl);
    } else {
      isVisible = true;
      preloadFrames();
      if (video) video.load();
    }

    if (toggleBtn) toggleBtn.addEventListener('click', () => setPlaying(!isPlaying));
    if (prevBtn) prevBtn.addEventListener('click', () => stepBy(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => stepBy(1));

    if (stage) {
      stage.addEventListener('click', () => setPlaying(!isPlaying));
      stage.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setPlaying(!isPlaying);
        }
      });
    }

    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        speed = speed === 1 ? 0.5 : 1;
        speedBtn.textContent = speed === 1 ? '1×' : '0.5×';
        speedBtn.classList.toggle('is-active', speed !== 1);
        if (video) video.playbackRate = speed;
      });
    }

    if (onionBtn) {
      onionBtn.addEventListener('click', () => {
        if (dougaMode === 'final') return;
        isOnion = !isOnion;
        onionBtn.setAttribute('aria-pressed', String(isOnion));
        dougaEl.classList.toggle('is-onion', isOnion);
        preloadFrames().then(draw);
      });
    }

    if (scrub) {
      const seekFromEvent = (clientX) => {
        const r = scrub.getBoundingClientRect();
        if (!r.width) return;
        const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
        if (dougaMode === 'final' && video) {
          const vDur = (video.duration && !isNaN(video.duration)) ? video.duration : TOTAL_DURATION;
          video.currentTime = p * vDur;
          updateReadout();
        } else {
          const idx = Math.round(p * (TOTAL - 1));
          if (idx !== cur) {
            cur = idx;
            draw();
          }
        }
      };

      scrub.addEventListener('pointerdown', (e) => {
        isScrubbing = true;
        setPlaying(false);
        if (scrub.setPointerCapture) {
          try { scrub.setPointerCapture(e.pointerId); } catch (_) {}
        }
        if (dougaMode === 'final') {
          seekFromEvent(e.clientX);
        } else {
          preloadFrames().then(() => seekFromEvent(e.clientX));
        }
      });
      scrub.addEventListener('pointermove', (e) => {
        if (!isScrubbing) return;
        seekFromEvent(e.clientX);
      });
      const endScrub = () => {
        if (!isScrubbing) return;
        isScrubbing = false;
      };
      scrub.addEventListener('pointerup', endScrub);
      scrub.addEventListener('pointercancel', endScrub);

      scrub.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); stepBy(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); stepBy(1); }
        else if (e.key === 'Home') {
          e.preventDefault();
          setPlaying(false);
          if (dougaMode === 'final' && video) { video.currentTime = 0; updateReadout(); }
          else { cur = 0; draw(); }
        }
        else if (e.key === 'End') {
          e.preventDefault();
          setPlaying(false);
          if (dougaMode === 'final' && video) { video.currentTime = TOTAL_DURATION - 0.05; updateReadout(); }
          else { cur = TOTAL - 1; draw(); }
        }
      });
    }

    updateReadout();
  }

  /* =====================================================================
     14. HIGH-RES LIGHTBOX VIEWER
     ===================================================================== */
  const lbDialog = document.querySelector('[data-lightbox-dialog]');
  const lbButtons = Array.from(document.querySelectorAll('[data-lightbox]'));

  if (lbDialog && lbButtons.length) {
    const lbImg = lbDialog.querySelector('[data-lb-img]');
    const lbVideo = lbDialog.querySelector('[data-lb-video]');
    const lbCap = lbDialog.querySelector('[data-lb-cap]');
    const lbCount = lbDialog.querySelector('[data-lb-count]');
    const lbStage = lbDialog.querySelector('[data-lb-stage]');
    const lbClose = lbDialog.querySelector('[data-lb-close]');
    const lbPrev = lbDialog.querySelector('[data-lb-prev]');
    const lbNext = lbDialog.querySelector('[data-lb-next]');
    let lbIndex = 0;

    function showLightboxItem(index) {
      lbIndex = (index + lbButtons.length) % lbButtons.length;
      const btn = lbButtons[lbIndex];
      const fullSrc = btn.getAttribute('data-full');
      const videoSrc = btn.getAttribute('data-video');
      const capKey = btn.getAttribute('data-cap');
      const thumbImg = btn.querySelector('img');

      const isDougaExpand = btn.classList.contains('douga__expand');
      const isVideoItem = Boolean(videoSrc && (btn.dataset.currentMode === 'final' || (!isDougaExpand && videoSrc)));

      if (lbStage) lbStage.classList.remove('is-zoomed');

      if (isVideoItem && lbVideo) {
        lbDialog.classList.add('is-video');
        if (lbImg) lbImg.style.display = 'none';
        lbVideo.style.display = 'block';
        lbVideo.src = videoSrc;
        lbVideo.currentTime = 0;
        lbVideo.play().catch(() => {});
      } else {
        lbDialog.classList.remove('is-video');
        if (lbVideo) {
          lbVideo.pause();
          lbVideo.removeAttribute('src');
          lbVideo.load();
          lbVideo.style.display = 'none';
        }
        if (lbImg) {
          lbImg.style.display = 'block';
          lbImg.style.opacity = '0.2';
          lbImg.src = fullSrc;
          lbImg.alt = thumbImg ? thumbImg.alt : (capKey ? t(capKey) : '');
          lbImg.onload = () => {
            lbImg.style.opacity = '1';
          };
        }
      }

      if (lbCap) lbCap.textContent = capKey ? t(capKey) : '';
      if (lbCount) {
        lbCount.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(lbButtons.length).padStart(2, '0')}`;
      }
    }

    function openLightbox(index) {
      showLightboxItem(index);
      if (typeof lbDialog.showModal === 'function') {
        lbDialog.showModal();
      } else {
        lbDialog.setAttribute('open', '');
      }
      if (lenis) lenis.stop();
    }

    function closeLightbox() {
      if (lbVideo) {
        lbVideo.pause();
        lbVideo.removeAttribute('src');
        lbVideo.load();
      }
      if (typeof lbDialog.close === 'function' && lbDialog.open) {
        lbDialog.close();
      } else {
        lbDialog.removeAttribute('open');
      }
      if (lenis) lenis.start();
    }

    lbButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => openLightbox(idx));
    });

    const gengaStage = document.querySelector('.genga__stage');
    const gengaExpand = document.querySelector('.genga__expand');
    if (gengaStage && gengaExpand) {
      gengaStage.addEventListener('click', () => gengaExpand.click());
    }

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', () => showLightboxItem(lbIndex - 1));
    if (lbNext) lbNext.addEventListener('click', () => showLightboxItem(lbIndex + 1));

    if (lbImg && lbStage) {
      lbImg.addEventListener('click', (e) => {
        e.stopPropagation();
        lbStage.classList.toggle('is-zoomed');
      });
      lbStage.addEventListener('click', (e) => {
        if (e.target === lbStage) closeLightbox();
      });
    }

    lbDialog.addEventListener('close', () => {
      if (lbVideo) {
        lbVideo.pause();
        lbVideo.removeAttribute('src');
      }
      if (lenis) lenis.start();
    });

    window.addEventListener('keydown', (e) => {
      if (!lbDialog.open) return;
      if (e.key === 'ArrowLeft') showLightboxItem(lbIndex - 1);
      if (e.key === 'ArrowRight') showLightboxItem(lbIndex + 1);
    });
  }

  /* =====================================================================
     15. 3D PORTRAIT TILT & MAGNETIC BUTTONS
     ===================================================================== */
  if (hasFinePointer && !prefersReducedMotion) {
    const tiltCard = document.querySelector('[data-tilt]');
    if (tiltCard) {
      const inner = tiltCard.querySelector('.about__portrait-inner');
      if (inner) {
        tiltCard.addEventListener('pointermove', (e) => {
          const r = tiltCard.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          inner.style.transform = `rotateY(${(nx * 10).toFixed(2)}deg) rotateX(${(-ny * 10).toFixed(2)}deg)`;
        });
        tiltCard.addEventListener('pointerleave', () => {
          inner.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
          inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
          setTimeout(() => { inner.style.transition = ''; }, 600);
        });
      }
    }

    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.25;
        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = 'translate(0px, 0px)';
        setTimeout(() => { el.style.transition = ''; }, 500);
      });
    });
  }

  /* =====================================================================
     16. CUSTOM CURSOR
     ===================================================================== */
  const cursor = document.querySelector('[data-cursor-el]');
  if (cursor && hasFinePointer && !prefersReducedMotion) {
    html.classList.add('has-cursor');
    const ring = cursor.querySelector('.cursor__ring');
    const dot = cursor.querySelector('.cursor__dot');
    const label = cursor.querySelector('[data-cursor-label]');

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    window.addEventListener('pointermove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      const darkSec = e.target && e.target.closest ? e.target.closest('[data-theme="dark"]') : null;
      cursor.classList.toggle('on-dark', Boolean(darkSec));
    }, { passive: true });

    function tickCursor() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
      requestAnimationFrame(tickCursor);
    }
    requestAnimationFrame(tickCursor);

    document.querySelectorAll('a, button').forEach((el) => {
      if (el.hasAttribute('data-cursor')) return;
      el.addEventListener('pointerenter', () => cursor.classList.add('is-link'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-link'));
    });

    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => {
        const type = el.getAttribute('data-cursor');
        if (type === 'peek') {
          cursor.classList.add('is-hidden');
          return;
        }
        if (label) label.textContent = t(`cursor.${type}`);
        cursor.classList.add('is-label');
      });
      el.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-label', 'is-hidden');
      });
    });
  }

  /* =====================================================================
     17. COPY EMAIL TOAST
     ===================================================================== */
  const copyBtn = document.querySelector('[data-copy]');
  const toast = document.querySelector('[data-toast]');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2600);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-copy') || 'rikun113@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      showToast(t('toast.copied'));
    });
  }

  /* =====================================================================
     18. BOOTSTRAP
     ===================================================================== */
  try {
    setupTextSplits(false);
    runHeroEntrance();
  } catch (err) {
    console.error(err);
    if (loader) loader.classList.add('is-done');
    html.classList.remove('motion');
  }
})();
