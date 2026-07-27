// src/services/products.ts
import type { Product } from '@/types/interfaces'
import { config } from '@/config'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${config.apiUrl}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${config.apiUrl}/products/category/${category}`)
  if (!res.ok) throw new Error('Failed to fetch products by category')
  return res.json()
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${config.apiUrl}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
