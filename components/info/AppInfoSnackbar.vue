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

/*
 * Enum SnackbarStatus; untuk menentukan warna snackbar
 */
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

/*
 * Hook useInfoSnackbar()
 *
 * Gunakan hook ini untuk menampilkan dan mengisi snackbar,
 * yakni dengan mengubah2 isi dari objek snackbarData
 */
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

/*
 * Komponen AppInfoSnackbar
 *
 * Komponen ini digunakan untuk menampilkan snackbar info yang berupa text
 *
 * Tampilan dari komponen ini dikontrol oleh objek snackbarData yang
 * ada di hook useInfoSnackbar(). Jadi, untuk menampilkan dan mengisi snackbar
 * silahkan ubah2 isi dari objek snackbarData yang ada di hook useInfoSnackbar()
 *
 * Anda tidak perlu menulis kode untuk menutup snackbar ini karena sudah
 * dihandle dari internal oleh fungsi closeSnackbar() di bawah
 *
 * Lihat contoh penggunaan komponen ini di komponen AdminNavBar.vue
 */
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
