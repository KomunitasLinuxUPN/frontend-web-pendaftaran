<template>
  <v-app>
    <homepage-nav-bar />
    <v-main class="grey lighten-4">
      <v-container class="error-page fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div class="text-center">
              <h1 class="display-1">&#128533;</h1>
              <h1 class="display-1 mt-5 mb-3">
                HTTP {{ errorData.statusCode }}
              </h1>
              <h1 class="display-1">{{ errorData.message }}</h1>
              <v-btn class="mt-8" outlined to="/" color="primary">
                KEMBALI KE HALAMAN UTAMA
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType, useMeta } from '@nuxtjs/composition-api'
import { NuxtError } from '@nuxt/types'

import setAuthMiddleware from '@/middleware/auth/set-auth'

/*
 * Layout error
 *
 * Tampilan layout ini mirip dengan layout homepage, akan tetapi
 * isinya spesifik untuk menyusun tampilan web ketika terjadi error / maintenance
 */
export default defineComponent({
  layout: 'empty',
  middleware: setAuthMiddleware,
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      default: null,
    },
  },
  setup(props) {
    const { title } = useMeta()
    const errorData: NuxtError = {
      statusCode: 500,
      message: 'Something went wrong',
    }

    if (props.error) {
      title.value = props.error.message
      errorData.statusCode = props.error.statusCode
      errorData.message = props.error.message
    } else {
      title.value = errorData.message
    }

    return {
      errorData,
    }
  },
  head: {
    title: 'Halaman Error',
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
