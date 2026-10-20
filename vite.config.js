import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (asset) =>
          asset.names?.[0]?.endsWith('.css') ? 'style.css' : 'assets/[name][extname]',
      },
    },
  },
});
