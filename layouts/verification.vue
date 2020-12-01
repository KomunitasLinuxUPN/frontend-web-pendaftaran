<template>
  <v-app>
    <homepage-nav-bar />
    <v-main class="grey lighten-4">
      <client-only>
        <nuxt />
      </client-only>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import setAuthMiddleware from '@/middleware/auth/set-auth'

export default defineComponent({
  middleware: setAuthMiddleware,
})
</script>
