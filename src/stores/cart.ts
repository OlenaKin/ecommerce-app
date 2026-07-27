// src/stores/cart.ts
import { defineStore } from 'pinia'
import type { CartItem, Product } from '@/types/interfaces'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  }),

  actions: {
    add(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    remove(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId)
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    clear() {
      this.items = []
      localStorage.removeItem('cart')
    },
  },
})
