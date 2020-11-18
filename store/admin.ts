import { GetterTree, ActionTree, MutationTree } from 'vuex'

import { RootState } from './index'

/*
 * Namespace
 */
export const ADMIN = 'admin'

/*
 * State
 */
export const state = () => ({})

export type AdminState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {}

export const getters: GetterTree<AdminState, RootState> = {}

/*
 * Mutations
 */
export const MutationType = {}

export const mutations: MutationTree<AdminState> = {}

/*
 * Actions
 */
export const ActionType = {}

export const actions: ActionTree<AdminState, RootState> = {}
