<template>
  <v-app dark>
    <v-col cols="12">
      <div class="text-center">
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <nuxt-link to="/"> Home page </nuxt-link>
      </div>
    </v-col>
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
  head: {},
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
