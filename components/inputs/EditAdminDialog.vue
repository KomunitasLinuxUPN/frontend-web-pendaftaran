<template>
  <div>
    <v-dialog v-model="dialogIsOpen" eager max-width="600px">
      <template #activator="{ on, attrs }">
        <v-list-item v-bind="attrs" v-on="on">
          <v-list-item-title>Pengaturan</v-list-item-title>
        </v-list-item>
      </template>

      <v-card>
        <v-card-title>
          <h2 class="title">Edit Profile</h2>
        </v-card-title>
        <v-card-text>
          <admin-form :is-edit="true" :admin="editedAdmin" @click="submit" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <app-info-snackbar :snackbar-data="snackbarData" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import { AUTH, GetterType as AuthGetterType } from '@/store/auth'
import { Admin } from '@/models/Admin'
import {
  SnackbarStatus,
  useInfoSnackbar,
} from '@/components/info/AppInfoSnackbar.vue'

export default defineComponent({
  setup() {
    const dialogIsOpen = ref(false)

    const { store } = useContext()
    const curUser = store.getters[`${AUTH}/${AuthGetterType.ADMIN}`] as Admin
    const editedAdmin = reactive<Admin>({ ...curUser })

    const { snackbarData } = useInfoSnackbar()

    async function submit(submitForm: () => Promise<void>) {
      try {
        await submitForm()

        snackbarData.snackbarIsDisplayed = true
        snackbarData.message = 'Update profile berhasil'
        snackbarData.snackbarStatus = SnackbarStatus.SUCCESS

        dialogIsOpen.value = false
      } catch (err) {
        snackbarData.snackbarIsDisplayed = true
        snackbarData.message = 'Terjadi kesalahan!'
        snackbarData.snackbarStatus = SnackbarStatus.ERROR
      }
    }

    return {
      dialogIsOpen,
      editedAdmin,
      submit,
      snackbarData,
    }
  },
})
</script>
