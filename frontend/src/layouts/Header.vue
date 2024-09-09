<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useAuthStore } from '@/stores/authStores'
import {
  LogOutFilled,
  EditFilled,
  AccountCircleFilled,
  PersonFilled,
  HomeFilled
} from '@vicons/material'
import { NIcon } from 'naive-ui'
import { h } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const store = useAuthStore()
const router = useRouter()

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

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
    key: 'home'
  }
]

const profileOptions = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(HomeFilled),
    props: {
      onClick: () => router.push('dashboard')
    }
  },
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon(PersonFilled)
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: renderIcon(EditFilled)
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogOutFilled),
    props: {
      onClick: () => store.LogoutUser()
    }
  }
]
</script>

<template>
  <n-layout-header style="padding: 16px; display: flex">
    <n-menu mode="horizontal" :options="menuOptions" />

    <n-button v-if="!store.currentUser" @click="$emit('dialogHandler')" type="primary">
      <template #icon>
        <n-icon>
          <AccountCircleFilled />
        </n-icon>
      </template>
      <span>Login</span>
    </n-button>

    <n-dropdown v-else trigger="click" :options="profileOptions">
      <n-avatar :size="42" color="transparent">
        <n-icon>
          <AccountCircleFilled />
        </n-icon>
      </n-avatar>
    </n-dropdown>
  </n-layout-header>
</template>
