// src/services/auth.ts
import type { LoginResponse, User } from '@/types/interfaces'
import { config } from '@/config'

export async function login(user: User): Promise<LoginResponse> {
  const res = await fetch(`${config.apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.email,   // FakeStoreAPI uses "username"
      password: user.password
    }),
  })

  if (!res.ok) {
    throw new Error('Invalid credentials')
  }

  return res.json()
}
