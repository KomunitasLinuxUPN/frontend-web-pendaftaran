import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { RootState } from './index'

/*
 * Namespace
 */
export const AUTH = 'auth'

/*
 * State
 */
export const state = () => ({})

export type AuthState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {}

export const getters: GetterTree<AuthState, RootState> = {}

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
