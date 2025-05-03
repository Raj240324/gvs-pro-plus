import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { createHash } from 'crypto';
import { readFileSync, existsSync, statSync } from 'fs';

const CacheHeadersPlugin = () => {
  return {
    name: 'cache-headers-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith('.png')) {
          console.log(`Requested PNG: ${req.url}`);
          // Let Vite handle imported assets (e.g., /assets/cop-1.123abc.png)
          if (req.url.includes('/assets/')) {
            return next(); // Skip custom handling for Vite-processed assets
          }

          try {
            const urlPath = req.url.split('?')[0];
            let filePath;
            if (urlPath.startsWith('/src/assets/')) {
              filePath = path.resolve(__dirname, urlPath.slice(1));
            } else {
              filePath = path.resolve(__dirname, 'public', urlPath.slice(1));
            }

            if (!existsSync(filePath)) {
              console.error(`File not found: ${filePath} for URL: ${req.url}`);
              return next();
            }

            const stats = statSync(filePath);
            const lastModified = stats.mtime.toUTCString();
            const fileContent = readFileSync(filePath);
            const etag = createHash('md5').update(fileContent).digest('hex');

            const cacheControl = req.headers['cache-control'];
            const forceFresh = cacheControl?.includes('no-cache');
            const ifNoneMatch = req.headers['if-none-match'];
            const ifModifiedSince = req.headers['if-modified-since'];

            res.setHeader('Cache-Control', 'public, max-age=604800');
            res.setHeader('ETag', `"${etag}"`);
            res.setHeader('Last-Modified', lastModified);

            if (!forceFresh) {
              const isNotModified =
                (ifNoneMatch && ifNoneMatch === `"${etag}"`) ||
                (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified));

              if (isNotModified) {
                console.log(`Returning 304 for ${req.url} (ETag match: ${ifNoneMatch}, Last-Modified: ${ifModifiedSince})`);
                res.writeHead(304, {
                  'Cache-Control': 'public, max-age=604800',
                  'ETag': `"${etag}"`,
                  'Last-Modified': lastModified,
                });
                res.end();
                return;
              }
            }

            console.log(`Applied caching headers for ${filePath}`);
            res.setHeader('Content-Type', 'image/png');
            res.writeHead(200);
            res.end(fileContent);
          } catch (err) {
            console.error(`Error applying caching headers for ${req.url}: ${err.message}`);
            return next();
          }
        } else {
          next();
        }
      });
    },
  };
};

export default defineConfig({
  base: './',
  server: {
    host: 'localhost',
    port: 5173,
  },
  plugins: [react(), CacheHeadersPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    assetsDir: 'assets',
  },
});