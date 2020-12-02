<template>
  <div id="members-registered">
    <v-container class="my-8">
      <dashboard-members-table :fetch-type="FetchType.PENDING" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/FetchType'

/*
 * Halaman Pendaftar Pending
 *
 * Halaman ini menampilkan tabel yang berisi data seluruh pendaftar yang
 * belum melakukan konfirmasi pendaftaran (tetapi sudah input data)
 */
export default defineComponent({
  layout: 'admin',
  setup() {
    return {
      FetchType,
    }
  },
  head: {
    title: 'Pendaftar Pending',
  },
})
</script>
