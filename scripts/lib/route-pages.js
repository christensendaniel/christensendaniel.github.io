import fs from 'fs';
import path from 'path';

// GitHub Pages can only serve real files, so give every route its own copy of
// the app shell. Direct loads then return 200 instead of falling through to 404.html.
export function writeRoutePages(distDir, routePaths) {
  const root = path.resolve(distDir);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const written = [];

  for (const routePath of routePaths) {
    const segments = routePath.split('/').filter(Boolean);
    if (segments.length === 0) continue;

    const dir = path.resolve(root, ...segments);
    if (!dir.startsWith(root + path.sep)) {
      throw new Error(`Route escapes the build directory: ${routePath}`);
    }

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    written.push(path.relative(root, path.join(dir, 'index.html')));
  }

  return written;
}
