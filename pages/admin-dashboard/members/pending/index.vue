<template>
  <div id="members-registered">
    <v-container class="my-8">
      <members-table :fetch-type="FetchType.PENDING" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/FetchType'

export default defineComponent({
  layout: 'admin',
  setup() {
    return {
      FetchType,
    }
  },
})
</script>
