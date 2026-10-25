import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\Rish\\.gemini\\antigravity\\brain\\2d867622-74e4-4214-9e31-b1b152591aed\\scratch\\shinkai-check';
fs.mkdirSync(outDir, { recursive: true });

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--window-size=1440,900', '--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Scroll down to #work section
  await page.evaluate(() => {
    document.querySelector('.works-list--douga')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 1. Screenshot Douga in Line Art mode
  await page.screenshot({ path: path.join(outDir, '01-douga-line-art.png') });

  // 2. Click "Final Cut" mode button
  const switched = await page.evaluate(() => {
    const finalBtn = document.querySelector('[data-douga-mode="final"]');
    if (!finalBtn) return false;
    finalBtn.click();
    return true;
  });
  console.log('Switched to Final Cut mode:', switched);

  await new Promise((r) => setTimeout(r, 1500));

  // Check state in Final Cut mode
  const state = await page.evaluate(() => {
    const douga = document.querySelector('[data-douga]');
    const v = document.querySelector('[data-douga-video]');
    const code = document.querySelector('[data-douga-sheet-code]');
    const spec = document.querySelector('[data-douga-spec-label]');
    return {
      isFinal: douga ? douga.classList.contains('is-final') : false,
      videoReady: v ? v.readyState : 0,
      videoPaused: v ? v.paused : true,
      videoTime: v ? v.currentTime : -1,
      sheetCode: code ? code.textContent : '',
      spec: spec ? spec.textContent : ''
    };
  });
  console.log('Final Cut state:', state);

  await page.screenshot({ path: path.join(outDir, '02-douga-final-cut.png') });

  // 3. Test Expand in Lightbox
  await page.evaluate(() => {
    document.querySelector('.douga__expand')?.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  const lbState = await page.evaluate(() => {
    const dialog = document.querySelector('[data-lightbox-dialog]');
    const lbv = document.querySelector('[data-lb-video]');
    return {
      dialogOpen: dialog ? dialog.open : false,
      isVideo: dialog ? dialog.classList.contains('is-video') : false,
      videoSrc: lbv ? lbv.src : '',
      videoPaused: lbv ? lbv.paused : true
    };
  });
  console.log('Lightbox state:', lbState);
  await page.screenshot({ path: path.join(outDir, '03-lightbox-final-cut.png') });

  // Close lightbox
  await page.evaluate(() => {
    document.querySelector('[data-lb-close]')?.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  // 4. Switch to Japanese & Vietnamese to test i18n
  await page.evaluate(() => {
    document.querySelector('.site-header [data-lang="ja"]')?.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '04-japanese-final-cut.png') });

  await page.evaluate(() => {
    document.querySelector('.site-header [data-lang="vi"]')?.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, '05-vietnamese-final-cut.png') });

  // 5. Test Mobile Viewport (390x844)
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  await mobilePage.evaluate(() => {
    document.querySelector('.works-list--douga')?.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const mobileCheck = await mobilePage.evaluate(() => {
    const sw = document.documentElement.scrollWidth;
    const cw = document.documentElement.clientWidth;
    return {
      scrollWidth: sw,
      clientWidth: cw,
      hasOverflow: sw > cw
    };
  });
  console.log('Mobile overflow check:', mobileCheck);

  await mobilePage.screenshot({ path: path.join(outDir, '06-mobile-line-art.png') });

  // Switch to Final Cut on mobile
  await mobilePage.evaluate(() => {
    document.querySelector('[data-douga-mode="final"]')?.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  await mobilePage.screenshot({ path: path.join(outDir, '07-mobile-final-cut.png') });

  await browser.close();
  console.log('Verification completed. Errors:', errors);
}

verify().catch(console.error);
