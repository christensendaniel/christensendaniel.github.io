import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { deploymentMetaPlugin } from './scripts/vite-plugin-deployment-meta.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    deploymentMetaPlugin()
  ],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
