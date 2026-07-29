// src/stores/products.ts
import { defineStore } from 'pinia'
import { getProducts, getProductsByCategory } from '@/services/products'
import type { Product } from '@/types/interfaces'

export const useProductsStore = defineStore('products', {
  state: () => ({
    apiUrl: import.meta.env.VITE_API_URL,
    products: [] as Product[],
    loading: false,
    category: '' as string,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.products = await getProducts()
      this.loading = false
    },

    // async fetchProductsByCategory(category: string) {
    //   this.loading = true
    //   this.category = category
    //   this.products = await getProductsByCategory(category)
    //   this.loading = false
    // },
    async fetchProductsByCategory(category: string) {
      this.loading = true
      try {
        const res = await fetch(`${this.apiUrl}/products/category/${encodeURIComponent(category)}`)
        const json = await res.json()
        this.products = json
      } finally {
        this.loading = false
      }
    },
  },
})
