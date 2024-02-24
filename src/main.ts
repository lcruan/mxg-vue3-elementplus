import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 整合 ElementPlus
import ElementPlus from 'element-plus'

// 导入汉化包
/**
 * 无法找到模块“element-plus/dist/locale/zh-cn.mjs”的声明文件。“node_modules/element-plus/dist/locale/zh-cn.mjs”隐式拥有 "any" 类型。
   如果“element-plus”包实际公开了此模块，请尝试添加包含 `declare module‘element-plus/dist/locale/zh-cn.mjs';` 的新声明(.d.ts)文件ts(7016)

   导入报错解决方法：
   （1）加入注解 // @ts-ignore
    (2) 在 env.d.ts 中进行声明 declare module 'element-plus/dist/locale/zh-cn.mjs'
 */
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入自定义注册图标事件
import { useElIcon } from '@/utils/setGlobal'

import App from './App.vue'
import router from './router'
// 导入全局样式
import '@/styles/index.scss';

const app = createApp(App)


app.use(createPinia())
app.use(router)

// 使用 ElementPlus, 并且汉化
app.use(ElementPlus, {
    locale: zhCn,
})

// 调用utils中自定义的 注册elementui图标事件
useElIcon(app)

app.mount('#app')
