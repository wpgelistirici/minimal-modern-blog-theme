import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  root: 'src/pages',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        typography: resolve(__dirname, 'src/pages/typography-test.html'),
        tokens: resolve(__dirname, 'src/pages/tokens-test.html'),
        animations: resolve(__dirname, 'src/pages/animations-test.html'),
      }
    }
  },
  css: {
    postcss: './postcss.config.js'
  }
})
