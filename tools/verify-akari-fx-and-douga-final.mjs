import puppeteer from 'puppeteer-core';
import path from 'node:path';
import fs from 'node:fs';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'tools/akari-fx-check';
fs.mkdirSync(outDir, { recursive: true });

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // 1. Verify Hero Cel state (Akari FX -> Clean)
  const heroCheck = await page.evaluate(() => {
    const akariLayer = document.querySelector('.cel__cut-layer--akari');
    const shinkaiLayer = document.querySelector('.cel__cut-layer--shinkai');
    const finalImg = akariLayer ? akariLayer.querySelector('.cel__final img') : null;
    const sketchImg = akariLayer ? akariLayer.querySelector('.cel__sketch img') : null;
    const badge = akariLayer ? akariLayer.querySelector('.cel__badge') : null;
    const ringLabel = document.querySelector('[data-lens-ring] span');
    const activeCutPill = document.querySelector('.cel__cut-pill.is-active');

    return {
      isAkariActive: akariLayer ? akariLayer.classList.contains('is-active') : false,
      isShinkaiActive: shinkaiLayer ? shinkaiLayer.classList.contains('is-active') : false,
      finalSrc: finalImg ? finalImg.currentSrc || finalImg.src : '',
      sketchSrc: sketchImg ? sketchImg.currentSrc || sketchImg.src : '',
      badgeText: badge ? badge.textContent.trim() : '',
      ringLabel: ringLabel ? ringLabel.textContent.trim() : '',
      activeCutPill: activeCutPill ? activeCutPill.textContent.trim() : ''
    };
  });
  console.log('1. Hero Cel Check (Akari FX -> Clean):', heroCheck);

  // 2. Test Loupe Hover on Akari
  await page.hover('.cel__frame');
  await new Promise(r => setTimeout(r, 400));
  const loupeHover = await page.evaluate(() => {
    const ring = document.querySelector('[data-lens-ring]');
    const sketch = document.querySelector('.cel__cut-layer--akari .cel__sketch');
    return {
      isRingActive: ring ? ring.classList.contains('is-active') : false,
      sketchMaskR: sketch ? sketch.style.getPropertyValue('--r') : 'none'
    };
  });
  console.log('2. Loupe Hover Check:', loupeHover);
  await page.screenshot({ path: path.join(outDir, '01-hero-akari-fx-clean-hover.png') });

  // 3. Test Full Lock on Click
  await page.click('.cel__frame');
  await new Promise(r => setTimeout(r, 300));
  const lockState = await page.evaluate(() => {
    const ringLabel = document.querySelector('[data-lens-ring] span');
    return {
      ringLabel: ringLabel ? ringLabel.textContent.trim() : ''
    };
  });
  console.log('3. Locked Clean View:', lockState);
  await page.screenshot({ path: path.join(outDir, '02-hero-akari-locked-clean.png') });

  // Unlock back to FX
  await page.click('.cel__frame');
  await new Promise(r => setTimeout(r, 300));

  // 4. Verify Section 05: Douga & Final Cut Study
  console.log('\nChecking Section 05 (Douga & Final Cut Study)...');
  await page.evaluate(() => {
    document.querySelector('.douga-row')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const dougaCheck = await page.evaluate(() => {
    const douga = document.querySelector('[data-douga]');
    const v = document.querySelector('[data-douga-video]');
    const activeBtn = document.querySelector('.douga__mode-btn.is-active');
    const sheetCode = document.querySelector('[data-douga-sheet-code]');
    const spec = document.querySelector('[data-douga-spec-label]');
    return {
      dougaMode: douga ? douga.dataset.dougaMode : '',
      isFinalClass: douga ? douga.classList.contains('is-final') : false,
      activeBtnMode: activeBtn ? activeBtn.getAttribute('data-douga-mode') : '',
      activeBtnText: activeBtn ? activeBtn.textContent.trim() : '',
      sheetCode: sheetCode ? sheetCode.textContent.trim() : '',
      spec: spec ? spec.textContent.trim() : '',
      videoPaused: v ? v.paused : true,
      videoCurrentTime: v ? v.currentTime : -1
    };
  });
  console.log('4. Section 05 Initial State (Final Cut first):', dougaCheck);
  await page.screenshot({ path: path.join(outDir, '03-douga-section-final-cut-first.png') });

  // 5. Test switching Section 05 to Line Art mode
  console.log('Switching Section 05 to Line Art mode...');
  await page.click('button[data-douga-mode="line"]');
  await new Promise(r => setTimeout(r, 600));

  const lineArtCheck = await page.evaluate(() => {
    const douga = document.querySelector('[data-douga]');
    const activeBtn = document.querySelector('.douga__mode-btn.is-active');
    const sheetCode = document.querySelector('[data-douga-sheet-code]');
    return {
      dougaMode: douga ? douga.dataset.dougaMode : '',
      isFinalClass: douga ? douga.classList.contains('is-final') : false,
      activeBtnMode: activeBtn ? activeBtn.getAttribute('data-douga-mode') : '',
      sheetCode: sheetCode ? sheetCode.textContent.trim() : ''
    };
  });
  console.log('5. Section 05 Line Art Mode:', lineArtCheck);
  await page.screenshot({ path: path.join(outDir, '04-douga-section-line-art-mode.png') });

  // 6. Test Mobile Viewport (390x844)
  console.log('\nChecking Mobile Responsiveness (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));

  const mobileCheck = await page.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    return {
      scrollWidth: sw,
      clientWidth: cw,
      hasOverflow: sw > cw
    };
  });
  console.log('6. Mobile Responsiveness:', mobileCheck);
  await page.screenshot({ path: path.join(outDir, '05-mobile-hero-akari.png') });

  await browser.close();
  console.log('\nAll checks completed! Any errors:', errors);
}

verify().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
