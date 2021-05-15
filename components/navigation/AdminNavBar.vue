<template>
  <nav>
    <app-info-snackbar :snackbar-data="snackbarData" />

    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawerIsOpen = !drawerIsOpen" />

      <v-toolbar-title class="text-capitalize">
        <span class="font-weight-light">Pendaftaran </span>KoLU
      </v-toolbar-title>

      <v-spacer />

      <v-btn text @click="logout">
        <span>Logout</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerIsOpen" app class="primary">
      <v-row justify="center" class="mt-5 text-center">
        <v-col>
          <v-avatar size="100">
            <img src="@/assets/images/default-avatar.png" />
          </v-avatar>
          <p class="subtitle-1 white--text mt-3">
            {{ currentUser.email || 'Unknown' }}
          </p>
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

import {
  AUTH,
  ActionType as AuthActionType,
  GetterType as AuthGetterType,
} from '@/store/auth'
import { Admin } from '@/typings/Admin'
import {
  SnackbarStatus,
  useInfoSnackbar,
} from '@/components/info/AppInfoSnackbar.vue'

interface NavBarLink {
  icon: string
  text: string
  route: string
}

/*
 * Komponen AdminNavBar
 *
 * Komponen ini terdiri dari:
 * 1. App Bar untuk layout admin
 * 2. Navigation Drawer untuk layout admin
 */
export default defineComponent({
  setup() {
    const drawerIsOpen = ref(false)
    const navBarlinks: NavBarLink[] = [
      {
        icon: 'mdi-account-multiple-check',
        text: 'Terdaftar',
        route: '/admin/dashboard/members/registered',
      },
      {
        icon: 'mdi-account-multiple-minus',
        text: 'Pending',
        route: '/admin/dashboard/members/pending',
      },
      {
        icon: 'mdi-account-multiple',
        text: 'List Pendaftar',
        route: '/admin/dashboard/members/all',
      },
      {
        icon: 'mdi-home',
        text: 'Halaman Utama',
        route: '/',
      },
    ]

    const { store, redirect } = useContext()

    const currentUser = store.getters[
      `${AUTH}/${AuthGetterType.ADMIN}`
    ] as Admin

    const { snackbarData } = useInfoSnackbar()

    async function logout() {
      try {
        await store.dispatch(`${AUTH}/${AuthActionType.SIGN_OUT}`)
        redirect('/admin/login')
      } catch (err) {
        snackbarData.snackbarIsDisplayed = true
        snackbarData.message = 'Terjadi kesalahan saat melakukan logout'
        snackbarData.snackbarStatus = SnackbarStatus.ERROR
      }
    }

    return {
      drawerIsOpen,
      navBarlinks,
      currentUser,
      snackbarData,
      logout,
    }
  },
})
</script>
