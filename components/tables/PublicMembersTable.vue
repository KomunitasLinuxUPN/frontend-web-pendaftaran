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
import { Fetch } from '@/constants/FetchType'
import {
  useInfoDialog,
  DialogStatus,
} from '@/components/info/AppInfoDialog.vue'

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

    const actionLoading = ref(false)

    async function resendEmail(member: Member) {
      try {
        actionLoading.value = true

        await store.dispatch(
          `${MEMBERS}/${MembersActionType.RESEND_EMAIL_CONFIRMATION}`,
          Object.assign<any, Member>({}, member)
        )

        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.SUCCESS
        appDialogData.title = 'Berhasil!'
        appDialogData.message = `Email konfirmasi pendaftaran berhasil dikirim ulang ke ${member.email}. Harap beritahu member untuk melakukan konfirmasi`
      } catch (err) {
        appDialogData.dialogIsOpen = true
        appDialogData.dialogStatus = DialogStatus.ERROR
        appDialogData.title = 'Terjadi Kesalahan!'
        appDialogData.message =
          err.message || 'Coba lagi nanti atau silahkan hubungi admin'
      } finally {
        actionLoading.value = false
      }
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
        actionLoading.value = true

        await store.dispatch(
          `${MEMBERS}/${MembersActionType.DELETE_MEMBER}`,
          deletedMember.value
        )

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
        closeDeleteDialog()
      }
    }

    function closeDeleteDialog() {
      deletedMember.value = null
      deleteDialogToggle.value = false
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
