import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'TrueKicks PWA',
        short_name: 'TrueKicks',
        description: 'Premium Sneaker Marketplace',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Pastikan kamu punya icon ini di folder public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Pastikan kamu punya icon ini di folder public
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Strategi Caching:
        // 1. Cache file statis (JS/CSS/HTML)
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        
        // 2. Cache Request API (PENTING: Agar produk tetap tampil saat offline)
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst', // Coba internet dulu, kalau mati ambil dari cache
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // Simpan data selama 1 hari
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
})