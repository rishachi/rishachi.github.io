/**
 * =====================================================================
 * RiSH Animation Portfolio — Data Registry
 * Centralized data store for Selected Works and Production Credits.
 * Structured for anime studio review and easy maintenance.
 * =====================================================================
 */
(function (root, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    var data = factory();
    root.PORTFOLIO_WORKS = data.WORKS_DATA;
    root.PORTFOLIO_CREDITS = data.CREDITS_DATA;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var WORKS_DATA = [
    {
      id: 'get-set-run',
      no: '03.1',
      featured: true,
      category: 'film',
      year: '2025',
      title: {
        en: 'GET_SET RUN',
        vi: 'GET_SET RUN',
        ja: 'GET_SET RUN / ゲット・セット・ラン'
      },
      subJp: 'ゲット・セット・ラン',
      role: {
        en: 'Director · Key Animation (Genga) · Key Visual',
        vi: 'Đạo diễn · Diễn hoạt chính (Genga) · Key Visual',
        ja: '監督・原画（原画・LO）・キービジュアル'
      },
      team: 'Shiguma Dakkusu (FPT University)',
      desc: {
        en: 'An original short sports animation produced by the Shiguma Dakkusu team at FPT University. Serving as Project Director and Lead Key Animator, I spearheaded the visual direction, layout (LO), and high-impact sprint sakuga sequences — capturing the raw physical weight, momentum, and emotional drive of Akari chasing a finish line only she can see.',
        vi: 'Phim ngắn hoạt hình thể thao nguyên tác thực hiện bởi nhóm Shiguma Dakkusu tại Đại học FPT. Đảm nhiệm vai trò Đạo diễn dự án kiêm Lead Key Animator, mình dẫn dắt định hướng hình ảnh, bố cục khung hình (layout - LO) và những trường đoạn sakuga bứt tốc đầy uy lực — truyền tải trọn vẹn sức nặng thể chất, động lượng và khát khao nội tâm của Akari trên hành trình chạm tới vạch đích của riêng cô.',
        ja: 'FPT大学のチーム「Shiguma Dakkusu」によるオリジナル短編スポーツアニメーション。プロジェクト監督およびリード原画（Key Animator）として、ビジュアルディレクション、レイアウト（LO）、迫力あるスプリント作画（sakuga）を牽引。自分にしか見えないゴールを目指すランナー・明（アカリ）のリアルな体重移動、躍動感、そして情熱を描き出しました。'
      },
      media: {
        poster: 'assets/img/gsr-poster-1000.jpg',
        standee: 'assets/img/gsr-standee-500.jpg',
        breakdown: 'assets/img/process-breakdown-1400.jpg'
      }
    },
    {
      id: 'genga-study',
      no: '03.2',
      featured: false,
      category: 'genga',
      year: '2026',
      title: {
        en: 'Key Animation (Genga) & Layout Study',
        vi: 'Nghiên Cứu Diễn Hoạt Genga & Bố Cục Layout (LO)',
        ja: '原画・レイアウト（LO / 二原）習作'
      },
      subJp: '原画・レイアウト (LO / Nigen)',
      role: {
        en: 'Key Animator (Genga / LO)',
        vi: 'Diễn hoạt chính (Genga / LO)',
        ja: '原画・レイアウト'
      },
      desc: {
        en: 'Rough-to-clean key animation and layout construction focusing on perspective shifts, timing charts (tsume), and weight transfer in Clip Studio Paint EX.',
        vi: 'Nghiên cứu diễn hoạt từ phác thảo (rough key) đến genga hoàn thiện và dựng layout (LO) tập trung vào chuyển góc phối cảnh, biểu đồ nhịp (tsume) và lực truyền trọng lượng trong Clip Studio Paint EX.',
        ja: 'ラフ原画から二原・クリンナップへの作画工程、パース変化、ツメ指示（中割りの加減速）、体重移動を意識したレイアウト・原画習作（Clip Studio Paint EX）。'
      },
      tags: {
        en: ['Genga (原画)', 'Layout (LO)', 'X-Sheet / Timesheet', '2026'],
        vi: ['Genga (原画)', 'Layout (LO)', 'X-Sheet / Timesheet', '2026'],
        ja: ['原画（Genga）', 'レイアウト（LO）', 'タイムシート（X-Sheet）', '2026']
      },
      media: {
        image: 'assets/img/process-1-1400.jpg',
        full: 'assets/img/process-1-2000.avif'
      }
    },
    {
      id: 'douga-study',
      no: '03.3',
      featured: false,
      category: 'douga',
      year: '2025',
      title: {
        en: 'Douga & Final Cut Study',
        vi: 'Nghiên Cứu Douga & Phim Hoàn Thiện',
        ja: '動画・完成カット習作'
      },
      subJp: '動画・完成カット (Shiage & Satsuei)',
      role: {
        en: 'In-between & Digital Paint · Satsuei FX',
        vi: 'Vẽ trung gian (Douga) & Tô màu · Xử lý hậu kỳ (Satsuei)',
        ja: '動画・仕上げ・撮影'
      },
      desc: {
        en: '26-drawing clean-up and in-between study of a wind-swept head turn — from raw closed trace lines (iro-toresu) to final Makoto Shinkai-style compositing, sunset lighting and bokeh.',
        vi: 'Nghiên cứu clean-up và vẽ trung gian (in-between) 26 tờ cho động tác quay đầu trong gió — từ nét vẽ khép kín kèm chỉ dẫn bóng màu (iro-toresu) đến thước phim hoàn thiện phong cách Shinkai với ánh sáng hoàng hôn và hiệu ứng bokeh.',
        ja: '風に揺れる振り向きの動画・クリンナップ26枚の習作。色トレス指定（影・ハイライト・境界線）の線画から、新海誠風の夕景ライティング・ボケ・撮影処理を施した完成カットまで。'
      },
      tags: {
        en: ['Douga · 26 drawings', 'Iro-toresu (色トレス)', 'Composite & FX (撮影)', '2025'],
        vi: ['Douga · 26 tờ', 'Chỉ định bóng (色トレス)', 'Hoàn thiện & Kỹ xảo (撮影)', '2025'],
        ja: ['動画 · 26枚', '色トレス・影指定', '撮影・仕上げ (Satsuei)', '2025']
      },
      media: {
        video: 'assets/video/shinkai-cut-1.mp4',
        loop: 'assets/img/douga/loop.webp',
        poster: 'assets/img/douga/poster.jpg',
        posterFinal: 'assets/img/douga/poster-final.jpg'
      }
    },
    {
      id: 'fern-frieren',
      no: '03.4',
      featured: false,
      category: 'illustration',
      year: '2024',
      title: {
        en: 'Fern & Frieren',
        vi: 'Fern & Frieren',
        ja: 'フェルンとフリーレン'
      },
      subJp: '葬送のフリーレン ファンアート',
      role: {
        en: 'Illustration & Color Styling',
        vi: 'Minh hoạ & Xử lý màu sắc',
        ja: 'イラスト・色彩設計'
      },
      desc: {
        en: 'Fan art for “Frieren: Beyond Journey\'s End” — a quiet, warm moment rendered with soft light and chromatic bloom.',
        vi: 'Tranh fan art lấy cảm hứng từ anime “Frieren: Pháp sư tiễn táng” — khoảnh khắc ấm áp, bình yên với ánh sáng mềm và hiệu ứng tán sắc.',
        ja: 'アニメ『葬送のフリーレン』のファンアート。柔らかな光と色収差で穏やかなひとときを表現しました。'
      },
      tags: {
        en: ['Fan art', 'Digital painting', '2024'],
        vi: ['Fan art', 'Digital painting', '2024'],
        ja: ['ファンアート', 'デジタルペイント', '2024']
      },
      media: {
        image: 'assets/img/fern-1400.jpg',
        full: 'assets/img/fern-1920.jpg'
      }
    },
    {
      id: 'aoi-design',
      no: '03.5',
      featured: false,
      category: 'illustration',
      year: '2024',
      title: {
        en: 'Aoi — Character Sheet',
        vi: 'Aoi — Thiết Kế Nhân Vật (Character Sheet)',
        ja: '葵（アオイ）— キャラクター設定画'
      },
      subJp: 'オリジナルキャラクター設定',
      role: {
        en: 'Character Design & Turnaround',
        vi: 'Thiết kế nhân vật & Turnaround',
        ja: 'キャラクターデザイン・三面図'
      },
      desc: {
        en: 'Original character turnaround for a personal animation project: front, back and profile views, built to stay on-model across hundreds of drawings.',
        vi: 'Bảng xoay chiều nhân vật gốc (turnaround) cho dự án hoạt hình cá nhân: góc chính diện, sau lưng và góc nghiêng đảm bảo đồng nhất tỉ lệ khi diễn hoạt.',
        ja: '個人アニメーション制作のためのオリジナルキャラクター三面図（正面・背面・側面）。作画崩壊を防ぐバランス設計。'
      },
      tags: {
        en: ['Original character', 'Turnaround', '2024'],
        vi: ['Nhân vật gốc', 'Character sheet', '2024'],
        ja: ['オリジナル', '設定画・三面図', '2024']
      },
      media: {
        image: 'assets/img/aoi-1400.jpg',
        full: 'assets/img/aoi-2000.jpg'
      }
    }
  ];

  var CREDITS_DATA = [
    {
      id: 'gsr',
      project: 'GET_SET RUN',
      category: 'Short Film',
      year: '2025',
      roleKey: 'case.roleVal',
      roleFallback: 'Director · Key Animation (Genga) · Key Visual',
      studio: 'Shiguma Dakkusu (FPT University)',
      isCommercial: false
    },
    {
      id: 'yoasobi',
      project: 'YOASOBI × Overwatch: "Orion"',
      category: 'Music Video',
      year: '2024',
      roleKey: 'credits.role.both',
      roleFallback: 'In-Between & Finish Animation (動画・仕上げ)',
      studio: 'Studio Hibari',
      isCommercial: true
    },
    {
      id: 'mushoku',
      project: 'Mushoku Tensei II / III (無職転生)',
      category: 'TV Anime',
      year: '2023 — 2024',
      roleKey: 'credits.role.shiage',
      roleFallback: 'Finish Animation / Paint (仕上げ)',
      studio: 'Studio Bind',
      isCommercial: true
    },
    {
      id: 'elite',
      project: 'Classroom of the Elite (ようこそ実力至上主義の教室へ)',
      category: 'TV Anime',
      year: '2022 — 2024',
      roleKey: 'credits.role.both',
      roleFallback: 'In-Between & Finish Animation (動画・仕上げ)',
      studio: 'Lerche',
      isCommercial: true
    },
    {
      id: 'highcard',
      project: 'HIGH CARD (ハイカード)',
      category: 'TV Anime',
      year: '2023 — 2024',
      roleKey: 'credits.role.both',
      roleFallback: 'In-Between & Finish Animation (動画・仕上げ)',
      studio: 'Studio Hibari',
      isCommercial: true
    },
    {
      id: 'hanako',
      project: 'After-school Hanako-kun (放課後少年花子くん)',
      category: 'TV Anime',
      year: '2023 — 2024',
      roleKey: 'credits.role.both',
      roleFallback: 'In-Between & Finish Animation (動画・仕上げ)',
      studio: 'Lerche',
      isCommercial: true
    },
    {
      id: 'given',
      project: 'given: The Movie (映画 ギヴン / 10th Mix)',
      category: 'Theatrical / OAD',
      year: '2021 — 2024',
      roleKey: 'credits.role.shiage',
      roleFallback: 'Finish Animation / Paint (仕上げ)',
      studio: 'Lerche',
      isCommercial: true
    },
    {
      id: 'suzume',
      project: 'Suzume no Tojimari (すずめの戸締まり)',
      category: 'Theatrical Film',
      year: '2022',
      roleKey: 'credits.role.douga',
      roleFallback: 'In-Between Animation (動画)',
      studio: 'CoMix Wave Films / Story Inc.',
      isCommercial: true
    }
  ];

  return {
    WORKS_DATA: WORKS_DATA,
    CREDITS_DATA: CREDITS_DATA
  };
});
