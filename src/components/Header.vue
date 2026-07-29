<!-- <template>
  <header class="header">
    <div class="logo" @click="goHome">JUST BUY</div>

    <nav class="nav">
      <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
        {{ cat }}
      </button>
    </nav>

    <div class="actions">
      <RouterLink to="/cart">Cart</RouterLink>
      <RouterLink to="/wishlist">Wishlist</RouterLink>

      <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

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

<style scoped lang="scss"> -->

<!-- <template>
  <header class="header">
    <div class="header__container">

      <div class="header__brand" @click="goHome">
        <h2>JUST BUY</h2>
      </div>


      <button class="hamburger" @click="toggleMenu">☰</button>


      <nav class="desktop-nav">
        <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
          {{ cat }}
        </button>
      </nav>


      <div class="actions">
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>

        <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

        <button v-else @click="logout">Logout</button>
      </div>
    </div>


    <div v-if="menuOpen" class="menu-overlay">
      <button class="close-menu" @click="toggleMenu">✖</button>

      <nav class="mobile-nav">
        <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
          {{ cat }}
        </button>

        <RouterLink to="/cart" @click="toggleMenu">Cart</RouterLink>
        <RouterLink to="/wishlist" @click="toggleMenu">Wishlist</RouterLink>

        <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

        <button v-else @click="logout">Logout</button>
      </nav>
    </div>
  </header>
</template> -->

<template>
  <header class="header">
    <div class="header__container">
      <!-- Logo -->
      <div class="header__brand" @click="goHome">
        <h2>JUST BUY</h2>
      </div>

      <!-- Hamburger (mobile only) -->
      <button class="hamburger" v-if="isMobile" @click="toggleMenu">☰</button>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav" v-if="!isMobile">
        <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
          {{ cat }}
        </button>
      </nav>

      <!-- Desktop Actions -->
      <div class="actions" v-if="!isMobile">
        <RouterLink to="/cart">Cart</RouterLink>
        <RouterLink to="/wishlist">Wishlist</RouterLink>

        <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

        <button class="login_btn_three" v-else @click="logout">Logout</button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="menuOpen && isMobile" class="menu-overlay">
      <button class="close-menu" @click="toggleMenu">✖</button>

      <nav class="mobile-nav">
        <button v-for="cat in categories" :key="cat" @click="filterByCategory(cat)">
          {{ cat }}
        </button>

        <RouterLink to="/cart" @click="toggleMenu">Cart</RouterLink>
        <RouterLink to="/wishlist" @click="toggleMenu">Wishlist</RouterLink>

        <button class="login_btn_three" v-if="!auth.isAuthenticated" @click="goLogin">Login</button>

        <button class="login_btn_three" v-else @click="logout">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCategories } from '@/services/categories'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const productsStore = useProductsStore()
const auth = useAuthStore()

const categories = ref([])
const menuOpen = ref(false)
const isMobile = ref(false)

onMounted(async () => {
  categories.value = await getCategories()
})

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  checkMobile()
  window.addEventListener('resize', checkMobile)
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function filterByCategory(cat) {
  router.push({ path: '/', query: { category: cat } })
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
