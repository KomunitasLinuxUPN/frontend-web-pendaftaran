import { GetterTree, ActionTree, MutationTree } from 'vuex'

// State --------------------------------------------

export const state = () => ({})

export type RootState = ReturnType<typeof state>

// Getters ------------------------------------------

export const getters: GetterTree<RootState, RootState> = {}

// Mutations ----------------------------------------

export const MutationType = {}

export const mutations: MutationTree<RootState> = {}

// Actions ------------------------------------------

export const ActionType = {}

export const actions: ActionTree<RootState, RootState> = {}
