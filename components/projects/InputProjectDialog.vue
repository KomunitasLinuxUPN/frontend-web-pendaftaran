<template>
  <v-dialog max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn text class="accent mb-4" v-bind="attrs" v-on="on">
        Add New Project
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="inputProject.title"
            label="Title"
            prepend-icon="mdi-folder"
          />
          <v-textarea
            v-model="inputProject.content"
            label="Content"
            prepend-icon="mdi-pencil"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text class="accent ma-4" @click="submit">Add Project</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { InputProject } from '@/models/Project'

export default defineComponent({
  setup() {
    const inputProject: InputProject = {
      title: '',
      content: '',
    }

    function submit() {
      console.log(inputProject)
    }

    return {
      inputProject,
      submit,
    }
  },
})
</script>
