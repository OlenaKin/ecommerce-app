<template>
  <header class="header">
    <div class="header__container">
      <div class="header__brand" @click="goHome">
        <h2>JUST BUY</h2>
      </div>

      <CategoriesDropdown />

      <div class="actions">
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>

        <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>
        <button class="login_btn_three" v-else @click="logout">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CategoriesDropdown from '@/components/CategoriesDropdown.vue'

const router = useRouter()
const auth = useAuthStore()

function goHome() {
  router.push('/')
}

function goLogin() {
  router.push('/login')
}

function logout() {
  auth.logout()
  router.push('/')
}
</script>
