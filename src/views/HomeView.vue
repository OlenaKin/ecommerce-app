<template>
  <div class="home">
    <!-- <h1>Products</h1> -->

    <!-- Category Filter -->

    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="load-error" role="alert">
      <p>{{ error }}</p>
      <button class="login_btn_three" @click="load">Try again</button>
    </div>

    <div v-else class="grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

import { watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useProductsStore()
const { products, loading, error } = storeToRefs(store)

const route = useRoute()

function load() {
  const category = route.query.category
  if (category) {
    store.fetchProductsByCategory(category as string)
  } else {
    store.fetchProducts()
  }
}

watch(() => route.query.category, load, { immediate: true })
</script>

<style scoped>
.load-error {
  text-align: center;
  padding: 3rem 1rem;
}
</style>
