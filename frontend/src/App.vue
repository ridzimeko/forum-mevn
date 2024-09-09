<script setup>
import AuthForm from './components/AuthForm.vue'
import Header from './layouts/Header.vue'
import { darkTheme } from 'naive-ui'
import { useAuthStore } from './stores/authStores'

const store = useAuthStore()
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-layout position="absolute">
      <Header @dialog-handler="store.dialog = !store.dialog" />
      <AuthForm v-model:show="store.dialog" />
      <n-layout-content content-style="padding: 24px;">
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>
