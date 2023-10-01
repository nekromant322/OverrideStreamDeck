import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      vue: '@vue/compat',
    },
  },
  plugins: [vue()],
});
