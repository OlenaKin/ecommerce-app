<!-- src/components/ProductCard.vue -->
<template>
  <router-link :to="`/product/${product.id}`" class="card">
    <div class="card" @click="$emit('click')">
      <img :src="product.image" :alt="product.title" class="image" />

      <h3 class="title">{{ product.title }}</h3>
      <p class="price">{{ product.price }} €</p>
      <button @click.stop="addToWishlist">❤️ Wishlist</button>
      <button @click.stop="addToCart">🛒 Add to Cart</button>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Product } from '@/types/interfaces'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const wishlist = useWishlistStore()
const cart = useCartStore()
const props = defineProps<{ product: Product }>()

function addToWishlist() {
  wishlist.add(props.product)
}

function addToCart() {
  cart.add(props.product)
}
</script>

<style scoped lang="scss">
.card {
  border: 1px solid #ddd;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  height: 100%;
}

.card:hover {
  transform: scale(1.02);
}

.image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  object-position: center;
  margin-bottom: 1rem;
}

.title {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.price {
  font-weight: bold;
  margin-top: 0.25rem;
}
</style>
