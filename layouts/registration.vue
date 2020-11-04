<template>
  <v-app>
    <registration-nav-bar />
    <v-main class="grey lighten-4">
      <nuxt class="mx-4 mb-4" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import RegistrationNavBar from '@/components/navigation/RegistrationNavBar.vue'

export default defineComponent({
  components: {
    RegistrationNavBar,
  },
})
</script>
