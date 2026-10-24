/**
 * Image pipeline — turns the heavy source artwork in /source/img into
 * responsive AVIF / WebP / JPEG variants in /assets/img.
 *
 * Usage:  npm run images
 *
 * Add a new artwork: drop the file into /source/img and add an entry to JOBS.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'source', 'img');
const OUT = path.join(root, 'assets', 'img');

const JOBS = [
  { src: 'gallery1.jpg', name: 'process-1', widths: [800, 1400, 2000] },
  { src: 'gallery2.jpg', name: 'process-2', widths: [800, 1400, 2000] },
  { src: 'gallery3.jpg', name: 'process-3', widths: [800, 1400, 2000] },
  { src: 'gallery4.jpg', name: 'process-4', widths: [800, 1400, 2000] },
  { src: 'gallery5.jpg', name: 'process-5', widths: [800, 1400, 1751] },
  { src: 'cacaccacaca.jpg', name: 'process-breakdown', widths: [800, 1400, 2000] },
  { src: 'fern.png', name: 'fern', widths: [800, 1400, 1920] },
  { src: 'sailor aoi.jpg', name: 'aoi', widths: [800, 1400, 2000] },
  { src: 'gsr poster.jpg', name: 'gsr-poster', widths: [600, 1000, 1500] },
  { src: 'tiketk.png', name: 'gsr-standee', widths: [500, 965] },
  { src: 'tiket.png', name: 'portrait', widths: [600, 1000, 1500] },
];

const manifest = {};

async function run() {
  await mkdir(OUT, { recursive: true });

  for (const job of JOBS) {
    const input = sharp(path.join(SRC, job.src)).flatten({ background: '#ffffff' });
    const meta = await input.metadata();
    manifest[job.name] = { width: meta.width, height: meta.height, widths: [] };

    for (const w of job.widths) {
      const width = Math.min(w, meta.width);
      const base = path.join(OUT, `${job.name}-${w}`);
      const pipeline = () => sharp(path.join(SRC, job.src)).flatten({ background: '#ffffff' }).resize({ width });
      await Promise.all([
        pipeline().avif({ quality: 52, effort: 4 }).toFile(`${base}.avif`),
        pipeline().webp({ quality: 78 }).toFile(`${base}.webp`),
        pipeline().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`),
      ]);
      manifest[job.name].widths.push(w);
      console.log(`✓ ${job.name}-${w}`);
    }
  }

  // Tiny blurred placeholders (LQIP) inlined as base64 for instant paint.
  for (const job of JOBS) {
    const buf = await sharp(path.join(SRC, job.src)).flatten({ background: '#ffffff' }).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
    manifest[job.name].lqip = `data:image/webp;base64,${buf.toString('base64')}`;
  }

  // Open Graph / social share card (1200×630).
  const card = await sharp(path.join(SRC, 'gallery4.jpg')).resize(1200, 630, { fit: 'cover', position: 'left' }).toBuffer();
  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0.35" stop-color="#0d0d0d" stop-opacity="0"/><stop offset="1" stop-color="#0d0d0d" stop-opacity="0.92"/></linearGradient></defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <rect x="0" y="0" width="1200" height="12" fill="#ff2a3d"/>
      <text x="1140" y="430" text-anchor="end" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="104" fill="#f2efe9">PHAT TRAN</text>
      <text x="1140" y="490" text-anchor="end" font-family="Consolas, monospace" font-size="30" fill="#ff2a3d" letter-spacing="3">2D ANIMATOR / ILLUSTRATOR</text>
      <text x="1140" y="560" text-anchor="end" font-family="Consolas, monospace" font-size="22" fill="#f2efe9" opacity="0.7" letter-spacing="2">RISHACHI.GITHUB.IO</text>
    </svg>`);
  await sharp(card).composite([{ input: overlay }]).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(OUT, 'og-card.jpg'));
  console.log('✓ og-card');

  await writeFile(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✓ manifest.json');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
