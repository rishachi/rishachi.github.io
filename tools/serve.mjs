import http from 'node:http';
import { readFile, stat, open } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 3000;

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
  '.png': 'image/png',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

http.createServer(async (req, res) => {
  try {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    const rel = cleanUrl === '/' ? '/index.html' : cleanUrl;
    const filePath = path.join(root, rel);
    const fileStat = await stat(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Support HTTP Range requests for video seeking & smooth streaming
    const rangeHeader = req.headers.range;
    if (rangeHeader && fileStat.isFile()) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader);
      if (match) {
        const start = parseInt(match[1], 10);
        const end = match[2] ? parseInt(match[2], 10) : fileStat.size - 1;
        if (start < fileStat.size && end < fileStat.size && start <= end) {
          const chunkLen = end - start + 1;
          res.writeHead(206, {
            'Content-Type': contentType,
            'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkLen,
            'Access-Control-Allow-Origin': '*'
          });
          const fileHandle = await open(filePath, 'r');
          const stream = fileHandle.createReadStream({ start, end });
          stream.pipe(res);
          return;
        }
      }
    }

    const data = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': fileStat.size,
      'Accept-Ranges': 'bytes'
    });
    res.end(data);
  } catch (_) {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Portfolio live at http://localhost:${PORT}`);
});
