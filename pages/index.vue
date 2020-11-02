<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <v-container class="my-16">
      <v-row class="mb-6" dense>
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              text
              color="grey"
              v-bind="attrs"
              v-on="on"
              @click="sortBy('title')"
            >
              <v-icon left small>mdi-folder</v-icon>
              <span class="caption text-lowercase">By Project Name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              text
              v-bind="attrs"
              color="grey"
              v-on="on"
              @click="sortBy('personName')"
            >
              <v-icon left small>mdi-account</v-icon>
              <span class="caption text-lowercase">By Person Name</span>
            </v-btn>
          </template>
          <span>Sort projects by persons</span>
        </v-tooltip>
      </v-row>

      <v-card v-for="project in projects" :key="project.id" flat>
        <v-row dense no-gutters :class="`pa-6 project ${project.status}`">
          <v-col cols="12" md="6">
            <h1 class="caption grey--text">Project Title</h1>
            <p>{{ project.title }}</p>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <h1 class="caption grey--text">Person</h1>
            <p>{{ project.person.name }}</p>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <h1 class="caption grey--text">Due By</h1>
            <p>{{ project.due }}</p>
          </v-col>
          <v-col cols="2" sm="4" md="2">
            <div class="text-right">
              <v-chip
                small
                :class="`white--text caption my-2 project ${project.status}`"
              >
                {{ project.status }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
        <v-divider />
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from '@nuxtjs/composition-api'

import Project from '@/models/Project'
import {
  projectsStore,
  GetterType as ProjectsGetterType,
} from '@/store/projects'

export default defineComponent({
  head: {
    title: 'Dashboard',
  },
  setup() {
    const { store } = useContext()

    let projects = reactive<Project[]>([
      ...store.getters[`${projectsStore}/${ProjectsGetterType.PROJECTS}`],
    ])

    function sortBy(projAttr: 'personName' | 'title') {
      projects = projects.sort((proj1, proj2) => {
        switch (projAttr) {
          case 'title':
            return proj1.title < proj2.title ? -1 : 1
          case 'personName':
            return proj1.person.name < proj2.person.name ? -1 : 1
        }
      })
    }

    return {
      projects,
      sortBy,
    }
  },
})
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #26de81;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.complete {
  background: #26de81;
}

.v-chip.overdue {
  background: #fc5c65;
}
</style>
