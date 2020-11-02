import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Context } from '@nuxt/types'

import Project from '@/models/Project'
import { projectsStore, ActionType as ProjectsActionType } from './projects'

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
  nuxtServerInit(vuexContext, _: Context) {
    vuexContext.commit(`${projectsStore}/${ProjectsActionType.SET_PROJECTS}`, [
      {
        id: 'p1',
        title: 'Design a new website',
        due: '1st Jan 2019',
        status: 'ongoing',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        person: {
          id: 'u1',
          name: 'Amir Hakim',
        },
      },
      {
        id: 'p2',
        title: 'Code up the homepage',
        due: '10th Jan 2019',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        person: {
          id: 'u3',
          name: 'Doni Alfiando',
        },
      },
      {
        id: 'p3',
        title: 'Design video thumbnails',
        due: '20th Dec 2018',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        person: {
          id: 'u2',
          name: 'Rafael',
        },
      },
      {
        id: 'p4',
        title: 'Create a community forum',
        due: '20th Oct 2018',
        status: 'overdue',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        person: {
          id: 'u4',
          name: 'Uzumaki Bayu',
        },
      },
      {
        id: 'p5',
        title: 'Design a Logo',
        due: '7st Feb 2019',
        status: 'ongoing',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
        person: {
          id: 'u1',
          name: 'Amir Hakim',
        },
      },
    ] as Project[])
  },
}
