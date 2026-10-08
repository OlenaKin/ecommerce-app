// // src/services/products.ts

// import type { Product } from '@/types/interfaces'

// // export async function getProducts(): Promise<Product[]> {
// //   const apiUrl = import.meta.env.VITE_API_URL
// //   const res = await fetch(`${apiUrl}/products`)
// //   if (!res.ok) throw new Error('Failed to fetch products')
// //   return res.json()
// // }
// export async function getProducts(): Promise<Product[]> {
//   const apiUrl = import.meta.env.VITE_API_URL
//   console.log('API URL:', apiUrl)

//   try {
//     const res = await fetch(`${apiUrl}/products`)
//     console.log('Fetch response:', res)

//     if (!res.ok) {
//       console.error('Fetch failed with status:', res.status)
//       return []
//     }

//     const json = await res.json()
//     console.log('API returned:', json)

//     return json.products ?? json.data ?? json
//   } catch (err) {
//     console.error('Fetch error:', err)
//     return []
//   }
// }

// export async function getProductsByCategory(category: string): Promise<Product[]> {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const res = await fetch(`${apiUrl}/products/category/${category}`)
//   if (!res.ok) throw new Error('Failed to fetch products by category')
//   return res.json()
// }

// export async function getProduct(id: number): Promise<Product> {
//   const apiUrl = import.meta.env.VITE_API_URL
//   const res = await fetch(`${apiUrl}/products/${id}`)
//   if (!res.ok) throw new Error('Failed to fetch product')
//   return res.json()
// }

// src/services/products.ts
import type { Product } from '@/types/interfaces'

const API_URL = import.meta.env.VITE_API_URL // e.g. https://dummyjson.com

// 🔧 Normalize DummyJSON product → shape expected by your components
function normalizeProduct(p: any): Product {
  return {
    ...p,
    image: p.thumbnail || (p.images && p.images[0]) || '',
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`)
    if (!res.ok) {
      console.error('Fetch failed with status:', res.status)
      return []
    }
    const json = await res.json()
    const products = json.products ?? json.data ?? json
    return products.map(normalizeProduct)
  } catch (err) {
    console.error('Fetch error:', err)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Failed to fetch products by category')
  const json = await res.json()
  const products = json.products ?? json.data ?? json
  return products.map(normalizeProduct)
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  const json = await res.json()
  return normalizeProduct(json)
}
