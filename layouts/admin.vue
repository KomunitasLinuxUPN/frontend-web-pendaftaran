<template>
  <v-app>
    <admin-nav-bar />
    <v-main class="grey lighten-4">
      <nuxt class="mx-4 mb-4" />
      <the-footer />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import authMiddleware from '@/middleware/auth'

export default defineComponent({
  middleware: authMiddleware,
})
</script>
