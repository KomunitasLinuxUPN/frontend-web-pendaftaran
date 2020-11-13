import { Context } from '@nuxt/types'
import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { MEMBERS, ActionType as MembersActionType } from './members'

// import { auth, GetterType } from './auth'

/*
 * State
 */
export const state = () => ({})

export type RootState = ReturnType<typeof state>

/*
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {}

/*
 * Mutations
 */
export const MutationType = {}

export const mutations: MutationTree<RootState> = {}

/*
 * Actions
 */
export const ActionType = {}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit(vuexContext, nuxtContext: Context) {
    try {
      await vuexContext.dispatch(
        `${MEMBERS}/${MembersActionType.FETCH_MEMBERS}`
      )
    } catch (err) {
      nuxtContext.error(err)
    }
  },
}
