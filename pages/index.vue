<template>
  <v-container class="registration fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <register-member-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { RegStatus } from '@/constants/app-status'

/*
 * Halaman Utama
 *
 * By default, halaman utama hanya menampilkan formulir register member baru
 */
export default defineComponent({
  layout: 'homepage',
  middleware: (context) => {
    if (process.env.regStatus === RegStatus.CLOSED) {
      context.redirect('/members/registered')
    }
  },
  head: {
    title: 'Daftar Member Baru',
  },
})
</script>
