import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'API_BASE_URL': JSON.stringify('https://api.github.com'),
    'CONTRIBUTIONS_API_BASE_URL': JSON.stringify('https://github-contributions-api.jogruber.de/v4'),
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
