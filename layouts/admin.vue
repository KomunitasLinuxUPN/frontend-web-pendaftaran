<template>
  <v-app>
    <admin-nav-bar />
    <v-main class="grey lighten-4">
      <nuxt class="mx-4 mb-4" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import AdminNavBar from '@/components/navigation/AdminNavBar.vue'

export default defineComponent({
  components: {
    AdminNavBar,
  },
})
</script>
