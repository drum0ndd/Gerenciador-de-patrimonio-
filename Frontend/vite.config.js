import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend'),
    },
  },
  server: {
    proxy: {
      '/login': {
        target: 'http://localhost:5000', // URL do seu backend
        changeOrigin: true,
        secure: false,
      },
      // Adicione outros proxies se necessário
    },
  },
});
