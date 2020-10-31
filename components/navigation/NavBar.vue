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

      <v-btn text color="grey">
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawerIsOpen" app class="primary">
      <p class="warning">Test</p>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const drawerIsOpen = ref(false)

    return {
      drawerIsOpen,
    }
  },
})
</script>
