<!-- Home:
grid of products (api fetch) with name, image and price
products are clickable/see detail
header must filter products based in their category
URL (Query String or Path) must update based on
the category directly accesses a filtered URL -->

<template>
  <main class="home">
    <h1 class="title">Products</h1>

    <div class="grid">
      <div v-for="product in products" :key="product.id" class="card">
        <img :src="product.image" :alt="product.title" class="image" />

        <h2 class="name">{{ product.title }}</h2>
        <p class="price">{{ product.price }} €</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { config } from '@/config'
import type { Product } from '@/types/interfaces'

const products = ref<Product[]>([])

onMounted(async () => {
  try {
    const res = await fetch(`${config.apiUrl}/products`)
    products.value = await res.json()
  } catch (err) {
    console.error('Failed to load products:', err)
  }
})
</script>

<style scoped lang="scss">
.home {
  padding: 2rem;
}

.title {
  margin-bottom: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}

.image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.name {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.price {
  font-weight: bold;
  color: #4a6cf7;
}
</style>
