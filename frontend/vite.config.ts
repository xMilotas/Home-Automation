import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: true,
    port: 5173,

    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'Steckdosen',
        short_name: 'Steckdosen',
        description: 'Steuerung der Steckdosen',

        theme_color: '#0b0f17',
        background_color: '#0b0f17',

        display: 'standalone',
        orientation: 'portrait',

        start_url: '/',

        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})