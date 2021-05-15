import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { Admin, AdminSignInInput } from '@/typings/Admin'
import { RootState } from './index'

// Namespace ----------------------------------------

export const AUTH = 'auth'

// State --------------------------------------------

/*
 * Auth State; merupakan data session admin yang disimpan di dalam store auth
 * Data session didapatkan dari IndexedDB yang dibuat oleh Firebase Auth
 */
export const state = (): Admin => ({
  uid: null,
  name: null,
  email: null,
  photoURL: null,
})

export type AuthState = ReturnType<typeof state>

// Getters ------------------------------------------

export const GetterType = {
  ADMIN: 'admin',
}

export const getters: GetterTree<AuthState, RootState> = {
  [GetterType.ADMIN](state) {
    return state
  },
}

// Mutations ----------------------------------------

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

// Actions ------------------------------------------

export const ActionType = {
  SIGN_IN: 'signIn',
  SIGN_OUT: 'signOut',
  SIGN_UP: 'signUp',
  SET_SESSION: 'setSession',
}

export const actions: ActionTree<AuthState, RootState> = {
  /*
   * Action SIGN_IN; untuk melakukan login admin
   *
   * Karena disini kita menggunakan Firebase Auth dengan memanggil fungsi
   * .signInWithEmailAndPassword() maka firebase akan menyimpan data session
   * di indexedDB. Data tersebut nantinya kita ambil melalui middleware set-auth
   * untuk kemudian disimpan ke dalam state auth (vuex)
   */
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

  /*
   * Action SIGN_OUT; untuk melakukan logout admin
   *
   * Fungsi ini akan menghapus data session yang disimpan di state auth,
   * beserta data session yang disimpan di IndexedDB
   */
  async [ActionType.SIGN_OUT](context) {
    await this.$fire.auth.signOut()
    context.commit(MutationType.CLEAR_ADMIN)
  },

  /*
   * Action SET_SESSION; untuk set session admin ke dalam state auth
   */
  [ActionType.SET_SESSION](context, admin: Admin) {
    context.commit(MutationType.SET_ADMIN, admin)
  },
}
