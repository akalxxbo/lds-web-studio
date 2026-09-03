const fs = require('fs');
const path = require('path');

// Determine base URL: SITE_URL > Netlify URL > default fallback
const rawBaseUrl = process.env.SITE_URL || process.env.URL || 'https://ldsagency.netlify.app';
const baseUrl = rawBaseUrl.replace(/\/+$/, '');

const today = new Date().toISOString().split('T')[0];

// Key public pages
const pages = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    path: '/terminos.html',
    changefreq: 'monthly',
    priority: '0.5'
  },
  {
    path: '/privacidad.html',
    changefreq: 'monthly',
    priority: '0.5'
  }
];

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const sitemapPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(sitemapPath, xmlContent.trim() + '\n', 'utf8');
console.log(`[generate-sitemap] Generated /sitemap.xml for ${baseUrl} with ${pages.length} URLs.`);

// Update or ensure Sitemap reference in robots.txt
const robotsPath = path.join(__dirname, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const sitemapLine = `Sitemap: ${baseUrl}/sitemap.xml`;
  
  if (/^Sitemap:\s*.+$/m.test(robotsContent)) {
    robotsContent = robotsContent.replace(/^Sitemap:\s*.+$/m, sitemapLine);
  } else if (/^#\s*Sitemap:\s*.+$/m.test(robotsContent)) {
    robotsContent = robotsContent.replace(/^#\s*Sitemap:\s*.+$/m, sitemapLine);
  } else {
    robotsContent = robotsContent.trimEnd() + `\n\n${sitemapLine}\n`;
  }
  
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`[generate-sitemap] Updated robots.txt with ${sitemapLine}`);
}
