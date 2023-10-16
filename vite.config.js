import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      open: true,
      hot: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
  };
});