import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "mxg", // 这个base 提现在  http://localhost:5173/mxg
  // 开发环境有效（生产环境无效）
  server: {
    open: true, // 启动项目自动打开浏览器
    port: 8080, // 端口号
    host: '0.0.0.0' // host: 如果写localhost只能本机访问这个项目，如果是0.0.0.0开放给所有的ip访问此项目
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
