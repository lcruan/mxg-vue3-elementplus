/// <reference types="vite/client" />

// env.d.ts 文件添加 declare module '*.vue' 解决main.ts文件有红线报错问题：
// 声明文件 *.vue 文件，交给 vue 模块处理
declare module '*.vue' {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// declare module 'element-plus/dist/locale/zh-cn.mjs'