<template>
  <v-app>
    <registration-nav-bar />
    <v-main class="grey lighten-4">
      <nuxt />
    </v-main>
    <registration-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import RegistrationNavBar from '@/components/navigation/RegistrationNavBar.vue'
import RegistrationFooter from '@/components/footers/RegistrationFooter.vue'

export default defineComponent({
  components: {
    RegistrationNavBar,
    RegistrationFooter,
  },
})
</script>
