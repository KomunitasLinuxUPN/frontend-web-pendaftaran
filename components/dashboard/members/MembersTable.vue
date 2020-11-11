<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="loadedMembers"
      :search="searchText"
      :options.sync="fetchOptions"
      :server-items-length="totalLoadedMembers"
      :loading="fetchLoading"
      sort-by="id"
      class="elevation-1"
    >
      <!-- Table Header -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Terdaftar</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer />
          <v-spacer />
          <v-spacer />

          <v-text-field
            v-model="searchText"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          />
        </v-toolbar>
      </template>

      <!-- Photo Column -->
      <template v-slot:[`item.photoURL`]="{ item }">
        <v-avatar size="36" class="info">
          <v-img :src="item.photoURL" />
        </v-avatar>
      </template>

      <!-- Member Registration Status  -->
      <template v-slot:[`item.status`]="{ item }">
        <v-tooltip left :color="getColor(item.verification.isVerified)">
          <template #activator="{ on, attrs }">
            <v-chip
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
          <span>{{
            item.verification.isVerified
              ? 'Pendaftaran Terkonfirmasi'
              : 'Menunggu Konfirmasi'
          }}</span>
        </v-tooltip>
      </template>

      <!-- Edit Member Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <member-form />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete Member Dialog -->
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Actions Column -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small color="primary" class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>

      <!-- Re-fetch Button -->
      <template v-slot:no-data>
        <v-btn text color="primary" class="my-5" @click="getDataFromFirestore">
          RELOAD
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from '@nuxtjs/composition-api'
import { DataOptions, DataTableHeader } from 'vuetify'

import { Member, MemberInput } from '@/models/NewMember'

export default defineComponent({
  props: {
    fetchType: {
      type: Number,
      required: true,
    },
  },
  setup(_) {
    const searchText = ref('')
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
        sortable: false,
      },
    ])

    const fetchLoading = ref(false)
    const fetchOptions = ref<DataOptions | null>(null)
    const loadedMembers = ref<Member[]>([])
    const totalLoadedMembers = ref(0)

    watch(fetchOptions, () => {
      getDataFromFirestore()
    })

    async function getDataFromFirestore() {
      fetchLoading.value = true
      const loadedData = await fakeApiCall()
      loadedMembers.value = loadedData.members
      totalLoadedMembers.value = loadedData.totalMembers
      fetchLoading.value = false
    }

    function fakeApiCall() {
      return new Promise<{ members: Member[]; totalMembers: number }>(
        (resolve) => {
          const { sortBy, sortDesc, page, itemsPerPage } = fetchOptions.value!

          let members = getMembers()
          const totalMembers = members.length

          if (sortBy?.length === 1 && sortDesc?.length === 1) {
            members = members.sort((a, b) => {
              const sortA = a[sortBy[0]]
              const sortB = b[sortBy[0]]

              if (sortDesc[0]) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (itemsPerPage > 0) {
            members = members.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )
          }

          setTimeout(() => {
            resolve({
              members,
              totalMembers,
            })
          }, 1000)
        }
      )
    }

    function getMembers(): Member[] {
      return [
        {
          id: 'nqnduibwcdjwiudniuednuqi',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: 'HXlWGpNC2wr4DznKgcnY',
          name: 'Amir Hakim',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: false,
            token: 'ncubwobcyidbcsuchohbhcouibasuchs',
          },
        },
        {
          id: 'asdqcdcdwceewedw',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: 'acdscvdfbgbgfververververv',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: 'csdcsceqwqwdq3432423rewrwere',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: '234r2fgfsdffwer231r13',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: 'fwefwer24513431refwdfferferff',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
        {
          id: '3r3efewfweew532re2wrwerwerwe',
          name: 'Ahmad Syarifuddin',
          address: 'Kamaku',
          generation: 2017,
          department: 'Informatika',
          email: 'amir.rhythm@gmail.com',
          phone: '087855777360',
          lineID: 'mramirid',
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/pendaftaran-kolu-5da54.appspot.com/o/photos%2Famir.mramirid%40gmail.com?alt=media&token=c7513c2b-3fa4-46dd-97c6-193cb8918c3a',
          verification: {
            isVerified: true,
            token: '',
          },
        },
      ]
    }

    const editedIndex = ref(-1)
    const editedItem = reactive<MemberInput>({
      name: null,
      address: null,
      generation: null,
      department: null,
      email: null,
      phone: null,
      lineID: null,
      photo: null,
    })

    function editItem(item: Member) {
      editedIndex.value = loadedMembers.value.indexOf(item)
      editedItem = Object.assign({}, item)
      dialog.value = true
    }

    function deleteItem(item: Member) {
      editedIndex.value = loadedMembers.value.indexOf(item)
      editedItem = Object.assign({}, item)
      dialogDelete.value = true
    }

    function deleteItemConfirm() {
      loadedMembers.value.splice(editedIndex.value, 1)
      closeDelete.value()
    }

    function close() {
      dialog.value = false
      root.$nextTick.value(() => {
        editedItem = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
      })
    }

    function closeDelete() {
      dialogDelete.value = false
      $nextTick.value(() => {
        editedItem = Object.assign({}, defaultItem.value)
        editedIndex.value = -1
      })
    }

    function save() {
      if (editedIndex.value > -1) {
        Object.assign(loadedMembers.value[editedIndex.value], editedItem)
      } else {
        loadedMembers.value.push(editedItem)
      }
      close()
    }

    const dialog = ref(false)
    const dialogDelete = ref(false)

    watch(dialog, (val) => {
      val || close()
    })

    watch(dialogDelete, (val) => {
      val || closeDelete()
    })

    const formTitle = computed(() => {
      return editedIndex.value === -1 ? 'Add New Member' : 'Edit Member'
    })

    function getColor(isVerified: boolean) {
      return isVerified ? 'green' : 'orange'
    }

    return {
      fetchOptions,
      getDataFromFirestore,
      loadedMembers,
      totalLoadedMembers,
      fetchLoading,
      headers,
      searchText,
      getColor,
      dialog,
      dialogDelete,
      formTitle,
      editItem,
      deleteItem,
      deleteItemConfirm,
      save,
      close,
      closeDelete,
    }
  },
})
</script>
