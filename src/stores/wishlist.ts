// src/stores/wishlist.ts
import { defineStore } from 'pinia'
import type { WishlistItem, Product } from '@/types/interfaces'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist') || '[]') as WishlistItem[],
  }),

  actions: {
    add(product: Product) {
      const exists = this.items.some((i) => i.product.id === product.id)
      if (!exists) {
        this.items.push({ product })
        localStorage.setItem('wishlist', JSON.stringify(this.items))
      }
    },

    remove(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(this.items))
    },
  },
})
