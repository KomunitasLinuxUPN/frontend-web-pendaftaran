import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { Admin, AdminSignInInput } from '@/models/Admin'
import { RootState } from './index'

/*
 * Namespace
 */
export const AUTH = 'auth'

/*
 * State
 */
export const state = (): Admin => ({
  uid: null,
  name: null,
  email: null,
  photoURL: null,
})

export type AuthState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {
  ADMIN: 'admin',
}

export const getters: GetterTree<AuthState, RootState> = {
  [GetterType.ADMIN](state) {
    return state
  },
}

/*
 * Mutations
 */
export const MutationType = {
  SET_ADMIN: 'setAdmin',
  CLEAR_ADMIN: 'clearAdmin',
}

export const mutations: MutationTree<AuthState> = {
  [MutationType.SET_ADMIN](state, admin: Admin) {
    state.uid = admin.uid
    state.name = admin.name
    state.email = admin.email
    state.photoURL = admin.photoURL
  },
  [MutationType.CLEAR_ADMIN](state) {
    state.uid = null
    state.name = null
    state.email = null
    state.photoURL = null
  },
}

/*
 * Actions
 */
export const ActionType = {
  SIGN_IN: 'signIn',
  SIGN_OUT: 'signOut',
  SIGN_UP: 'signUp',
  SET_SESSION: 'setSession',
}

export const actions: ActionTree<AuthState, RootState> = {
  async [ActionType.SIGN_IN](_, AdminSignInInput: AdminSignInInput) {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        AdminSignInInput.email!,
        AdminSignInInput.password!
      )
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error(
            `Admin dengan email ${AdminSignInInput.email} tidak ditemukan!`
          )
        case 'auth/wrong-password':
          throw new Error('Password yang anda masukan salah!')
        default:
          throw error
      }
    }
  },
  async [ActionType.SIGN_OUT](context) {
    context.commit(MutationType.CLEAR_ADMIN)
    await this.$fire.auth.signOut()
  },
  [ActionType.SET_SESSION](context, admin: Admin) {
    context.commit(MutationType.SET_ADMIN, admin)
  },
}
