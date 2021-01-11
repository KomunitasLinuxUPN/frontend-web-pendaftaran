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
            @click="fetchMembersFromFirestore"
          >
            REFRESH
          </v-btn>
        </v-toolbar>
      </template>

      <!-- Photo Column -->
      <template #[`item.photoURL`]="{ item, on, attrs }">
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

      <!-- Actions Column -->
      <template #[`item.actions`]="{ item }">
        <v-tooltip
          v-if="!item.verification.isVerified && item.verification.token !== ''"
          top
          color="info"
        >
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
            <v-card tile outlined>
              <v-img
                contain
                :src="openedPhotoURL"
                lazy-src="https://picsum.photos/id/11/100/60"
                max-width="400"
                max-height="500"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-row>
        </v-card-text>

        <v-card-actions class="pb-4">
          <v-spacer />
          <v-btn color="accent" @click="closePhotoDialog">TUTUP</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Resend Email Member Dialog -->
    <v-dialog v-model="resendEmailDialogToggle" max-width="500px">
      <v-card>
        <v-card-title class="primary headline white--text">
          Konfirmasi Pengiriman Email
        </v-card-title>
        <v-card-title class="subtitle-1 justify-center">
          Apakah anda yakin ingin mengirim ulang email konfirmasi kepada member
          ini?
        </v-card-title>
        <v-card-actions class="pb-4">
          <v-spacer />
          <v-btn color="primary" text @click="closeResendEmailDialog">
            BATAL
          </v-btn>
          <v-btn color="primary" elevation="0" @click="resendEmailConfirm">
            IYA
          </v-btn>
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
        <v-card-actions class="pb-4">
          <v-spacer />
          <v-btn color="primary" text @click="closeDeleteDialog">BATAL</v-btn>
          <v-btn color="primary" elevation="0" @click="deleteMemberConfirm">
            IYA
          </v-btn>
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

import { Member } from '@/models/Member'
import {
  MEMBERS,
  GetterType as MembersGetterType,
  ActionType as MembersActionType,
} from '@/store/members'
import { Fetch } from '@/constants/fetch-type'
import {
  useInfoDialog,
  DialogStatus,
} from '@/components/info/AppInfoDialog.vue'

/*
 * Komponen DashboardMembersTable
 *
 * Komponen ini digunakan untuk menampilkan data member berdasarkan FetchType.
 * Komponen ini menerima props FetchType untuk menentukan data mana yang akan
 * ditampilkan.
 */
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
        text: 'Email',
        value: 'email',
        align: 'center',
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

    // Fetch Members --------------------------------------

    const loadedMembers = ref(getMembersFromStore())

    function getMembersFromStore() {
      switch (props.fetchType) {
        case Fetch.REGISTERED:
          return store.getters[
            `${MEMBERS}/${MembersGetterType.REGISTERED_MEMBERS}`
          ] as Member[]
        case Fetch.PENDING:
          return store.getters[
            `${MEMBERS}/${MembersGetterType.PENDING_MEMBERS}`
          ] as Member[]
        case Fetch.ALL:
          return store.getters[
            `${MEMBERS}/${MembersGetterType.MEMBERS}`
          ] as Member[]
        default:
          throw new Error('Unknown fetch type!')
      }
    }

    const { dialogData: appDialogData } = useInfoDialog()

    const fetchLoading = ref(false)

    async function fetchMembersFromFirestore() {
      try {
        fetchLoading.value = true
        await store.dispatch(
          `${MEMBERS}/${MembersActionType.FETCH_MEMBERS_FOR_ADMIN}`
        )
        loadedMembers.value = getMembersFromStore()
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

    // Resend Email ---------------------------------------

    const actionLoading = ref(false)

    const resendEmailDialogToggle = ref(false)
    const destMember = ref<Member | null>(null)

    watch(resendEmailDialogToggle, (val) => {
      val || closeResendEmailDialog()
    })

    function resendEmail(member: Member) {
      destMember.value = Object.assign<any, Member>({}, member)
      resendEmailDialogToggle.value = true
    }

    async function resendEmailConfirm() {
      try {
        closeResendEmailDialog()
        actionLoading.value = true

        await store.dispatch(
          `${MEMBERS}/${MembersActionType.RESEND_EMAIL_CONFIRMATION}`,
          Object.assign<any, Member>({}, destMember.value!)
        )

        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.SUCCESS
        appDialogData.title = 'Berhasil!'
        appDialogData.message = `Email konfirmasi pendaftaran berhasil dikirim ulang ke ${
          destMember.value!.email
        }. Harap beritahu member untuk melakukan konfirmasi`
      } catch (err) {
        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.ERROR
        appDialogData.title = 'Terjadi Kesalahan!'
        appDialogData.message =
          err.message || 'Coba lagi nanti atau silahkan hubungi admin'
      } finally {
        actionLoading.value = false
        destMember.value = null
      }
    }

    function closeResendEmailDialog() {
      resendEmailDialogToggle.value = false
    }

    // View Photo Dialog ----------------------------------

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

    // Delete Member ---------------------------------------

    const deleteDialogToggle = ref(false)
    const deletedMember = ref<Member | null>(null)

    watch(deleteDialogToggle, (val) => {
      val || closeDeleteDialog()
    })

    function deleteMember(member: Member) {
      deletedMember.value = Object.assign<any, Member>({}, member)
      deleteDialogToggle.value = true
    }

    async function deleteMemberConfirm() {
      try {
        closeDeleteDialog()
        actionLoading.value = true

        await store.dispatch(
          `${MEMBERS}/${MembersActionType.DELETE_MEMBER}`,
          deletedMember.value
        )
        loadedMembers.value = getMembersFromStore()

        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.SUCCESS
        appDialogData.title = 'Penghapusan Berhasil!'
        appDialogData.message = `Member ${
          deletedMember.value!.name
        } berhasil dihapus`
      } catch (err) {
        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.ERROR
        appDialogData.title = 'Terjadi Kesalahan!'
        appDialogData.message =
          err.message || 'Coba lagi nanti atau silahkan hubungi admin'
      } finally {
        actionLoading.value = false
        deletedMember.value = null
      }
    }

    function closeDeleteDialog() {
      deleteDialogToggle.value = false
    }

    return {
      headers,
      loadedMembers,
      fetchLoading,
      fetchMembersFromFirestore,
      appDialogData,
      getColor,
      dialogPhotoToggle,
      openedPhotoURL,
      openPhotoDialog,
      closePhotoDialog,
      actionLoading,
      resendEmailDialogToggle,
      resendEmail,
      resendEmailConfirm,
      closeResendEmailDialog,
      deleteDialogToggle,
      deleteMember,
      deleteMemberConfirm,
      closeDeleteDialog,
    }
  },
})
</script>
