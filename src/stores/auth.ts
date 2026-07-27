// src/stores/auth.ts
import { defineStore } from 'pinia'
import { login } from '@/services/auth'
import type { User } from '@/types/interfaces'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  }),

  actions: {
    async login(user: User) {
      const res = await login(user)

      this.token = res.token
      this.isAuthenticated = true

      localStorage.setItem('token', res.token)
    },

    logout() {
      this.token = ''
      this.isAuthenticated = false

      localStorage.removeItem('token')
    },
  },
})
