<!-- src/views/ProductView.vue -->

<template>
  <div class="product">
    <div v-if="loading">Loading...</div>

    <div v-else>
      <img :src="product.image" :alt="product.title" class="image" />

      <h1>{{ product.title }}</h1>
      <p class="price">{{ product.price }} €</p>
      <p class="description">{{ product.description }}</p>

      <button @click="addToCart(product)">Add to Cart</button>
      <button @click="addToWishlist(product)">Add to Wishlist</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/services/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/types/interfaces'

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const product = ref<Product | null>(null)
const loading = ref(true)

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await getProduct(id)
  loading.value = false
})

function addToCart(p: Product) {
  cartStore.add(p)
}

function addToWishlist(p: Product) {
  wishlistStore.add(p)
}
</script>

<style scoped lang="scss">
.image {
  max-width: 300px;
}
.price {
  font-weight: bold;
}
</style>
