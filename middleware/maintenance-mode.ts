import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

/*
 * Maintenance Mode Middleware | HTTP 503
 *
 * Middleware ini hanya digunakan ketika aplikasi ini sudah dideploy tapi butuh
 * maintenance sementara.
 *
 * Untuk menggunakan middleware ini, silahkan pasang middleware ini
 * sebagai global middleware di nuxt.config.ts, disana saya sudah sediakan
 * kodenya, silahkan uncomment saja 😉
 */
export const name = 'maintenance-mode'

export default defineNuxtMiddleware((context) => {
  context.error({
    statusCode: 503,
    message: 'Under maintenance',
  })
})
