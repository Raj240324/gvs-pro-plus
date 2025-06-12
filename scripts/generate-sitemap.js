import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sitemap = new SitemapStream({ hostname: 'https://gvs-pro-plus.vercel.app' });

// Add your routes here
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', changefreq: 'weekly', priority: 0.8 },
  { url: '/gallery', changefreq: 'weekly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.6 },
  { url: '/clients', changefreq: 'monthly', priority: 0.7 },
  { url: '/why-us', changefreq: 'monthly', priority: 0.6 },
  { url: '/manufacturing-supply', changefreq: 'weekly', priority: 0.8 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
  { url: '/cookie-policy', changefreq: 'yearly', priority: 0.3 }
];

// Add all routes to the sitemap
routes.forEach(route => {
  sitemap.write(route);
});

// End the stream
sitemap.end();

// Generate the sitemap
streamToPromise(sitemap)
  .then(sm => {
    // Write the sitemap to a file
    const writeStream = createWriteStream(resolve(__dirname, '../public/sitemap.xml'));
    writeStream.write(sm.toString());
    writeStream.end();
    console.log('Sitemap generated successfully!');
  })
  .catch(console.error); 