import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
