import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out/', import.meta.url));
const port = Number(process.env.PORT || 3000);
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
  try {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (base) {
      if (pathname !== base && !pathname.startsWith(`${base}/`)) throw new Error('Missing base path');
      pathname = pathname.slice(base.length) || '/';
    }
    let target = path.resolve(root, `.${pathname}`);
    if (target !== path.resolve(root) && !target.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error('Invalid path');
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    const data = await readFile(target);
    response.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    const page = await readFile(path.join(root, '404.html')).catch(() => Buffer.from('Page not found'));
    response.end(request.method === 'HEAD' ? undefined : page);
  }
});
server.listen(port, '0.0.0.0', () => console.log(`des.bin static preview: http://localhost:${port}${base}/`));
