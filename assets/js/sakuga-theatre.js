/**
 * PHAT TRAN (RiSH) — KINETIC ANIME PRODUCTION DESK
 * PHASE 2 MODULE:
 *  1. Sakuga 24fps Theatre Player (1/24s frame stepping via UI & `,`/`.` keys,
 *     0.25x / 0.5x / 1.0x speed selector, Loop Cut toggle, Japanese X-Sheet
 *     Timecode `[Sec] + [Koma]k` & `Frame: XXX / YYY`, 100-Frame Camera Grid SVG)
 *  2. Interactive Pipeline Breakdown Console (Get Set Run Cut 008:
 *     3D Layout / LO -> Genga -> Douga & Paint -> Composite -> Final Satsuei
 *     with interactive A/B wipe slider & 100-Frame Enshutsu Grid overlay)
 */
(function () {
  'use strict';

  const FPS = 24;
  const FRAME_DURATION = 1 / FPS; // 0.0416667s

  /**
   * Format seconds into Japanese Anime X-Sheet Timecode:
   *   `[Seconds] + [Koma]k` (e.g., `03 + 18k`) and `Frame: 090 / 144`
   */
  function formatXSheetTimecode(currentTimeSec, durationSec) {
    const safeCur = Math.max(0, Number(currentTimeSec) || 0);
    const safeDur = Math.max(FRAME_DURATION, Number(durationSec) || 6.0);

    const totalFrames = Math.max(1, Math.round(safeDur * FPS));
    // 1-indexed current frame (1 .. totalFrames)
    const currentFrame = Math.min(totalFrames, Math.floor(safeCur * FPS + 1e-4) + 1);

    const wholeSeconds = Math.floor(safeCur + 1e-4);
    const koma = Math.min(FPS, Math.floor((safeCur - wholeSeconds) * FPS + 1e-4) + 1);

    const secStr = String(wholeSeconds).padStart(2, '0');
    const komaStr = String(koma).padStart(2, '0');
    const curFrameStr = String(currentFrame).padStart(3, '0');
    const totFrameStr = String(totalFrames).padStart(3, '0');

    return {
      xsheet: `${secStr} + ${komaStr}k`,
      frameCounter: `Frame: ${curFrameStr} / ${totFrameStr}`,
      currentFrame,
      totalFrames,
      progress: Math.min(1, Math.max(0, safeCur / safeDur))
    };
  }

  /**
   * Create the standard Japanese Anime 100-Frame Camera Framing Grid SVG
   * (100-Frame border, 90% Action Safe, 80% Title Safe, Enshutsu 1/3 grid, Center Cross +)
   */
  function createCameraGridSVG() {
    return `
      <svg class="camera-grid-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
        <!-- Outer 100-Frame Camera Field -->
        <rect class="cg-100" x="24" y="24" width="1872" height="1032" />
        <!-- 90% Action Safe -->
        <rect class="cg-action" x="96" y="54" width="1728" height="972" />
        <!-- 80% Title Safe -->
        <rect class="cg-title" x="192" y="108" width="1536" height="864" />
        <!-- Enshutsu Rule of Thirds (1/3 & 2/3) -->
        <line class="cg-third" x1="640" y1="24" x2="640" y2="1056" />
        <line class="cg-third" x1="1280" y1="24" x2="1280" y2="1056" />
        <line class="cg-third" x1="24" y1="360" x2="1896" y2="360" />
        <line class="cg-third" x1="24" y1="720" x2="1896" y2="720" />
        <!-- Center Crosshair (Camera Optical Axis) -->
        <line class="cg-axis" x1="910" y1="540" x2="1010" y2="540" />
        <line class="cg-axis" x1="960" y1="490" x2="960" y2="590" />
        <circle class="cg-axis-ring" cx="960" cy="540" r="28" />
        <!-- Top & Bottom Field Chart Ticks -->
        <line class="cg-tick" x1="480" y1="24" x2="480" y2="42" />
        <line class="cg-tick" x1="960" y1="24" x2="960" y2="48" />
        <line class="cg-tick" x1="1440" y1="24" x2="1440" y2="42" />
        <line class="cg-tick" x1="480" y1="1038" x2="480" y2="1056" />
        <line class="cg-tick" x1="960" y1="1032" x2="960" y2="1056" />
        <line class="cg-tick" x1="1440" y1="1038" x2="1440" y2="1056" />
        <!-- Technical Stamp Labels -->
        <text class="cg-label" x="42" y="50">100 FRAME FIELD · STD 16:9</text>
        <text class="cg-label" x="112" y="78">ACTION SAFE 90%</text>
        <text class="cg-label" x="208" y="132">TITLE SAFE 80% · ENSHUTSU 1/3</text>
        <text class="cg-label cg-label--right" x="1878" y="50" text-anchor="end">CENTER CROSS (+) · 24FPS</text>
      </svg>
    `;
  }

  /* =====================================================================
     1. SAKUGA 24FPS THEATRE PLAYER (SECTION 01 SHOWREEL DECK)
     ===================================================================== */
  function initSakugaTheatre() {
    const theatre = document.querySelector('[data-sakuga-theatre]');
    if (!theatre) return;

    const deckTabs = theatre.querySelectorAll('[data-reel-deck-tab]');
    const deckPanels = theatre.querySelectorAll('[data-reel-deck-panel]');
    const video = theatre.querySelector('[data-theatre-video]');
    const playBtn = theatre.querySelector('[data-theatre-play]');
    const prevFrameBtn = theatre.querySelector('[data-theatre-prev-frame]');
    const nextFrameBtn = theatre.querySelector('[data-theatre-next-frame]');
    const speedBtns = theatre.querySelectorAll('[data-theatre-speed]');
    const loopBtn = theatre.querySelector('[data-theatre-loop]');
    const gridBtn = theatre.querySelector('[data-theatre-grid]');
    const xsheetEl = theatre.querySelector('[data-theatre-xsheet]');
    const frameCounterEl = theatre.querySelector('[data-theatre-frames]');
    const scrubRange = theatre.querySelector('[data-theatre-scrub]');
    const stageWrap = theatre.querySelector('[data-theatre-stage]');
    const gridSlot = theatre.querySelector('[data-theatre-grid-slot]');

    if (gridSlot && !gridSlot.innerHTML.trim()) {
      gridSlot.innerHTML = createCameraGridSVG();
    }

    let isLooping = true;
    let isGridOn = true; // Default enabled so Seisaku Shinkou immediately see the 100-Frame guide
    let rafId = 0;

    if (stageWrap) {
      stageWrap.classList.toggle('has-camera-grid', isGridOn);
    }
    if (gridBtn) {
      gridBtn.setAttribute('aria-pressed', String(isGridOn));
      gridBtn.classList.toggle('is-active', isGridOn);
    }

    // Switch between 24fps Sakuga Cut Inspector and Full YouTube Showreel
    deckTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-reel-deck-tab');
        deckTabs.forEach((t) => {
          const active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', String(active));
        });
        deckPanels.forEach((panel) => {
          const match = panel.getAttribute('data-reel-deck-panel') === target;
          panel.hidden = !match;
          panel.classList.toggle('is-active', match);
        });
        if (target !== 'inspector' && video) {
          video.pause();
          updatePlayUI();
        }
        if (window.RishAudio) window.RishAudio.flip();
      });
    });

    if (!video) return;

    function updateReadout() {
      const dur = (video.duration && !isNaN(video.duration)) ? video.duration : 6.0;
      const cur = video.currentTime || 0;
      const info = formatXSheetTimecode(cur, dur);

      if (xsheetEl) xsheetEl.textContent = info.xsheet;
      if (frameCounterEl) frameCounterEl.textContent = info.frameCounter;
      if (scrubRange) {
        scrubRange.max = String(info.totalFrames);
        scrubRange.value = String(info.currentFrame);
      }
    }

    function updatePlayUI() {
      const playing = !video.paused && !video.ended;
      if (playBtn) {
        playBtn.setAttribute('aria-pressed', String(playing));
        playBtn.classList.toggle('is-playing', playing);
      }
      if (stageWrap) {
        stageWrap.classList.toggle('is-playing', playing);
      }
      if (playing && !rafId) {
        const tick = () => {
          updateReadout();
          if (!video.paused && !video.ended) {
            rafId = requestAnimationFrame(tick);
          } else {
            rafId = 0;
          }
        };
        rafId = requestAnimationFrame(tick);
      } else if (!playing && rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    }

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
      updatePlayUI();
      if (window.RishAudio) window.RishAudio.tick();
    }

    function stepFrames(deltaFrames) {
      if (!video.paused) {
        video.pause();
        updatePlayUI();
      }
      const dur = (video.duration && !isNaN(video.duration)) ? video.duration : 6.0;
      const curFrameIdx = Math.round((video.currentTime || 0) * FPS);
      const totalFrames = Math.max(1, Math.round(dur * FPS));
      let nextFrameIdx = curFrameIdx + deltaFrames;

      if (isLooping) {
        nextFrameIdx = ((nextFrameIdx % totalFrames) + totalFrames) % totalFrames;
      } else {
        nextFrameIdx = Math.max(0, Math.min(totalFrames - 1, nextFrameIdx));
      }

      try {
        video.currentTime = Math.min(dur - 0.001, nextFrameIdx * FRAME_DURATION + 0.0005);
      } catch (_) {}
      updateReadout();
      if (window.RishAudio) window.RishAudio.tick();
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (stageWrap) {
      stageWrap.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('input')) return;
        togglePlay();
      });
    }
    if (prevFrameBtn) prevFrameBtn.addEventListener('click', () => stepFrames(-1));
    if (nextFrameBtn) nextFrameBtn.addEventListener('click', () => stepFrames(1));

    speedBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const rate = parseFloat(btn.getAttribute('data-theatre-speed')) || 1;
        video.playbackRate = rate;
        speedBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        if (window.RishAudio) window.RishAudio.tick();
      });
    });

    if (loopBtn) {
      loopBtn.addEventListener('click', () => {
        isLooping = !isLooping;
        video.loop = isLooping;
        loopBtn.classList.toggle('is-active', isLooping);
        loopBtn.setAttribute('aria-pressed', String(isLooping));
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    if (gridBtn && stageWrap) {
      gridBtn.addEventListener('click', () => {
        isGridOn = !isGridOn;
        stageWrap.classList.toggle('has-camera-grid', isGridOn);
        gridBtn.classList.toggle('is-active', isGridOn);
        gridBtn.setAttribute('aria-pressed', String(isGridOn));
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    if (scrubRange) {
      scrubRange.addEventListener('input', (e) => {
        if (!video.paused) {
          video.pause();
          updatePlayUI();
        }
        const dur = (video.duration && !isNaN(video.duration)) ? video.duration : 6.0;
        const frameNum = Math.max(1, parseInt(e.target.value, 10) || 1);
        try {
          video.currentTime = Math.min(dur - 0.001, (frameNum - 1) * FRAME_DURATION + 0.0005);
        } catch (_) {}
        updateReadout();
      });
    }

    video.addEventListener('loadedmetadata', updateReadout);
    video.addEventListener('timeupdate', updateReadout);
    video.addEventListener('play', updatePlayUI);
    video.addEventListener('pause', updatePlayUI);
    video.addEventListener('ended', updatePlayUI);

    updateReadout();

    // Global keyboard shortcuts `,` (prev frame 1/24s) and `.` (next frame 1/24s)
    window.addEventListener('keydown', (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Check if either the Theatre Inspector or Douga Section is in viewport
      const rect = theatre.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      const inspectorPanel = theatre.querySelector('[data-reel-deck-panel="inspector"]');
      const inspectorActive = inspectorPanel && !inspectorPanel.hidden;

      if (inView && inspectorActive) {
        if (e.key === ',' || e.key === '<') {
          e.preventDefault();
          stepFrames(-1);
        } else if (e.key === '.' || e.key === '>') {
          e.preventDefault();
          stepFrames(1);
        }
      }
    });
  }

  /* =====================================================================
     2. UPGRADE 03.3 DOUGA & FINAL CUT PLAYER WITH X-SHEET TIMECODE,
        0.25x/0.5x/1.0x SPEED, LOOP CUT, `,`/`.` KEYS & 100-FRAME GRID
     ===================================================================== */
  function enhanceDougaPlayer() {
    const dougaEl = document.querySelector('[data-douga]');
    if (!dougaEl) return;

    const stage = dougaEl.querySelector('[data-douga-stage]');
    const video = dougaEl.querySelector('[data-douga-video]');
    const prevBtn = dougaEl.querySelector('[data-douga-prev]');
    const nextBtn = dougaEl.querySelector('[data-douga-next]');
    const gridBtn = dougaEl.querySelector('[data-douga-grid-btn]');
    const loopBtn = dougaEl.querySelector('[data-douga-loop-btn]');
    const speedGroup = dougaEl.querySelectorAll('[data-douga-rate]');
    const xsheetBadge = dougaEl.querySelector('[data-douga-xsheet]');

    if (stage && !stage.querySelector('.camera-grid-svg')) {
      const gridWrap = document.createElement('div');
      gridWrap.className = 'camera-grid-layer';
      gridWrap.setAttribute('aria-hidden', 'true');
      gridWrap.innerHTML = createCameraGridSVG();
      stage.appendChild(gridWrap);
    }

    if (gridBtn && stage) {
      gridBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const on = stage.classList.toggle('has-camera-grid');
        gridBtn.classList.toggle('is-active', on);
        gridBtn.setAttribute('aria-pressed', String(on));
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    if (loopBtn && video) {
      loopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextLoop = !video.loop;
        video.loop = nextLoop;
        loopBtn.classList.toggle('is-active', nextLoop);
        loopBtn.setAttribute('aria-pressed', String(nextLoop));
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    if (speedGroup.length && video) {
      speedGroup.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const rate = parseFloat(btn.getAttribute('data-douga-rate')) || 1;
          video.playbackRate = rate;
          speedGroup.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
          });
          if (window.RishAudio) window.RishAudio.tick();
        });
      });
    }

    if (video && xsheetBadge) {
      const syncDougaXSheet = () => {
        const dur = (video.duration && !isNaN(video.duration)) ? video.duration : 6.0;
        const info = formatXSheetTimecode(video.currentTime || 0, dur);
        xsheetBadge.textContent = `${info.xsheet} · ${info.frameCounter}`;
      };
      video.addEventListener('timeupdate', syncDougaXSheet);
      video.addEventListener('loadedmetadata', syncDougaXSheet);
      syncDougaXSheet();
    }

    // Support `,` and `.` keys when 03.3 Douga player is in viewport
    window.addEventListener('keydown', (e) => {
      if (e.target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const rect = dougaEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
      if (!inView) return;

      if (e.key === ',' || e.key === '<') {
        e.preventDefault();
        if (prevBtn) prevBtn.click();
      } else if (e.key === '.' || e.key === '>') {
        e.preventDefault();
        if (nextBtn) nextBtn.click();
      }
    });
  }

  /* =====================================================================
     3. INTERACTIVE PIPELINE BREAKDOWN CONSOLE (GET SET RUN — CUT 008)
     ===================================================================== */
  function initPipelineBreakdown() {
    const consoleEl = document.querySelector('[data-cut-breakdown]');
    if (!consoleEl) return;

    const stageEl = consoleEl.querySelector('[data-cbd-stage]');
    const stageBtns = consoleEl.querySelectorAll('[data-cbd-step]');
    const layers = consoleEl.querySelectorAll('[data-cbd-layer]');
    const wipeToggleBtn = consoleEl.querySelector('[data-cbd-wipe-toggle]');
    const wipeSlider = consoleEl.querySelector('[data-cbd-wipe-range]');
    const gridBtn = consoleEl.querySelector('[data-cbd-grid-toggle]');
    const currentLabel = consoleEl.querySelector('[data-cbd-current-label]');

    if (stageEl && !stageEl.querySelector('.camera-grid-svg')) {
      const gridWrap = document.createElement('div');
      gridWrap.className = 'camera-grid-layer';
      gridWrap.setAttribute('aria-hidden', 'true');
      gridWrap.innerHTML = createCameraGridSVG();
      stageEl.appendChild(gridWrap);
    }

    let activeStep = '0';
    let isWipeCompare = true; // Default on so visitors immediately experience the A/B pipeline anatomy

    function syncBreakdownUI() {
      consoleEl.classList.toggle('is-wipe-mode', isWipeCompare);
      if (wipeToggleBtn) {
        wipeToggleBtn.classList.toggle('is-active', isWipeCompare);
        wipeToggleBtn.setAttribute('aria-pressed', String(isWipeCompare));
      }

      stageBtns.forEach((btn) => {
        const step = btn.getAttribute('data-cbd-step');
        const active = step === activeStep;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
        if (active && currentLabel) {
          currentLabel.textContent = btn.getAttribute('data-cbd-title') || btn.textContent.trim();
        }
      });

      layers.forEach((layer) => {
        const step = layer.getAttribute('data-cbd-layer');
        layer.classList.toggle('is-selected', step === activeStep);
      });
    }

    stageBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeStep = btn.getAttribute('data-cbd-step') || '0';
        // If user selects Final Satsuei (step 3) while in wipe mode against Final Satsuei, switch to full view or compare against LO/Genga
        syncBreakdownUI();
        if (window.RishAudio) window.RishAudio.flip();
      });
    });

    if (wipeToggleBtn) {
      wipeToggleBtn.addEventListener('click', () => {
        isWipeCompare = !isWipeCompare;
        syncBreakdownUI();
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    if (wipeSlider) {
      const updateWipe = (val) => {
        consoleEl.style.setProperty('--cbd-wipe', `${val}%`);
      };
      wipeSlider.addEventListener('input', (e) => {
        if (!isWipeCompare) {
          isWipeCompare = true;
          syncBreakdownUI();
        }
        updateWipe(e.target.value);
      });
      updateWipe(wipeSlider.value || 52);
    }

    if (gridBtn && stageEl) {
      gridBtn.addEventListener('click', () => {
        const on = stageEl.classList.toggle('has-camera-grid');
        gridBtn.classList.toggle('is-active', on);
        gridBtn.setAttribute('aria-pressed', String(on));
        if (window.RishAudio) window.RishAudio.flip();
      });
    }

    syncBreakdownUI();
  }

  /* =====================================================================
     4. KINETIC CUT-BAG ENVELOPE REVEALS (GSAP + SCROLLTRIGGER SNAPPY 2D)
     ===================================================================== */
  function initCutBagKineticMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') return;

    const cutHeaders = document.querySelectorAll('.cut-bag-head');
    cutHeaders.forEach((header) => {
      const cells = header.querySelectorAll('.cut-bag-head__cell');
      gsap.fromTo(
        header,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.25 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 0.42,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            once: true
          }
        }
      );
      if (cells.length) {
        gsap.fromTo(
          cells,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.34,
            stagger: 0.055,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 90%',
              once: true
            }
          }
        );
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSakugaTheatre();
      enhanceDougaPlayer();
      initPipelineBreakdown();
      initCutBagKineticMotion();
    });
  } else {
    initSakugaTheatre();
    enhanceDougaPlayer();
    initPipelineBreakdown();
    initCutBagKineticMotion();
  }
})();
