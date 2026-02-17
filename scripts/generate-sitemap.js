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
  { path: '/sitemap/', priority: '0.5', changefreq: 'monthly' },
];

// Blog posts with their priorities and change frequencies
const blogPosts = [
  { path: '/blog/2026-02-17-building-portfolio-site-ai-github-pages/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-09-27-training-llm-part-4-the-training-experience/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-09-13-training-llm-part-2-dataset-engineering/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-09-06-training-llm-part-1-motivation-and-architecture/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/2025-08-31-hello-world/', priority: '0.8', changefreq: 'monthly' },
];

// Function to generate sitemap XML
function generateSitemap() {
  const allPages = [...staticPages, ...blogPosts];
  const urls = allPages.map(page => `  <url>
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
[...staticPages, ...blogPosts].forEach(page => {
  console.log(`   - ${baseUrl}${page.path}`);
});
