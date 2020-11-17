<template>
  <v-card class="elevation-6">
    <v-data-table
      :headers="headers"
      :items="loadedMembers"
      :loading="fetchLoading"
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
            @click="refetchMembers"
          >
            REFRESH
          </v-btn>
        </v-toolbar>
      </template>

      <!-- Member Registration Status  -->
      <template #[`item.status`]="{ item }">
        <v-tooltip left :color="getColor(item.verification.isVerified)">
          <template #activator="{ on, attrs }">
            <v-chip
              small
              v-bind="attrs"
              :color="getColor(item.verification.isVerified)"
              dark
              v-on="on"
            >
              <v-icon small>
                {{
                  item.verification.isVerified
                    ? 'mdi-account-check'
                    : 'mdi-account-clock'
                }}
              </v-icon>
            </v-chip>
          </template>
          <span>
            {{
              item.verification.isVerified
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

import { Member } from '@/models/Member'
import {
  MEMBERS,
  GetterType as MembersGetterType,
  ActionType as MembersActionType,
} from '@/store/members'
import {
  useInfoDialog,
  DialogStatus,
} from '@/components/info/AppInfoDialog.vue'

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
      `${MEMBERS}/${MembersGetterType.REGISTERED_MEMBERS}`
    ] as Member[]

    const { dialogData: appDialogData } = useInfoDialog()

    const fetchLoading = ref(false)

    async function refetchMembers() {
      try {
        fetchLoading.value = true
        await store.dispatch(`${MEMBERS}/${MembersActionType.FETCH_MEMBERS}`)
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
      refetchMembers,
      appDialogData,
      getColor,
    }
  },
})
</script>
