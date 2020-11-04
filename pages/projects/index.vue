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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { authStore, GetterType as AuthGetterType } from '@/store/auth'
import { FirestoreProject, Project } from '@/models/Project'
import Person from '@/models/Person'

export default defineComponent({
  layout: 'admin',
  head: {
    title: 'Projects',
  },
  setup() {
    const personProjects = ref<Project[]>([])

    const { app, store } = useContext()

    const curUser = store.getters[
      `${authStore}/${AuthGetterType.LOGGED_IN_USER}`
    ] as Person

    const curPersonRef = app.$fire.firestore
      .collection('persons')
      .doc(curUser.id)

    app.$fire.firestore
      .collection('projects')
      .where('person', '==', curPersonRef)
      .onSnapshot(async (docSnapshots) => {
        const changes = docSnapshots.docChanges()

        const newProjects = await Promise.all(
          changes.map(async (change) => {
            const firestoreProject = change.doc.data() as FirestoreProject

            const personDocSnapshot = await firestoreProject.person.get()
            const personDoc = personDocSnapshot.data() as Person

            const project: Project = {
              id: change.doc.id,
              ...firestoreProject,
              person: {
                id: personDocSnapshot.id,
                name: personDoc.name,
              },
            }

            switch (change.type) {
              case 'added':
              case 'modified':
              case 'removed':
                return project
            }
          })
        )

        personProjects.value.push(...newProjects)
      })

    return {
      personProjects,
    }
  },
})
</script>
