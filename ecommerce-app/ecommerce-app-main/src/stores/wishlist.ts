import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(import.meta.env.VITE_WISHLIST_STORAGE_KEY) || '[]'),
  }),

  actions: {
    add(product: any) {
      // avoid duplicates
      if (!this.items.find((p: any) => p.id === product.id)) {
        this.items.push(product)
        this.save()
      }
    },

    remove(id: number) {
      this.items = this.items.filter((p: any) => p.id !== id)
      this.save()
    },

    save() {
      localStorage.setItem(import.meta.env.VITE_WISHLIST_STORAGE_KEY, JSON.stringify(this.items))
    },
  },
})
