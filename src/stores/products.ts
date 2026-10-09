// src/stores/products.ts
import { defineStore } from 'pinia'
import { getProducts, getProductsByCategory } from '@/services/products'
import type { Product } from '@/types/interfaces'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: '' as string,
    category: '' as string,
  }),

  actions: {
    async fetchProducts() {
      this.category = ''
      await this.load(getProducts)
    },

    async fetchProductsByCategory(category: string) {
      this.category = category
      await this.load(() => getProductsByCategory(category))
    },

    // Shared loading/error handling for both fetches
    async load(fetcher: () => Promise<Product[]>) {
      this.loading = true
      this.error = ''
      try {
        this.products = await fetcher()
      } catch (err) {
        console.error('Fetch error:', err)
        this.products = []
        this.error = 'Could not load products. Check your connection and try again.'
      } finally {
        this.loading = false
      }
    },
  },
})
