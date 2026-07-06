import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // §9 CLS gate: ship ONE render-blocking stylesheet instead of per-route
    // async CSS chunks. With code-split CSS, a prerendered route paints with
    // only the base bundle in <head> and the route/component styles (e.g. the
    // HeroSlider `.controls`, the kontakt `.channel` grid) arrive later with
    // their JS chunk — over throttled 4G that late stylesheet reflows the whole
    // page (measured CLS up to ~0.5 on /kontakt). One bundled stylesheet is
    // ~60KB (≈12KB gzip), fully render-blocking, so component layout is correct
    // at first paint and there is no style-driven layout shift.
    cssCodeSplit: false,
  },
  server: {
    watch: {
      // Agent worktrees and session files live under .claude/ — watching them
      // causes full-reload storms during parallel agent work.
      ignored: ['**/.claude/**'],
    },
    // Phase 5a: proxy the contact endpoint to the local dev harness
    // (server/dev-server.mjs) so the form's POST /api/contact works in `npm run
    // dev` with zero credentials. Start the harness first:
    //   node server/dev-server.mjs   (listens on 127.0.0.1:8787)
    // In production the same /api/contact path is served by api/contact.js
    // (Vercel-style function), so no proxy is needed there.
    proxy: {
      '/api/contact': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: false,
      },
    },
  },
});
