import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });

  const info = await page.evaluate(async () => {
    const v = document.createElement('video');
    v.src = '/assets/video/shinkai-cut-1.mp4';
    v.muted = true;
    v.playsInline = true;
    document.body.appendChild(v);
    await new Promise((res, rej) => {
      v.onloadedmetadata = res;
      v.onerror = (e) => rej(new Error('Video load error: ' + (v.error ? v.error.message : 'unknown')));
      v.load();
    });
    return {
      w: v.videoWidth,
      h: v.videoHeight,
      duration: v.duration
    };
  });
  console.log('Video loaded:', info);

  // Capture frame at peak smile (around 2.3s)
  await page.evaluate(async (t) => {
    const v = document.querySelector('video[src="/assets/video/shinkai-cut-1.mp4"]');
    const c = document.createElement('canvas');
    c.id = 'temp-cap';
    v.currentTime = t;
    await new Promise(r => { v.onseeked = r; });
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0);
    document.body.appendChild(c);
  }, 2.3);

  const dataUrl = await page.evaluate(() => {
    return document.getElementById('temp-cap').toDataURL('image/png');
  });
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
  const rawPng = Buffer.from(base64, 'base64');

  const dougaDir = 'C:\\Users\\Rish\\.gemini\\antigravity\\scratch\\rish-portfolio\\assets\\img\\douga';
  const finalJpgPath = path.join(dougaDir, 'poster-final.jpg');
  const finalWebpPath = path.join(dougaDir, 'poster-final.webp');

  await sharp(rawPng).jpeg({ quality: 90, mozjpeg: true }).toFile(finalJpgPath);
  await sharp(rawPng).webp({ quality: 90 }).toFile(finalWebpPath);
  console.log('Saved poster images:', finalJpgPath, finalWebpPath);

  await browser.close();
}

main().catch(console.error);
