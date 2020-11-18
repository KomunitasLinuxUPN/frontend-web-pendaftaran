import { NuxtConfig } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
import bodyParser from 'body-parser'

import backend from './backend/app'
// import { name as maintenanceMiddleware } from './middleware/maintenance-mode'

const config: NuxtConfig = {
  ssr: false,

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
  css: ['@/assets/styles/main.css'],

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
          auth: true,
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
    color: '#3CAEA3',
    height: '3px',
  },
  // Nuxt Loading Spinner
  // loadingIndicator: {
  //   name: 'rectangle-bounce',
  //   color: '#20639B',
  // },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['@/assets/styles/variables.scss'],
    theme: {
      dark: false,
      default: 'light',
      disable: false,
      options: {},
      themes: {
        light: {
          primary: '#173F5F',
          secondary: '#20639B',
          accent: '#ED553B',
          info: '#3CAEA3',
          success: colors.green.base,
          warning: '#ED553B',
          error: colors.red.base,
        },
        dark: {
          primary: '',
          secondary: '',
          accent: '',
          info: '',
          success: '',
          warning: '',
          error: '',
        },
      },
    },
  },

  router: {
    // middleware: maintenanceMiddleware,
  },
}

export default config
