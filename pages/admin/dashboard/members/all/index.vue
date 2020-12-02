<template>
  <div id="members-all">
    <v-container class="my-8">
      <dashboard-members-table :fetch-type="FetchType.ALL" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/FetchType'

/*
 * Halaman Semua Pendaftar
 *
 * Halaman ini menampilkan tabel yang berisi data seluruh pendaftar
 * baik itu pendaftar yang belum melakukan konfirmasi pendaftaran
 * maupun yang sudah melakukan konfirmasi pendaftaran
 */
export default defineComponent({
  layout: 'admin',
  setup() {
    return {
      FetchType,
    }
  },
  head: {
    title: 'Semua Pendaftar',
  },
})
</script>
