<!-- src/views/LoginView.vue -->
<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <input v-model="email" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')

const auth = useAuthStore()

async function handleLogin() {
  try {
    await auth.login({ email: email.value, password: password.value })
    window.location.href = '/'
  } catch (err) {
    error.value = 'Invalid username or password'
  }
}
</script>
