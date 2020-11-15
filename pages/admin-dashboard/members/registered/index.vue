<template>
  <div id="members-registered">
    <v-container class="my-8">
      <dashboard-members-table :fetch-type="FetchType.REGISTERED" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/FetchType'

export default defineComponent({
  layout: 'admin',
  head: {
    title: 'Pendaftar Terkonfirmasi',
  },
  setup() {
    return {
      FetchType,
    }
  },
})
</script>
