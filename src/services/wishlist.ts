// src/services/wishlist.ts
import type { WishlistItem, Product } from '@/types/interfaces'

export function addToWishlist(wishlist: WishlistItem[], product: Product): WishlistItem[] {
  const exists = wishlist.some((item) => item.product.id === product.id)
  if (exists) return wishlist
  return [...wishlist, { product }]
}

export function removeFromWishlist(wishlist: WishlistItem[], productId: number): WishlistItem[] {
  return wishlist.filter((item) => item.product.id !== productId)
}
