import { defineNuxtMiddleware } from '@nuxtjs/composition-api'

import {
  MEMBERS,
  ActionType as MembersActionType,
  GetterType as MembersGetterType,
} from '@/store/members'
import { Member } from '@/typings/Member'

/*
 * Fetch Members Middleware
 *
 * Middleware ini digunakan untuk fetch members, dengan tujuan untuk menyiapkan
 * data members ketika aplikasi hendak merender layout admin
 */
export default defineNuxtMiddleware(async (context) => {
  const loadedMembers = context.store.getters[
    `${MEMBERS}/${MembersGetterType.MEMBERS}`
  ] as Member[]

  if (loadedMembers.length > 0) {
    return
  }

  try {
    await context.store.dispatch(
      `${MEMBERS}/${MembersActionType.FETCH_MEMBERS_FOR_ADMIN}`
    )
  } catch (err) {
    context.error(err.message || 'Terjadi kesalahan saat memuat data members')
  }
})
