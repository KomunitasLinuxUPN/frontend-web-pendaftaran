import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import { AUTH, ActionType as AuthActionType } from '@/store/auth'
import { Admin } from '@/models/Admin'

export default defineNuxtMiddleware((context) => {
  return new Promise((resolve, reject) => {
    const unsubscribe = context.$fire.auth.onAuthStateChanged(
      (user) => {
        if (user?.uid) {
          context.store.dispatch(`${AUTH}/${AuthActionType.SET_SESSION}`, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          } as Admin)
        }
        resolve()
      },
      (err) => {
        unsubscribe()
        context.error(err)
        reject(err.message || 'Maaf, terjadi kesalahan di middleware')
      }
    )
  })
})
