import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split vendor chunks
            return 'vendor';
          }
          // Group Naive UI components
          if (id.includes('@/components') || id.includes('naive-ui')) {
            return 'ui-components';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1000 kB
    sourcemap: false, // Disable sourcemaps in production
    minify: 'terser', // Use terser for more efficient minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true, // Remove debugger statements
      }
    }
  }
});
