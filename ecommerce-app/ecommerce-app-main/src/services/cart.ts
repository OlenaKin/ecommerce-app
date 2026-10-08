import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem(import.meta.env.VITE_CART_STORAGE_KEY) || '[]').filter(
      (item: any) => item && item.id && item.quantity,
    ),
  }),

  getters: {
    totalPrice(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    totalItems(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },
  },

  actions: {
    add(product: any) {
      const existing = this.items.find((p: any) => p.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }

      this.save()
    },

    remove(id: number) {
      this.items = this.items.filter((p: any) => p.id !== id)
      this.save()
    },

    updateQuantity(id: number, qty: number) {
      const item = this.items.find((p: any) => p.id === id)
      if (!item) return

      item.quantity = qty
      if (item.quantity <= 0) {
        this.remove(id)
      } else {
        this.save()
      }
    },

    save() {
      localStorage.setItem(import.meta.env.VITE_CART_STORAGE_KEY, JSON.stringify(this.items))
    },
  },
})
