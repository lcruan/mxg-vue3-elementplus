### 1. 导入报错： import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

- 报错现象：

```
    无法找到模块“element-plus/dist/locale/zh-cn.mjs”的声明文件。
    “node_modules/element-plus/dist/locale/zh-cn.mjs”隐式拥有 "any" 类型。
    如果“element-plus”包实际公开了此模块，请尝试添加包含 `declare module‘element-plus/dist/locale/zh-cn.mjs';` 的新声明(.d.ts)文件ts(7016)
```

- 两种解决办法

1. 加入注解 // @ts-ignore

2. 在 env.d.ts 中进行声明 declare module 'element-plus/dist/locale/zh-cn.mjs'

### 2. vite.config.ts 配置

```js
export default defineConfig({
  // base: "mxg", // 这个base 提现在  http://localhost:5173/mxg
  // 开发环境有效（生产环境无效）
  server: {
    open: true, // 启动项目自动打开浏览器
    port: 8080, // 端口号
    host: "0.0.0.0", // host: 如果写localhost只能本机访问这个项目，如果是0.0.0.0开放给所有的ip访问此项目
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

### 3. 渲染函数的使用

- h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”

```html
<render />
```

```js
const render = () => {
  // props的name可选存在的时候，时ele开头的
  if (props.name?.startsWith("ele-")) {
    return h(
      resolveComponent("el-icon"),
      { color: props.color, size: props.size },
      () => h(resolveComponent(props.name))
    );
  } else {
    return h("i");
  }
};
```

### 4. props 结合 ts 写法

```js
const props = withDefaults(
  defineProps<{
    name?: string; // 图标名称 `ele-` 开头为 elementPlus 图标
    size?: number; // 图标颜色
    color?: string; // 图标大小
  }>(),
  {
    name: "",
    size: 18,
  }
);
```

### 5. 自行扩展 axios 返回的数据类型 axios.d.ts
- **注意：declare 定义的接口类型，在 SRC 和 ts 文件中不需要导入，相当于全局接口，直接引用接口类型**
- 在src/types/axios.d.ts下编写以下代码
```js
import * as axios from 'axios'

// 自行扩展 axios 返回的数据类型
declare module 'axios' {
    export interface AxiosResponse<T = any> {
        code: number;
        message: string;
        data: T
    }
}
```

- 在tsconfig.app.json中 include配置项中增加 "src/**/*.d.ts"

```json
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue", "src/**/*.d.ts"], // src里面所有内容都支持ts语法
```

- **注意：添加后，重启编辑器VsCode，不然可能无法识别到 *.d.ts 文件**