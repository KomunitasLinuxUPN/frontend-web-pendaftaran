<template>
  <v-snackbar
    v-model="snackbarState.snackbarIsDisplayed"
    :timeout="5000"
    bottom
    :color="snackbarState.snackbarStatus"
  >
    {{ snackbarState.message }}
    <template #action="{ attrs }">
      <v-btn text color="white" v-bind="attrs" @click="closeSnackbar()">
        TUTUP
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  UnwrapRef,
} from '@nuxtjs/composition-api'

export enum SnackbarStatus {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export interface InfoSnackbarData {
  snackbarIsDisplayed: boolean
  message: string | null
  snackbarStatus: SnackbarStatus
}

export function useInfoSnackbar() {
  const snackbarData = reactive<InfoSnackbarData>({
    snackbarIsDisplayed: false,
    message: null,
    snackbarStatus: SnackbarStatus.INFO,
  })

  return {
    snackbarData,
  }
}

export default defineComponent({
  props: {
    snackbarData: {
      type: Object as PropType<UnwrapRef<InfoSnackbarData>>,
      required: true,
    },
  },
  setup(props) {
    function closeSnackbar() {
      /* eslint-disable vue/no-mutating-props */
      props.snackbarData.snackbarIsDisplayed = false
      props.snackbarData.message = null
      props.snackbarData.snackbarStatus = SnackbarStatus.INFO
    }

    return {
      snackbarState: props.snackbarData,
      closeSnackbar,
    }
  },
})
</script>
