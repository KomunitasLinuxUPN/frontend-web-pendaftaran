import { GetterTree, ActionTree, MutationTree } from 'vuex'

import Project from '@/models/Project'
import { RootState } from './index'

/*
 * Namespace
 */
export const projectsStore = 'projects'

/*
 * State
 */
export const state = () => ({
  projects: [] as Project[],
})

export type ProjectsState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {
  PROJECTS: 'projects',
  PROJECTS_BY_PERSON_ID: 'projects_by_person_id',
}

export const getters: GetterTree<ProjectsState, RootState> = {
  [GetterType.PROJECTS](state) {
    return state.projects
  },
  [GetterType.PROJECTS_BY_PERSON_ID](state) {
    return (personId: string) => {
      return state.projects.filter((project) => project.person.id === personId)
    }
  },
}

/*
 * Mutations
 */
export const MutationType = {
  SET_PROJECTS: 'setProjects',
}

export const mutations: MutationTree<ProjectsState> = {
  [MutationType.SET_PROJECTS](state, projects: Project[]) {
    state.projects = projects
  },
}

/*
 * Actions
 */
export const ActionType = {
  SET_PROJECTS: 'setProjects',
}

export const actions: ActionTree<ProjectsState, RootState> = {
  [ActionType.SET_PROJECTS](vuexContext, projects: Project[]) {
    vuexContext.commit(MutationType.SET_PROJECTS, projects)
  },
}
