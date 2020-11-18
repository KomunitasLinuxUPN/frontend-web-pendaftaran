import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

export const name = 'maintenance-mode'

export default defineNuxtMiddleware((context) => {
  context.error({
    statusCode: 503,
    message: 'Under maintenance',
  })
})
