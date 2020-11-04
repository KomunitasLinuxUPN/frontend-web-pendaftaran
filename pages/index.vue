<template>
  <v-container class="registration fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12" style="overflow: hidden">
          <v-window v-model="curWindowCode">
            <v-window-item :value="Windows.REGISTER_MEMBER">
              <register-member @switch-window="switchWindow" />
            </v-window-item>
            <v-window-item :value="Windows.SIGN_IN_ADMIN">
              <sign-in-admin @switch-window="switchWindow" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

import RegisterMember from '@/components/forms/RegisterMember.vue'
import SignInAdmin from '@/components/forms/SignInAdmin.vue'
import Windows from '@/constants/Windows'

export default defineComponent({
  layout: 'registration',
  head: {
    title: 'Daftar',
  },
  components: {
    RegisterMember,
    SignInAdmin,
  },
  props: {
    source: String,
  },
  setup() {
    const curWindowCode = ref(Windows.REGISTER_MEMBER)

    function switchWindow(windowCode: number) {
      curWindowCode.value = windowCode
    }

    return {
      Windows,
      curWindowCode,
      switchWindow,
    }
  },
})
</script>
