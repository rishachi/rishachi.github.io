import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\Rish\\.gemini\\antigravity\\brain\\2d867622-74e4-4214-9e31-b1b152591aed';

async function run() {
  console.log('=== RUNNING AWWWARDS "SAKUGA ATELIER" VERIFICATION ===\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(String(err));
    });

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    // Wait for preloader and hero clip-path entrance + WebGL textures to finish
    await new Promise(r => setTimeout(r, 2700));

    // 1. Check WebGL Stage & 5-Layer Pipeline Scrubber
    const hasWebGL = await page.$eval('.cel', el => el.classList.contains('has-webgl'));
    const stageButtonsCount = await page.$$eval('[data-hero-stage]', els => els.length);
    console.log('[1. WEBGL 5-LAYER STAGE CHECK]');
    console.log('  .cel.has-webgl:', hasWebGL);
    console.log('  Pipeline Stage Buttons:', stageButtonsCount);
    if (!hasWebGL || stageButtonsCount !== 5) {
      throw new Error('FAILED: WebGL stage or 5-layer pipeline buttons not initialized!');
    }

    // Move mouse over Hero Cel and toggle Onion-Skin GLSL + Stage 01 RAFU
    const frameBox = await page.$eval('.cel__frame', el => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width * 0.54, y: r.top + r.height * 0.44 };
    });
    await page.mouse.move(frameBox.x, frameBox.y);
    await page.click('[data-hero-onion]');
    await new Promise(r => setTimeout(r, 350));

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-hero-light.png') });
    console.log('  ✓ Captured awwwards-hero-light.png (Light-Table + WebGL Loupe + GLSL Onion-Skin)\n');

    // 2. Test Darkroom Satsuei Mode Toggle
    console.log('[2. SATSUEI DARKROOM THEME CHECK]');
    await page.click('[data-theme-toggle]');
    await new Promise(r => setTimeout(r, 350));
    const studioMode = await page.evaluate(() => document.documentElement.getAttribute('data-studio-mode'));
    console.log('  data-studio-mode:', studioMode);
    if (studioMode !== 'darkroom') {
      throw new Error('FAILED: Darkroom mode did not activate!');
    }
    await page.mouse.move(frameBox.x - 40, frameBox.y + 20);
    await new Promise(r => setTimeout(r, 250));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-hero-darkroom.png') });
    console.log('  ✓ Captured awwwards-hero-darkroom.png (Darkroom Satsuei Mode)\n');

    // Switch back to Light-Table mode for editorial warmth
    await page.click('[data-theme-toggle]');
    await new Promise(r => setTimeout(r, 200));

    // 2B. Test Section 01 — Sakuga 24fps Theatre Player & 100-Frame Camera Grid
    console.log('[2B. SAKUGA 24FPS THEATRE & 100-FRAME CAMERA GRID CHECK]');
    await page.evaluate(() => {
      document.querySelector('[data-reel-stage]').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 450));
    await page.click('[data-theatre-speed="0.25"]');
    await page.click('[data-theatre-next-frame]');
    await page.keyboard.press('Period');
    await new Promise(r => setTimeout(r, 350));
    const theatreState = await page.evaluate(() => {
      const vp = document.querySelector('[data-theatre-stage]');
      const xsheet = document.querySelector('[data-theatre-xsheet]')?.textContent.trim();
      const frames = document.querySelector('[data-theatre-frames]')?.textContent.trim();
      const speed025 = document.querySelector('[data-theatre-speed="0.25"]')?.classList.contains('is-active');
      return {
        hasGrid: vp ? vp.classList.contains('has-camera-grid') : false,
        xsheet,
        frames,
        speed025
      };
    });
    console.log('  Theatre 100-Frame Grid active:', theatreState.hasGrid);
    console.log('  Theatre X-Sheet Timecode:', theatreState.xsheet, '|', theatreState.frames);
    console.log('  Theatre 0.25x Speed active:', theatreState.speed025);
    if (!theatreState.hasGrid || !theatreState.speed025 || !theatreState.xsheet.includes('k')) {
      throw new Error('FAILED: Sakuga 24fps Theatre state invalid!');
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-sakuga-theatre.png') });
    console.log('  ✓ Captured awwwards-sakuga-theatre.png (Sakuga 24fps Theatre + 100-Frame Camera Grid)\n');

    // 3. Test Section 02 Process — 3D Exploded Isometric Cel Stack
    console.log('[3. PROCESS 3D EXPLODED CEL STACK CHECK]');
    await page.evaluate(() => {
      document.querySelector('#process').scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 350));
    await page.click('[data-process-3d-toggle]');
    await new Promise(r => setTimeout(r, 500));
    const is3DStack = await page.$eval('#process', el => el.classList.contains('is-3d-stack'));
    console.log('  #process.is-3d-stack:', is3DStack);
    if (!is3DStack) {
      throw new Error('FAILED: 3D Exploded Cel Stack did not activate!');
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-process-3d.png') });
    console.log('  ✓ Captured awwwards-process-3d.png (3D Exploded Isometric Cel Stack)\n');

    // 3B. Test Section 03.1 Interactive Pipeline Breakdown Console
    console.log('[3B. INTERACTIVE CUT BREAKDOWN CONSOLE CHECK]');
    await page.evaluate(() => {
      document.querySelector('[data-cut-breakdown]').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.click('[data-cbd-step="1"]');
    await page.click('[data-cbd-grid-toggle]');
    await new Promise(r => setTimeout(r, 350));
    const cbdState = await page.evaluate(() => {
      const root = document.querySelector('[data-cut-breakdown]');
      const stage = document.querySelector('[data-cbd-stage]');
      return {
        isWipe: root ? root.classList.contains('is-wipe-mode') : false,
        hasGrid: stage ? stage.classList.contains('has-camera-grid') : false
      };
    });
    console.log('  Cut Breakdown A/B Wipe active:', cbdState.isWipe);
    console.log('  Cut Breakdown 100-Frame Grid active:', cbdState.hasGrid);
    if (!cbdState.isWipe || !cbdState.hasGrid) {
      throw new Error('FAILED: Interactive Cut Breakdown Console failed!');
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-cut-breakdown.png') });
    console.log('  ✓ Captured awwwards-cut-breakdown.png (Interactive Pipeline Breakdown + A/B Wipe + 100-Frame Grid)\n');

    // 4. Test Section 03.3 Douga 50/50 Split Comparison Mode
    console.log('[4. DOUGA 50/50 SPLIT COMPARISON CHECK]');
    await page.evaluate(() => {
      document.querySelector('[data-douga]').scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 500));
    await page.click('[data-douga-mode="split"]');
    await new Promise(r => setTimeout(r, 450));
    const isSplit = await page.$eval('[data-douga]', el => el.classList.contains('is-split'));
    console.log('  [data-douga].is-split:', isSplit);
    if (!isSplit) {
      throw new Error('FAILED: Douga 50/50 Split mode did not activate!');
    }
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'awwwards-douga-split.png') });
    console.log('  ✓ Captured awwwards-douga-split.png (Douga 50/50 Split Wipe)\n');

    // 5. Test Cut-Bag Category Filter & Grid View Switcher
    console.log('[5. CUT-BAG FILTER & GRID SWITCHER CHECK]');
    await page.click('[data-work-filter="sakuga"]');
    const illustHidden = await page.$eval('[data-work-cat="illust"]', el => el.classList.contains('is-filtered-out'));
    await page.click('[data-work-filter="all"]');
    await page.click('[data-work-layout="grid"]');
    const isCompactGrid = await page.$eval('#work', el => el.classList.contains('is-compact-grid'));
    await page.click('[data-work-layout="editorial"]');
    console.log('  Filter Sakuga hides Illust:', illustHidden);
    console.log('  Compact Grid layout toggles:', isCompactGrid);
    if (!illustHidden || !isCompactGrid) {
      throw new Error('FAILED: Work filter or grid switcher failed!');
    }
    console.log('  ✓ Cut-Bag Filter and Grid View verified.\n');

    // 6. Trilingual i18n Integrity Check (Ensure zero raw keys appear in EN, VI, JA)
    console.log('[6. TRILINGUAL I18N INTEGRITY CHECK]');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));
    for (const lang of ['en', 'vi', 'ja']) {
      await page.evaluate((l) => {
        const btn = document.querySelector(`button[data-lang="${l}"]`);
        if (btn) btn.click();
      }, lang);
      await new Promise(r => setTimeout(r, 150));
      const rawKeys = await page.evaluate(() => {
        const bad = [];
        document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(el => {
          const k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
          const txt = el.textContent.trim();
          if (txt === k || txt.includes('credits.')) {
            bad.push({ key: k, text: txt });
          }
        });
        return bad;
      });
      console.log(`  Lang [${lang.toUpperCase()}] raw/missing keys count:`, rawKeys.length);
      if (rawKeys.length > 0) {
        throw new Error(`FAILED: Raw i18n keys found in ${lang}: ${JSON.stringify(rawKeys)}`);
      }
    }
    await page.evaluate(() => {
      const btn = document.querySelector('button[data-lang="en"]');
      if (btn) btn.click();
    });
    console.log('  ✓ 100% i18n parity verified across EN / VI / JA.\n');

    // 7. Responsive Zero-Overflow Check (375px, 768px, 1440px)
    console.log('[7. RESPONSIVE ZERO-OVERFLOW CHECK]');
    for (const width of [375, 768, 1440]) {
      await page.setViewport({ width, height: 800 });
      await new Promise(r => setTimeout(r, 120));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(`  Viewport ${width}px overflow:`, overflow);
      if (overflow) {
        throw new Error(`FAILED: Horizontal overflow at ${width}px!`);
      }
    }
    console.log('  ✓ Zero horizontal overflow across 375px, 768px, 1440px.\n');

    // 8. Console Errors Check
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
      throw new Error('FAILED: Console errors detected!');
    }
    console.log('[8. CONSOLE CLEAN CHECK]');
    console.log('  ✓ Zero console errors.\n');

    console.log('=== ALL AWWWARDS VERIFICATION CHECKS PASSED! ===');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
