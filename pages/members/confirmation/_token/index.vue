<template>
  <client-only>
    <v-container class="confirmation fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div class="text-center">
            <div v-if="verificationSuccess === null">
              <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
              />
            </div>
            <h1 v-else-if="verificationSuccess === true" class="display-1">
              Selamat! Anda terdaftar sebagai anggota KoLU &#128513;
            </h1>
            <div v-else-if="verificationSuccess === false">
              <h1 class="display-1">Konfirmasi pendaftaran GAGAL!</h1>
              <p class="subtitle-1 mt-5">
                Mungkin anda sudah terdaftar atau token anda tidak valid
              </p>
            </div>
            <v-btn class="mt-10" outlined nuxt to="/" color="primary">
              KEMBALI KE HALAMAN UTAMA
            </v-btn>
          </div>
        </v-col>
        <base-dialog :dialog-data="dialogData" @close-dialog="closeDialog" />
      </v-row>
    </v-container>
  </client-only>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useAsync,
  useContext,
} from '@nuxtjs/composition-api'
import DialogData from '~/models/component-models/DialogData'

export default defineComponent({
  layout: 'registration',
  head: {
    title: 'Konfirmasi Pendaftaran',
  },
  setup() {
    const { app, params } = useContext()
    const token = params.value.token

    const dialogData = reactive<DialogData>({
      dialogIsOpen: false,
      message: null,
    })

    function closeDialog() {
      dialogData.dialogIsOpen = false
      dialogData.message = null
    }

    const verificationSuccess = useAsync(async () => {
      try {
        const querySnapshot = await app.$fire.firestore
          .collection('members')
          .where('verification.token', '==', token)
          .where('verification.isVerified', '!=', true)
          .get()

        if (querySnapshot.empty) {
          return false
        }

        const memberDocRef = querySnapshot.docs[0].ref
        await memberDocRef.update({
          'verification.isVerified': true,
          'verification.token': '',
        })
        return true
      } catch (err) {
        dialogData.dialogIsOpen = true
        dialogData.message = err.message || 'Coba lagi nanti atau hubungi admin'
      }
    })

    return {
      verificationSuccess,
      dialogData,
      closeDialog,
    }
  },
})
</script>
