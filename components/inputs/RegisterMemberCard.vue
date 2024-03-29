<template>
  <v-card class="elevation-6" style="overflow: hidden">
    <v-row dense>
      <v-col cols="12" md="8" class="pa-5">
        <v-card-text class="mt-5">
          <h1 class="text-center display-1">Registrasi Member</h1>
          <h4 class="subtitle-1 text-center mt-4 mb-8">
            Kuy rek gabung KoLU &#128521;
          </h4>
          <v-form
            ref="formRef"
            class="mt-4 secondary--text"
            :disabled="registrationState.isClosed"
          >
            <v-text-field
              v-model.trim="newMemberInput.name"
              :rules="nonEmptyRules"
              label="Nama Lengkap"
              prepend-icon="mdi-account"
              type="text"
              color="secondary"
            />
            <v-text-field
              v-model.trim="newMemberInput.address"
              :rules="nonEmptyRules"
              label="Alamat Lengkap"
              prepend-icon="mdi-home"
              type="text"
              color="secondary"
            />
            <v-select
              v-model.number="newMemberInput.generation"
              type="number"
              :rules="angkatanRules"
              :items="generationYears"
              menu-props="auto"
              label="Angkatan"
              prepend-icon="mdi-calendar-account"
              hint="Range angkatan 2003 - 2020"
              color="secondary"
            />
            <v-select
              v-model.trim="newMemberInput.department"
              type="text"
              :rules="nonEmptyRules"
              :items="['Informatika', 'Sistem Informasi', 'Sains Data']"
              menu-props="auto"
              label="Jurusan"
              prepend-icon="mdi-school"
              color="secondary"
            />
            <v-text-field
              v-model.trim="newMemberInput.email"
              :rules="emailRules"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              color="secondary"
            />
            <v-text-field
              v-model.trim="newMemberInput.phone"
              :rules="nonEmptyRules"
              label="Nomor Telefon"
              prepend-icon="mdi-phone"
              hint="Terserah pakai +62 atau tidak"
              type="text"
              color="secondary"
            />
            <v-text-field
              v-model.trim="newMemberInput.lineID"
              :rules="nonEmptyRules"
              label="ID LINE"
              prepend-icon="mdi-at"
              type="text"
              color="secondary"
            />
            <v-input class="mt-3" color="secondary">
              <!-- <v-file-input
                v-model="newMemberInput.photo"
                :truncate-length="10"
                :rules="imageRules"
                :show-size="true"
                accept="image/png, image/jpg, image/jpeg"
                placeholder="Format png, jpg, jpeg"
                prepend-icon="mdi-camera"
                label="Foto Diri"
                class="mr-8"
              /> -->
              <!-- Pakai yang atas jika ingin buka pendaftaran -->
              <v-file-input
                v-model="newMemberInput.photo"
                :truncate-length="10"
                :rules="imageRules"
                :show-size="true"
                accept="image/png, image/jpg, image/jpeg"
                prepend-icon="mdi-camera"
                label="Foto Diri"
                class="mr-8"
              />
              <v-avatar size="100" class="secondary">
                <v-img position="center" :src="photoPreviewUrl" />
              </v-avatar>
            </v-input>
          </v-form>
          <div class="text-center mb-5">
            <v-btn
              :loading="btnIsLoading"
              rounded
              color="accent"
              :disabled="registrationState.isClosed"
              @click="submit"
            >
              REGISTER
            </v-btn>
          </div>
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
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { AxiosError } from 'axios'

import {
  useInfoDialog,
  DialogStatus,
} from '@/components/info/AppInfoDialog.vue'
import { MemberInput } from '@/typings/Member'
import { MEMBERS, ActionType as MembersActionType } from '@/store/members'
import { RegStatus } from '@/constants/app-status'

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

function getGenerationYears() {
  const generationYears = []
  const curYear = new Date().getFullYear()

  for (let year = 2003; year <= curYear; year++) {
    generationYears.push(year)
  }

  return generationYears
}

/*
 * Komponen RegisterMemberCard
 *
 * Komponen ini digunakan untuk menampilkan form register member baru
 */
export default defineComponent({
  setup() {
    const nonEmptyRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Field ini tidak boleh kosong',
    ]

    const generationYears = getGenerationYears().reverse()
    const maxYear = generationYears[0]
    const minYear = generationYears[generationYears.length - 1]

    const angkatanRules: InputTextRules[] = [
      (tahun) => !!tahun || 'Field ini tidak boleh kosong',
      (tahun) =>
        (tahun && +tahun >= minYear && +tahun <= maxYear) ||
        `Range angkatan antara ${minYear} - ${maxYear}`,
    ]

    const emailRules: InputTextRules[] = [
      (email) =>
        (email && email.trim().length > 0) || 'Email tidak boleh kosong',
      (email) =>
        (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) ||
        'Email tidak valid',
    ]

    const imageRules: InputFileRules[] = [
      (file) => !!file || 'Harap sertakan foto diri anda',
      (file) =>
        (file && file.size < 1000000) || 'Ukuran foto harus kurang dari 1 MB',
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

    const newMemberInput = reactive<MemberInput>({
      name: null,
      address: null,
      generation: null,
      department: null,
      email: null,
      phone: null,
      lineID: null,
      photo: null,
    })

    const photoPreviewUrl = ref<string>(
      require('@/assets/images/default-avatar.png')
    )

    watch(
      () => newMemberInput.photo,
      () => {
        photoPreviewUrl.value = newMemberInput.photo
          ? URL.createObjectURL(newMemberInput.photo)
          : require('@/assets/images/default-avatar.png')
      }
    )

    const { store } = useContext()
    const formRef = ref<VForm>()
    const btnIsLoading = ref(false)
    const { dialogData } = useInfoDialog()

    // Buka tutup pendaftaran
    // Komen salah satu message jika ingin buka/tutup pendaftaran
    const registrationState = {
      isClosed: process.env.regStatus === RegStatus.CLOSED,
      // message: 'Pendaftaran masih belum dibuka',
      message:
        'Mohon maaf, pendaftaran anggota KoLU telah ditutup. Kamu masih bisa join dengan cara menghubungi Humas KoLU yoi (DM Instagram KoLU)',
    }

    if (registrationState.isClosed) {
      dialogData.dialogIsOpen = true
      dialogData.dialogStatus = DialogStatus.INFO
      dialogData.title = 'Pendaftaran telah ditutup'
      dialogData.message = registrationState.message
    }

    async function submit() {
      if (formRef.value?.validate() && !registrationState.isClosed) {
        try {
          btnIsLoading.value = true

          await store.dispatch(
            `${MEMBERS}/${MembersActionType.REGISTER_MEMBER}`,
            newMemberInput
          )

          for (const key in newMemberInput) {
            newMemberInput[key] = null
          }
          formRef.value!.resetValidation()

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
        } finally {
          btnIsLoading.value = false
        }
      }
    }

    return {
      formRef,
      newMemberInput,
      nonEmptyRules,
      generationYears,
      angkatanRules,
      emailRules,
      imageRules,
      photoPreviewUrl,
      submit,
      dialogData,
      btnIsLoading,
      registrationState,
    }
  },
})
</script>
