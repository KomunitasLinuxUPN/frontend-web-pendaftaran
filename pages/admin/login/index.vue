<template>
  <v-container id="admin-login" class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-6" style="overflow: hidden">
          <sign-in-admin />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  useContext,
} from '@nuxtjs/composition-api'

import { AUTH, GetterType as AuthGetterType } from '@/store/auth'
import { Admin } from '@/models/Admin'

export default defineComponent({
  layout: 'homepage',
  setup() {
    onBeforeMount(() => {
      const { store, app } = useContext()
      const curUser = store.getters[`${AUTH}/${AuthGetterType.ADMIN}`] as Admin
      if (curUser) {
        app.router?.replace('/admin/dashboard/members/all')
      }
    })
  },
  head: {
    title: 'Login Admin',
  },
})
</script>
