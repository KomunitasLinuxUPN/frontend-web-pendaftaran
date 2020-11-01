<template>
  <v-app>
    <nav-bar />
    <v-main class="grey lighten-4 mx-4 mb-4">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import NavBar from '@/components/navigation/NavBar.vue'

export default defineComponent({
  components: {
    NavBar,
  },
})
</script>
