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
</script>

<template>
  {{ list }}
</template>

<style scoped></style>
