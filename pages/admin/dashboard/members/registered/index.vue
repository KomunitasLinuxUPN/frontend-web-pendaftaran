<template>
  <div id="members-registered">
    <v-container class="my-8">
      <dashboard-members-table :fetch-type="FetchType.REGISTERED" />
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { FetchType } from '@/constants/fetch-type'

/*
 * Halaman Pendaftar Terkonfirmasi
 *
 * Halaman ini menampilkan tabel yang berisi data seluruh pendaftar yang
 * pendaftarannya telah terkonfirmasi
 */
export default defineComponent({
  layout: 'admin',
  setup() {
    return {
      FetchType,
    }
  },
  head: {
    title: 'Pendaftar Terkonfirmasi',
  },
})
</script>
