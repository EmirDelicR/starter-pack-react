/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: {
      include: /.scss+/,
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
  server: {
    host: true,
    port: 3000
  }
});
