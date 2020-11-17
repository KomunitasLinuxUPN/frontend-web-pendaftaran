<template>
  <v-container class="public-members-registered" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <public-members-table :fetch-type="FetchType.REGISTERED" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/FetchType'
import fetchMembersMiddleware from '@/middleware/members/fetch-members'

export default defineComponent({
  layout: 'homepage',
  middleware: fetchMembersMiddleware,
  setup() {
    return {
      FetchType,
    }
  },
  head: {
    title: 'Member Terdaftar',
  },
})
</script>
