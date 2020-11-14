<template>
  <v-app>
    <homepage-nav-bar />
    <v-main class="grey lighten-4">
      <client-only>
        <nuxt />
      </client-only>
    </v-main>
    <the-footer />
  </v-app>
</template>
