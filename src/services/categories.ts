// src/services/categories.ts
import type { Category } from '@/types/interfaces'
import { config } from '@/config'

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${config.apiUrl}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}
