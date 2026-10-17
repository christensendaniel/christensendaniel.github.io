#!/usr/bin/env node

/**
 * Post-build step: write dist/<route>/index.html for every known route so
 * GitHub Pages answers direct loads of inner pages with 200 instead of 404.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { staticPages, getBlogPostPages } from './lib/site-routes.js';
import { writeRoutePages } from './lib/route-pages.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const routes = [
  ...staticPages,
  ...getBlogPostPages(path.join(rootDir, 'src/data/blog')),
].map((page) => page.path);

const written = writeRoutePages(path.join(rootDir, 'dist'), routes);

console.log(`✅ Wrote ${written.length} route pages:`);
written.forEach((file) => console.log(`   - dist/${file}`));
