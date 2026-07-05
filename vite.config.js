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
  },
});
