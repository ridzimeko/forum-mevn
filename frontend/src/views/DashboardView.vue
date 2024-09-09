<script setup>
import customFetch from '@/api'
import { onMounted, ref } from 'vue'

const user = ref(null)

const getUser = async () => {
  const { data } = await customFetch('/auth/getUser')
  user.value = data.data
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <div v-if="user">
    <h1>Hai</h1>
    <h2>Selamat Datang Kembali {{ user.name }}</h2>
  </div>
</template>
