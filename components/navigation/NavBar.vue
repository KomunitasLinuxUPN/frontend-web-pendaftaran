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

      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>Vuetify
      </v-toolbar-title>

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn text color="grey" v-bind="attrs" v-on="on">
            <v-icon left>mdi-chevron-down</v-icon>
            <span>Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" :to="link.route">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerIsOpen" app class="secondary">
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

      <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route">
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

import InputProjectDialog from '@/components/projects/InputProjectDialog.vue'
import { authStore, GetterType as AuthGetterType } from '@/store/auth'
import Person from '~/models/Person'

interface NavLink {
  icon: string
  text: string
  route: string
}

export default defineComponent({
  components: {
    InputProjectDialog,
  },
  setup() {
    const drawerIsOpen = ref(false)
    const links: NavLink[] = [
      { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
      { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
      { icon: 'mdi-account', text: 'Team', route: '/team' },
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
      links,
      currentUser,
      snackbarIsDisplayed,
      toggleSnackbar,
    }
  },
})
</script>
