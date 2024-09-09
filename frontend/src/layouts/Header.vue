<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { AccountCircleOutlined } from '@vicons/material'
import { h } from 'vue'
import { RouterLink } from 'vue-router'

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home'
          }
        },
        { default: () => 'Home' }
      ),
    key: 'go-back-home'
  }
]
</script>

<template>
  <n-layout-header style="padding: 16px; display: flex">
    <n-menu mode="horizontal" :options="menuOptions" />
    <n-button @click="$emit('dialogHandler')" type="primary">
      <template #icon>
        <n-icon>
          <AccountCircleOutlined />
        </n-icon>
      </template>
      <span>Login</span>
    </n-button>
  </n-layout-header>
</template>

<!-- <style scoped>
.n-flex {
  background: rgb(24, 24, 28);
  padding: 24px;
}
</style> -->
