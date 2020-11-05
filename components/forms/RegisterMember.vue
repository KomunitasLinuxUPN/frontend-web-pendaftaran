<template>
  <div>
    <v-row dense>
      <v-col cols="12" md="8" class="pa-5">
        <v-card-text class="mt-5">
          <h1 class="text-center display-1">Registrasi Member</h1>
          <h4 class="subtitle-1 text-center mt-4">
            Gunakan email aktifmu untuk registrasi ya &#128521;
          </h4>
          <v-form ref="formRef" class="mt-8">
            <v-text-field
              v-model.trim="newMemberInput.name"
              :rules="nonEmptyRules"
              label="Nama Lengkap"
              prepend-icon="mdi-account"
              type="text"
              color="primary"
            />
            <v-text-field
              v-model.trim="newMemberInput.address"
              :rules="nonEmptyRules"
              label="Alamat Lengkap"
              prepend-icon="mdi-home"
              type="text"
              color="primary"
            />
            <v-text-field
              v-model.number="newMemberInput.generation"
              :rules="angkatanRules"
              label="Angkatan"
              prepend-icon="mdi-calendar-account"
              type="number"
              hint="Range angkatan 2003 - 2020"
              color="primary"
            />
            <v-text-field
              v-model.trim="newMemberInput.department"
              :rules="nonEmptyRules"
              label="Jurusan"
              prepend-icon="mdi-school"
              type="text"
              color="primary"
            />
            <v-text-field
              v-model.trim="newMemberInput.email"
              :rules="emailRules"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              color="primary"
            />
            <v-text-field
              v-model.trim="newMemberInput.phone"
              :rules="nonEmptyRules"
              label="Nomor Telefon"
              prepend-icon="mdi-phone"
              type="text"
              color="primary"
            />
            <v-text-field
              v-model.trim="newMemberInput.lineID"
              :rules="nonEmptyRules"
              label="ID LINE"
              hint="Hanya ID tanpa '@' seperti 'cah_ganteng_123'"
              prepend-icon="mdi-at"
              type="text"
              color="primary"
            />
            <v-file-input
              v-model="newMemberInput.photo"
              :rules="imageRules"
              accept="image/png, image/jpg, image/jpeg"
              placeholder="Format png, jpg, jpeg"
              prepend-icon="mdi-camera"
              label="Foto Diri"
              class="mt-3"
            />
          </v-form>
        </v-card-text>
        <div class="text-center mt-2">
          <v-btn
            :loading="btnIsLoading"
            rounded
            dark
            color="accent"
            @click="submit"
          >
            REGISTER
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="info pa-5">
        <v-card-text class="text-center white--text mt-lg-5">
          <h1 class="display-1">Halo rek! &#x1F60A;</h1>
          <h5 class="subtitle-1 mt-5">
            Ayo monggo daftar, buat babang Fathur bangga!
          </h5>
          <h5 class="subtitle-1 mt-5">
            Harap gunakan email aktifmu untuk melakukan konfirmasi setelah input
            pendaftaran
          </h5>
          <h5 class="subtitle-1 mt-5">
            Apabila mengalami masalah harap hubungi Fathur dkk.
          </h5>
          <h2 class="headline mt-5">Atau</h2>
          <v-btn
            rounded
            dark
            outlined
            class="mt-5"
            @click="$emit('switch-window', Windows.SIGN_IN_ADMIN)"
          >
            LOGIN SEBAGAI ADMIN
          </v-btn>
        </v-card-text>
      </v-col>
    </v-row>
    <base-dialog :dialog-data="dialogData" @close-dialog="closeDialog" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

import Windows from '@/constants/Windows'
import { FirestoreNewMember, NewMemberInput } from '@/models/NewMember'
import DialogData from '@/models/component-models/DialogData'

interface VForm extends HTMLFormElement {
  reset(): void
  resetValidation(): void
  validate(): boolean
}

interface InputTextRules {
  (value: string | null): boolean | string
}

interface InputFileRules {
  (value: File | null): boolean | string
}

export default defineComponent({
  emits: ['switch-window'],
  setup() {
    const nonEmptyRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Field ini tidak boleh kosong',
    ]

    const angkatanRules: InputTextRules[] = [
      (tahun) => !!tahun || 'Field ini tidak boleh kosong',
      (tahun) =>
        (tahun && +tahun >= 2003 && +tahun < 2021) ||
        'Range angkatan antara 2003 - 2020',
    ]

    const emailRules: InputTextRules[] = [
      (email) =>
        (email && email.trim().length > 0) || 'Email tidak boleh kosong',
      (email) =>
        (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) ||
        'Email tidak valid',
    ]

    const imageRules: InputFileRules[] = [
      (file) =>
        (file && file.size < 2000000) || 'Ukuran foto harus kurang dari 2 MB',
      (file) => {
        if (
          file?.type === 'image/jpeg' ||
          file?.type === 'image/png' ||
          file?.type === 'image/jpg'
        ) {
          return true
        } else {
          return 'Format foto harus png, jpg, jpeg'
        }
      },
    ]

    const { app } = useContext()
    const formRef = ref<VForm>()
    const btnIsLoading = ref(false)
    const dialogData = reactive<DialogData>({
      dialogIsOpen: false,
      message: null,
    })

    function closeDialog() {
      dialogData.dialogIsOpen = false
      dialogData.message = null
    }

    // const newMemberInput = reactive<NewMemberInput>({
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
    const newMemberInput = reactive<NewMemberInput>({
      name: 'Amir Hakim',
      address: 'Kamaku',
      generation: 2017,
      department: 'Informatika',
      email: 'amir.rhythm@gmail.com',
      phone: '087855777360',
      lineID: 'mramirid',
      photo: null,
    })

    async function submit() {
      if (formRef.value?.validate()) {
        try {
          btnIsLoading.value = true

          const storageRef = app.$fire.storage.ref()
          const photoRef = storageRef.child(`photos/${newMemberInput.email}`)
          await photoRef.put(newMemberInput.photo!)
          const photoURL = await photoRef.getDownloadURL()

          const newMember: FirestoreNewMember = {
            name: newMemberInput.name!,
            address: newMemberInput.address!,
            generation: newMemberInput.generation!,
            department: newMemberInput.department!,
            email: newMemberInput.email!,
            phone: newMemberInput.phone!,
            lineID: newMemberInput.lineID!,
            photoURL,
          }

          await app.$fire.firestore.collection('members').add(newMember)

          for (const key in newMemberInput) {
            newMemberInput[key] = null
          }
          formRef.value.resetValidation()
        } catch (err) {
          dialogData.dialogIsOpen = true
          dialogData.message =
            err.message || 'Coba lagi nanti atau hubungi admin'
        } finally {
          btnIsLoading.value = false
        }
      }
    }

    return {
      Windows,
      formRef,
      nonEmptyRules,
      angkatanRules,
      emailRules,
      imageRules,
      btnIsLoading,
      newMemberInput,
      submit,
      dialogData,
      closeDialog,
    }
  },
})
</script>
