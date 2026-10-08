<template>
  <div class="home">
    <!-- <h1>Products</h1> -->

    <!-- Category Filter -->

    <div v-if="loading">Loading...</div>

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
const { products, loading } = storeToRefs(store)

const route = useRoute()

watch(
  () => route.query.category,
  (category) => {
    if (category) {
      store.fetchProductsByCategory(category as string)
    } else {
      store.fetchProducts()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  align-items: stretch;
}
.home {
  margin: 5rem;
}
</style>
