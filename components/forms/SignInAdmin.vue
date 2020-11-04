<template>
  <v-row dense class="fill-height">
    <v-col cols="12" md="4" class="info pa-5">
      <v-card-text class="white--text mt-lg-5">
        <h1 class="text-center display-1">Halo Admin! &#x1F60A;</h1>
        <h5 class="text-center subtitle-1 mt-5">
          Ayo mohon dibantu buat ngatur pendaftarannya yaaa..
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn
          rounded
          dark
          outlined
          @click="$emit('switch-window', Windows.REGISTER_MEMBER)"
        >
          DAFTAR SEBAGAI MEMBER
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="8" class="pa-5">
      <v-card-text class="mt-5">
        <h1 class="text-center display-1">Login Admin</h1>
        <h4 class="subtitle-1 text-center mt-4">
          Gunakan email yang telah kamu daftarkan sebagai admin &#128521;
        </h4>
        <v-form class="mt-3">
          <v-text-field
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            color="primary"
          />
          <v-text-field
            label="Password"
            prepend-icon="mdi-key"
            type="password"
            color="primary"
          />
        </v-form>
        <h3 class="text-center mt-3">
          <nuxt-link to="/reset-password" style="text-decoration: none">
            Lupa kata sandi?
          </nuxt-link>
        </h3>
      </v-card-text>
      <div class="text-center mt-2">
        <v-btn rounded dark color="info">REGISTER</v-btn>
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
