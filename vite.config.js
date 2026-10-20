import { defineConfig } from 'vite';

// `npm run dev` serves the static index.html reference page.
// `npm run build` compiles the theme assets into build/ (enqueued by functions.php).
export default defineConfig({
  build: {
    outDir: 'build',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (asset) =>
          asset.names?.[0]?.endsWith('.css') ? 'style.css' : 'assets/[name][extname]',
      },
    },
  },
});
