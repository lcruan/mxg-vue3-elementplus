import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/ 
export default defineConfig(( { mode }) => {
  // mode模式字符串，process.cwd()项目根目录
  // 返回值 import.meta.env
  const env = loadEnv(mode, process.cwd())
  return {
    // base: "mxg", // 这个base 提现在  http://localhost:5173/mxg
    // 开发环境有效（生产环境无效）
    server: {
      open: true, // 启动项目自动打开浏览器
      port: 8080, // 端口号
      host: '0.0.0.0', // host: 如果写localhost只能本机访问这个项目，如果是0.0.0.0开放给所有的ip访问此项目
      proxy: {
        // 匹配以`/dev-api`开头的请求，交给代理服务器转发到目标接口
        // '/dev-api': {
          [env.VITE_APP_BASE_API]: { // 注意：key值是变量要加中括号
          // 代理后的目标地址
          // target: 'https://mock.mengxuegu.com/mock/65dabf3b351bbd02cf339fc8/mxg-vue3-elementplus',
          target: env.VITE_APP_SERVICE_URL,
          //  /dev-api/test 去除/dev-api，变成/test 最终变成https://mock.mengxuegu.com/mock/65dabf3b351bbd02cf339fc8/mxg-vue3-elementplus
          // rewrite: (path) => path.replace(/^\/dev-api/, ''),
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}/`), ''),
          // 是否开启代理
          changeOrigin: true
        }
      }
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
