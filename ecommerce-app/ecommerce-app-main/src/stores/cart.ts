// src/stores/cart.ts
import { defineStore } from 'pinia'
import type { Product } from '@/types/interfaces'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]') as any[],
  }),

  getters: {
    totalPrice(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },

  actions: {
    add(product: Product) {
      const existing = this.items.find((i) => i.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        // NEW STRUCTURE
        this.items.push({ ...product, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    updateQuantity(id: number, qty: number) {
      const item = this.items.find((i) => i.id === id)
      if (!item) return

      item.quantity = qty

      if (item.quantity <= 0) {
        this.remove(id)
      } else {
        localStorage.setItem('cart', JSON.stringify(this.items))
      }
    },

    remove(id: number) {
      this.items = this.items.filter((i) => i.id !== id)
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    clear() {
      this.items = []
      localStorage.removeItem('cart')
    },
  },
})
