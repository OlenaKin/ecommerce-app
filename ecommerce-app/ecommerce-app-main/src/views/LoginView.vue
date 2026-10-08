<!-- <template>
  <div class="login page">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit" class="login_btn_three">LOGIN</button>
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
</style> -->

<template>
  <div class="login page">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="login_btn_three">LOGIN</button>
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

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

/* .page already gives padding-top/bottom: 90px (from main.css).
   We only add centering here. */
.login.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login h2 {
  text-align: center;
  margin-bottom: $spacing-lg;
  font-size: 2rem;
  color: $color-text;
}

/* Card wrapper */
.login form {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
  width: 100%;
  max-width: 380px;
  padding: $spacing-lg;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Inputs — needed because global reset strips them bare */
.login input {
  width: 100%;
  padding: $spacing-sm $spacing-base;
  border: 1px solid #ccc;
  border-radius: 4px;
  font: inherit;
  color: $color-text;
  background: #fff;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: $color-muted;
  }

  /* Global :focus { outline: none !important } kills the outline.
     Re-introduce a visible focus ring via box-shadow. */
  &:focus,
  &:focus-visible {
    outline: none;
    border-color: #4a6cf7;
    box-shadow: 0 0 0 3px rgba(74, 108, 247, 0.25);
  }
}

/* Error */
.error {
  color: #d32f2f;
  margin-top: $spacing-base;
  text-align: center;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .login form {
    padding: $spacing-base;
    max-width: 100%;
  }
}
</style>
