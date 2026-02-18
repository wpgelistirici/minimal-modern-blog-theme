import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src/pages',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
