<!-- src/components/ProductCard.vue -->

<template>
  <div class="card">
    <!-- Clickable area (opens product page) -->
    <router-link :to="`/product/${product.id}`" class="card__link">
      <img :src="product.image" :alt="product.title" class="image" />

      <h3 class="title">{{ product.title }}</h3>
      <p class="price">{{ product.price }} €</p>
    </router-link>

    <!-- Buttons (do NOT open product page) -->
    <div class="card__actions">
      <button @click.stop="addToWishlist"><HeartIcon /></button>
      <button @click.stop="addToCart"><CartIcon /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/types/interfaces'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import CartIcon from './icons/CartIcon.vue'

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
  border: 1px solid #f7f7f7;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s;
  height: 100%;

  /* Column layout so the action buttons can sit at the bottom */
  display: flex;
  flex-direction: column;
}

/* Image + title + price take up the free space... */
.card__link {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* ...which pushes the buttons to the same spot at the bottom of every card */
.card__actions {
  margin-top: auto;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
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

a.card:focus,
a.card:focus-visible {
  outline: 2px solid #aaa; // gray
  outline-offset: 2px;
}
</style>
