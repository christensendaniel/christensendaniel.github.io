import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://christensendaniel.com';

// Static pages with their priorities and change frequencies
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/skills/', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio/', priority: '0.9', changefreq: 'monthly' },
  { path: '/portfolio/data-engineering/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.9', changefreq: 'weekly' },
];

// Function to generate sitemap XML
function generateSitemap() {
  const urls = staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return sitemap;
}

// Write sitemap to public directory
const publicDir = path.resolve(__dirname, '../public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate and write sitemap
const sitemap = generateSitemap();
fs.writeFileSync(sitemapPath, sitemap, 'utf8');

console.log('✅ Sitemap generated successfully at:', sitemapPath);
console.log('📄 Sitemap includes:');
staticPages.forEach(page => {
  console.log(`   - ${baseUrl}${page.path}`);
});
