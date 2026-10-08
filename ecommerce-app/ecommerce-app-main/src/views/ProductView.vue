<!-- src/views/ProductView.vue -->

<template>
  <div class="product page">
    <div v-if="loading">Loading...</div>

    <div v-else class="product-detail">
      <!-- LEFT SIDE -->
      <div class="product-detail__image">
        <img :src="product.image" :alt="product.title" />
      </div>

      <!-- RIGHT SIDE -->
      <div class="product-detail__content">
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price }} €</p>
        <p class="description">{{ product.description }}</p>

        <div class="actions">
          <button @click="addToCart(product)">Add to Cart</button>
          <button @click="addToWishlist(product)">Add to Wishlist</button>
        </div>
      </div>
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
