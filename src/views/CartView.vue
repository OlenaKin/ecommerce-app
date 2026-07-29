<!-- src/views/CartView.vue -->
<template>
  <div class="cart page">
    <h1>Your Cart</h1>

    <div v-if="cart.items.length === 0">Your cart is empty.</div>

    <div v-else>
      <div v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.title" class="cart-img" />

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

.cart-img {
  width: 150px;
  height: auto;
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

/* PAGE SPACING */
.cart.page {
  padding-top: 90px;
  padding-bottom: 90px;
}

/* TITLE */
.cart h1 {
  text-align: center;
  margin-bottom: $spacing-lg;
}

/* EMPTY STATE */
.cart > div {
  text-align: center;
  font-size: 1.2rem;
  margin-top: $spacing-lg;
}

/* CART ITEM */
.cart-item {
  display: flex;
  flex-direction: column; /* ⭐ stack everything vertically */
  align-items: center; /* ⭐ center text + buttons */
  gap: $spacing-base;
  padding: $spacing-base;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  margin-bottom: $spacing-lg;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* IMAGE */
.cart-img {
  width: 150px;
  height: auto;
  object-fit: contain;
}

/* INFO BLOCK */
.info {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

/* TITLE */
.info h3 {
  font-size: 1.2rem;
}

/* QUANTITY CONTROLS */
.qty {
  display: flex;
  gap: $spacing-sm;
  align-items: center;
  justify-content: center;
}

.qty button {
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  background: $color-primary;
  color: $color-text;
  border-radius: 4px;
  transition: 0.2s;
}

.qty button:hover {
  background: $color-secondary;
}

/* SUBTOTAL */
.subtotal {
  margin-top: $spacing-sm;
  font-weight: bold;
}

/* REMOVE BUTTON BELOW EVERYTHING */
.info button {
  background: $color-secondary;
  color: $color-text;
  padding: $spacing-sm $spacing-base;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  margin-top: $spacing-sm;
}

.info button:hover {
  background: darken($color-secondary, 10%);
}

/* TOTAL PRICE */
.cart h2 {
  text-align: center;
  margin-top: $spacing-lg;
}

/* MOBILE VERSION */
@media (max-width: 768px) {
  .cart-img {
    width: 60%;
  }
}
</style>
