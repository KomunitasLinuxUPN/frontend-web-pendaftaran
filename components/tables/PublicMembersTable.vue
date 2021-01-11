<template>
  <v-card class="elevation-6">
    <v-data-table
      class="pa-2"
      :headers="headers"
      :items="loadedMembers"
      :loading="fetchLoading"
      no-data-text="Belum ada data"
      loading-text="Memuat data ..."
      hide-default-footer
      disable-pagination
      sort-by="id"
    >
      <!-- Table Header -->
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>Terdaftar</v-toolbar-title>
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-btn
            :loading="fetchLoading"
            color="primary"
            dark
            @click="fetchMembers"
          >
            REFRESH
          </v-btn>
        </v-toolbar>
      </template>

      <!-- Member Registration Status  -->
      <template #[`item.status`]="{ item }">
        <v-tooltip left :color="getColor(item.isVerified)">
          <template #activator="{ on, attrs }">
            <v-chip
              small
              v-bind="attrs"
              :color="getColor(item.isVerified)"
              dark
              v-on="on"
            >
              <v-icon small>
                {{
                  item.isVerified ? 'mdi-account-check' : 'mdi-account-clock'
                }}
              </v-icon>
            </v-chip>
          </template>
          <span>
            {{
              item.isVerified
                ? 'Pendaftaran Terkonfirmasi'
                : 'Menunggu Konfirmasi'
            }}
          </span>
        </v-tooltip>
      </template>
    </v-data-table>

    <app-info-dialog :dialog-data="appDialogData" />
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'

import { SimpleMember } from '@/models/Member'
import {
  MEMBERS,
  GetterType as MembersGetterType,
  ActionType as MembersActionType,
} from '@/store/members'
import {
  useInfoDialog,
  DialogStatus,
} from '@/components/info/AppInfoDialog.vue'

/*
 * Komponen PublicMembersTable
 *
 * Komponen ini digunakan untuk menampilkan data member kepada publik.
 * Adapun data member yang ditampilkan cukup simpel: nama, angkatan & jurusan.
 */
export default defineComponent({
  setup() {
    const headers = reactive<DataTableHeader[]>([
      {
        text: 'Nama',
        value: 'name',
      },
      {
        text: 'Angkatan',
        value: 'generation',
      },
      {
        text: 'Jurusan',
        value: 'department',
        align: 'center',
        sortable: false,
      },
      {
        text: 'Status',
        align: 'center',
        value: 'status',
        sortable: false,
      },
    ])

    const { store } = useContext()

    const loadedMembers = store.getters[
      `${MEMBERS}/${MembersGetterType.SIMPLE_REGISTERED_MEMBERS}`
    ] as SimpleMember[]

    const { dialogData: appDialogData } = useInfoDialog()
    const fetchLoading = ref(false)

    if (loadedMembers.length === 0) {
      fetchMembers()
    }

    async function fetchMembers() {
      try {
        fetchLoading.value = true
        await store.dispatch(
          `${MEMBERS}/${MembersActionType.FETCH_REGISTERED_MEMBERS_FOR_PUBLIC}`
        )
      } catch (err) {
        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.ERROR
        appDialogData.title = 'Terjadi Kesalahan!'
        appDialogData.message =
          err.message || 'Coba lagi nanti atau silahkan hubungi admin'
      } finally {
        fetchLoading.value = false
      }
    }

    function getColor(isVerified: boolean) {
      return isVerified ? 'green' : 'orange'
    }

    return {
      headers,
      loadedMembers,
      fetchLoading,
      fetchMembers,
      appDialogData,
      getColor,
    }
  },
})
</script>
