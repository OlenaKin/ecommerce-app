// src/services/cart.ts
import type { CartItem, Product } from '@/types/interfaces'

export function addToCart(cart: CartItem[], product: Product): CartItem[] {
  const existing = cart.find((item) => item.product.id === product.id)

  if (existing) {
    existing.quantity++
    return [...cart]
  }

  return [...cart, { product, quantity: 1 }]
}

export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
  return cart.filter((item) => item.product.id !== productId)
}
