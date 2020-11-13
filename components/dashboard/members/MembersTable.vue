<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="loadedMembers"
      :loading="fetchLoading"
      hide-default-footer
      disable-pagination
      sort-by="id"
    >
      <!-- Table Header -->
      <template v-slot:top>
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

      <!-- Photo Column -->
      <template v-slot:[`item.photoURL`]="{ item, on, attrs }">
        <v-btn icon x-large v-on="on">
          <v-avatar
            size="36"
            class="info"
            v-bind="attrs"
            @click="openPhotoDialog(item.photoURL)"
            v-on="on"
          >
            <v-img :src="item.photoURL" />
          </v-avatar>
        </v-btn>
      </template>

      <!-- Member Registration Status  -->
      <template v-slot:[`item.status`]="{ item }">
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

      <!-- Actions Column -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top color="info">
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              :loading="actionLoading"
              color="primary"
              v-bind="attrs"
              text
              @click="resendEmail(item)"
              v-on="on"
            >
              <v-icon small>mdi-email-send</v-icon>
            </v-btn>
          </template>
          <span>Kirim ulang email konfirmasi</span>
        </v-tooltip>

        <v-tooltip top color="info">
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              :loading="actionLoading"
              color="error"
              v-bind="attrs"
              text
              @click="deleteMember(item)"
              v-on="on"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Hapus member</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <!-- View Photo Dialog -->
    <v-dialog v-model="dialogPhotoToggle" max-width="500px">
      <v-card>
        <v-card-title dark class="primary headline white--text justify-center">
          Lihat Foto
        </v-card-title>

        <v-card-text class="mt-7">
          <v-row justify="center">
            <v-img
              :src="openedPhotoURL"
              lazy-src="https://picsum.photos/id/11/100/60"
              max-width="400"
              max-height="500"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closePhotoDialog">TUTUP</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Member Dialog -->
    <v-dialog v-model="deleteDialogToggle" max-width="500px">
      <v-card>
        <v-card-title class="error headline white--text">
          Konfirmasi Penghapusan
        </v-card-title>
        <v-card-title class="subtitle-1 justify-center">
          Apakah anda yakin ingin menghapus member ini?
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="closeDeleteDialog">BATAL</v-btn>
          <v-btn color="primary" text @click="deleteMemberConfirm">IYA</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <app-info-dialog :dialog-data="appDialogData" />
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { DataTableHeader } from 'vuetify'

import { Member } from '@/models/NewMember'
import {
  MEMBERS,
  GetterType as MembersGetterType,
  ActionType as MembersActionType,
} from '@/store/members'
import { Fetch } from '@/constants/FetchType'
import { useInfoDialog, DialogStatus } from '@/components/ui/AppInfoDialog.vue'

export default defineComponent({
  props: {
    fetchType: {
      type: String as PropType<Fetch>,
      required: true,
    },
  },
  setup(props) {
    const headers = reactive<DataTableHeader[]>([
      {
        text: 'Foto',
        align: 'center',
        sortable: false,
        value: 'photoURL',
      },
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
        text: 'No. HP',
        value: 'phone',
        align: 'center',
        sortable: false,
      },
      {
        text: 'ID Line',
        align: 'center',
        value: 'lineID',
        sortable: false,
      },
      {
        text: 'Status',
        align: 'center',
        value: 'status',
        sortable: false,
      },
      {
        text: 'Actions',
        value: 'actions',
        align: 'center',
        sortable: false,
      },
    ])

    const { store } = useContext()

    let loadedMembers: Member[]

    if (props.fetchType === Fetch.REGISTERED) {
      loadedMembers = store.getters[
        `${MEMBERS}/${MembersGetterType.REGISTERED_MEMBERS}`
      ] as Member[]
    } else if (props.fetchType === Fetch.PENDING) {
      loadedMembers = store.getters[
        `${MEMBERS}/${MembersGetterType.PENDING_MEMBERS}`
      ] as Member[]
    } else {
      loadedMembers = store.getters[
        `${MEMBERS}/${MembersGetterType.MEMBERS}`
      ] as Member[]
    }

    const fetchLoading = ref(false)
    const { dialogData: appDialogData } = useInfoDialog()

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

    const actionLoading = ref(false)

    function resendEmail(member: Member) {
      actionLoading.value = true
      setTimeout(() => {
        console.log(member)
        actionLoading.value = false
      }, 2000)
    }

    const dialogPhotoToggle = ref(false)

    watch(dialogPhotoToggle, (val) => {
      val || closePhotoDialog()
    })

    const openedPhotoURL = ref<string | null>(null)

    function openPhotoDialog(photoURL: string) {
      dialogPhotoToggle.value = true
      openedPhotoURL.value = photoURL
    }

    function closePhotoDialog() {
      dialogPhotoToggle.value = false
      openedPhotoURL.value = null
    }

    const deleteDialogToggle = ref(false)

    watch(deleteDialogToggle, (val) => {
      val || closeDeleteDialog()
    })

    function deleteMember(item: Member) {
      // editedIndex.value = loadedMembers.value.indexOf(item)
      // editedItem = Object.assign({}, item)
      // deleteDialogToggle.value = true
    }

    function deleteMemberConfirm() {
      // loadedMembers.value.splice(editedIndex.value, 1)
      // closeDelete.value()
    }

    function closeDeleteDialog() {
      // deleteDialogToggle.value = false
      // $nextTick.value(() => {
      //   editedItem = Object.assign({}, defaultItem.value)
      //   editedIndex.value = -1
      // })
    }

    return {
      headers,
      loadedMembers,
      fetchLoading,
      refetchMembers,
      appDialogData,
      getColor,
      dialogPhotoToggle,
      openedPhotoURL,
      openPhotoDialog,
      closePhotoDialog,
      actionLoading,
      resendEmail,
      deleteDialogToggle,
      deleteMember,
      deleteMemberConfirm,
      closeDeleteDialog,
    }
  },
})
</script>
