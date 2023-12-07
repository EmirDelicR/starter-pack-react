/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react', exclude: '' })],
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
  }
});
