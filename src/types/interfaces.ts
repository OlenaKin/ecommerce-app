export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface Category {
  id: string
  name: string
}

export interface CartItem {
  productId: number
  quantity: number
  product: Product
}

export interface User {
  id: number
  username: string
  email: string
  token?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}
