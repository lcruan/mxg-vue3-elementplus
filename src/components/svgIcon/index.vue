<template>
  <!-- 使用元素方式引用渲染对象 -->
  <!-- <render1/> -->
  <render />
</template>

<script setup lang="ts">
import { h, resolveComponent } from "vue";

/*

// h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”
// 定义一个渲染函数，参数2为 prop
const render1 = () => h("div", { class: "bar", innerHTML: "hello" });

// 没有prop时，参数可以省略，直接定义第3个参数: 元素体的内容
const render2 = () => h("div", "mengxuegu");

// <el-icon><ele-Plus/></el-icon>
const render3 = () => h("el-icon", { size: 118, color: "red" }, "ele-Plus"); // 这样写就直接将ele-Plus渲染成了字符串 ->引出resolveDirective

// 如果以名称注册组件时，可以使用 resolveDirective 函数加载动态组件
// 参数3 还可以指定为h函数，并且建议使用函数返回 () => h(xxx, xxx)
const render4 = () =>
  h(
    resolveComponent("el-icon"),
    { size: 118, color: "red" },
    () => h(resolveComponent("ele-Plus"))
  );

  */
const props = withDefaults(
  defineProps<{
    name?: string; // 图标名称 `ele-` 开头为 elementPlus 图标
    size?: number | string; // 图标颜色
    color?: string; // 图标大小
  }>(),
  {
    name: "",
    size: 18,
  }
);

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
</script>
