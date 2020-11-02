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
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
