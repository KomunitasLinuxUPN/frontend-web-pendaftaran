<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <div class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'homepage',
  setup() {
    const { app } = useContext()
    app.router?.replace('/admin-dashboard/members/registered')
  },
})
</script>
