<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <v-container class="my-16">
      <v-card v-for="project in projects" :key="project.id" flat>
        <v-row no-gutters :class="`pa-6 project ${project.status}`">
          <v-col cols="12" md="6">
            <h1 class="caption grey--text">Project Title</h1>
            <p>{{ project.title }}</p>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <h1 class="caption grey--text">Person</h1>
            <p>{{ project.person }}</p>
          </v-col>
          <v-col cols="6" sm="4" md="2">
            <h1 class="caption grey--text">Due By</h1>
            <p>{{ project.due }}</p>
          </v-col>
          <v-col cols="2" sm="4" md="2">
            <h1 class="caption grey--text">Status</h1>
            <p>{{ project.status }}</p>
          </v-col>
        </v-row>
        <v-divider />
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { uuid } from 'vue-uuid'

interface Project {
  id: string
  title: string
  person: string
  due: string
  status: string
  content: string
}

export default defineComponent({
  head: {
    title: 'Dashboard',
  },
  setup() {
    const projects: Project[] = [
      {
        id: uuid.v4(),
        title: 'Design a new website',
        person: 'Amir Hakim',
        due: '1st Jan 2019',
        status: 'ongoing',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Code up the homepage',
        person: 'Doni Alfiando',
        due: '10th Jan 2019',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Design video thumbnails',
        person: 'Rafael',
        due: '20th Dec 2018',
        status: 'complete',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
      {
        id: uuid.v4(),
        title: 'Create a community forum',
        person: 'Uzumaki Bayu',
        due: '20th Oct 2018',
        status: 'overdue',
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!',
      },
    ]

    return {
      projects,
    }
  },
})
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}
</style>
