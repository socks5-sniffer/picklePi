﻿import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import mkcert from 'vite-plugin-mkcert';

// Dev CSP: 'unsafe-inline' on script-src is required by Vite's HMR module injection.
// connect-src is restricted to same-origin + localhost WebSocket only (no open http:/https: wildcards).
const DEV_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' ws://localhost:* wss://localhost:*",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

// Production CSP: no inline scripts, connections restricted to same-origin only.
// CANONICAL POLICY — must stay byte-identical with the Content-Security-Policy
// values in vercel.json and public/_headers. Browsers enforce the intersection
// of all delivered policies, so any drift silently tightens or breaks the app.
const PROD_CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const baseHeaders = (csp: string) => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': csp,
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
});

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), ...(command === 'serve' ? [mkcert()] : [])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: process.env.DISABLE_HMR !== 'true',
    headers: baseHeaders(DEV_CSP),
  },
  // vite preview (npm run preview) uses production headers
  preview: {
    headers: baseHeaders(PROD_CSP),
  },
  build: {
    sourcemap: false,
  },
}));
