import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(import.meta.env.VITE_AUTH_STORAGE_KEY) || null,
    isAuthenticated: !!localStorage.getItem(import.meta.env.VITE_AUTH_STORAGE_KEY),
  }),

  actions: {
    async login(username: string, password: string) {
      const apiUrl = import.meta.env.VITE_API_URL
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!data.token) {
        throw new Error('Invalid credentials')
      }

      this.token = data.token
      this.isAuthenticated = true

      localStorage.setItem(import.meta.env.VITE_AUTH_STORAGE_KEY, data.token)
    },

    logout() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem(import.meta.env.VITE_AUTH_STORAGE_KEY)
    },
  },
})
