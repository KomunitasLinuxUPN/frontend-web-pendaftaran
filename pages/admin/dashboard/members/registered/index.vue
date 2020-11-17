<template>
  <div id="members-registered">
    <v-container class="my-8">
      <dashboard-members-table />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'admin',
  head: {
    title: 'Pendaftar Terkonfirmasi',
  },
})
</script>
