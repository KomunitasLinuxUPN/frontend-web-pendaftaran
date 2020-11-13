<template>
  <v-app>
    <registration-nav-bar />
    <v-main class="grey lighten-4">
      <v-container class="error-page fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <div class="text-center">
              <h1 v-if="error.statusCode === 404" class="display-1">
                {{ pageNotFound }}
              </h1>
              <h1 v-else class="display-1">
                {{ otherError }}
              </h1>
              <v-btn class="mt-8" outlined nuxt to="/" color="primary">
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
import { defineComponent, ref, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {
    title: 'Halaman Error',
  },
  setup(props) {
    const pageNotFound = ref('404 Not Found')
    const otherError = ref('An error occurred')

    const { title } = useMeta()
    title.value =
      props.error.statusCode === 404 ? pageNotFound.value : otherError.value

    return {
      pageNotFound,
      otherError,
    }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
