import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import { AUTH, GetterType as AuthGetterType } from '@/store/auth'
import { Admin } from '@/models/Admin'

/*
 * Require Auth Middleware
 *
 * Middleware ini digunakan untuk mengecek apakah pengguna memiliki session
 * sebagai admin ketika hendak mengakses layout admin. Jika pengguna tidak
 * memiliki session admin, maka pengguna akan di-redirect ke halaman login
 *
 * Session admin (yang tersimpan di store auth) bakal terisi / tidak terisi
 * setelah middelware set-auth.ts dipanggil terlebih dahulu
 */
export default defineNuxtMiddleware((context) => {
  const curUser = context.store.getters[
    `${AUTH}/${AuthGetterType.ADMIN}`
  ] as Admin

  if (!curUser.uid) {
    context.redirect('/admin/login')
  }
})
