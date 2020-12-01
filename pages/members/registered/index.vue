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

/*
 * Halaman Lihat Member Teregister (Publik)
 *
 * Halaman ini menampilkan member yang telah teregister kepada publik. Adapun
 * data yang ditampilkan hanya sekedar nama, angkatan dan jurusan.
 */
export default defineComponent({
  layout: 'homepage',
  head: {
    title: 'Member Terdaftar',
  },
})
</script>
