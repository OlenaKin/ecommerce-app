import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import envCompatible from 'vite-plugin-env-compatible' // 👈 ADD THIS

// https://vite.dev/config/
export default defineConfig({
  base: '/ecommerce-app/',
  plugins: [
    vue(),
    vueDevTools(),
    envCompatible({
      prefix: 'VUE_APP_', // 👈 Keeps your VUE_APP_ variables alive
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
        `,
      },
    },
  },
})
