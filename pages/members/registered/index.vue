<template>
  <v-container class="public-members-registered" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <public-members-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import fetchPublicMembersMiddleware from '@/middleware/members/fetch-public-members'

export default defineComponent({
  layout: 'homepage',
  middleware: fetchPublicMembersMiddleware,
  head: {
    title: 'Member Terdaftar',
  },
})
</script>
