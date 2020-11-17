import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import { MEMBERS, ActionType as MembersActionType } from '@/store/members'

export default defineNuxtMiddleware(async (context) => {
  try {
    await context.store.dispatch(
      `${MEMBERS}/${MembersActionType.FETCH_MEMBERS}`
    )
  } catch (err) {
    context.error(err.message || 'Terjadi kesalahan saat memuat data members')
  }
})
