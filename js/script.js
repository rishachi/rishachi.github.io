// script.js

// --- TEXT SCRAMBLE EFFECT CLASS ---
class TextScrambleEffect {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾀｹｻﾃｻﾑﾚﾆﾀﾅ';
    this.update = this.update.bind(this);
  }

  setText(newText, scrambleDuration = 800, charsPerFrame = 1) {
    const oldText = this.el.textContent;
    const length = Math.max(oldText.length, newText.length);
    this.promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 60);
      const end = start + Math.floor(Math.random() * 60) + 20;
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.scrambleDuration = scrambleDuration;
    this.charsPerFrame = charsPerFrame;
    this.update();
    return this.promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.4) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    this.el.textContent = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
// --- END TEXT SCRAMBLE EFFECT CLASS ---

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const introOverlay = document.getElementById('intro-overlay');
    const introNameEl = document.querySelector('#intro-overlay .intro-name-yr');
    let introDuration = 1800; // Default intro duration

    if (introOverlay && introNameEl) {
        const introScrambler = new TextScrambleEffect(introNameEl);
        const originalIntroText = introNameEl.dataset.text || 'PHAT.TRAN';
        introNameEl.textContent = '';

        const introScrambleTime = 1200;
        introDuration += introScrambleTime; // Add scramble time to total intro

        gsap.fromTo(introNameEl,
            { autoAlpha: 0, y: 10 },
            {
                autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.4,
                onComplete: () => {
                    setTimeout(() => {
                        introScrambler.setText(originalIntroText, introScrambleTime);
                    }, 50);
                }
            }
        );
    }
     if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hidden');
        }, introDuration);
    }


    function updateYears() {
        const currentYear = new Date().getFullYear().toString();
        const footerYearSpan = document.getElementById('footer-current-year');
        if (footerYearSpan) footerYearSpan.textContent = currentYear;
        const heroYearSpan = document.getElementById('hero-current-year');
        if (heroYearSpan) heroYearSpan.textContent = currentYear;
    }
    updateYears();

    const canvas = document.getElementById('visualizer-bg');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 70;
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        const rootStyles = getComputedStyle(document.documentElement);
        let particleBaseColorStr = rootStyles.getPropertyValue('--accent-color-yr').trim() || '#0052D4';
        let R_PARTICLE = 0, G_PARTICLE = 0, B_PARTICLE = 0;
        if (particleBaseColorStr.startsWith('#')) { R_PARTICLE = parseInt(particleBaseColorStr.slice(1, 3), 16); G_PARTICLE = parseInt(particleBaseColorStr.slice(3, 5), 16); B_PARTICLE = parseInt(particleBaseColorStr.slice(5, 7), 16);
        } else if (particleBaseColorStr.startsWith('rgb')) { const match = particleBaseColorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if (match) { R_PARTICLE = parseInt(match[1]); G_PARTICLE = parseInt(match[2]); B_PARTICLE = parseInt(match[3]); } }
        class Particle { /* ... Particle class logic from previous response ... */ 
            constructor(x, y) { this.x = x || Math.random() * canvas.width; this.y = y || Math.random() * canvas.height; this.size = Math.random() * 1.2 + 0.3; this.speedX = (Math.random() * 0.2 - 0.1) * 0.6; this.speedY = (Math.random() * 0.2 - 0.1) * 0.6; this.opacity = Math.random() * 0.12 + 0.02; this.life = Math.random() * 250 + 150; this.initialLife = this.life; }
            update() { this.x += this.speedX; this.y += this.speedY; this.life -= 1; if (this.life < this.initialLife / 2) { this.opacity = (this.life / (this.initialLife / 2)) * (Math.random() * 0.1 + 0.02) ; } }
            draw() { ctx.fillStyle = `rgba(${R_PARTICLE}, ${G_PARTICLE}, ${B_PARTICLE}, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        function initParticles() { particles = []; for (let i = 0; i < numParticles; i++) { particles.push(new Particle()); } }
        initParticles();
        function animateParticles() { if (!canvas || !canvas.isConnected) return; ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); if (particles[i].life <= 0 || particles[i].x < -particles[i].size || particles[i].x > canvas.width + particles[i].size || particles[i].y < -particles[i].size || particles[i].y > canvas.height + particles[i].size) { particles.splice(i, 1); i--; if (particles.length < numParticles) { particles.push(new Particle()); } } } requestAnimationFrame(animateParticles); }
        if (canvas && canvas.isConnected) { animateParticles(); }
    }

    const currentYearValForTranslations = new Date().getFullYear().toString();
    const translations = {
        navHome: { en: "HOME", vi: "TRANG CHỦ", ja: "ホーム" }, navAbout: { en: "PROFILE", vi: "HỒ SƠ", ja: "プロフィール" }, navProjects: { en: "WORKS", vi: "SẢN PHẨM", ja: "作品" }, navContact: { en: "CONTACT", vi: "LIÊN HỆ", ja: "連絡先" },
        menuOpenLabel: { en: "Menu", vi: "Menu", ja: "メニュー" }, menuCloseLabel: { en: "Close", vi: "Đóng", ja: "閉じる" },
        heroRole: { en: "2D Animator // Illustrator", vi: "2D Animator // Hoạ Sĩ Minh Hoạ", ja: "2Dアニメーター // イラストレーター" }, heroNicknameFull: { en: "Hachi // 八", vi: "Hachi // 八", ja: "Hachi // 八" },
        heroTagline1: { en: "BRINGING", vi: "ĐEM", ja: "命を" }, heroTagline2: { en: "-IMAGINATION", vi: "-TRÍ TƯỞNG TƯỢNG", ja: "吹き込む" }, heroTagline3: { en: "TO LIFE_", vi: "VÀO CUỘC SỐNG_", ja: "創造_" },
        heroVTLeft: { en: `PORTFOLIO<br>// VER. 2.2`, vi: `PORTFOLIO<br>// VER. 2.2`, ja: `PORTFOLIO<br>// VER. 2.2`}, heroVTBottomRight: { en: `© ${currentYearValForTranslations} PHAT TRAN`, vi: `© ${currentYearValForTranslations} PHAT TRAN`, ja: `© ${currentYearValForTranslations} PHAT TRAN`},
        scrollDown: { en: "SCROLL", vi: "CUỘN XUỐNG", ja: "スクロール" },
        aboutTitle: { en: "[01] PROFILE", vi: "[01] HỒ SƠ", ja: "[01] プロフィール" },
        aboutP1: { en: "Hello! I'm Phat Tran (you can also call me RiSH), a passionate <strong>2D Animator and Illustrator</strong> with a deep love for the art of Japanese animation. My focus is on dynamic character animation, expressive storytelling, and creating visuals that resonate with the vibrant energy of anime.", vi: "Xin chào! Tôi là Phát Trần (bạn cũng có thể gọi tôi là RiSH), một <strong>2D Animator và Hoạ Sĩ Minh Hoạ</strong> đầy nhiệt huyết với tình yêu sâu sắc dành cho nghệ thuật hoạt hình Nhật Bản. Tôi tập trung vào hoạt hình nhân vật động, kể chuyện biểu cảm, và tạo ra hình ảnh cộng hưởng với năng lượng sống động của anime.", ja: "こんにちは！ファット・トラン（RiSHとも呼ばれています）です。日本のアニメーション芸術に深い愛情を注ぐ、情熱的な<strong>2Dアニメーター兼イラストレーター</strong>です。ダイナミックなキャラクターアニメーション、表現力豊かなストーリーテリング、そしてアニメの活気に満ちたエネルギーと共鳴するビジュアルの創造に焦点を当てています。" },
        aboutP3: { en: "Whether it's crafting fluid keyframes, designing captivating characters, or illustrating immersive scenes, my goal is to contribute to projects that inspire and entertain. I'm always eager to learn and collaborate on exciting new ventures.", vi: "Dù là tạo ra các keyframe mượt mà, thiết kế nhân vật hấp dẫn, hay minh họa các cảnh sống động, mục tiêu của tôi là đóng góp vào các dự án truyền cảm hứng và giải trí. Tôi luôn sẵn sàng học hỏi và hợp tác trong các dự án mới thú vị.", ja: "流れるようなキーフレームの作成、魅力的なキャラクターのデザイン、没入感のあるシーンのイラストレーションなど、私の目標は、インスピレーションを与え、楽しませるプロジェクトに貢献することです。常に新しいエキサイティングな事業について学び、協力することに意欲的です。" },
        skillsTitle: { en: "Core Skills & Expertise", vi: "Kỹ Năng & Chuyên Môn Cốt Lõi", ja: "コアスキルと専門知識" },
        hardSkillsTitle: { en: "Core Technical Foundation", vi: "Nền Tảng Kỹ Thuật Cốt Lõi", ja: "中核となる専門技術" },
        skillCatAnimationFocus: { en: "Core skills ", vi: "Kỹ năng chủ chốt", ja: "コアスキル" },
        skillAnimMain: { en: "2D Character Animation & Storytelling Principles", vi: "Nguyên Tắc Diễn Hoạt Nhân Vật 2D & Kể Chuyện Hình Ảnh", ja: "2Dキャラクターアニメーション及び映像表現の基本原則" },
        skillAnimFX: { en: "Foundational 2D Effects (FX) & Motion Concepts", vi: "Kiến Thức Cơ Bản về Hiệu Ứng 2D (FX) & Chuyển Động", ja: "基礎的な2Dエフェクト・モーション概念" },
        skillCatIllustDesign: { en: "Illustration & Design", vi: "Minh Họa & Thiết Kế", ja: "イラスト・デザイン" },
        skillIllustCore: { en: "Character Design & Illustration Making", vi: "Thiết Kế Nhân Vật & Vẽ Minh Họa", ja: "キャラクターデザイン・イラストメイキング" },
        skillIllustTech: { en: "Digital Painting & Composition Fundamentals", vi: "Vẽ Digital Painting & Nguyên Tắc Bố Cục Cơ Bản", ja: "デジタルペイント・構図の基礎" },
        skillCatSoftware: { en: "Software Proficiency", vi: "Thành Thạo Phần Mềm", ja: "ソフトウェア" },
        skillSoftwareNote: { en: "Proficient with key industry software for 2D animation, post-production and illustration.", vi: "Thành thạo các phần mềm tiêu chuẩn trong ngành cho hoạt hình 2D, hậu kỳ và minh họa.", ja: "2Dアニメーション、ポストプロダクション、イラスト制作における業界標準ソフトに精通。" },
        skillCatLanguages: { en: "Languages", vi: "Ngôn Ngữ", ja: "言語" },
        skillLang1: { en: "Vietnamese (Native)", vi: "Tiếng Việt (Bản xứ)", ja: "ベトナム語（ネイティブ）" }, skillLang2: { en: "English (Fluent)", vi: "Tiếng Anh (Lưu loát)", ja: "英語（流暢）" }, skillLang3: { en: "Japanese (Intermediate)", vi: "Tiếng Nhật (Trung cấp)", ja: "日本語（中級）" },
        softSkillsTitle: { en: "Professional Mindset & Approach", vi: "Tư Duy & Phong Cách Làm Việc Chuyên Nghiệp", ja: "プロフェッショナルな姿勢と取り組み方" },
        skillCatCoreAttributes: { en: "Core Attributes", vi: "Phẩm Chất Cốt Lõi", ja: "中核資質" },
        softSkillLearnPassion: { en: "Passion for Animation & Commitment to Continuous Learning", vi: "Niềm đam mê dành cho Animation & cam kết học hỏi không ngừng", ja: "アニメへの情熱と継続的な学習意欲" },
        softSkillTeamDetail: { en: "Detail-Oriented Team Player, Open to Feedback", vi: "Tinh Thần Đồng Đội, Chú Trọng Chi Tiết & Sẵn Sàng Tiếp Thu Góp Ý", ja: "細部重視のチームプレーヤー、フィードバックを歓迎" },
        softSkillAdaptProactive: { en: "Proactive & Adaptable in Dynamic Environments", vi: "Chủ Động & Thích Nghi Tốt trong Môi Trường Năng Động", ja: "ダイナミックな環境での積極性と適応力" },
        softSkillCommsRespect: { en: "Clear, Respectful, and Considerate Communication", vi: "Giao Tiếp Rõ Ràng, Tôn Trọng và Chu Đáo", ja: "明確かつ他者を尊重する丁寧な意思疎通" },
        aboutLocationNew: { en: "GLOBAL COLLABORATOR", vi: "CỘNG TÁC TOÀN CẦU", ja: "グローバルコラボレーター" },
        projectsTitle: { en: "[02] WORKS // SHOWCASE", vi: "[02] TÁC PHẨM // TRƯNG BÀY", ja: "[02] 作品 // ショーケース" },
        worksAnimTitle: { en: "ANIMATION REEL", vi: "ANIMATION REEL", ja: "アニメーションリール" }, worksReelNote: { en: "My animation from 2024", vi: "Animation của tôi trong năm 2024", ja: "2024年の私のアニメーション" },
        worksIllustTitle: { en: "ILLUSTRATION GALLERY", vi: "ILLUSTRATION GALLERY", ja: "ILLUSTRATION GALLERY" },
        illust1Title: { en: "Aoi", vi: "Aoi", ja: "葵" }, illust1Desc: { en: "Original character design for personal animation project.", vi: "Thiết kế nhân vật gốc cho dự án hoạt hình cá nhân.", ja: "個人アニメーションプロジェクトのためのオリジナルキャラクターデザイン。" },
        illust2Title: { en: "FERN AND FRIEREN", vi: "FERN VÀ FRIEREN", ja: "フェルンとフリーレン " }, illust2Desc: { en: "A fan art about anime Frieren: Beyond Journey's End", vi: "Một bức tranh fan art về anime Frieren: Beyond Journey's End.", ja: "アニメ「葬送のフリーレン」に関するファンアート。" },
        illust3Title: { en: "PERSONAL PROJECT STANDEE", vi: "STANDEE CHO PROJECT CÁ NHÂN", ja: "個人プロジェクトスタンディー" }, illust3Desc: { en: "A standee design for my personal project.", vi: "Thiết kế standee cho đồ án cá nhân của tôi.", ja: "個人プロジェクト用のスタンディデザイン。" },
        illust4Title: { en: "POSTER AKARI - GET SET RUN", vi: "POSTER AKARI - VÀO ĐÀ", ja: "ポスター 明- よーい、ドン！" }, illust4Desc: { en: "A poster design for my personal project.", vi: "Một thiết kế poster cho đồ án cá nhân của tôi.", ja: "個人プロジェクト用ポスター。" },
        viewDetail: { en: "VIEW DETAIL >>", vi: "XEM CHI TIẾT >>", ja: "詳細を見る >>"}, viewProjectHover: { en: "View Project", vi: "Xem Dự Án", ja: "プロジェクトを見る"},
        contactTitle: { en: "[03] CONTACT & LINKS", vi: "[03] LIÊN HỆ & LIÊN KẾT", ja: "[03] 連絡先とリンク" },
        contactIntro: { en: "OPEN FOR OPPORTUNITIES & COLLABORATIONS.<br>LET'S CREATE SOMETHING AMAZING TOGETHER!", vi: "SẴN SÀNG CHO CÁC CƠ HỘI & HỢP TÁC.<br>HÃY CÙNG NHAU TẠO NÊN ĐIỀU TUYỆT VỜI!", ja: "新しい機会やコラボレーションを歓迎します。<br>一緒に素晴らしいものを創造しましょう！" },
        contactButton: { en: "SEND_EMAIL_MESSAGE", vi: "GỬI_TIN NHẮN_EMAIL", ja: "メール送信" },
        footerRights: { en: `© ${currentYearValForTranslations} PHAT TRAN // ANIMATOR & ILLUSTRATOR. ALL RIGHTS RESERVED.`, vi: `© ${currentYearValForTranslations} PHAT TRAN // ANIMATOR & ILLUSTRATOR. ALL RIGHTS RESERVED.`, ja: `© ${currentYearValForTranslations} PHAT TRAN // ANIMATOR & ILLUSTRATOR. ALL RIGHTS RESERVED.` },
        modalClose: { en: "CLOSE [X]", vi: "ĐÓNG [X]", ja: "閉じる [X]" },
        slide1Alt: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide1Title: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide1Desc: { en: "Sketch out the key animation.", vi: "Phác thảo khung hình chính.", ja: "キーアニメーションをスケッチする。" },
        slide2Alt: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide2Title: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide2Desc: { en: "Cleaning, adding in-beetween animation and shading.", vi: "Làm sạch, thêm hoạt hình trung gian và đổ bóng.", ja: "クリーンアップ、中割りアニメーションと影付けを行う。" },
        slide3Alt: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide3Title: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide3Desc: { en: "Coloring with the original color palette.", vi: "Tô màu bằng bảng màu gốc.", ja: "元のカラーパレットで色を塗る。" },
        slide4Alt: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide4Title: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide4Desc: { en: "Combine all cels together.", vi: "Kết hợp tất cả các lớp cel lại với nhau.", ja: "すべてのセル画を組み合わせる。" },
        slide5Alt: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "キ私のアニメーションプロセス" }, slide5Title: { en: "My animation process", vi: "Quá trình tôi diễn hoạt", ja: "私のアニメーションプロセス" }, slide5Desc: { en: "Adding filters and effects for the final look.", vi: "Thêm bộ lọc và hiệu ứng cho hình ảnh cuối cùng.", ja: "最終的な見た目のためにフィルターと効果を追加する。" },
        slideNavPrevLabel: { en: "Previous Slide", vi: "Slide Trước", ja: "前のスライド" }, slideNavNextLabel: { en: "Next Slide", vi: "Slide Kế", ja: "次のスライド" }
    };

    const menuScramblers = {};
    const menuLinkSelectors = '#main-navigation-yr .nav-link > span, .menu-links .link a';

    window.setLanguage = function(lang) {
        updateYears();
        const currentYear = new Date().getFullYear().toString();
        document.querySelectorAll('[data-translation-key]').forEach(el => {
            const key = el.dataset.translationKey;
            let translation = translations[key] && translations[key][lang];
            if (translation) {
                if (typeof translation === 'string') {
                    translation = translation.replace(/\{\{YEAR\}\}/g, currentYear);
                    if (key === "heroVTBottomRight" || key === "footerRights") {
                         translation = translation.replace(/\d{4}/, currentYear);
                    }
                }
                let targetElement = el;
                const innerSpan = el.querySelector('span:not([id*="year"]):not([data-translation-key])');

                // Xử lý scramble cho các text trang trí cần dịch
                if (el.classList.contains('deco-text-yr-scramble-target') ||
                    el.classList.contains('hero-deco-text-scramble-target') ||
                    el.classList.contains('hero-vertical-text-scramble-target') ||
                    el.classList.contains('hero-char-label-scramble-target')
                ) {
                    targetElement = el.querySelector('span') || el; // Target span bên trong nếu có
                    if (targetElement) {
                        let textToSet = typeof translation === 'string' ? translation.replace(/<[^>]*>?/gm, '') : '';
                        if (targetElement.scramblerInstance) {
                            targetElement.scramblerInstance.setText(textToSet, 600);
                        } else { // Nếu chưa có scrambler (ví dụ khi load lần đầu), chỉ set text
                            targetElement.textContent = textToSet;
                        }
                    }
                    return; // Bỏ qua các xử lý khác cho element này
                }


                if (el.tagName === 'BUTTON' && (el.classList.contains('lang-btn'))) {
                     el.textContent = translation;
                } else if (el.tagName === 'BUTTON' && (key === 'slideNavPrevLabel' || key === 'slideNavNextLabel' || key === "modalClose")) {
                    el.setAttribute('aria-label', translation);
                    el.setAttribute('title', translation);
                    if(key==="modalClose") el.textContent = translation;
                } else if (el.id === 'menu-open' || el.id === 'menu-close') {
                    el.textContent = translation;
                }
                 else if (innerSpan && (el.classList.contains('nav-link') || el.classList.contains('scroll-down-indicator') || el.classList.contains('section-title-yr') || el.classList.contains('cta-button-yr') || el.classList.contains('hero-yr-vertical-text'))) {
                     targetElement = innerSpan;
                     if (typeof translation === 'string' && translation.includes('<') && translation.includes('>')) { targetElement.innerHTML = translation;}
                     else {targetElement.textContent = translation;}
                } else if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
                    targetElement.placeholder = translation;
                } else if (targetElement.tagName === 'IMG' && key.endsWith('Alt')) {
                    targetElement.alt = translation;
                }
                 else {
                    if (typeof translation === 'string' && translation.includes('<') && translation.includes('>')) {
                        targetElement.innerHTML = translation;
                    } else {
                        targetElement.textContent = translation;
                    }
                }

                // Cập nhật data-text cho các element có hiệu ứng hover (không phải scrambler)
                if (el.dataset.text !== undefined && targetElement.tagName !== 'IMG' && !(el.tagName === 'BUTTON' && (key === 'slideNavPrevLabel' || key === 'slideNavNextLabel')) && el.id !== 'menu-open' && el.id !== 'menu-close' ) {
                    let dataTextTranslation = (typeof translation === 'string') ? translation.replace(/<[^>]*>?/gm, '').replace(/\d{4}/, currentYear) : '';
                     if ((key === "navHome" || key === "navAbout" || key === "navProjects" || key === "navContact") && el.classList.contains('nav-link')) {
                        const spanInNavLink = el.querySelector('span');
                        if (spanInNavLink) {
                           dataTextTranslation = spanInNavLink.textContent; // Lấy text đã được dịch từ span
                        } else {
                           dataTextTranslation = el.textContent;
                        }
                    }
                    el.dataset.text = dataTextTranslation;
                }
            }
        });
        if (localStorage) localStorage.setItem('preferredLanguage', lang);
        document.querySelectorAll('.lang-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.lang === lang); });
        const infoModalElement = document.getElementById('info-modal');
        if (infoModalElement && infoModalElement.style.display === 'flex') { // Kiểm tra modal đang hiển thị
            const currentArticleId = infoModalElement.dataset.currentArticleId;
            if (currentArticleId) displayUpdateInModal(currentArticleId, lang);
        }

        // Cập nhật text cho menu scramblers
        document.querySelectorAll(menuLinkSelectors).forEach(textElement => {
            const key = textElement.closest('[data-translation-key]')?.dataset.translationKey || textElement.dataset.translationKey;
            if (key && translations[key] && translations[key][lang]) {
                let translatedText = translations[key][lang];
                textElement.textContent = typeof translatedText === 'string' ? translatedText.replace(/<[^>]*>?/gm, '') : textElement.textContent;
                if (menuScramblers[key]) {
                    menuScramblers[key].originalText = textElement.textContent; // Cập nhật text gốc cho scrambler
                }
            }
        });
    };

    const langSwitcherContainer = document.getElementById('language-switcher');
    if (langSwitcherContainer) {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', () => { window.setLanguage(button.dataset.lang); });
        });
    }
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';

    const slideshowGallery = document.getElementById('hero-slideshow-gallery');
    if (slideshowGallery) { /* ... Hero Slideshow logic from previous response ... */
        const slides = slideshowGallery.querySelectorAll('.slide-yr');
        const prevButton = slideshowGallery.querySelector('.slide-yr-nav.prev');
        const nextButton = slideshowGallery.querySelector('.slide-yr-nav.next');
        const dotsContainer = slideshowGallery.querySelector('.slide-yr-dots');
        let currentSlide = 0; let autoPlayInterval; const autoPlayDelay = 5000;
        function showSlide(index) {
            slides.forEach((slide, i) => {
                gsap.to(slide, { autoAlpha: i === index ? 1 : 0, duration: 0.7, ease: "power2.inOut" });
                slide.classList.toggle('active', i === index);
                if (i === index) {
                    const title = slide.querySelector('.slide-yr-title');
                    const desc = slide.querySelector('.slide-yr-description');
                    const tl = gsap.timeline();
                    if (title) tl.fromTo(title, { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.2, ease: "circ.out" }, 0);
                    if (desc) tl.fromTo(desc, { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, delay: 0.3, ease: "circ.out" }, 0);
                }
            });
            if (dotsContainer) { const dots = dotsContainer.querySelectorAll('.slide-yr-dot'); dots.forEach((dot, i) => dot.classList.toggle('active', i === index));}
            currentSlide = index;
        }
        function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
        function prevSlide() { showSlide((currentSlide - 1 + slides.length) % slides.length); }
        function startAutoPlay() { stopAutoPlay(); if (slides.length > 1) autoPlayInterval = setInterval(nextSlide, autoPlayDelay); }
        function stopAutoPlay() { clearInterval(autoPlayInterval); }
        if (slides.length > 0) { if (dotsContainer) { slides.forEach((_, i) => { const dot = document.createElement('button'); dot.classList.add('slide-yr-dot'); dot.setAttribute('aria-label', `Go to slide ${i + 1}`); dot.addEventListener('click', () => { showSlide(i); startAutoPlay(); }); dotsContainer.appendChild(dot); });} slides.forEach((slide, i) => gsap.set(slide, { autoAlpha: i === 0 ? 1 : 0 })); if (slides.length > 1) startAutoPlay(); if (nextButton) nextButton.addEventListener('click', () => { nextSlide(); startAutoPlay(); }); if (prevButton) prevButton.addEventListener('click', () => { prevSlide(); startAutoPlay(); }); slideshowGallery.addEventListener('mouseenter', stopAutoPlay); slideshowGallery.addEventListener('mouseleave', startAutoPlay); showSlide(0); }
    }


    const header = document.getElementById('main-header');
    const contentSections = document.querySelectorAll('#page-content-wrapper > main#index-main > section');
    const headerScrollThreshold = 30;
    if (header) { window.addEventListener('scroll', () => { if (window.scrollY > headerScrollThreshold) { header.classList.add('header-scrolled'); } else { header.classList.remove('header-scrolled'); } }, { passive: true }); }
    const oldNavLinks = document.querySelectorAll('#main-navigation-yr .nav-link');
    function updateActiveOldNavLink() { /* ... Old Nav Link logic from previous response ... */
        let currentSectionId = ''; let minDistance = Infinity;
        contentSections.forEach(section => { const rect = section.getBoundingClientRect(); const distanceToTop = Math.abs(rect.top); if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) { if (distanceToTop < minDistance) { minDistance = distanceToTop; currentSectionId = section.id; } } });
        if (!currentSectionId) { contentSections.forEach(section => { const rect = section.getBoundingClientRect(); const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0); if (visibleHeight > window.innerHeight / 3) { currentSectionId = section.id; } });}
        oldNavLinks.forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${currentSectionId}`) { link.classList.add('active'); } });
        if (!currentSectionId && window.scrollY < window.innerHeight * 0.3) { const homeLink = document.querySelector('#main-navigation-yr .nav-link[href="#hero"]'); if (homeLink) { oldNavLinks.forEach(lnk => lnk.classList.remove('active')); homeLink.classList.add('active'); }}
    }
    if (oldNavLinks.length > 0) { window.addEventListener('scroll', updateActiveOldNavLink, { passive: true }); oldNavLinks.forEach(link => { link.addEventListener('click', function(e) { setTimeout(() => { updateActiveOldNavLink(); }, 50); }); }); updateActiveOldNavLink(); }


    // --- Text Scramble for Menu Links ---
    document.querySelectorAll(menuLinkSelectors).forEach(textElement => {
        const key = textElement.closest('[data-translation-key]')?.dataset.translationKey || textElement.dataset.translationKey;
        const scrambler = new TextScrambleEffect(textElement);
        let currentText = textElement.textContent;
        if (key) {
            menuScramblers[key] = { instance: scrambler, originalText: currentText };
        }
        let isScrambling = false;

        textElement.closest('a, button')?.addEventListener('mouseenter', async () => {
            if (isScrambling) return;
            isScrambling = true;
            const textToScramble = menuScramblers[key] ? menuScramblers[key].originalText : textElement.textContent;
            await scrambler.setText(textToScramble, 350); // Shorter scramble for hover
            isScrambling = false;
        });
    });


    const animateWithGsap = (selector, animationProps, scrollTriggerProps = {}) => { /* ... GSAP General Scroll Animation logic from previous response ... */
        gsap.utils.toArray(selector).forEach((elem) => { const delayValue = parseFloat(elem.dataset.delay) || animationProps.staggerDelay || 0; gsap.set(elem, { autoAlpha: 0, ...animationProps.from }); gsap.to(elem, { autoAlpha: 1, duration: animationProps.duration || 0.8, delay: delayValue, ease: animationProps.ease || "power2.out", ...animationProps.to, scrollTrigger: { trigger: elem, start: "top 85%", end: "bottom 15%", toggleActions: "play none none none", ...scrollTriggerProps } }); });
    };
    animateWithGsap(".scroll-fade-in", { from: {}, to: {}, duration: 0.7, ease: "circ.out" });
    animateWithGsap(".scroll-slide-up", { from: { y: 40 }, to: { y: 0 }, duration: 0.8, ease: "expo.out" });
    animateWithGsap(".scroll-slide-left", { from: { x: -40 }, to: { x: 0 }, duration: 0.8, ease: "expo.out" });
    animateWithGsap(".scroll-slide-right", { from: { x: 40 }, to: { x: 0 }, duration: 0.8, ease: "expo.out" });
    animateWithGsap(".scroll-scale-in", { from: { scale: 0.85 }, to: { scale: 1 }, duration: 0.7, ease: "circ.out" });
    const projectCards = gsap.utils.toArray(".project-card-yr.illustration-card.interactive-card");
    if (projectCards.length > 0) { gsap.from(projectCards, { duration: 0.7, autoAlpha: 0, y: 50, scale: 0.95, ease: "expo.out", stagger: 0.15, scrollTrigger: { trigger: ".project-grid-yr", start: "top 80%", toggleActions: "play none none none" } }); }


    gsap.utils.toArray(".interactive-bg-element").forEach(el => { /* ... Interactive BG Element logic from previous response ... */
        const speed = parseFloat(el.dataset.scrollSpeed) || 0; const movementFactor = el.classList.contains('ibe-char-1') ? 50 : 120; const movement = speed * movementFactor; if (el.dataset.scrollText && !el.textContent.trim()) el.textContent = el.dataset.scrollText; gsap.set(el, { autoAlpha: 0, y: 0, transformOrigin: "center center" }); gsap.to(el, { y: movement, ease: "none", scrollTrigger: { trigger: el.closest('.content-section') || document.body, start: "top bottom", end: "bottom top", scrub: 2 + Math.abs(speed * 2.5) } }); const isAlreadyInView = el.classList.contains('is-in-view'); const visibleOpacity = isAlreadyInView ? parseFloat(getComputedStyle(el).opacity) : (parseFloat(getComputedStyle(el).getPropertyValue('--visible-opacity')) || 0.1); let otherTransforms = { rotate: 0, scale: 1 }; const initialTransform = getComputedStyle(el).transform; if (initialTransform && initialTransform !== 'none') { try { const matrix = new DOMMatrix(initialTransform); otherTransforms.scale = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b); otherTransforms.rotate = Math.round(Math.atan2(matrix.b, matrix.a) * (180/Math.PI)); } catch(e) { console.warn("Could not parse DOMMatrix for element:", el, e); } } if (el.classList.contains('ibe-square-1')) { otherTransforms.rotate = (otherTransforms.rotate || 5); otherTransforms.scale = (otherTransforms.scale || 1.05); } else if (el.classList.contains('ibe-rect-1')) { otherTransforms.rotate = (otherTransforms.rotate || -5); } gsap.to(el, { autoAlpha: visibleOpacity, rotate: otherTransforms.rotate, scale: otherTransforms.scale, x: el.classList.contains('ibe-char-1') ? -10 : 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 10%", toggleActions: "play reverse play reverse" } });
    });
    gsap.utils.toArray(".about-yr-aside").forEach(aside => { gsap.to(aside, { yPercent: -12, ease: "none", scrollTrigger: { trigger: aside.closest('.content-section'), start: "top bottom", end: "bottom top", scrub: 2.5 } }); });


    const heroTl = gsap.timeline({delay: introDuration / 1000 - 0.2}); // Delay hero timeline based on intro
    heroTl.from(".yr-title-jp-main", { duration: 1.1, y: 80, autoAlpha: 0, ease: "expo.out" }, "+=0.1")
          .from(".yr-title-jp-sub", { duration: 0.9, y: 60, autoAlpha: 0, ease: "expo.out" }, "-=0.8")
          .from(".yr-title-en-main", { duration: 0.9, x: -50, autoAlpha: 0, ease: "expo.out" }, "-=0.7")
          .from(".yr-nickname-display", { duration: 0.7, autoAlpha: 0, ease: "circ.out" }, "-=0.6")
          .from(".yr-title-role", { duration: 0.7, autoAlpha: 0, ease: "circ.out" }, "-=0.5")
          .from(".hero-slideshow-yr", { duration: 1.3, scale: 0.9, autoAlpha:0, ease: "circ.out"}, "-=0.8")
          // Decorative text animations for hero are now handled by the general scramble logic
          // .from(".hero-yr-deco-text.hero-deco-mid-left", { duration: 0.6, xPercent: -60, autoAlpha:0, ease: "power3.out"}, "-=0.6")
          // .from(".hero-yr-deco-text.hero-deco-top-right", { duration: 0.6, yPercent: -60, autoAlpha:0, ease: "power3.out"}, "-=0.5");

    gsap.utils.toArray(".section-title-deco-line").forEach(line => { gsap.fromTo(line, { width: 0 }, { width: "60px", duration: 0.9, ease: "power3.inOut", scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" } }); });

    gsap.utils.toArray(".project-card-yr").forEach(card => { /* ... Project Card Hover logic from previous response ... */
        const image = card.querySelector(".card-yr-image"); const overlay = card.querySelector(".card-yr-hover-overlay"); const cardTitle = card.querySelector(".card-yr-title"); const hoverTl = gsap.timeline({ paused: true }); if(image) hoverTl.to(image, { scale: 1.08, duration: 0.4, ease: "power2.out" }); if(overlay) hoverTl.to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power1.inOut" }, image ? "-=0.3" : "+=0"); if(cardTitle) hoverTl.to(cardTitle, { x: 5, color: "var(--accent-color-yr)", duration: 0.3, ease: "power2.out" }, 0); card.hoverTl = hoverTl; card.addEventListener("mouseenter", () => hoverTl.play()); card.addEventListener("mouseleave", () => hoverTl.reverse()); card.addEventListener("mousemove", (e) => { if (!image) return; const rect = card.getBoundingClientRect(); const x = (e.clientX - rect.left) / rect.width; const y = (e.clientY - rect.top) / rect.height; gsap.to(image, { x: (x - 0.5) * -15, y: (y - 0.5) * -10, duration: 0.6, ease: "power3.out" }); }); card.addEventListener("mouseleave", () => { if (!image) return; gsap.to(image, { x: 0, y: 0, duration: 0.4, ease: "power2.out" }); });
    });

    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) { /* ... Scroll Down Indicator logic from previous response ... */
        const scrollIndicatorThreshold = 10; function handleScrollIndicatorVisibility() { if (window.scrollY > scrollIndicatorThreshold) scrollDownIndicator.classList.add('scrolled-past'); else scrollDownIndicator.classList.remove('scrolled-past'); } handleScrollIndicatorVisibility(); window.addEventListener('scroll', handleScrollIndicatorVisibility, { passive: true }); scrollDownIndicator.addEventListener('click', function(e) { e.preventDefault(); const targetId = this.getAttribute('href'); const targetSection = document.querySelector(targetId); if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' }); });
    }
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) { /* ... Scroll To Top Button logic from previous response ... */
        const scrollBtnThreshold = 200; window.addEventListener('scroll', () => { if (window.scrollY > scrollBtnThreshold) scrollToTopBtn.classList.add('visible'); else scrollToTopBtn.classList.remove('visible'); }, { passive: true }); scrollToTopBtn.addEventListener('click', (e) => { e.preventDefault(); const target = document.querySelector(scrollToTopBtn.getAttribute('href')); if(target) target.scrollIntoView({ behavior: 'smooth'}); });
    }

    const updateGridContainer = document.querySelector('.update-grid-yr');
    const infoModal = document.getElementById('info-modal');
    const modalTitleEl = infoModal ? infoModal.querySelector('.modal-yr-title') : null;
    const modalDateEl = infoModal ? infoModal.querySelector('.modal-yr-date') : null;
    const modalBodyEl = infoModal ? infoModal.querySelector('.modal-yr-body') : null;
    const modalCloseBtn = infoModal ? infoModal.querySelector('.info-modal-close-yr') : null;
    const updatesData = [ /* ... Updates Data from previous response ... */
        { id: "update1", date: "2024.08.01", title_key: "ARTICLE_TITLE_1", default_title: "NEW PROJECT ANNOUNCEMENT: DELTA", snippet: "Exciting news about Project Delta and its upcoming phases. Stay tuned for more details.", content: "<p>Full details about Project Delta, a new initiative focusing on innovative animation techniques will be revealed soon. This project aims to explore the boundaries of 2D and 3D integration.</p><img src='https://via.placeholder.com/600x300/0052D4/FFFFFF?text=Project+Delta+Concept' alt='Project Delta Concept Art'>" },
        { id: "update2", date: "2024.07.20", title_key: "ARTICLE_TITLE_2", default_title: "YR FOLIO DESIGN BREAKDOWN", snippet: "A deep dive into the design principles and aesthetic choices behind this portfolio website.", content: "<p>This portfolio itself was a design challenge, aiming for a blend of modern UI/UX with a distinct anime-inspired aesthetic. The color palette, typography, and layout choices were carefully considered to reflect a professional yet artistic sensibility. Key elements include the dynamic hero section and the use of subtle animations to enhance user experience without being distracting.</p>" },
        { id: "update3", date: "2024.07.05", title_key: "ARTICLE_TITLE_3", default_title: "UPCOMING WORKSHOP ON CREATIVE CODING FOR ANIMATORS", snippet: "Join my upcoming online workshop focusing on leveraging code for unique animation effects.", content: "<p>I'm thrilled to announce an upcoming online workshop designed for animators looking to expand their skillset into creative coding. We'll explore tools like p5.js and how they can be used to generate procedural animations, complex particle systems, and interactive visual elements. No prior coding experience is strictly necessary, but a curious mind is a must! More details on dates and registration will follow.</p>" }
    ];
    function displayUpdateInModal(updateId, lang = localStorage.getItem('preferredLanguage') || 'en') { /* ... Display Update In Modal logic from previous response with GSAP ... */
        const update = updatesData.find(u => u.id === updateId); if (update && infoModal && modalTitleEl && modalDateEl && modalBodyEl) { const titleText = (translations[update.title_key] && translations[update.title_key][lang]) ? translations[update.title_key][lang] : update.default_title; modalTitleEl.textContent = titleText; modalDateEl.textContent = update.date; modalBodyEl.innerHTML = update.content; infoModal.dataset.currentArticleId = updateId; document.body.style.overflow = 'hidden'; gsap.fromTo(infoModal, { autoAlpha: 0, scale: 0.9, y: "-20px" }, { autoAlpha: 1, scale: 1, y: "0px", duration: 0.4, ease: "power3.out", onStart: () => infoModal.style.display = 'flex' } ); }
    }
    function closeInfoModal() { /* ... Close Info Modal logic from previous response with GSAP ... */
        if (infoModal) { gsap.to(infoModal, { autoAlpha: 0, scale: 0.9, y: "20px", duration: 0.3, ease: "power3.in", onComplete: () => { infoModal.style.display = 'none'; document.body.style.overflow = ''; delete infoModal.dataset.currentArticleId; } }); }
    }
    if (updateGridContainer) { updatesData.forEach((update, index) => { const card = document.createElement('div'); card.classList.add('update-card-yr', 'interactive-card'); card.dataset.delay = (index % (gsap.utils.toArray('.update-grid-yr > div').length > 2 ? 3: 2)) * 0.1; card.dataset.articleId = update.id; const titleKey = update.title_key; card.innerHTML = `<span class="update-yr-date">${update.date}</span><h4 class="update-yr-title" data-translation-key="${titleKey}"><span>${update.default_title}</span></h4><p class="update-yr-snippet">${update.snippet}</p><span class="update-yr-arrow">→</span>`; card.addEventListener('click', () => displayUpdateInModal(update.id)); updateGridContainer.appendChild(card); animateWithGsap(card, { from: { y: 40, autoAlpha: 0, scale:0.98 }, to: { y: 0, autoAlpha: 1, scale:1 }, duration: 0.7, ease: "circ.out", staggerDelay: card.dataset.delay }); }); }
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeInfoModal);
    if (infoModal) infoModal.addEventListener('click', (event) => { if (event.target === infoModal) closeInfoModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && infoModal && infoModal.style.display === 'flex') closeInfoModal(); });

    const pageContentWrapper = document.getElementById('page-content-wrapper');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuContent = document.querySelector('.menu-content');
    const menuPreviewImgContainer = document.querySelector('.menu-preview-img');
    const newMenuLinks = document.querySelectorAll('.menu-links .link a');
    let isOpen = false; let isAnimating = false;
    const menuOpenLabel = document.getElementById('menu-open');
    const menuCloseLabel = document.getElementById('menu-close');
    const MENU_DURATION = 1.0;
    function animateMenuToggle(isOpening) { /* ... Animate Menu Toggle logic from previous response ... */
        if (!menuOpenLabel || !menuCloseLabel) return; const DURATION = 0.5; const EASE = "power2.out"; const DELAY_FADE_IN = 0.25; const labelToHide = isOpening ? menuOpenLabel : menuCloseLabel; const labelToShow = isOpening ? menuCloseLabel : menuOpenLabel; const yHide = isOpening ? -10 : 10; const rotHide = isOpening ? -5 : 5; gsap.to(labelToHide, { y: yHide, rotation: rotHide, opacity: 0, duration: DURATION, ease: EASE }); gsap.fromTo(labelToShow, { y: isOpening ? 10 : -10, rotation: isOpening ? 5 : -5, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: DURATION, ease: EASE, delay: DELAY_FADE_IN } );
    }
    function cleanupPreviewImages() { /* ... Cleanup Preview Images logic from previous response ... */
        if (!menuPreviewImgContainer) return; const previewImages = menuPreviewImgContainer.querySelectorAll('img'); if (previewImages.length > 3) { for (let i = 0; i < previewImages.length - 3; i++) { if (previewImages[i].parentNode === menuPreviewImgContainer) menuPreviewImgContainer.removeChild(previewImages[i]); } }
    }
    function resetPreviewImage() { /* ... Reset Preview Image logic from previous response ... */
        if (!menuPreviewImgContainer) return; menuPreviewImgContainer.innerHTML = ''; const defaultPreviewImg = document.createElement('img'); defaultPreviewImg.src = 'img/gallery1.jpg'; defaultPreviewImg.alt = 'Menu Preview Image'; menuPreviewImgContainer.appendChild(defaultPreviewImg); gsap.set(defaultPreviewImg, { opacity: 1, scale: 1, rotation: 0, x:0, y:0 });
    }
    function openMenu() { /* ... Open Menu logic from previous response with MENU_DURATION ... */
        if (isAnimating || isOpen || !pageContentWrapper || !menuOverlay || !menuContent) return; isAnimating = true; document.body.classList.add('overlay-active'); const oldNav = document.getElementById('main-navigation-yr'); if (oldNav) oldNav.style.display = 'none'; gsap.to(pageContentWrapper, { rotation: 8, x: "12%", y: "8%", scale: 0.88, duration: MENU_DURATION, ease: "power4.inOut" }); animateMenuToggle(true); gsap.to(menuContent, { rotation: 0, x: 0, y: 0, scale: 1, opacity: 1, duration: MENU_DURATION, ease: "power4.inOut" }); gsap.to('.menu-links .link a, .menu-socials .social a, .menu-footer a', { y: '0%', opacity: 1, duration: 0.8, delay: MENU_DURATION * 0.4, stagger: 0.06, ease: "expo.out" }); gsap.to(menuOverlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: MENU_DURATION, ease: "power4.inOut", onComplete: () => { isOpen = true; isAnimating = false; } });
    }
    function closeMenu() { /* ... Close Menu logic from previous response with MENU_DURATION ... */
        if (isAnimating || !isOpen || !pageContentWrapper || !menuOverlay || !menuContent) return; isAnimating = true; document.body.classList.remove('overlay-active'); const oldNav = document.getElementById('main-navigation-yr'); if (oldNav && window.innerWidth > 768) oldNav.style.display = 'flex'; gsap.to(pageContentWrapper, { rotation: 0, x: 0, y: 0, scale: 1, duration: MENU_DURATION, ease: "power4.inOut" }); animateMenuToggle(false); gsap.to(menuContent, { rotation: -12, x: -80, y: -80, scale: 1.15, opacity: 0, duration: MENU_DURATION * 0.8, ease: "power4.inOut" }); gsap.to(menuOverlay, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: MENU_DURATION, ease: "power4.inOut", delay: 0.05, onComplete: () => { isOpen = false; isAnimating = false; gsap.set('.menu-links .link a, .menu-socials .social a, .menu-footer a', { y: '120%', opacity: 0 }); resetPreviewImage(); } });
    }
    if (menuToggle) menuToggle.addEventListener('click', () => { if (isOpen) closeMenu(); else openMenu(); });
    if (newMenuLinks.length > 0 && menuPreviewImgContainer) { /* ... New Menu Links hover logic from previous response ... */
        newMenuLinks.forEach(link => { link.addEventListener('mouseover', () => { if (!isOpen || isAnimating) return; const imgSrc = link.dataset.img; if (!imgSrc) return; const currentImages = menuPreviewImgContainer.querySelectorAll('img'); if (currentImages.length > 0) { const lastImage = currentImages[currentImages.length - 1]; if (lastImage.src.includes(imgSrc.split('/').pop())) return; } isAnimating = true; const newPreviewImg = document.createElement('img'); newPreviewImg.src = imgSrc; newPreviewImg.alt = (link.textContent || "Preview") + " preview"; gsap.set(newPreviewImg, { opacity: 0, scale: 1.15, rotation: 8, x: 30, y: 30, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }); menuPreviewImgContainer.appendChild(newPreviewImg); cleanupPreviewImages(); const imagesToAnimateOut = Array.from(menuPreviewImgContainer.querySelectorAll('img:not(:last-child)')); if (imagesToAnimateOut.length > 0) gsap.to(imagesToAnimateOut, { opacity: 0, scale: 0.85, rotation: -8, x: -30, y: -30, duration: 0.6, ease: "power2.out", stagger: 0.05, onComplete: () => imagesToAnimateOut.forEach(img => { if(img.parentNode) img.remove()}) }); gsap.to(newPreviewImg, { opacity: 1, scale: 1, rotation: 0, x: 0, y: 0, duration: 0.75, ease: "power2.out", delay: imagesToAnimateOut.length > 0 ? 0.15 : 0, onComplete: () => isAnimating = false }); }); link.addEventListener('click', (e) => { const href = link.getAttribute('href'); if (href && href.startsWith('#')) { e.preventDefault(); closeMenu(); setTimeout(() => { const targetSection = document.querySelector(href); if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' }); }, MENU_DURATION * 1000 * 0.7); } }); });
    }
    if (!isOpen) resetPreviewImage();

    gsap.utils.toArray('.section-title-yr > span, .hero-yr-title-block-wrapper > *:not(.hero-slideshow-yr):not(.hero-yr-deco-text):not(.yr-title-jp-main)').forEach((el) => { /* ... Subtle Text Animation logic from previous response ... */
        if (el.closest && el.closest('#intro-overlay')) return; if ( (el.classList.contains('yr-title-jp-sub') || el.classList.contains('yr-title-en-main') || el.classList.contains('yr-nickname-display') || el.classList.contains('yr-title-role')) && heroTl.isActive() ) return; gsap.from(el, { duration: 0.9, autoAlpha: 0, y: 35, ease: "expo.out", stagger: el.classList.contains('section-title-yr') ? 0 : 0.08, scrollTrigger: { trigger: el.closest('section, .hero-yr-title-block-wrapper, .section-title-yr-container') || el, start: "top 88%", toggleActions: "play none none none" } });
    });

    // Scramble cho các decorative text
    const decorativeTextSelectors = '.hero-yr-deco-text > span, .deco-text-yr > span, .hero-yr-vertical-text > span, .hero-yr-text-module.tm-character-label > span';
    gsap.utils.toArray(decorativeTextSelectors).forEach(el => {
        const scrambler = new TextScrambleEffect(el);
        el.scramblerInstance = scrambler; // Lưu instance để setLanguage có thể dùng
        const textToScramble = el.dataset.text || el.textContent;
        el.textContent = '';

        // Gán class để setLanguage có thể target dễ hơn
        if (el.closest('.deco-text-yr')) el.classList.add('deco-text-yr-scramble-target');
        if (el.closest('.hero-yr-deco-text')) el.classList.add('hero-deco-text-scramble-target');
        if (el.closest('.hero-yr-vertical-text')) el.classList.add('hero-vertical-text-scramble-target');
        if (el.closest('.hero-yr-text-module.tm-character-label')) el.classList.add('hero-char-label-scramble-target');


        gsap.from(el, {
            autoAlpha: 0, duration: 0.5,
            delay: parseFloat(el.closest('[data-delay]')?.dataset.delay) || 0,
            scrollTrigger: {
                trigger: el.closest('.content-section, .hero-yr') || el,
                start: "top 90%", toggleActions: "play none none none", once: true,
                onEnter: () => { setTimeout(() => { scrambler.setText(textToScramble, 600); }, 100); }
            }
        });
    });

    gsap.utils.toArray('.about-yr-text p, .contact-yr-intro, .card-yr-desc, .update-yr-snippet, .about-yr-details-block').forEach((p) => { /* ... Animation logic from previous response ... */
        gsap.from(p, { duration: 0.8, autoAlpha: 0, y: 25, ease: "circ.out", scrollTrigger: { trigger: p, start: "top 90%", toggleActions: "play none none none" }, delay: (p.closest('[data-delay]') ? (parseFloat(p.closest('[data-delay]').dataset.delay) || 0) : 0) + 0.15 });
    });
    gsap.utils.toArray('.skills-subtitle-yr').forEach(subtitle => { /* ... Animation logic from previous response ... */
        const spanInside = subtitle.querySelector('span'); if (spanInside) { gsap.from(spanInside, { duration: 0.8, autoAlpha: 0, y: 20, ease: "circ.out", scrollTrigger: { trigger: subtitle, start: "top 90%", toggleActions: "play none none none" } }); } const tlLine = gsap.timeline({ scrollTrigger: { trigger: subtitle, start: "top 88%", toggleActions: "play none none none" } }); tlLine.to(subtitle, { '--before-width': '30px', duration: 0.6, ease: "power3.inOut", delay: 0.25 });
    });
    gsap.utils.toArray('.skill-category-yr').forEach(skillCat => { /* ... Animation logic from previous response ... */
         gsap.from(skillCat, { duration: 0.7, autoAlpha: 0, x: -25, ease: "power3.out", scrollTrigger: { trigger: skillCat, start: "top 85%", toggleActions: "play none none none" }, delay: 0.15 });
    });
    gsap.utils.toArray('.skill-item-yr').forEach(skillItem => { /* ... Animation logic from previous response ... */
         gsap.from(skillItem, { duration: 0.6, autoAlpha: 0, x: -20, stagger:0.04, ease: "circ.out", scrollTrigger: { trigger: skillItem.closest('.skills-grid-yr'), start: "top 80%", toggleActions: "play none none none" }, delay: 0.3 });
    });
     gsap.utils.toArray('.card-yr-title').forEach(title => { if (!title.closest('.project-card-yr')) { /* ... Animation logic from previous response ... */
            gsap.from(title, { duration: 0.8, autoAlpha: 0, y: 20, ease: "circ.out", scrollTrigger: { trigger: title.closest('.update-card-yr'), start: "top 85%", toggleActions: "play none none none"}, delay: (title.closest('[data-delay]') ? parseFloat(title.closest('[data-delay]').dataset.delay) : 0) + 0.15 });
        }
    });

    gsap.utils.toArray(".section-bg-text").forEach(el => { /* ... Parallax logic from previous response ... */
        if (el.classList.contains('section-bg-text')) { gsap.to(el, { yPercent: el.classList.contains('works-bg-text') ? 20 : -30, opacity: () => (parseFloat(getComputedStyle(el).opacity) * 0.6), ease: "none", scrollTrigger: { trigger: el.closest('.content-section'), start: "top bottom", end: "bottom top", scrub: 2.0 + Math.random() * 2.0 } }); }
    });

    if (window.setLanguage) window.setLanguage(preferredLanguage);
});

// === IMAGE ZOOM MODAL FOR PROJECT CARDS ===
(function(){
  const modal = document.getElementById('image-modal-yr');
  const modalImg = document.getElementById('image-modal-img');
  const modalCaption = document.getElementById('image-modal-caption');
  const closeBtn = document.querySelector('.image-modal-close');

  // Helper to animate modal in
  function animateModalIn() {
    if (!modal) return;
    gsap.set(modalImg, { scale: 1.08, y: 30, opacity: 0 });
    gsap.set(modalCaption, { y: 30, opacity: 0 });
    modal.classList.add('show-anim');
    setTimeout(() => {
      modal.classList.remove('show-anim');
      gsap.to(modalImg, { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' });
      gsap.to(modalCaption, { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out', delay: 0.08 });
    }, 10);
  }
  // Helper to animate modal out
  function animateModalOut(cb) {
    if (!modal) return;
    gsap.to([modalImg, modalCaption], { scale: 0.96, y: 40, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: cb });
  }

  // Delegate click for all project images and view detail buttons
  document.addEventListener('click', function(e) {
    // Click on image
    if (e.target.classList.contains('card-yr-image')) {
      const img = e.target;
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      // Caption lấy từ title hoặc desc nếu có
      const card = img.closest('.project-card-yr');
      let caption = '';
      if (card) {
        const title = card.querySelector('.card-yr-title');
        const desc = card.querySelector('.card-yr-desc');
        caption = (title ? title.textContent : '') + (desc ? ' — ' + desc.textContent : '');
      }
      modalCaption.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      animateModalIn();
      e.preventDefault();
    }
    // Click on view detail button
    if (e.target.classList.contains('card-yr-view-project')) {
      const card = e.target.closest('.project-card-yr');
      if (card) {
        const img = card.querySelector('.card-yr-image');
        if (img) {
          modalImg.src = img.src;
          modalImg.alt = img.alt || '';
          const title = card.querySelector('.card-yr-title');
          const desc = card.querySelector('.card-yr-desc');
          let caption = (title ? title.textContent : '') + (desc ? ' — ' + desc.textContent : '');
          modalCaption.textContent = caption;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
          animateModalIn();
          e.preventDefault();
        }
      }
    }
    // Đóng modal khi click nút close hoặc click ra ngoài ảnh
    if (e.target === modal || e.target === closeBtn) {
      animateModalOut(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImg.src = '';
        modalCaption.textContent = '';
      });
    }
  });
})();
