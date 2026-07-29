<!-- src/views/CartView.vue -->
<template>
  <div class="cart">
    <h1>Your Cart</h1>

    <div v-if="cart.items.length === 0">Your cart is empty.</div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" />

        <div class="info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }} € each</p>

          <div class="qty">
            <button @click="update(item.id, item.quantity - 1)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="update(item.id, item.quantity + 1)">+</button>
          </div>

          <p class="subtotal">Subtotal: {{ item.price * item.quantity }} €</p>

          <button @click="remove(item.id)">Remove</button>
        </div>
      </div>

      <h2>Total: {{ cart.totalPrice }} €</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

function update(id: number, qty: number) {
  cart.updateQuantity(id, qty)
}

function remove(id: number) {
  cart.remove(id)
}
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.qty {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.qty button {
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
}

.subtotal {
  margin-top: 0.5rem;
  font-weight: bold;
}
</style>
