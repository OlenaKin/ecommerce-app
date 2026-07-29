//// src/services/categories.ts
import type { Category } from '@/types/interfaces'

export async function getCategories(): Promise<Category[]> {
  const apiUrl = import.meta.env.VITE_API_URL
  const res = await fetch(`${apiUrl}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}
