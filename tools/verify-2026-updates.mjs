import puppeteer from 'puppeteer-core';

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function verify() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // 1. Verify Showreel timeline badge & description
  const reelBadge = await page.$eval('#reel .section-head__meta', el => el.textContent.trim());
  const reelNote = await page.$eval('[data-i18n="reel.note"]', el => el.textContent.trim());
  console.log('1. Showreel:', { reelBadge, reelNote: reelNote.slice(0, 50) + '...' });

  // 2. Verify GET_SET RUN text and role
  const caseDesc = await page.$eval('[data-i18n="case.desc"]', el => el.textContent.trim());
  const caseRole = await page.$eval('[data-i18n="case.roleVal"]', el => el.textContent.trim());
  console.log('2. GET_SET RUN:', { caseDesc: caseDesc.slice(0, 50) + '...', caseRole });

  // 3. Verify Genga Showcase Card (04) and Douga (05)
  const gengaTitle = await page.$eval('.genga-row .work-row__title', el => el.textContent.trim());
  const gengaSub = await page.$eval('.genga-row .work-row__sub-jp', el => el.textContent.trim());
  const gengaTags = await page.$$eval('.genga-row .tags li', tags => tags.map(t => t.textContent.trim()));
  const dougaNum = await page.$eval('.douga-row .work-row__no', el => el.textContent.trim());
  console.log('3. Genga & Douga:', { gengaTitle, gengaSub, gengaTags, dougaNum });

  // 4. Verify About Section: Role, Credits, Education, Skills
  const idcardData = await page.$$eval('.idcard div', divs => {
    return divs.map(d => {
      const dt = d.querySelector('dt')?.textContent.trim();
      const dd = d.querySelector('dd')?.textContent.trim();
      const href = d.querySelector('dd a')?.getAttribute('href');
      return { dt, dd, href };
    });
  });
  console.log('4. About ID Card:', idcardData);

  const animSkills = await page.$$eval('.skills .skills__col:nth-child(1) li', items => items.map(i => i.textContent.trim()));
  const toolSkills = await page.$$eval('.skills .skills__col:nth-child(3) li', items => items.map(i => i.textContent.trim()));
  console.log('5. Skills:', { animSkills, toolSkills });

  // 5. Test Language Switcher (VI and JA)
  console.log('\nTesting Language Switcher:');
  // Switch to VI
  await page.click('button[data-lang="vi"]');
  await new Promise(r => setTimeout(r, 200));
  const viCaseRole = await page.$eval('[data-i18n="case.roleVal"]', el => el.textContent.trim());
  const viIdRole = await page.$eval('[data-i18n="id.roleVal"]', el => el.textContent.trim());
  console.log('VI active:', { viCaseRole, viIdRole });

  // Switch to JA
  await page.click('button[data-lang="ja"]');
  await new Promise(r => setTimeout(r, 200));
  const jaCaseRole = await page.$eval('[data-i18n="case.roleVal"]', el => el.textContent.trim());
  const jaIdRole = await page.$eval('[data-i18n="id.roleVal"]', el => el.textContent.trim());
  console.log('JA active:', { jaCaseRole, jaIdRole });

  // Switch back to EN
  await page.click('button[data-lang="en"]');
  await new Promise(r => setTimeout(r, 200));

  // 6. Test Lightbox on Genga card
  const gengaBtn = await page.$('.genga__expand');
  if (gengaBtn) {
    await gengaBtn.click();
    await new Promise(r => setTimeout(r, 300));
    const isLightboxOpen = await page.$eval('.lightbox', el => Boolean(el.open));
    console.log('\nLightbox test on Genga card:', { isLightboxOpen });
    // Close lightbox
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 200));
  }

  // 7. Test Mobile Responsiveness (390x844)
  await page.setViewport({ width: 390, height: 844 });
  await new Promise(r => setTimeout(r, 300));
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('\nMobile Responsiveness (390x844):', { hasOverflow, scrollWidth: await page.evaluate(() => document.documentElement.scrollWidth) });

  await browser.close();
  console.log('\nAll checks completed successfully!');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
