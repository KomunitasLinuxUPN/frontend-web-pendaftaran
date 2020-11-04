import { GetterTree, ActionTree, MutationTree } from 'vuex'

import Person from '@/models/Person'
import { RootState } from './index'

/*
 * Namespace
 */
export const authStore = 'auth'

/*
 * State
 */
export const state = (): Person => ({
  id: process.env.ID!,
  name: process.env.NAME!,
  avatar: process.env.AVATAR!,
  role: process.env.ROLE!,
})

export type AuthState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {
  LOGGED_IN_USER: 'getCurrentLoggedInUser',
}

export const getters: GetterTree<AuthState, RootState> = {
  [GetterType.LOGGED_IN_USER](state) {
    return state
  },
}

/*
 * Mutations
 */
export const MutationType = {}

export const mutations: MutationTree<AuthState> = {}

/*
 * Actions
 */
export const ActionType = {}

export const actions: ActionTree<AuthState, RootState> = {}
