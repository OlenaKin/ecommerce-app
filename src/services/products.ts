// src/services/products.ts

import type { Product } from '@/types/interfaces'

// export async function getProducts(): Promise<Product[]> {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const res = await fetch(`${apiUrl}/products`)
//   if (!res.ok) throw new Error('Failed to fetch products')
//   return res.json()
// }
export async function getProducts(): Promise<Product[]> {
  const apiUrl = import.meta.env.VITE_API_URL
  console.log('API URL:', apiUrl)

  try {
    const res = await fetch(`${apiUrl}/products`)
    console.log('Fetch response:', res)

    if (!res.ok) {
      console.error('Fetch failed with status:', res.status)
      return []
    }

    const json = await res.json()
    console.log('API returned:', json)

    return json.products ?? json.data ?? json
  } catch (err) {
    console.error('Fetch error:', err)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const apiUrl = import.meta.env.VITE_API_URL
  const res = await fetch(`${apiUrl}/products/category/${category}`)
  if (!res.ok) throw new Error('Failed to fetch products by category')
  return res.json()
}

export async function getProduct(id: number): Promise<Product> {
  const apiUrl = import.meta.env.VITE_API_URL
  const res = await fetch(`${apiUrl}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
