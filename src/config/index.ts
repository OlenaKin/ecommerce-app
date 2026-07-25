export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://fakestoreapi.com',

  appName: import.meta.env.VITE_APP_NAME || 'ecommerce-app',

  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  enableMocks: import.meta.env.VITE_ENABLE_MOCKS === 'true',

  storageKeys: {
    cart: import.meta.env.VITE_CART_STORAGE_KEY || 'ecommerce_cart',
    wishlist: import.meta.env.VITE_WISHLIST_STORAGE_KEY || 'ecommerce_wishlist',
    auth: import.meta.env.VITE_AUTH_STORAGE_KEY || 'ecommerce_auth',
  },

  isDev: import.meta.env.MODE === 'development',
  isProd: import.meta.env.MODE === 'production',
  isStaging: import.meta.env.MODE === 'staging',

  version: import.meta.env.VITE_VERSION || '1.0.0',
} as const

if (config.enableDebug) {
  console.log('🔧 ecommerce-app Config:', config)
  console.log('🌍 Environment:', import.meta.env.MODE)
  console.log('📡 API URL:', config.apiUrl)
}
