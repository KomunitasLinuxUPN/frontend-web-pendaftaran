<template>
  <nav>
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
            <img src="/images/avatar-1.png" />
          </v-avatar>
          <p class="subtitle-1 white--text mt-3">Amir Muhammad Hakim</p>
        </v-col>
        <v-col>
          <the-dialog />
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
import { defineComponent, ref } from '@nuxtjs/composition-api'

import TheDialog from '@/components/ui/TheDialog.vue'

interface NavLink {
  icon: string
  text: string
  route: string
}

export default defineComponent({
  components: {
    TheDialog,
  },
  setup() {
    const drawerIsOpen = ref(false)
    const links: NavLink[] = [
      { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/' },
      { icon: 'mdi-folder', text: 'My Projects', route: '/projects' },
      { icon: 'mdi-account', text: 'Team', route: '/team' },
    ]

    return {
      drawerIsOpen,
      links,
    }
  },
})
</script>
