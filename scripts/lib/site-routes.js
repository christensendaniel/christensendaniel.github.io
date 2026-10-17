import fs from 'fs';
import path from 'path';

// Static pages with their priorities and change frequencies.
// Keep in sync with the routes in src/App.jsx.
export const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/skills/', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio/', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio/data-engineering/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/sitemap/', priority: '0.5', changefreq: 'monthly' },
];

const BLOG_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]*$/;

// Blog posts are the JSON files in src/data/blog; the route is /blog/<id>.
// Returned newest first (ids start with the date).
export function getBlogPostPages(blogDir) {
  const ids = fs
    .readdirSync(blogDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf8')).id);

  ids.forEach((id) => {
    if (typeof id !== 'string' || !BLOG_ID_PATTERN.test(id)) {
      throw new Error(`Invalid blog post id: ${JSON.stringify(id)}`);
    }
  });

  return ids
    .sort()
    .reverse()
    .map((id) => ({ path: `/blog/${id}/`, priority: '0.8', changefreq: 'monthly' }));
}
