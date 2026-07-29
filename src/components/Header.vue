<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <div class="logo" @click="goHome">My Store</div>

    <nav class="nav">
      <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
        {{ cat }}
      </button>
    </nav>

    <div class="actions">
      <RouterLink to="/cart">Cart</RouterLink>
      <RouterLink to="/wishlist">Wishlist</RouterLink>

      <button v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

      <button v-else @click="logout">Logout</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '@/services/categories'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const productsStore = useProductsStore()
const auth = useAuthStore()

const categories = ref<string[]>([])
const categoryMap: Record<string, string> = {
  electronics: 'electronics',
  jewelery: 'jewelery',
  "men's clothing": "men's clothing",
  "women's clothing": "women's clothing",
}

onMounted(async () => {
  categories.value = await getCategories()
})

function filterByCategory(cat: string) {
  const normalized = categoryMap[cat] || cat
  router.push({ path: '/', query: { category: normalized } })
}

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

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #fafafa;
  border-bottom: 1px solid #ddd;
}

.nav {
  display: flex;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.logo {
  font-weight: bold;
  cursor: pointer;
}
</style>
