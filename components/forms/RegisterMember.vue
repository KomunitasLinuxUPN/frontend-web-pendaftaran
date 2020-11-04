<template>
  <v-row dense>
    <v-col cols="12" md="8" class="pa-5">
      <v-card-text class="mt-5">
        <h1 class="text-center display-1">Registrasi Member</h1>
        <h4 class="subtitle-1 text-center mt-4">
          Gunakan email aktifmu untuk registrasi ya &#128521;
        </h4>
        <v-form class="mt-3">
          <v-text-field
            label="Nama"
            prepend-icon="mdi-account"
            type="text"
            color="primary"
          />
          <v-text-field
            label="Alamat"
            prepend-icon="mdi-home"
            type="text"
            color="primary"
          />
          <v-text-field
            label="Angkatan"
            prepend-icon="mdi-calendar-account"
            type="number"
            placeholder="2017"
            color="primary"
          />
          <v-text-field
            label="Jurusan"
            prepend-icon="mdi-school"
            type="text"
            color="primary"
          />
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            color="primary"
          />
          <v-text-field
            label="Nomor Telefon"
            prepend-icon="mdi-phone"
            type="number"
            color="primary"
          />
          <v-text-field
            label="ID LINE"
            placeholder="cah_ganteng_123"
            prepend-icon="mdi-at"
            type="text"
            color="primary"
          />
          <v-file-input
            accept="image/png, image/jpeg"
            placeholder="Upload foto anda dengan format png atau jpeg"
            prepend-icon="mdi-camera"
            label="Foto Diri"
          />
        </v-form>
      </v-card-text>
      <div class="text-center mt-2">
        <v-btn rounded dark color="info">REGISTER</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="4" class="info pa-5">
      <v-card-text class="white--text mt-lg-5">
        <h1 class="text-center display-1">Halo rek! &#x1F60A;</h1>
        <h5 class="text-center subtitle-1 mt-3">
          Ayo monggo daftar, buat babang Fathur bangga!
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          rounded
          dark
          outlined
          @click="$emit('switch-window', Windows.SIGN_IN_ADMIN)"
        >
          LOGIN SEBAGAI ADMIN
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import Windows from '@/constants/Windows'

export default defineComponent({
  emits: ['switch-window'],
  setup() {
    return {
      Windows,
    }
  },
})
</script>
