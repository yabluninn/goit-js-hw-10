import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    base: '/goit-js-hw-10/',
    root: 'src',
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'commonHelpers'
              ? 'commonHelpers.js'
              : '[name].js',
          assetFileNames: assetInfo =>
            assetInfo.name && assetInfo.name.endsWith('.html')
              ? '[name].[ext]'
              : 'assets/[name]-[hash][extname]',
        },
      },
    },
    // plugins: [
    //   injectHTML(),
    //   FullReload(['./src/**/*.html']), // чуть улучшил путь
    //   SortCss({ sort: 'mobile-first' }),
    // ],
  };
});
