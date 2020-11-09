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

    <app-bar @toggle-nav-bar="toggleNavBar" />

    <nav-drawer v-model="drawerIsOpen" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const drawerIsOpen = ref(false)

    function toggleNavBar() {
      drawerIsOpen.value = !drawerIsOpen.value
    }

    return {
      drawerIsOpen,
      toggleNavBar,
    }
  },
})
</script>
