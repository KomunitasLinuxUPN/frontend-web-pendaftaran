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
            <p>{{ project.personName }}</p>
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
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'

interface Project {
  [x: string]: string
  id: string
  title: string
  personName: string
  due: string
  status: string
  content: string
}

export default defineComponent({
  head: {
    title: 'Dashboard',
  },
  setup() {
    const projects = reactive<Project[]>([
      {
        id: uuid.v4(),
        title: 'Design a new website',
        personName: 'Amir Hakim',
        due: '1st Jan 2019',
        status: 'ongoing',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Code up the homepage',
        personName: 'Doni Alfiando',
        due: '10th Jan 2019',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Design video thumbnails',
        personName: 'Rafael',
        due: '20th Dec 2018',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Create a community forum',
        personName: 'Uzumaki Bayu',
        due: '20th Oct 2018',
        status: 'overdue',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
    ])

    function sortBy(projAttr: 'personName' | 'title') {
      projects.sort((proj1, proj2) => {
        return proj1[projAttr] < proj2[projAttr] ? -1 : 1
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
