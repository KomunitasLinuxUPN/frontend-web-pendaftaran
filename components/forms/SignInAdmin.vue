<template>
  <v-row dense class="fill-height">
    <v-col cols="12" md="7" class="pa-5">
      <v-card-text class="mt-5">
        <h1 class="text-center display-1">Login Admin</h1>
        <h4 class="subtitle-1 text-center mt-4">
          Gunakan akunmu yang telah terdaftar sebagai admin &#128521;
        </h4>
        <v-form ref="formRef" class="mt-8">
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            color="secondary"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-key"
            type="password"
            color="secondary"
          />
        </v-form>
        <h3 class="text-center mt-3">
          <v-btn text small color="accent">Lupa kata sandi?</v-btn>
        </h3>
      </v-card-text>
      <div class="text-center mt-2">
        <v-btn rounded dark color="accent">REGISTER</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="5" class="secondary pa-5">
      <v-card-text class="white--text mt-lg-5">
        <h1 class="text-center display-1">Halo Admin! &#x1F60A;</h1>
        <h5 class="text-center subtitle-1 mt-5">
          Form login ini hanya untuk pengguna yang telah terdaftar sebagai admin
        </h5>
        <h5 class="text-center subtitle-1 mt-5">
          Harap hubungi ketua umum KoLU untuk mendaftarkan diri anda sebagai
          Admin
        </h5>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    // Later...
  },
})
</script>
