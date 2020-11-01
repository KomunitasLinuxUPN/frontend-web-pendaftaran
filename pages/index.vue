<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <v-container class="my-16">
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-btn outlined block color="primary">1</v-btn>
        </v-col>
        <v-col cols="4" md="2">
          <v-btn outlined block color="primary">2</v-btn>
        </v-col>
        <v-col cols="4" md="2">
          <v-btn outlined block color="primary">3</v-btn>
        </v-col>
        <v-col cols="4" md="2">
          <v-btn outlined block color="primary">4</v-btn>
        </v-col>
      </v-row>

      <v-spacer class="mt-8" />

      <v-row no-gutters>
        <v-col cols="4" md="3">
          <v-btn outlined block color="error">1</v-btn>
        </v-col>
        <v-col cols="4" md="3">
          <v-btn outlined block color="error">2</v-btn>
        </v-col>
      </v-row>

      <v-spacer class="mt-8" />

      <v-row no-gutters justify="end">
        <v-col cols="4" md="3">
          <v-btn outlined block color="success">1</v-btn>
        </v-col>
        <v-col cols="4" md="3">
          <v-btn outlined block color="success">2</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head: {
    title: 'Dashboard',
  },
})
</script>
