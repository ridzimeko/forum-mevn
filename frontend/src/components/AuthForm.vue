<script setup>
import { useAuthStore } from '@/stores/authStores'
// import { useMessage } from 'naive-ui'
import { reactive } from 'vue'

// Message
// const message = useMessage()
// const createErrorMessage = () => {
//   message.info("I don't know why nobody told you how to unfold your love", { duration: 5000 })
// }

// Store
const authStores = useAuthStore()
const { LoginUser } = authStores

// State
const userInput = reactive({
  email: '',
  password: ''
})

const handleSubmit = () => {
  LoginUser(userInput)
}
</script>

<template>
  <n-modal transform-origin="center" :block-scroll="true">
    <n-card style="width: 520px">
      <n-alert type="error" v-show="authStores.errorAlert" closable>
        {{ authStores.errorMsg }}
      </n-alert>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        pane-wrapper-style=" margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="Sign in">
          <n-form @submit.prevent="handleSubmit">
            <n-form-item-row label="Email">
              <n-input v-model:value="userInput.email" />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input v-model:value="userInput.password" type="password" />
            </n-form-item-row>
            <n-button attr-type="submit" type="primary" block secondary strong> Sign In </n-button>
          </n-form>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Sign up">
          <n-form>
            <n-form-item-row label="Email">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Password">
              <n-input />
            </n-form-item-row>
            <n-form-item-row label="Reenter Password">
              <n-input />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block secondary strong> Sign up </n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-modal>
</template>
