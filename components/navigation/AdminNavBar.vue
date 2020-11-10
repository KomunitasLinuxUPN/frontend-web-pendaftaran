<template>
  <nav>
    <v-snackbar
      v-model="snackbarIsDisplayed"
      :timeout="4000"
      top
      color="success"
    >
      Awesome! You added a new project!
      <template #action="{ attrs }">
        <v-btn text color="white" v-bind="attrs" @click="toggleSnackbar(false)">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar flat app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawerIsOpen = !drawerIsOpen"
      />

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

    <v-navigation-drawer v-model="drawerIsOpen" app class="primary">
      <v-row justify="center" class="mt-5 text-center">
        <v-col>
          <v-avatar size="100">
            <img :src="currentUser.avatar" />
          </v-avatar>
          <p class="subtitle-1 white--text mt-3">{{ currentUser.name }}</p>
        </v-col>
        <v-col>
          <input-project-dialog @project-added="toggleSnackbar(true)" />
        </v-col>
      </v-row>

      <v-list rounded>
        <v-list-item
          v-for="link in navBarlinks"
          :key="link.text"
          color="white"
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { authStore, GetterType as AuthGetterType } from '@/store/auth'
import Person from '~/models/Person'

interface NavBarLink {
  icon: string
  text: string
  route: string
}

interface AppBarLink {
  text: string
  route: string
}
export default defineComponent({
  setup() {
    const drawerIsOpen = ref(false)
    const navBarlinks: NavBarLink[] = [
      {
        icon: 'mdi-account-multiple-check',
        text: 'Terdaftar',
        route: '/admin-dashboard/members/registered',
      },
      {
        icon: 'mdi-account-question',
        text: 'Pending',
        route: '/admin-dashboard/members/pending',
      },
      {
        icon: 'mdi-account-multiple',
        text: 'List Pendaftar',
        route: '/admin-dashboard/members/all',
      },
      {
        icon: 'mdi-account-tie',
        text: 'List Admin',
        route: '/admin-dashboard/admins',
      },
    ]

    const profileLinks: AppBarLink[] = [
      {
        text: 'Pengaturan Akun',
        route: '/admin-dashboard/account/settting',
      },
    ]

    const { store } = useContext()
    const currentUser = store.getters[
      `${authStore}/${AuthGetterType.LOGGED_IN_USER}`
    ] as Person

    const snackbarIsDisplayed = ref(false)
    function toggleSnackbar(newState: boolean) {
      snackbarIsDisplayed.value = newState
    }
    return {
      drawerIsOpen,
      navBarlinks,
      currentUser,
      snackbarIsDisplayed,
      toggleSnackbar,
      profileLinks,
    }
  },
})
</script>
