/**
 * Douga animation pipeline — extracts 26 crisp production frames + an
 * infinite-looping animated WebP from source/img/douga-turn-raw.webp into
 * assets/img/douga/ for the interactive Douga Light-Table & Lightbox.
 */
import sharp from 'sharp';
import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW_DOWNLOAD = 'C:\\Users\\Rish\\Downloads\\project (1).webp';
const SRC_DIR = path.join(root, 'source', 'img');
const SRC_FILE = path.join(SRC_DIR, 'douga-turn-raw.webp');
const OUT_DIR = path.join(root, 'assets', 'img', 'douga');

async function run() {
  await mkdir(SRC_DIR, { recursive: true });
  await mkdir(OUT_DIR, { recursive: true });

  // Copy original into /source/img if available
  try {
    await copyFile(RAW_DOWNLOAD, SRC_FILE);
    console.log('✓ Copied raw source to source/img/douga-turn-raw.webp');
  } catch (_) {
    // Use existing SRC_FILE if RAW_DOWNLOAD was moved
  }

  const meta = await sharp(SRC_FILE, { animated: true }).metadata();
  const pages = meta.pages || 26;
  const delays = meta.delay || Array(pages).fill(125);
  const pageHeight = meta.pageHeight || Math.round(meta.height / pages);
  const width = meta.width;

  const targetW = 1280;
  const targetH = Math.round((pageHeight / width) * targetW);

  let totalFrameBytes = 0;
  for (let i = 0; i < pages; i++) {
    const idx = String(i + 1).padStart(2, '0');
    const outPath = path.join(OUT_DIR, `f${idx}.webp`);
    await sharp(SRC_FILE, { page: i })
      .flatten({ background: '#ffffff' })
      .resize(targetW, targetH, { kernel: 'lanczos3' })
      .webp({ quality: 82, effort: 5 })
      .toFile(outPath);
    const s = await stat(outPath);
    totalFrameBytes += s.size;
  }
  console.log(`✓ 26 frames (${targetW}x${targetH}) -> ${(totalFrameBytes / 1024).toFixed(1)} KB total`);

  // Poster JPEG fallback
  await sharp(SRC_FILE, { page: 0 })
    .flatten({ background: '#ffffff' })
    .resize(targetW, targetH)
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(OUT_DIR, 'poster.jpg'));

  // Infinite-looping animated WebP (loop: 0) for Lightbox & instant playback
  const loopPath = path.join(OUT_DIR, 'loop.webp');
  await sharp(SRC_FILE, { animated: true })
    .resize({ width: 1400 })
    .webp({
      loop: 0,
      delay: delays,
      quality: 84,
      effort: 5
    })
    .toFile(loopPath);
  const loopStat = await stat(loopPath);
  const loopMeta = await sharp(loopPath, { animated: true }).metadata();
  console.log(`✓ loop.webp (${loopMeta.width}x${loopMeta.pageHeight}, pages=${loopMeta.pages}, loop=${loopMeta.loop}) -> ${(loopStat.size / 1024).toFixed(1)} KB`);

  await writeFile(
    path.join(OUT_DIR, 'meta.json'),
    JSON.stringify({ width: targetW, height: targetH, pages, delays }, null, 2)
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
