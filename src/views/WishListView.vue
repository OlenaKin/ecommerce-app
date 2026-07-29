<!-- src/views/WishlistView.vue -->
<template>
  <div class="wishlist">
    <h1>Your Wishlist</h1>

    <div v-if="items.length === 0">Your wishlist is empty.</div>

    <div v-else>
      <div v-for="item in items" :key="item.id" class="wishlist-item">
        <img :src="item.image" :alt="item.title" />
        <h3>{{ item.title }}</h3>

        <button @click="remove(item.id)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const items = wishlistStore.items

function remove(id: number) {
  wishlistStore.remove(id)
}
</script>

<style scoped lang="scss">
.wishlist-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>
