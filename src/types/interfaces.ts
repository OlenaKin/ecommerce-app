// src/types/interfaces.ts

// Product from FakeStoreAPI
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

// Category (FakeStoreAPI returns string[])
export type Category = string

// User for authentication
export interface User {
  email: string
  password: string
  token?: string
}

// Login response from FakeStoreAPI
export interface LoginResponse {
  token: string
}

// Cart item
export interface CartItem {
  product: Product
  quantity: number
}

// Wishlist item
export interface WishlistItem {
  product: Product
}

// Generic API error
export interface ApiError {
  message: string
  status?: number
}
