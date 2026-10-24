import puppeteer from 'puppeteer-core';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shotsDir = 'C:\\Users\\Rish\\.gemini\\antigravity\\brain\\2d867622-74e4-4214-9e31-b1b152591aed\\scratch\\resp';
await mkdir(shotsDir, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png'
};

const server = http.createServer(async (req, res) => {
  try {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    const rel = cleanUrl === '/' ? '/index.html' : cleanUrl;
    const filePath = path.join(root, rel);
    const data = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (_) {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise((resolve) => server.listen(4174, '127.0.0.1', resolve));

const VIEWPORTS = [
  { name: 'phone-390x844', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'ipad-portrait-820x1180', width: 820, height: 1180, isMobile: true, hasTouch: true },
  { name: 'ipad-landscape-1180x820', width: 1180, height: 820, isMobile: true, hasTouch: true },
  { name: 'laptop-1366x768', width: 1366, height: 768, isMobile: false, hasTouch: false },
  { name: 'desktop-1920x1080', width: 1920, height: 1080, isMobile: false, hasTouch: false }
];

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: 'new'
});

try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch
    });

    await page.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1500));

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const hero = document.querySelector('.hero').getBoundingClientRect();
      const heroName = document.querySelector('.hero__name-row').getBoundingClientRect();
      const cel = document.querySelector('.cel').getBoundingClientRect();
      const processPin = document.querySelector('.process__pin').getBoundingClientRect();
      return {
        scrollW: doc.scrollWidth,
        clientW: doc.clientWidth,
        overflowX: doc.scrollWidth - doc.clientWidth,
        heroH: Math.round(hero.height),
        heroNameW: Math.round(heroName.width),
        celH: Math.round(cel.height),
        processPinH: Math.round(processPin.height)
      };
    });
    console.log(vp.name, metrics);

    await page.screenshot({ path: path.join(shotsDir, `${vp.name}-hero.png`) });
    await page.evaluate(() => document.querySelector('.process__pin').scrollIntoView());
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: path.join(shotsDir, `${vp.name}-process.png`) });

    if (vp.isMobile && vp.width <= 900) {
      await page.evaluate(() => document.getElementById('work').scrollIntoView());
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(shotsDir, `${vp.name}-work.png`) });

      await page.evaluate(() => document.getElementById('about').scrollIntoView());
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(shotsDir, `${vp.name}-about.png`) });

      await page.evaluate(() => document.getElementById('contact').scrollIntoView());
      await new Promise((r) => setTimeout(r, 400));
      await page.screenshot({ path: path.join(shotsDir, `${vp.name}-contact.png`) });
    }

    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
