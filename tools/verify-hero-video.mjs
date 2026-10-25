import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'tools/hero-video-check';
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

  // 1. Check Hero Video presence & playback state
  const heroState = await page.evaluate(() => {
    const v = document.querySelector('.cel__video');
    const shinkaiLayer = document.querySelector('.cel__cut-layer--shinkai');
    const badge = document.querySelector('.cel__cut-layer--shinkai .cel__badge');
    const activeCut = document.querySelector('.cel__cut-pill.is-active');
    return {
      hasVideo: Boolean(v),
      videoSrc: v ? v.currentSrc || v.src : '',
      videoPaused: v ? v.paused : true,
      videoReady: v ? v.readyState : 0,
      videoCurrentTime: v ? v.currentTime : -1,
      isShinkaiLayerActive: shinkaiLayer ? shinkaiLayer.classList.contains('is-active') : false,
      badgeText: badge ? badge.textContent.trim() : '',
      activeCutText: activeCut ? activeCut.textContent.trim() : ''
    };
  });
  console.log('1. Hero Video Initial State:', heroState);

  // Wait a moment for video frames to play
  await new Promise(r => setTimeout(r, 1200));

  const playbackState = await page.evaluate(() => {
    const v = document.querySelector('.cel__video');
    return {
      videoPaused: v ? v.paused : true,
      videoCurrentTime: v ? v.currentTime : -1
    };
  });
  console.log('2. After 1.2s playback:', playbackState);

  await page.screenshot({ path: path.join(outDir, '01-hero-video-playing.png') });

  // 2. Test Hover & Loupe on Hero Cel
  await page.hover('.cel__frame');
  await new Promise(r => setTimeout(r, 400));
  const loupeState = await page.evaluate(() => {
    const ring = document.querySelector('[data-lens-ring]');
    const sketch = document.querySelector('.cel__cut-layer--shinkai .cel__sketch');
    return {
      isRingActive: ring ? ring.classList.contains('is-active') : false,
      ringDisplay: ring ? getComputedStyle(ring).opacity : '0',
      sketchMask: sketch ? sketch.style.getPropertyValue('--r') : 'none'
    };
  });
  console.log('3. Lens Loupe Hover State:', loupeState);
  await page.screenshot({ path: path.join(outDir, '02-hero-loupe-hover.png') });

  // 3. Test Cut Switcher to Cut 008 (Akari Sprint)
  console.log('Switching to CUT 008 (Akari)...');
  await page.click('button[data-hero-cut="akari"]');
  await new Promise(r => setTimeout(r, 500));

  const akariState = await page.evaluate(() => {
    const akariLayer = document.querySelector('.cel__cut-layer--akari');
    const shinkaiLayer = document.querySelector('.cel__cut-layer--shinkai');
    const v = document.querySelector('.cel__video');
    return {
      isAkariActive: akariLayer ? akariLayer.classList.contains('is-active') : false,
      isShinkaiActive: shinkaiLayer ? shinkaiLayer.classList.contains('is-active') : false,
      videoPaused: v ? v.paused : false
    };
  });
  console.log('4. Cut 008 State:', akariState);
  await page.screenshot({ path: path.join(outDir, '03-hero-akari-cut.png') });

  // Switch back to Cut 004 (Shinkai)
  console.log('Switching back to CUT 004 (Shinkai)...');
  await page.click('button[data-hero-cut="shinkai"]');
  await new Promise(r => setTimeout(r, 500));

  // 4. Test Lightbox on Hero Video
  console.log('Testing Lightbox on Hero Video...');
  await page.click('.cel__cut-layer--shinkai .cel__expand');
  await new Promise(r => setTimeout(r, 600));

  const lbState = await page.evaluate(() => {
    const dlg = document.querySelector('[data-lightbox-dialog]');
    const lbv = document.querySelector('[data-lb-video]');
    return {
      open: dlg ? dlg.open : false,
      isVideo: dlg ? dlg.classList.contains('is-video') : false,
      videoSrc: lbv ? lbv.src : '',
      videoPaused: lbv ? lbv.paused : true
    };
  });
  console.log('5. Hero Lightbox State:', lbState);
  await page.screenshot({ path: path.join(outDir, '04-hero-video-lightbox.png') });

  // Close lightbox
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 5. Test i18n
  console.log('Testing Language Switcher (VI and JA)...');
  await page.click('button[data-lang="vi"]');
  await new Promise(r => setTimeout(r, 300));
  const viBadge = await page.$eval('.cel__cut-layer--shinkai .cel__badge', el => el.textContent.trim());
  const viPill = await page.$eval('button[data-hero-cut="shinkai"]', el => el.textContent.trim());
  console.log('VI:', { viBadge, viPill });

  await page.click('button[data-lang="ja"]');
  await new Promise(r => setTimeout(r, 300));
  const jaBadge = await page.$eval('.cel__cut-layer--shinkai .cel__badge', el => el.textContent.trim());
  const jaPill = await page.$eval('button[data-hero-cut="shinkai"]', el => el.textContent.trim());
  console.log('JA:', { jaBadge, jaPill });

  // Switch back to EN
  await page.click('button[data-lang="en"]');
  await new Promise(r => setTimeout(r, 300));

  // 6. Test Mobile Responsiveness (390x844)
  console.log('Testing Mobile Responsiveness...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  await new Promise(r => setTimeout(r, 500));
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile Check:', { hasOverflow, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) });
  await page.screenshot({ path: path.join(outDir, '05-hero-mobile.png') });

  await browser.close();
  console.log('Verification finished! Any console errors:', errors);
}

verify().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
