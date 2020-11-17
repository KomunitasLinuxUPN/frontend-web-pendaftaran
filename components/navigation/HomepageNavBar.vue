<template>
  <nav>
    <v-app-bar app dark color="primary px-2">
      <v-img
        class="mr-4"
        src="https://www.kolu.web.id/wp-content/uploads/2016/09/logo-kolu.png"
        max-height="40"
        max-width="40"
        contain
        @click="$router.push('/')"
      />

      <v-toolbar-title class="h4 text-uppercase">
        <nuxt-link to="/" class="white--text font-weight-light text-capitalize">
          Pendaftaran
        </nuxt-link>
        <nuxt-link to="/" class="white--text text-capitalize">KoLU</nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <div class="hidden-sm-and-down">
        <v-btn outlined rounded to="/members/registered" nuxt class="mr-1">
          <v-icon left>mdi-account-group</v-icon>
          <span>TERDAFTAR</span>
        </v-btn>

        <v-tooltip bottom color="info">
          <template #activator="{ on, attrs }">
            <v-btn
              text
              fab
              href="https://www.kolu.web.id"
              target="_blank"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </template>
          <span>Situs Resmi KoLU</span>
        </v-tooltip>

        <v-tooltip bottom color="info">
          <template #activator="{ on, attrs }">
            <v-btn
              text
              fab
              href="https://www.instagram.com/kolu_upn_jatim"
              target="_blank"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </template>
          <span>Instagram KoLU</span>
        </v-tooltip>

        <v-tooltip bottom color="info">
          <template #activator="{ on, attrs }">
            <v-btn
              text
              fab
              href="https://github.com/KomunitasLinuxUPN"
              target="_blank"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </template>
          <span>Github KoLU</span>
        </v-tooltip>
      </div>

      <div class="hidden-md-and-up">
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>
              <span>Menu</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item to="/members/registered">
              <v-icon left>mdi-account-group</v-icon>
              <v-list-item-title>Member Terdaftar</v-list-item-title>
            </v-list-item>

            <v-list-item to="https://www.kolu.web.id">
              <v-icon left>mdi-web</v-icon>
              <v-list-item-title>Situs Resmi</v-list-item-title>
            </v-list-item>

            <v-list-item to="https://www.instagram.com/kolu_upn_jatim">
              <v-icon left>mdi-instagram</v-icon>
              <v-list-item-title>Instagram KoLU</v-list-item-title>
            </v-list-item>

            <v-list-item to="https://github.com/KomunitasLinuxUPN">
              <v-icon left>mdi-github</v-icon>
              <v-list-item-title>Github KoLU</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </nav>
</template>
