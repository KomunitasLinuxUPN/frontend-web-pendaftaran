import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import bodyParser from 'body-parser'

import backend from './backend/app'

const config: NuxtConfig = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - Pendaftaran KoLU',
    title: 'Pendaftaran KoLU',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Web pendaftaran anggota baru KoLU tahun 2020',
      },
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
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.API_KEY,
          authDomain: process.env.AUTH_DOMAIN,
          databaseURL: process.env.DB_URL,
          projectId: process.env.PROJECT_ID,
          storageBucket: process.env.STORAGE_BUCKET,
          messagingSenderId: process.env.MESSAGING_SENDER_ID,
          appId: process.env.APP_ID,
          measurementId: process.env.MEASUREMENT_ID,
        },
        services: {
          firestore: true,
          storage: true,
        },
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios'],

  // Node Express Middlewares (Backend)
  serverMiddleware: [
    bodyParser.json(),
    {
      path: '/backend',
      handler: backend,
    },
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Enable Vue Devtools
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },

  // Nuxt Loading Bar
  loading: {
    color: colors.yellow.darken1,
    height: '3px',
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['@/assets/variables.scss'],
    theme: {
      dark: false,
      default: 'light',
      disable: false,
      options: {},
      themes: {
        light: {
          primary: colors.purple.darken4,
          secondary: colors.purple.darken3,
          accent: colors.yellow.darken2,
          info: colors.teal.lighten2,
          success: colors.green.accent3,
          warning: colors.yellow.darken3,
          error: colors.red.base,
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
