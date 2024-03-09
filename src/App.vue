<script setup lang="ts">
import { test1, test2, getList } from '@/api/test'
import { onMounted } from 'vue';
import { ref } from 'vue'

test1();

test2().then(response => {
  console.log('test2.response', response);
}).catch(error => {
  console.log('error', error);
})

const list = ref<any[]>([])

onMounted(() => {
  loadData()
  loadData2()
})

function loadData() {
  getList().then(response => {
    console.log('loadData.response', response);
    list.value = response.data // 注意list的定义
  }).catch(error => {
    console.log('error');
  })
}

async function  loadData2() {
  try {
    const { data, message, code } = await getList()
    console.log('loadData2', data);
  } catch(error) {
    console.log('loadData2.error', error);
  }
}

// `development`开发环境，production 生产环境
console.log('当前是什么环境', import.meta.env.MODE);

console.log('获取自定义环境配置', import.meta.env.VITE_USERNAME, import.meta.env.DB_PASSWORD);

</script>

<template>
  {{ list }}
</template>

<style scoped></style>
