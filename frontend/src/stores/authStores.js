import customFetch from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('user', () => {
  const dialog = ref(false)
  const errorMsg = ref(null)
  const errorAlert = ref(false)
  const currentUser = ref(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  )

  const router = useRouter()

  const LoginUser = async (inputData) => {
    try {
      const { data } = await customFetch.post('/auth/login', {
        email: inputData.email,
        password: inputData.password
      })
      currentUser.value = data.data
      localStorage.setItem('user', JSON.stringify(data.data))

      dialog.value = false
      errorAlert.value = false

      router.push({ name: 'dashboard' })
    } catch (error) {
      errorAlert.value = true
      errorMsg.value = error.response.data.message
    }
  }

  const LogoutUser = async () => {
    try {
      localStorage.setItem('user', null)
      currentUser.value = null
      await customFetch.get('/auth/logout')
      router.push({ name: 'home' })
    } catch (error) {
      console.error(error)
    }
  }

  return { dialog, LoginUser, errorAlert, errorMsg, currentUser, LogoutUser }
})
