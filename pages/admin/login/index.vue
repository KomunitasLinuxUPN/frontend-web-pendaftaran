<template>
  <v-container id="admin-login" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <sign-in-admin-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

import { AUTH, GetterType as AuthGetterType } from '@/store/auth'
import { Admin } from '@/models/Admin'
import setAuthMiddelware from '@/middleware/auth/set-auth'

/*
 * Halaman Login Admin
 */
export default defineComponent({
  layout: 'homepage',
  middleware: [
    setAuthMiddelware,
    (context) => {
      const curUser = context.store.getters[
        `${AUTH}/${AuthGetterType.ADMIN}`
      ] as Admin

      if (curUser.uid) {
        context.redirect('/admin/dashboard/members/all')
      }
    },
  ],
  head: {
    title: 'Login Admin',
  },
})
</script>
