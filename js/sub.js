document.addEventListener('DOMContentLoaded', () => {
    // --- ĐĂNG KÝ PLUGIN SCROLLTRIGGER ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Intro Animation ---
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hidden');
        }, 1800);
    }

    // --- Update Years ---
    function updateYears() {
        const currentYear = new Date().getFullYear().toString();
        const footerYearSpan = document.getElementById('footer-current-year');
        if (footerYearSpan) footerYearSpan.textContent = currentYear;
        const heroYearSpan = document.getElementById('hero-current-year');
        if (heroYearSpan) heroYearSpan.textContent = currentYear;
    }
    updateYears();

    // --- Visualizer Background ---
    const canvas = document.getElementById('visualizer-bg');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let particles = []; const numParticles = 25;
        function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        resizeCanvas(); window.addEventListener('resize', resizeCanvas);
        const rootStyles = getComputedStyle(document.documentElement);
        let particleBaseColorStr = rootStyles.getPropertyValue('--accent-color-yr').trim() || '#0052D4';
        class Particle { 
            constructor(x, y) { this.x = x; this.y = y; this.size = Math.random() * 1.2 + 0.3; this.speedX = Math.random() * 0.5 - 0.25; this.speedY = Math.random() * 0.5 - 0.25; this.opacity = Math.random() * 0.15 + 0.05; }
            update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.03) this.size -= 0.003; }
            draw() { 
                let r=0, g=0, b=0;
                if (particleBaseColorStr.startsWith('#')) {
                    r = parseInt(particleBaseColorStr.slice(1, 3), 16); g = parseInt(particleBaseColorStr.slice(3, 5), 16); b = parseInt(particleBaseColorStr.slice(5, 7), 16);
                } else if (particleBaseColorStr.startsWith('rgb')) {
                    const match = particleBaseColorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                    if (match) [ , r, g, b] = match.map(Number);
                }
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
                ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); 
            }
        }
        function initParticles() { particles = []; for (let i = 0; i < numParticles; i++) { particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height)); } }
        initParticles();
        function animateParticles() {
            if(!canvas.isConnected) return; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(); particles[i].draw();
                if (particles[i].size <= 0.03) { particles.splice(i, 1); i--; if(particles.length < numParticles) particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));}
            }
            requestAnimationFrame(animateParticles);
        }
        if (canvas.isConnected) animateParticles();
    }

    // --- Translations and Language Switcher ---
    const currentYearValForTranslations = new Date().getFullYear().toString();
    const translations = {
        navHome: { en: "HOME", vi: "TRANG CHỦ", ja: "ホーム" },
        navAbout: { en: "PROFILE", vi: "HỒ SƠ", ja: "プロフィール" },
        navProjects: { en: "WORKS", vi: "CÔNG TRÌNH", ja: "作品" },
        navContact: { en: "CONTACT", vi: "LIÊN HỆ", ja: "連絡先" },
        heroRole: { en: "2D Animator // Illustrator", vi: "2D Animator // Hoạ Sĩ Minh Hoạ", ja: "2Dアニメーター // イラストレーター" },
        heroNicknameFull: { en: "hansa // ハンサ", vi: "hansa // ハンサ", ja: "hansa // ハンサ" },
        heroTagline1: { en: "BRINGING", vi: "ĐEM", ja: "命を" },
        heroTagline2: { en: "-IMAGINATION", vi: "-TRÍ TƯỞNG TƯỢNG", ja: "吹き込む" },
        heroTagline3: { en: "TO LIFE_", vi: "VÀO CUỘC SỐNG_", ja: "創造_" },
        heroVTLeft: { en: `PORTFOLIO<br>// VER. 2.2`, vi: `HỒ SƠ NĂNG LỰC<br>// PHIÊN BẢN 2.2`, ja: `ポートフォリオ<br>// VER. 2.2`},
        heroVTBottomRight: { en: `© ${currentYearValForTranslations} PHAT TRAN`, vi: `© ${currentYearValForTranslations} PHAT TRAN`, ja: `© ${currentYearValForTranslations} PHAT TRAN`},
        scrollDown: { en: "SCROLL", vi: "CUỘN XUỐNG", ja: "スクロール" },
        aboutTitle: { en: "[01] PROFILE", vi: "[01] HỒ SƠ", ja: "[01] プロフィール" },
        aboutP1: {
            en: "Hello! I'm Phat Tran (you can also call me hansa), a passionate <strong>2D Animator and Illustrator</strong> with a deep love for the art of Japanese animation. My focus is on dynamic character animation, expressive storytelling, and creating visuals that resonate with the vibrant energy of anime.",
            vi: "Xin chào! Tôi là Phát Trần (bạn cũng có thể gọi tôi là hansa), một <strong>2D Animator và Hoạ Sĩ Minh Hoạ</strong> đầy nhiệt huyết với tình yêu sâu sắc dành cho nghệ thuật hoạt hình Nhật Bản. Tôi tập trung vào hoạt hình nhân vật động, kể chuyện biểu cảm, và tạo ra hình ảnh cộng hưởng với năng lượng sống động của anime.",
            ja: "こんにちは！ファット・トラン（ハンサとも呼ばれています）です。日本のアニメーション芸術に深い愛情を注ぐ、情熱的な<strong>2Dアニメーター兼イラストレーター</strong>です。ダイナミックなキャラクターアニメーション、表現力豊かなストーリーテリング、そしてアニメの活気に満ちたエネルギーと共鳴するビジュアルの創造に焦点を当てています。"
        },
        aboutP3: {
            en: "Whether it's crafting fluid keyframes, designing captivating characters, or illustrating immersive scenes, my goal is to contribute to projects that inspire and entertain. I'm always eager to learn and collaborate on exciting new ventures.",
            vi: "Dù là tạo ra các keyframe mượt mà, thiết kế nhân vật hấp dẫn, hay minh họa các cảnh sống động, mục tiêu của tôi là đóng góp vào các dự án truyền cảm hứng và giải trí. Tôi luôn sẵn sàng học hỏi và hợp tác trong các dự án mới thú vị.",
            ja: "流れるようなキーフレームの作成、魅力的なキャラクターのデザイン、没入感のあるシーンのイラストレーションなど、私の目標は、インスピレーションを与え、楽しませるプロジェクトに貢献することです。常に新しいエキサイティングな事業について学び、協力することに意欲的です。"
        },
        skillsTitle: { en: "Core Skills & Expertise", vi: "Kỹ Năng & Chuyên Môn Cốt Lõi", ja: "コアスキルと専門知識" },
        skillCatAnimation: { en: "Animation", vi: "Hoạt Hình", ja: "アニメーション" },
        skillAnim1: { en: "Character Animation (2D)", vi: "Hoạt Hình Nhân Vật (2D)", ja: "キャラクターアニメーション (2D)" },
        skillAnim2: { en: "Effects Animation (2D FX)", vi: "Hoạt Hình Hiệu Ứng (2D FX)", ja: "エフェクトアニメーション (2D FX)" },
        skillAnim3: { en: "Motion Graphics Principles", vi: "Nguyên Tắc Đồ Họa Chuyển Động", ja: "モーショングラフィックスの原則" },
        skillAnim4: { en: "Storyboarding & Animatics", vi: "Vẽ Storyboard & Animatics", ja: "絵コンテとアニマティクス" },
        skillCatIllustration: { en: "Illustration", vi: "Minh Họa", ja: "イラストレーション" },
        skillIllust1: { en: "Character Design & Concept Art", vi: "Thiết Kế Nhân Vật & Concept Art", ja: "キャラクターデザイン＆コンセプトアート" },
        skillIllust2: { en: "Anime-Style Illustration", vi: "Minh Họa Phong Cách Anime", ja: "アニメスタイルイラスト" },
        skillIllust3: { en: "Background Art Basics", vi: "Cơ Bản Về Vẽ Cảnh Nền", ja: "背景美術の基本" },
        skillIllust4: { en: "Digital Painting", vi: "Vẽ Kỹ Thuật Số", ja: "デジタルペインティング" },
        skillCatSoftware: { en: "Software Proficiency", vi: "Thành Thạo Phần Mềm", ja: "ソフトウェアスキル" },
        skillCatLanguages: { en: "Languages", vi: "Ngôn Ngữ", ja: "言語" },
        skillLang1: { en: "Vietnamese (Native)", vi: "Tiếng Việt (Bản xứ)", ja: "ベトナム語（ネイティブ）" },
        skillLang2: { en: "English (Fluent)", vi: "Tiếng Anh (Lưu loát)", ja: "英語（流暢）" },
        skillLang3: { en: "Japanese (Intermediate - N3)", vi: "Tiếng Nhật (Trung cấp - N3)", ja: "日本語（中級 - N3）" },
        aboutLocationNew: { en: "TOKYO ASPIRANT // GLOBAL COLLABORATOR", vi: "MONG MUỐN LÀM VIỆC TẠI TOKYO // CỘNG TÁC TOÀN CẦU", ja: "東京志望 // グローバルコラボレーター" },
        projectsTitle: { en: "[02] WORKS // SHOWCASE", vi: "[02] CÔNG TRÌNH // TRƯNG BÀY", ja: "[02] 作品 // ショーケース" },
        worksAnimTitle: { en: "ANIMATION REEL & CLIPS", vi: "DEMO REEL & CLIP HOẠT HÌNH", ja: "アニメーションリール＆クリップ" },
        worksReelNote: { en: "(Replace with your animation reel from Vimeo/YouTube)", vi: "(Thay thế bằng demo reel từ Vimeo/YouTube của bạn)", ja: "（Vimeo/YouTubeのアニメーションリールに置き換えてください）" },
        worksIllustTitle: { en: "ILLUSTRATION GALLERY", vi: "THƯ VIỆN MINH HOẠ", ja: "イラストギャラリー" },
        illust1Title: { en: "CHARACTER CONCEPT: AKIRA", vi: "Ý TƯỞNG NHÂN VẬT: AKIRA", ja: "キャラクターコンセプト：アキラ" },
        illust1Desc: { en: "Original character design exploring a cyberpunk theme. Focus on dynamic pose and lighting.", vi: "Thiết kế nhân vật gốc khám phá chủ đề cyberpunk. Tập trung vào tư thế động và ánh sáng.", ja: "サイバーパンクをテーマにしたオリジナルキャラクターデザイン。ダイナミックなポーズとライティングに焦点。" },
        illust2Title: { en: "SCENE: NEON ALLEYS", vi: "CẢNH: HẺM NEON", ja: "シーン：ネオン路地" },
        illust2Desc: { en: "Background art practice, focusing on atmosphere and color in a dense urban environment.", vi: "Thực hành vẽ cảnh nền, tập trung vào không khí và màu sắc trong môi trường đô thị dày đặc.", ja: "密集した都市環境における雰囲気と色彩に焦点を当てた背景美術の練習。" },
        viewDetail: { en: "VIEW DETAIL >>", vi: "XEM CHI TIẾT >>", ja: "詳細を見る >>"},
        updatesTitle: { en: "LATEST UPDATES", vi: "CẬP NHẬT MỚI NHẤT", ja: "最新情報" },
        ARTICLE_TITLE_1: { en: "NEW PROJECT ANNOUNCEMENT: DELTA", vi: "THÔNG BÁO DỰ ÁN MỚI: DELTA", ja: "新プロジェクト発表：デルタ" },
        ARTICLE_TITLE_2: { en: "YR FOLIO DESIGN BREAKDOWN", vi: "PHÂN TÍCH THIẾT KẾ YR FOLIO", ja: "YR FOLIO デザイン詳細" },
        ARTICLE_TITLE_3: { en: "UPCOMING WORKSHOP ON CREATIVE CODING", vi: "WORKSHOP SẮP TỚI VỀ LẬP TRÌNH SÁNG TẠO", ja: "クリエイティブコーディングに関する今後のワークショップ" },
        contactTitle: { en: "[03] CONTACT & LINKS", vi: "[03] LIÊN HỆ & LIÊN KẾT", ja: "[03] 連絡先とリンク" },
        contactIntro: {
            en: "OPEN FOR FREELANCE ANIMATION/ILLUSTRATION PROJECTS & COLLABORATIONS. LET'S CREATE SOMETHING AMAZING!",
            vi: "SẴN SÀNG CHO CÁC DỰ ÁN HOẠT HÌNH/MINH HOẠ TỰ DO & HỢP TÁC. HÃY CÙNG NHAU TẠO NÊN ĐIỀU TUYỆT VỜI!",
            ja: "フリーランスのアニメーション／イラストレーションプロジェクトやコラボレーションを募集しています。一緒に素晴らしいものを作りましょう！"
        },
        contactButton: { en: "SEND_EMAIL_MESSAGE", vi: "GỬI_TIN NHẮN_EMAIL", ja: "メール送信" },
        footerRights: {
            en: `© ${currentYearValForTranslations} PHAT TRAN // ANIMATOR & ILLUSTRATOR. ALL RIGHTS RESERVED.`,
            vi: `© ${currentYearValForTranslations} PHAT TRAN // ANIMATOR & HOẠ SĨ MINH HOẠ. BẢN QUYỀN THUỘC VỀ.`,
            ja: `© ${currentYearValForTranslations} PHAT TRAN // アニメーター＆イラストレーター。全著作権所有。`
        },
        modalClose: { en: "CLOSE [X]", vi: "ĐÓNG [X]", ja: "閉じる [X]" },
        slide1Alt: { en: "Main Artwork Showcase Image", vi: "Ảnh Chính Trưng Bày", ja: "メインアートワークショーケース画像" },
        slide1Title: { en: "Main Artwork Showcase", vi: "Trưng Bày Chính", ja: "メインアートワーク" },
        slide1Desc: { en: "Dynamic character illustration, focus on vibrant colors and energy.", vi: "Minh họa nhân vật động, tập trung màu sắc và năng lượng.", ja: "ダイナミックなキャラクターイラスト、鮮やかな色彩とエネルギーに焦点。" },
        slide2Alt: { en: "Concept Design: Urban Fantasy Image", vi: "Ảnh Thiết Kế Ý Tưởng: Đô Thị Huyền Ảo", ja: "コンセプトデザイン：アーバンファンタジー画像" },
        slide2Title: { en: "Concept Design: Urban Fantasy", vi: "Thiết Kế: Đô Thị Huyền Ảo", ja: "コンセプト：アーバンファンタジー" },
        slide2Desc: { en: "Exploring a mystical world hidden within a modern cityscape.", vi: "Khám phá thế giới huyền bí ẩn trong đô thị hiện đại.", ja: "現代の都市景観に隠された神秘的な世界の探求。" },
        slide3Alt: { en: "Key Animation Frame Image", vi: "Ảnh Khung Hoạt Hình Chính", ja: "キーアニメーションフレーム画像" },
        slide3Title: { en: "Key Animation Frame", vi: "Khung Hoạt Hình Chính", ja: "キーアニメーションフレーム" },
        slide3Desc: { en: "A pivotal moment from a recent animation project.", vi: "Khoảnh khắc quan trọng từ một dự án hoạt hình gần đây.", ja: "最近のアニメーションプロジェクトからの重要な瞬間。" },
        slideNavPrevLabel: { en: "Previous Slide", vi: "Slide Trước", ja: "前のスライド" },
        slideNavNextLabel: { en: "Next Slide", vi: "Slide Kế", ja: "次のスライド" }
    };
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
                if (targetElement.tagName === 'BUTTON' && (key === 'slideNavPrevLabel' || key === 'slideNavNextLabel')) {
                    targetElement.setAttribute('aria-label', translation);
                    targetElement.setAttribute('title', translation);
                } else if (innerSpan && (el.classList.contains('nav-link') || el.classList.contains('scroll-down-indicator') || el.classList.contains('section-title-yr') || el.classList.contains('cta-button-yr') || el.classList.contains('hero-yr-vertical-text'))) {
                     targetElement = innerSpan;
                } else if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
                    targetElement.placeholder = translation;
                } else if (targetElement.tagName === 'IMG' && (key.startsWith('galleryImg') || key.startsWith('slide')) && key.endsWith('Alt')) {
                    targetElement.alt = translation;
                } else {
                    if (typeof translation === 'string' && translation.includes('<') && translation.includes('>')) { 
                        targetElement.innerHTML = translation;
                    } else {
                        targetElement.textContent = translation;
                    }
                }
                if (el.dataset.text !== undefined && targetElement.tagName !== 'IMG' && targetElement.tagName !== 'BUTTON') {
                    el.dataset.text = (typeof translation === 'string') ? translation.replace(/<[^>]*>?/gm, '').replace(/\d{4}/, currentYear) : '';
                }
            }
        });
        if (localStorage) localStorage.setItem('preferredLanguage', lang);
        document.querySelectorAll('.lang-btn').forEach(btn => { btn.classList.toggle('active', btn.dataset.lang === lang); });
    };
    const langSwitcherContainer = document.getElementById('language-switcher');
    if (langSwitcherContainer) { 
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', () => { window.setLanguage(button.dataset.lang); });
        });
    }
    
    const slideshowGallery = document.getElementById('hero-slideshow-gallery');
    if (slideshowGallery) {
        const slides = slideshowGallery.querySelectorAll('.slide-yr');
        const prevButton = slideshowGallery.querySelector('.slide-yr-nav.prev');
        const nextButton = slideshowGallery.querySelector('.slide-yr-nav.next');
        const dotsContainer = slideshowGallery.querySelector('.slide-yr-dots');
        let currentSlide = 0;
        let autoPlayInterval;
        const autoPlayDelay = 5000; 

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                 // GSAP transition for slides
                gsap.to(slide, { opacity: i === index ? 1 : 0, duration: 0.6, ease: "power2.inOut" });

            });
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.slide-yr-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
            currentSlide = index;
        }

        function nextSlide() { const newIndex = (currentSlide + 1) % slides.length; showSlide(newIndex); }
        function prevSlide() { const newIndex = (currentSlide - 1 + slides.length) % slides.length; showSlide(newIndex); }
        function startAutoPlay() { stopAutoPlay(); autoPlayInterval = setInterval(nextSlide, autoPlayDelay); }
        function stopAutoPlay() { clearInterval(autoPlayInterval); }

        if (slides.length > 0) {
            if (dotsContainer) {
                slides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.classList.add('slide-yr-dot');
                    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                    dot.addEventListener('click', () => { showSlide(i); startAutoPlay(); });
                    dotsContainer.appendChild(dot);
                });
            }
            showSlide(0); 
            startAutoPlay();
            if (nextButton) { nextButton.addEventListener('click', () => { nextSlide(); startAutoPlay(); }); }
            if (prevButton) { prevButton.addEventListener('click', () => { prevSlide(); startAutoPlay(); }); }
            slideshowGallery.addEventListener('mouseenter', stopAutoPlay);
            slideshowGallery.addEventListener('mouseleave', startAutoPlay);
        }
    }

    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('nav ul li a.nav-link');
    const contentSections = document.querySelectorAll('main#index-main > section');
    const headerScrollThreshold = 30;
    function updateActiveNavLink() { 
        if (navLinks.length === 0 || contentSections.length === 0) return; let currentSectionId = ''; const scrollPosition = window.scrollY;
        contentSections.forEach(section => { if (section) { const sectionTop = section.offsetTop - (header ? header.offsetHeight : 60) - 50; if (scrollPosition >= sectionTop) currentSectionId = section.getAttribute('id'); } });
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) { const lastSection = contentSections[contentSections.length - 1]; if (lastSection) currentSectionId = lastSection.getAttribute('id'); }
        navLinks.forEach(link => { link.classList.remove('active'); const linkHref = link.getAttribute('href'); if (linkHref && linkHref.includes('#') && linkHref.substring(linkHref.lastIndexOf('#') + 1) === currentSectionId) link.classList.add('active'); });
    }
    if (contentSections.length > 0) { 
        window.addEventListener('scroll', () => { if (header && window.scrollY > headerScrollThreshold) { header.classList.add('header-scrolled'); } else if (header) { header.classList.remove('header-scrolled'); } updateActiveNavLink(); }, { passive: true });
        updateActiveNavLink();
    } else if (header) { window.addEventListener('scroll', () => { if (window.scrollY > headerScrollThreshold) { header.classList.add('header-scrolled'); } else { header.classList.remove('header-scrolled'); } }, { passive: true }); }

    // --- GSAP ANIMATIONS ---
    const animateWithGsap = (selector, animationProps, scrollTriggerProps = {}) => {
        gsap.utils.toArray(selector).forEach((elem) => {
            const delayValue = parseFloat(elem.dataset.delay) || animationProps.staggerDelay || 0;
            gsap.fromTo(elem,
                { autoAlpha: 0, ...animationProps.from },
                {
                    autoAlpha: 1,
                    duration: 0.8,
                    delay: delayValue,
                    ease: "power2.out",
                    ...animationProps.to,
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play reverse play reverse",
                        // markers: true,
                        ...scrollTriggerProps
                    }
                }
            );
        });
    };

    animateWithGsap(".scroll-fade-in", { from: {}, to: {} }); // autoAlpha handles fade
    animateWithGsap(".scroll-slide-up", { from: { y: 50 }, to: { y: 0 } });
    animateWithGsap(".scroll-slide-left", { from: { x: -50 }, to: { x: 0 } });
    animateWithGsap(".scroll-slide-right", { from: { x: 50 }, to: { x: 0 } });
    animateWithGsap(".scroll-scale-in", { from: { scale: 0.8 }, to: { scale: 1 } });

    gsap.utils.toArray(".interactive-bg-element").forEach(el => {
        const speed = parseFloat(el.dataset.scrollSpeed) || 0;
        const movement = speed * 150; // Increased movement for more noticeable parallax

        if (el.dataset.scrollText && !el.textContent.trim()) {
            el.textContent = el.dataset.scrollText;
        }
        
        // Initial state set by GSAP for fade-in
        gsap.set(el, { 
            autoAlpha: 0, // Start hidden
            y: 0, // Base Y position for parallax
            // Preserve initial transform from CSS if any (e.g. rotate)
            // This is a simplified way; for complex initial transforms, set them directly in GSAP from
            transformOrigin: "center center" 
        });

        // Parallax effect (runs continuously while in scrub range)
        gsap.to(el, {
            y: movement,
            ease: "none",
            scrollTrigger: {
                trigger: el.closest('.content-section') || document.body,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            }
        });

        // Fade-in/transform effect when element (or its trigger) enters viewport
        gsap.to(el, {
            autoAlpha: 1, // Fade in to the opacity defined by CSS variable or class
            // You can add other transforms here like rotate or scale specific to in-view state
            // e.g., rotate: el.classList.contains('ibe-square-1') ? 5 : (el.classList.contains('ibe-rect-1') ? -5 : 0),
            // scale: el.classList.contains('ibe-square-1') ? 1.05 : 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el, // Trigger based on the element itself
                start: "top 90%",
                toggleActions: "play reverse play reverse", // Play, reverse, play again, reverse again
            }
        });
    });

    const heroTl = gsap.timeline({
        // No ScrollTrigger here if animations are just for page load
    });
    heroTl.from(".yr-title-jp-main", { duration: 1, y: 70, opacity: 0, ease: "power3.out" }, "+=0.2") // Start after intro
          .from(".yr-title-jp-sub", { duration: 0.8, y: 50, opacity: 0, ease: "power3.out" }, "-=0.7")
          .from(".yr-title-en-main", { duration: 0.8, x: -40, opacity: 0, ease: "power3.out" }, "-=0.6")
          .from(".hero-slideshow-yr", { duration: 1.2, scale: 0.9, autoAlpha:0, ease: "circ.out"}, "-=0.5");
    
    gsap.utils.toArray(".section-title-deco-line").forEach(line => {
        gsap.fromTo(line, { width: 0 }, {
            width: "60px", duration: 0.8, ease: "power2.inOut",
            scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" }
        });
    });

    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) { 
        const scrollIndicatorThreshold = 10;
        function handleScrollIndicatorVisibility() { if (window.scrollY > scrollIndicatorThreshold) scrollDownIndicator.classList.add('scrolled-past'); else scrollDownIndicator.classList.remove('scrolled-past'); }
        handleScrollIndicatorVisibility(); window.addEventListener('scroll', handleScrollIndicatorVisibility, { passive: true });
        scrollDownIndicator.addEventListener('click', function(e) { e.preventDefault(); const targetId = this.getAttribute('href'); const targetSection = document.querySelector(targetId); if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' }); });
    }

    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) { 
        const scrollBtnThreshold = 200;
        window.addEventListener('scroll', () => { if (window.scrollY > scrollBtnThreshold) scrollToTopBtn.classList.add('visible'); else scrollToTopBtn.classList.remove('visible'); }, { passive: true });
        scrollToTopBtn.addEventListener('click', (e) => { e.preventDefault(); document.querySelector(scrollToTopBtn.getAttribute('href')).scrollIntoView({ behavior: 'smooth'}); });
    }

    const updateGridContainer = document.querySelector('.update-grid-yr');
    const infoModal = document.getElementById('info-modal');
    const modalTitleEl = infoModal ? infoModal.querySelector('.modal-yr-title') : null;
    const modalDateEl = infoModal ? infoModal.querySelector('.modal-yr-date') : null;
    const modalBodyEl = infoModal ? infoModal.querySelector('.modal-yr-body') : null;
    const modalCloseBtn = infoModal ? infoModal.querySelector('.info-modal-close-yr') : null;
    const updatesData = [ 
        { id: "update1", date: "2024.08.01", title_key: "ARTICLE_TITLE_1", default_title: "NEW PROJECT ANNOUNCEMENT: DELTA", snippet: "Exciting news about Project Delta and its upcoming phases. Stay tuned for more details.", content: "<p>Full details about Project Delta, a new initiative focusing on innovative animation techniques will be revealed soon. This project aims to explore the boundaries of 2D and 3D integration.</p><img src='https://via.placeholder.com/600x300/0052D4/FFFFFF?text=Project+Delta+Concept' alt='Project Delta Concept Art'>" },
        { id: "update2", date: "2024.07.20", title_key: "ARTICLE_TITLE_2", default_title: "YR FOLIO DESIGN BREAKDOWN", snippet: "A deep dive into the design principles and aesthetic choices behind this portfolio website.", content: "<p>This portfolio itself was a design challenge, aiming for a blend of modern UI/UX with a distinct anime-inspired aesthetic. The color palette, typography, and layout choices were carefully considered to reflect a professional yet artistic sensibility. Key elements include the dynamic hero section and the use of subtle animations to enhance user experience without being distracting.</p>" },
        { id: "update3", date: "2024.07.05", title_key: "ARTICLE_TITLE_3", default_title: "UPCOMING WORKSHOP ON CREATIVE CODING FOR ANIMATORS", snippet: "Join my upcoming online workshop focusing on leveraging code for unique animation effects.", content: "<p>I'm thrilled to announce an upcoming online workshop designed for animators looking to expand their skillset into creative coding. We'll explore tools like p5.js and how they can be used to generate procedural animations, complex particle systems, and interactive visual elements. No prior coding experience is strictly necessary, but a curious mind is a must! More details on dates and registration will follow.</p>" }
    ];
    function displayUpdateInModal(updateId) { 
        const update = updatesData.find(u => u.id === updateId);
        if (update && infoModal && modalTitleEl && modalDateEl && modalBodyEl) {
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            const titleText = (translations[update.title_key] && translations[update.title_key][currentLang]) ? translations[update.title_key][currentLang] : update.default_title;
            modalTitleEl.textContent = titleText; modalDateEl.textContent = update.date; modalBodyEl.innerHTML = update.content;
            infoModal.classList.add('active'); document.body.style.overflow = 'hidden';
        }
    }
    function closeInfoModal() { 
        if (infoModal) { infoModal.classList.remove('active'); document.body.style.overflow = ''; }
    }
    if (updateGridContainer) { 
        updatesData.forEach((update, index) => { 
            const card = document.createElement('div');
            card.classList.add('update-card-yr', 'interactive-card', 'scroll-slide-up'); // Add base class for GSAP
            card.dataset.delay = (index % 3) * 0.1; // Stagger delay for cards if using animateWithGsap
            
            card.dataset.articleId = update.id; 
            const titleKey = update.title_key;
            card.innerHTML = `<span class="update-yr-date">${update.date}</span><h4 class="update-yr-title" data-translation-key="${titleKey}"><span>${update.default_title}</span></h4><p class="update-yr-snippet">${update.snippet}</p><span class="update-yr-arrow">→</span>`;
            card.addEventListener('click', () => displayUpdateInModal(update.id));
            updateGridContainer.appendChild(card);

            // GSAP animation for newly added cards
            animateWithGsap(card, { from: { y: 50, autoAlpha:0 }, to: { y: 0, autoAlpha:1 } }, { trigger: card });
        });
    }
    if (modalCloseBtn) { modalCloseBtn.addEventListener('click', closeInfoModal); }
    if (infoModal) { infoModal.addEventListener('click', (event) => { if (event.target === infoModal) closeInfoModal(); }); }
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && infoModal && infoModal.classList.contains('active')) closeInfoModal(); });

    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    if (window.setLanguage) window.setLanguage(preferredLanguage);
});