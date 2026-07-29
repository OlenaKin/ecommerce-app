<template>
  <div class="login">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Login failed'
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
