<template>
  <v-app-bar flat app>
    <v-app-bar-nav-icon class="grey--text" @click="$emit('toggle-nav-bar')" />

    <v-toolbar-title class="text-capitalize grey--text">
      <span class="font-weight-light">Pendaftaran </span>KoLU
    </v-toolbar-title>

    <v-spacer />

    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn text color="grey" v-bind="attrs" v-on="on">
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Profil</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="link in profileLinks"
          :key="link.text"
          :to="link.route"
        >
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn text color="grey">
      <span>Sign Out</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

interface AppBarLink {
  text: string
  route: string
}

export default defineComponent({
  emits: ['toggle-nav-bar'],
  setup() {
    const profileLinks: AppBarLink[] = [
      {
        text: 'Pengaturan Akun',
        route: '/admin-dashboard/account/settting',
      },
    ]

    return {
      profileLinks,
    }
  },
})
</script>
