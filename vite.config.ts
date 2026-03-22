﻿import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // Proxy /api requests to your upcoming Express/SQLite backend
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your future Express server port
        changeOrigin: true,
        secure: false,
      },
    },
    // Dev server HMR control via environment variable
    hmr: process.env.DISABLE_HMR !== 'true',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' ws: wss: http: https:; report-uri /api/csp-report",
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
  build: {
    // Prevents source maps from leaking frontend source code to the public
    sourcemap: false, 
  }
});
