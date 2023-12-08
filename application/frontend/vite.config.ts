/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

const pwaPlugin = VitePWA({
  registerType: 'autoUpdate',
  // add this to cache all the imports
  workbox: {
    globPatterns: ['**/*']
  },
  // add this to cache all the
  // static assets in the public folder
  includeAssets: ['**/*'],
  devOptions: {
    enabled: true
  },
  manifest: {
    theme_color: '#3544f6',
    background_color: '#35bdf6',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Vite App Sample Application',
    short_name: 'Vite App',
    description: 'Vite App with start up project',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
});

const viteEslint = eslint({
  // without explicit path resolve, eslint tries to lint external directories symlinked via `npm link`
  include: [
    `${path.resolve(__dirname, '')}/**/*.ts`,
    `${path.resolve(__dirname, '')}/**/*.tsx`
  ]
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteEslint,
    svgr({ include: '**/*.svg?react', exclude: '' }),
    pwaPlugin
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
  server: {
    port: 3000
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  }
});
