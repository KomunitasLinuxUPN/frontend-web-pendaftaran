<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="8" class="pa-5">
        <v-card-text class="mt-5">
          <h1 class="text-center display-1">Registrasi Member</h1>
          <h4 class="subtitle-1 text-center mt-4 mb-8">
            Kuy rek gabung KoLU &#128521;
          </h4>
          <member-form :member="newMemberInput" @submit="submit" />
        </v-card-text>
      </v-col>
      <v-col cols="12" md="4" class="secondary pa-5">
        <v-card-text class="text-center white--text mt-lg-5">
          <h1 class="display-1">Halo rek! &#x1F60A;</h1>
          <h5 class="subtitle-1 mt-5">
            Selamat datang di website pendaftaran KoLU
          </h5>
          <h5 class="subtitle-1 mt-5">
            Silahkan melakukan registrasi untuk untuk menjadi calon anggota
            KoLU!
          </h5>
          <h5 class="subtitle-1 mt-5">
            HARAP GUNAKAN EMAIL AKTIFMU untuk melakukan konfirmasi pendaftaran
          </h5>
          <h5 class="subtitle-1 mt-5">
            Apabila mengalami masalah harap hubungi Humas KoLU dengan cara DM ke
            akun resmi Instagram KoLU yaa
          </h5>
        </v-card-text>
      </v-col>
    </v-row>
    <app-info-dialog :dialog-data="dialogData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'

import { useInfoDialog, DialogStatus } from '@/components/ui/AppInfoDialog.vue'
import { MemberInput } from '@/models/Member'

export default defineComponent({
  setup() {
    const { dialogData } = useInfoDialog()

    // const newMemberInput = reactive<MemberInput>({
    //   name: null,
    //   address: null,
    //   generation: null,
    //   department: null,
    //   email: null,
    //   phone: null,
    //   lineID: null,
    //   photo: null,
    // })

    // Dummy input
    const newMemberInput = reactive<MemberInput>({
      name: 'Amir Hakim',
      address: 'Kamaku',
      generation: 2017,
      department: 'Informatika',
      email: 'amir.rhythm@gmail.com',
      phone: '087855777360',
      lineID: 'mramirid',
      photo: null,
    })

    async function submit(submitForm: () => Promise<void>) {
      try {
        await submitForm()

        dialogData.dialogIsOpen = true
        dialogData.dialogStatus = DialogStatus.SUCCESS
        dialogData.title = 'Pendaftaran berhasil!'
        dialogData.message =
          'Silahkan cek emailmu untuk melakukan konfirmasi pendaftaran'
      } catch (err) {
        let message =
          err.message || 'Coba lagi nanti atau silahkan hubungi admin'

        if (err.isAxiosError) {
          message = (err as AxiosError).response!.data.message
        }

        dialogData.dialogIsOpen = true
        dialogData.dialogStatus = DialogStatus.ERROR
        dialogData.title = 'Terjadi Kesalahan!'
        dialogData.message = message
      }
    }

    return {
      newMemberInput,
      submit,
      dialogData,
    }
  },
})
</script>
