import { defineConfig, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { createHash } from 'crypto';
import { readFileSync, existsSync, statSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom plugin to manage cache headers
const CacheHeadersPlugin = ({ command }: { command: string }) => {
  return {
    name: 'cache-headers-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        // Target PNG files not processed by Vite's asset pipeline
        if (req.url?.endsWith('.png') && !req.url.includes('/assets/')) {
          try {
            const urlPath = req.url.split('?')[0];
            const filePath = path.resolve(
              __dirname,
              urlPath.startsWith('/src/assets/') ? urlPath.slice(1) : path.join('public', urlPath.slice(1))
            );

            if (!existsSync(filePath)) {
              console.error(`File not found: ${filePath}`);
              return next();
            }

            const stats = statSync(filePath);
            const lastModified = stats.mtime.toUTCString();
            const fileContent = readFileSync(filePath);
            const etag = createHash('md5').update(fileContent).digest('hex');

            // Set cache headers based on environment
            const cacheControlHeader = command === 'build' ? 'public, max-age=604800' : 'no-cache';
            res.setHeader('Cache-Control', cacheControlHeader);
            res.setHeader('ETag', `"${etag}"`);
            res.setHeader('Last-Modified', lastModified);

            // Handle conditional requests
            const cacheControl = req.headers['cache-control'] as string | undefined;
            const forceFresh = cacheControl?.includes('no-cache');
            const ifNoneMatch = req.headers['if-none-match'] as string | undefined;
            const ifModifiedSince = req.headers['if-modified-since'] as string | undefined;

            if (!forceFresh && command !== 'build') {
              const isNotModified =
                (ifNoneMatch && ifNoneMatch === `"${etag}"`) ||
                (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified));

              if (isNotModified) {
                console.log(`Returning 304 for ${req.url}`);
                res.writeHead(304, {
                  'Cache-Control': cacheControlHeader,
                  'ETag': `"${etag}"`,
                  'Last-Modified': lastModified,
                });
                res.end();
                return;
              }
            }

            console.log(`Serving ${filePath} with 200`);
            res.setHeader('Content-Type', 'image/png');
            res.writeHead(200);
            res.end(fileContent);
          } catch (err: any) {
            console.error(`Error for ${req.url}: ${err instanceof Error ? err.message : String(err)}`);
            return next();
          }
        } else {
          next();
        }
      });
    },
  };
};

export default defineConfig(({ command }) => ({
  base: '/',
  server: { host: 'localhost', port: 5173 },
  plugins: [react(), CacheHeadersPlugin({ command })],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));