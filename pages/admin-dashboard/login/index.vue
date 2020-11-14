<template>
  <v-container id="admin-login" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-6" style="overflow: hidden">
          <sign-in-admin />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'homepage',
  head: {
    title: 'Login Admin',
  },
})
</script>
