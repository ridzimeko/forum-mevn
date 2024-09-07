<script setup>
import DialogForm from './components/DialogForm.vue'
import Header from './layouts/Header.vue'
import { darkTheme } from 'naive-ui'
import customFetch from './api'
import { onMounted, ref } from 'vue'

const showDialog = ref(false)

const getData = async () => {
  const res = await customFetch.get('/test')
  console.log(res)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-layout>
      <Header @dialog-handler="showDialog = !showDialog" />
      <DialogForm v-model:show="showDialog" />
    </n-layout>
  </n-config-provider>
</template>
