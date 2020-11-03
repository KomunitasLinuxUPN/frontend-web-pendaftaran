<template>
  <div class="projects">
    <h1 class="subtitle-1 grey--text">This is a projects page</h1>

    <v-container class="my-16">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in personProjects" :key="project.id">
          <v-expansion-panel-header>
            {{ project.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text>
                <p class="font-weight-bold">due by {{ project.due }}</p>
                <p>{{ project.content }}</p>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

import { Project } from '@/models/Project'
// import Person from '@/models/Person'
// import { authStore, GetterType as AuthGetterType } from '@/store/auth'
import {
  projectsStore,
  GetterType as ProjectsGetterType,
} from '@/store/projects'

export default defineComponent({
  head: {
    title: 'Projects',
  },
  setup() {
    const { store } = useContext()

    // const currentUser = store.getters[
    //   `${authStore}/${AuthGetterType.LOGGED_IN_USER}`
    // ] as Person

    const personProjects = store.getters[
      `${projectsStore}/${ProjectsGetterType.PROJECTS_BY_PERSON_ID}`
    ]('u1') as Project[]

    return {
      personProjects,
    }
  },
})
</script>
