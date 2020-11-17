import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import { AUTH, GetterType as AuthGetterType } from '@/store/auth'
import { Admin } from '@/models/Admin'

export default defineNuxtMiddleware((context) => {
  const curUser = context.store.getters[
    `${AUTH}/${AuthGetterType.ADMIN}`
  ] as Admin

  if (!curUser.uid) {
    context.redirect('/admin/login')
  }
})
