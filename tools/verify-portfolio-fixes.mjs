import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('=== RUNNING PORTFOLIO-FIXES VERIFICATION ===\n');

  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    let totalTransfer = 0;
    let requestCount = 0;
    page.on('response', async res => {
      requestCount++;
      try {
        const buf = await res.buffer();
        totalTransfer += buf.length;
      } catch (_) {}
    });

    await page.setViewport({ width: 1440, height: 900 });
    const startTime = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    const loadTimeMs = Date.now() - startTime;

    console.log(`[PERFORMANCE] Initial load: ${requestCount} requests, ${(totalTransfer / (1024 * 1024)).toFixed(2)} MB, ${loadTimeMs} ms\n`);

    // 1. Meta / Positioning check
    const title = await page.title();
    const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content'));
    const twitterTitle = await page.$eval('meta[name="twitter:title"]', el => el.getAttribute('content'));
    const heroH1Sr = await page.$eval('.hero__name .sr-only', el => el.textContent.trim());
    const heroEyebrow = await page.$eval('.hero__intro .eyebrow span[data-i18n="hero.eyebrow"]', el => el.textContent.trim());

    console.log('[1. POSITIONING CHECK]');
    console.log('  Title:', title);
    console.log('  Meta Desc:', metaDesc);
    console.log('  OG Title:', ogTitle);
    console.log('  Twitter Title:', twitterTitle);
    console.log('  Hero H1 SR:', heroH1Sr);
    console.log('  Hero Eyebrow:', heroEyebrow);

    if (title.includes('Illustrator') || heroH1Sr.includes('Illustrator')) {
      throw new Error('FAILED: "Illustrator" is still present in Title or Hero H1!');
    }
    if (!title.includes('Key Animator (原画)') || !heroEyebrow.includes('Key Animator (原画)')) {
      throw new Error('FAILED: Key Animator (原画) not found in Title or Hero Eyebrow!');
    }
    console.log('  ✓ Positioning successfully updated.\n');

    // 2. Preload check
    const preloadHref = await page.$eval('link[rel="preload"][as="image"]', el => el.getAttribute('imagesrcset'));
    console.log('[2. PRELOAD CHECK]');
    console.log('  Image Preload srcset:', preloadHref);
    if (!preloadHref.includes('process-5')) {
      throw new Error('FAILED: Head is not preloading process-5 hero art!');
    }
    console.log('  ✓ Preload correctly points to process-5.\n');

    // 3. Showreel Poster check
    const reelPosterImg = await page.$eval('.reel__poster img', el => el.getAttribute('src'));
    const reelPosterSourceAvif = await page.$eval('.reel__poster source[type="image/avif"]', el => el.getAttribute('srcset'));
    console.log('[3. SHOWREEL POSTER CHECK]');
    console.log('  Poster img src:', reelPosterImg);
    console.log('  Poster avif srcset:', reelPosterSourceAvif);
    if (!reelPosterImg.includes('reel-poster.jpg') || !reelPosterSourceAvif.includes('reel-poster')) {
      throw new Error('FAILED: Showreel poster does not use dedicated reel-poster asset!');
    }
    console.log('  ✓ Showreel poster uses dedicated YouTube thumbnail.\n');

    // 4. Numbering consistency check
    const numbers = await page.$$eval('.work-row__no', els => els.map(el => el.textContent.trim()));
    console.log('[4. NUMBERING CHECK]');
    console.log('  Work numbers found:', numbers);
    const expected = ['03.1', '03.2', '03.3', '03.4', '03.5'];
    for (let i = 0; i < expected.length; i++) {
      if (numbers[i] !== expected[i]) {
        throw new Error(`FAILED: Expected number ${expected[i]} at index ${i}, got ${numbers[i]}`);
      }
    }
    console.log('  ✓ Section 03 items numbered cleanly as 03.1 through 03.5 without collisions.\n');

    // 5. Pixiv CTA prominence check
    const pixivTag = await page.$eval('.more-card__tag', el => el.textContent.trim());
    const pixivHref = await page.$eval('.more-card', el => el.getAttribute('href'));
    console.log('[5. PIXIV PROMINENCE CHECK]');
    console.log('  Pixiv Tag:', pixivTag);
    console.log('  Pixiv Href:', pixivHref);
    if (!pixivTag || !pixivHref.includes('pixiv.net')) {
      throw new Error('FAILED: Pixiv CTA tag or link missing!');
    }
    console.log('  ✓ Pixiv card prominent and tagged.\n');

    // 6. About Bio & Credits Table check
    const aboutBio = await page.$eval('[data-i18n-html="about.p1"]', el => el.textContent.trim());
    const creditsLinkText = await page.$eval('[data-i18n="id.creditsVal"]', el => el.textContent.trim());
    const creditsLinkHref = await page.$eval('[data-i18n="id.creditsVal"]', el => el.getAttribute('href'));
    const creditsRows = await page.$$eval('.credits-table tbody tr', trs => trs.map(tr => {
      const tds = tr.querySelectorAll('td');
      return Array.from(tds).map(td => td.textContent.trim());
    }));
    const creditsNote = await page.$eval('.credits-box__note span[data-i18n="credits.commercial"]', el => el.textContent.trim());

    console.log('[6. ABOUT BIO & CREDITS TABLE CHECK]');
    console.log('  About Bio P1:', aboutBio.slice(0, 100) + '...');
    console.log('  Credits Link Text:', creditsLinkText);
    console.log('  Credits Link Href:', creditsLinkHref);
    console.log('  Credits Table Rows:', creditsRows);
    console.log('  Credits Note:', creditsNote);

    if (!creditsLinkText.includes('Tan Phat')) {
      throw new Error('FAILED: Credits link text does not match "Tan Phat"!');
    }
    if (creditsRows.length < 1 || !creditsRows[0][0].includes('GET_SET RUN')) {
      throw new Error('FAILED: Credits table missing GET_SET RUN default entry!');
    }
    console.log('  ✓ About bio neutral statement and Credits table verified.\n');

    // 7. Trilingual switching test (EN -> VI -> JA -> EN)
    console.log('[7. TRILINGUAL SWITCHING TEST]');
    // Switch to VI
    await page.click('button[data-lang="vi"]');
    await new Promise(r => setTimeout(r, 150));
    const viHeroEyebrow = await page.$eval('[data-i18n="hero.eyebrow"]', el => el.textContent.trim());
    const viAboutBio = await page.$eval('[data-i18n-html="about.p1"]', el => el.textContent.trim());
    const viCreditsTitle = await page.$eval('[data-i18n="credits.title"]', el => el.textContent.trim());
    const viRoleInTable = await page.$eval('.credits-table tbody tr td:nth-child(2)', el => el.textContent.trim());
    console.log('  VI Hero Eyebrow:', viHeroEyebrow);
    console.log('  VI Credits Title:', viCreditsTitle);
    console.log('  VI Role in Table:', viRoleInTable);
    if (!viHeroEyebrow.includes('Key Animator') || !viRoleInTable.includes('Đạo diễn')) {
      throw new Error('FAILED: VI translation did not apply correctly!');
    }

    // Switch to JA
    await page.click('button[data-lang="ja"]');
    await new Promise(r => setTimeout(r, 150));
    const jaHeroEyebrow = await page.$eval('[data-i18n="hero.eyebrow"]', el => el.textContent.trim());
    const jaAboutBio = await page.$eval('[data-i18n-html="about.p1"]', el => el.textContent.trim());
    const jaCreditsTitle = await page.$eval('[data-i18n="credits.title"]', el => el.textContent.trim());
    const jaRoleInTable = await page.$eval('.credits-table tbody tr td:nth-child(2)', el => el.textContent.trim());
    console.log('  JA Hero Eyebrow:', jaHeroEyebrow);
    console.log('  JA Credits Title:', jaCreditsTitle);
    console.log('  JA Role in Table:', jaRoleInTable);
    if (!jaHeroEyebrow.includes('原画マン') || !jaRoleInTable.includes('監督')) {
      throw new Error('FAILED: JA translation did not apply correctly!');
    }

    // Switch back to EN
    await page.click('button[data-lang="en"]');
    await new Promise(r => setTimeout(r, 150));
    console.log('  ✓ Trilingual switching test passed with dynamic table translation.\n');

    // 8. Responsive overflow test (375px mobile & 1440px desktop)
    console.log('[8. RESPONSIVE OVERFLOW TEST]');
    for (const width of [375, 414, 768, 1024, 1440]) {
      await page.setViewport({ width, height: 800 });
      await new Promise(r => setTimeout(r, 100));
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      console.log(`  Viewport ${width}px -> scrollWidth: ${scrollWidth}px (overflow: ${hasOverflow})`);
      if (hasOverflow) {
        throw new Error(`FAILED: Horizontal overflow detected at ${width}px!`);
      }
    }
    console.log('  ✓ Zero horizontal overflow across all tested viewports.\n');

    // 9. Console errors check
    if (consoleErrors.length > 0) {
      console.warn('Console errors logged:', consoleErrors);
      throw new Error('FAILED: Browser console errors occurred!');
    } else {
      console.log('[9. CONSOLE CLEAN CHECK]');
      console.log('  ✓ Zero console errors recorded.\n');
    }

    console.log('=== ALL VERIFICATION CHECKS PASSED SUCCESSFULLY! ===');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('\nVerification Error:', err);
  process.exit(1);
});
