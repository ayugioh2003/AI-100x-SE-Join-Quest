import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // 效能優化配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 將 Vue 相關庫分離為獨立 chunk
          vue: ['vue', 'vue-router', 'pinia'],
          // 將遊戲邏輯分離為獨立 chunk
          gameLogic: ['./src/game-logic/index']
        }
      }
    },
    // 啟用 CSS 代碼分割
    cssCodeSplit: true,
    // 最小化輸出
    minify: 'esbuild'
  },
  // 開發伺服器優化
  server: {
    hmr: {
      overlay: false // 減少 HMR 覆蓋層
    }
  },
  // GitHub Pages 部署配置
  base: mode === 'production' ? '/AI-100x-SE-Join-Quest/' : '/'
}))
