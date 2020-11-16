import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import { AUTH, ActionType as AuthActionType } from '@/store/auth'
import { MEMBERS, ActionType as MembersActionType } from '@/store/members'
import { Admin } from '@/models/Admin'

export default defineNuxtMiddleware(async (context) => {
  await new Promise((resolve, reject) => {
    context.$fire.auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        context.store.dispatch(`${MEMBERS}/${MembersActionType.FETCH_MEMBERS}`)
        context.store.dispatch(`${AUTH}/${AuthActionType.SET_SESSION}`, {
          uid: user.uid,
          name: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        } as Admin)
      } else {
        context.redirect('/admin/login')
      }
      resolve()
    }, reject)
  })
})
