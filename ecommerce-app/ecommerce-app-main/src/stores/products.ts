// src/stores/products.ts
import { defineStore } from 'pinia'
import { getProducts, getProductsByCategory } from '@/services/products'
import type { Product } from '@/types/interfaces'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    category: '' as string,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      this.category = ''
      try {
        this.products = await getProducts()
      } finally {
        this.loading = false
      }
    },

    async fetchProductsByCategory(category: string) {
      this.loading = true
      this.category = category
      try {
        this.products = await getProductsByCategory(category)
      } finally {
        this.loading = false
      }
    },
  },
})
