import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'

const config: NuxtConfig = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Vuetify Todo App',
    title: 'Vuetify Todo App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Simple Todo App' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build', // https://go.nuxtjs.dev/typescript
    '@nuxtjs/vuetify', // https://go.nuxtjs.dev/vuetify,
    '@nuxtjs/composition-api', // https://composition-api.nuxtjs.org/
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Enable Vue Devtools
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    theme: {
      dark: true,
      default: 'light',
      disable: false,
      options: {},
      themes: {
        light: {
          primary: colors.purple.darken1,
          secondary: colors.purple.lighten1,
          accent: colors.amber.lighten3,
          info: colors.blue.lighten1,
          success: colors.green.accent3,
          warning: colors.yellow.darken3,
          error: colors.red.lighten2,
        },
        dark: {
          primary: colors.blue.darken2,
          secondary: colors.amber.darken3,
          accent: colors.grey.darken3,
          info: colors.blue.lighten1,
          success: colors.green.accent3,
          warning: colors.yellow.darken3,
          error: colors.red.lighten2,
        },
      },
    },
  },
}

export default config
