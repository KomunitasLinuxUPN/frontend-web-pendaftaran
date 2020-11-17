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

import setAuthMiddleware from '@/middleware/auth/set-auth'
import requireAuthMiddleware from '@/middleware/auth/require-auth'
import fetchMembersMiddleware from '@/middleware/members/fetch-members'

export default defineComponent({
  middleware: [
    setAuthMiddleware,
    requireAuthMiddleware,
    fetchMembersMiddleware,
  ],
})
</script>
