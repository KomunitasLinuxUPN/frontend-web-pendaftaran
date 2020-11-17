import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import {
  MEMBERS,
  ActionType as MembersActionType,
  GetterType as MembersGetterType,
} from '@/store/members'
import { SimpleMember } from '@/models/Member'

export default defineNuxtMiddleware(async (context) => {
  const loadedSimpleMembers = context.store.getters[
    `${MEMBERS}/${MembersGetterType.SIMPLE_REGISTERED_MEMBERS}`
  ] as SimpleMember[]

  if (loadedSimpleMembers.length > 0) {
    return
  }

  try {
    await context.store.dispatch(
      `${MEMBERS}/${MembersActionType.FETCH_REGISTERED_MEMBERS_FOR_PUBLIC}`
    )
  } catch (err) {
    context.error(err.message || 'Terjadi kesalahan saat memuat data members')
  }
})
