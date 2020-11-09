<template>
  <v-navigation-drawer app class="primary">
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
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

import { authStore, GetterType as AuthGetterType } from '@/store/auth'
import Person from '@/models/Person'

interface NavBarLink {
  icon: string
  text: string
  route: string
}

export default defineComponent({
  setup() {
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

    const { store } = useContext()
    const currentUser = store.getters[
      `${authStore}/${AuthGetterType.LOGGED_IN_USER}`
    ] as Person

    const snackbarIsDisplayed = ref(false)

    function toggleSnackbar(newState: boolean) {
      snackbarIsDisplayed.value = newState
    }

    return {
      navBarlinks,
      currentUser,
      snackbarIsDisplayed,
      toggleSnackbar,
    }
  },
})
</script>
