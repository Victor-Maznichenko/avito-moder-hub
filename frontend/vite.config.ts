import react from '@vitejs/plugin-react';
import path from 'node:path';
import process from 'node:process';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(process.cwd(), 'src/shared/assets/styles/_mantine.scss').replace(/\\/g, '/')}" as *;`
      }
    }
  }
});
