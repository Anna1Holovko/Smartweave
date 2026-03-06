/**
 * Generates public/sitemap.xml at build time so /sitemap.xml is always available
 * even when the host serves static files or doesn't run Next.js dynamic routes.
 * Keep in sync with lib/site.ts.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://smartweave.pl';
const routes = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: 'uslugi', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'realizacje', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'e-booki', priority: 0.9, changeFrequency: 'weekly' },
  { path: 'blog', priority: 0.9, changeFrequency: 'weekly' },
];

const now = new Date().toISOString();
const urls = routes
  .map(
    ({ path, priority, changeFrequency }) => `
  <url>
    <loc>${path ? `${SITE_URL}/${path}` : SITE_URL}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const outDir = join(__dirname, '..', 'public');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'sitemap.xml'), xml.trim(), 'utf8');
console.log('Generated public/sitemap.xml');