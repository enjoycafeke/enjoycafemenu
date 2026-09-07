import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'assets/enjoy-cafe-logo.jpeg'],
      manifest: {
        name: 'Enjoy Cafe Menu',
        short_name: 'Enjoy Cafe',
        description: 'Enjoy Cafe menu.',
        theme_color: '#090909',
        background_color: '#090909',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tb-static\.uber\.com\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'enjoy-remote-images',
              expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 * 14 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2022',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600
  },
  server: {
    strictPort: true
  },
  preview: {
    strictPort: true
  }
});
