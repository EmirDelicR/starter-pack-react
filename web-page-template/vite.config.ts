import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

export const vitePWA = VitePWA({
  registerType: 'prompt',
  injectRegister: 'auto',
  // cache all the imports
  workbox: {
    globPatterns: ['**/*'],
    sourcemap: true
  },
  // cache all the static assets in the public folder
  includeAssets: ['**/*'],
  devOptions: {
    enabled: true
  },
  manifest: {
    name: 'Curriculum',
    short_name: 'CV',
    background_color: '#2a2b30',
    theme_color: '#3e70ff',
    orientation: 'portrait-primary',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    description: 'Curriculum web page application',
    prefer_related_applications: true,
    icons: [
      {
        src: '/images/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/icons/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
        density: '0.75'
      },
      {
        src: '/images/icons/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        density: '1.0'
      },
      {
        src: '/images/icons/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        density: '1.5'
      },
      {
        src: '/images/icons/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        density: '2.0'
      },
      {
        src: '/images/icons/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        density: '3.0'
      },
      {
        src: '/images/icons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        density: '4.0'
      }
    ]
  }
});
console.log('DD: ', path.resolve(__dirname, ''));
const viteEslint = eslint({
  include: [
    `${path.resolve(__dirname, '')}/**/*.ts`,
    `${path.resolve(__dirname, '')}/**/*.tsx`
  ]
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteEslint, vitePWA],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/UI/components'),
      '@elements': path.resolve(__dirname, './src/UI/elements'),
      '@pages': path.resolve(__dirname, './src/UI/pages'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  }
});
