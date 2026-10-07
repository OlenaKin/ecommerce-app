<!-- <template>
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
</script> -->

<template>
  <header class="header">
    <div class="header__container">
      <div class="header__brand" @click="goHome">
        <h2>JUST BUY</h2>
      </div>

      <!-- Desktop-only: categories + nav links -->
      <div class="header__desktop">
        <CategoriesDropdown />

        <RouterLink to="/cart"><CartIcon /> <span>Cart</span></RouterLink>
        <RouterLink to="/wishlist"><HeartIcon /> <span>Wishlist</span></RouterLink>
      </div>

      <!-- Auth button: visible on both desktop and mobile -->
      <div class="header__auth">
        <button v-if="!auth.isAuthenticated" class="login_btn_three" @click="goLogin">Login</button>
        <button v-else class="login_btn_three" @click="logout">Logout</button>
      </div>

      <!-- Mobile-only hamburger -->
      <button
        class="hamburger"
        :aria-expanded="menuOpen"
        aria-label="Open menu"
        @click="menuOpen = true"
      >
        ☰
      </button>
    </div>

    <!-- Mobile menu overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="menu-overlay">
        <button class="close-menu" aria-label="Close menu" @click="menuOpen = false">✕</button>

        <nav class="mobile-nav">
          <CategoriesDropdown />
          <RouterLink to="/cart" @click="menuOpen = false">Cart</RouterLink>
          <RouterLink to="/wishlist" @click="menuOpen = false">Wishlist</RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CategoriesDropdown from '@/components/CategoriesDropdown.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'

const router = useRouter()
const auth = useAuthStore()

const menuOpen = ref(false)

const MOBILE_BREAKPOINT = 768 // must match the SCSS breakpoint

function handleResize() {
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    menuOpen.value = false
  }
}

onMounted(() => window.addEventListener('resize', handleResize))
onUnmounted(() => window.removeEventListener('resize', handleResize))

function goHome() {
  menuOpen.value = false
  router.push('/')
}

function goLogin() {
  menuOpen.value = false
  router.push('/login')
}

function logout() {
  auth.logout()
  menuOpen.value = false
  router.push('/')
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

/* =========================================
   DESKTOP LAYOUT
   ========================================= */

/* Group: categories + cart + wishlist (hidden on mobile) */
.header__desktop {
  display: flex;
  align-items: center;
  gap: $spacing-base;
}

/* Auth group — always visible */
.header__auth {
  display: flex;
  align-items: center;
}

/* =========================================
   MOBILE LAYOUT
   ========================================= */

@media (max-width: 768px) {
  /* Hide the desktop group on mobile */
  .header__desktop {
    display: none;
  }

  /* Shrink the login button so it fits next to the hamburger */
  .header__auth :deep(.login_btn_three) {
    width: auto;
    padding: 0 $spacing-base;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 0.95rem;
  }

  /* Push hamburger to the right edge */
  .header__container {
    gap: $spacing-sm;
    justify-content: flex-start;
  }

  .header__brand {
    margin-right: auto;
  }
}
</style>
