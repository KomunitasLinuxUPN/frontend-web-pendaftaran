<template>
  <v-app>
    <homepage-nav-bar />
    <v-main class="grey lighten-4">
      <nuxt />
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import setAuthMiddleware from '@/middleware/auth/set-auth'

/*
 * Layout homepage hanya digunakan untuk menyusun tampilan
 * halaman register & halaman konfirmasi pendaftaran
 */
export default defineComponent({
  middleware: setAuthMiddleware,
})
</script>
