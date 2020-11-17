<template>
  <v-card class="elevation-6" style="overflow: hidden">
    <v-row dense class="fill-height">
      <v-col cols="12" md="7" class="pa-5">
        <v-card-text class="mt-5">
          <h1 class="text-center display-1">Login Admin</h1>
          <h4 class="subtitle-1 text-center mt-4">
            Gunakan akunmu yang telah terdaftar sebagai admin &#128521;
          </h4>
          <v-form ref="formRef" class="mt-8" @submit="submit">
            <v-text-field
              v-model.trim="loginInput.email"
              :rules="emailRules"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              color="secondary"
            />
            <v-text-field
              v-model.trim="loginInput.password"
              :rules="passwordRules"
              label="Password"
              prepend-icon="mdi-key"
              :append-icon="passwordIsDisplayed ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordIsDisplayed ? 'text' : 'password'"
              color="secondary"
              @click:append="passwordIsDisplayed = !passwordIsDisplayed"
            />
          </v-form>
          <h3 class="text-center mt-3">
            <v-btn text small color="secondary">Lupa kata sandi?</v-btn>
          </h3>
          <div class="text-center mt-5">
            <v-btn
              :loading="btnIsLoading"
              rounded
              dark
              color="accent"
              @click="submit"
            >
              LOGIN
            </v-btn>
          </div>
        </v-card-text>
      </v-col>
      <v-col cols="12" md="5" class="secondary pa-5">
        <v-card-text class="white--text mt-lg-5">
          <h1 class="text-center display-1">Halo Admin! &#x1F60A;</h1>
          <h5 class="text-center subtitle-1 mt-5">
            Form login ini hanya untuk pengguna yang telah terdaftar sebagai
            admin
          </h5>
          <h5 class="text-center subtitle-1 mt-5">
            Harap hubungi ketua umum KoLU untuk mendaftarkan diri anda sebagai
            Admin
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
} from '@nuxtjs/composition-api'

import { AdminSignInInput } from '@/models/Admin'
import { AUTH, ActionType as AuthActionType } from '@/store/auth'
import {
  DialogStatus,
  useInfoDialog,
} from '@/components/info/AppInfoDialog.vue'

interface VForm extends HTMLFormElement {
  reset(): void
  resetValidation(): void
  validate(): boolean
}

interface InputTextRules {
  (value: string | null): boolean | string
}

export default defineComponent({
  setup() {
    const emailRules: InputTextRules[] = [
      (email) =>
        (email && email.trim().length > 0) || 'Email tidak boleh kosong',
      (email) =>
        (email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) ||
        'Email tidak valid',
    ]

    const passwordRules: InputTextRules[] = [
      (text) =>
        (text && text.trim().length > 0) || 'Password tidak boleh kosong',
      (text) => (text && text.trim().length >= 6) || 'Password minimal 6 huruf',
    ]

    const loginInput = reactive<AdminSignInInput>({
      email: null,
      password: null,
    })

    const { app, store } = useContext()
    const { dialogData } = useInfoDialog()
    const formRef = ref<VForm>()
    const passwordIsDisplayed = ref(false)
    const btnIsLoading = ref(false)

    async function submit() {
      if (formRef.value?.validate()) {
        try {
          btnIsLoading.value = true

          await store.dispatch(`${AUTH}/${AuthActionType.SIGN_IN}`, loginInput)

          for (const key in loginInput) {
            loginInput[key] = null
          }
          formRef.value!.resetValidation()

          app.router?.replace('/admin/dashboard/members/all')
        } catch (err) {
          dialogData.dialogIsOpen = true
          dialogData.dialogStatus = DialogStatus.ERROR
          dialogData.title = 'Terjadi Kesalahan!'
          dialogData.message =
            err.message || 'Coba lagi nanti atau silahkan hubungi admin'
        } finally {
          btnIsLoading.value = false
        }
      }
    }

    return {
      formRef,
      passwordIsDisplayed,
      loginInput,
      emailRules,
      passwordRules,
      submit,
      btnIsLoading,
      dialogData,
    }
  },
})
</script>
