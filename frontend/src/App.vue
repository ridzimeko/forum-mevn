<script setup>
import AuthForm from './components/AuthForm.vue'
import Header from './layouts/Header.vue'
import { darkTheme } from 'naive-ui'
import { useAuthStore } from './stores/authStores'

const store = useAuthStore()
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-layout>
      <Header @dialog-handler="store.dialog = !store.dialog" />
      <AuthForm v-model:show="store.dialog" />
    </n-layout>
  </n-config-provider>
</template>
