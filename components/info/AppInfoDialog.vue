<template>
  <v-row justify="center">
    <v-dialog v-model="data.dialogIsOpen" max-width="400">
      <v-card>
        <v-card-title class="headline white--text" :class="data.dialogStatus">
          {{ data.title }}
        </v-card-title>

        <v-card-text class="subtitle-1 mt-5">{{ data.message }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">TUTUP</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  UnwrapRef,
} from '@nuxtjs/composition-api'

/*
 * Enum DialogStatus; untuk menentukan warna dialog
 */
export enum DialogStatus {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export interface InfoDialogData {
  dialogIsOpen: boolean
  title: string | null
  message: string | null
  dialogStatus: DialogStatus
}

/*
 * Hook useInfoDialog()
 *
 * Gunakan hook ini untuk menampilkan dan mengisi dialog, yakni dengan mengubah2
 * isi dari objek dialogData
 */
export function useInfoDialog() {
  const dialogData = reactive<InfoDialogData>({
    dialogIsOpen: false,
    title: null,
    message: null,
    dialogStatus: DialogStatus.INFO,
  })

  return {
    dialogData,
  }
}

/*
 * Komponen AppInfoDialog
 *
 * Komponen ini digunakan untuk menampilkan dialog info yang berupa title & text
 *
 * Tampilan dari komponen ini dikontrol oleh objek dialogData yang
 * ada di hook useInfoDialog(). Jadi, untuk menampilkan dan mengisi dialog
 * silahkan ubah2 isi dari objek dialogData yang ada di hook useInfoDialog()
 *
 * Anda tidak perlu menulis kode untuk menutup dialog ini karena sudah dihandle
 * dari internal oleh fungsi closeDialog() di bawah
 *
 * Lihat contoh penggunaan komponen ini di komponen RegisterMemberCard.vue
 */
export default defineComponent({
  props: {
    dialogData: {
      type: Object as PropType<UnwrapRef<InfoDialogData>>,
      required: true,
    },
  },
  setup(props) {
    /* eslint-disable vue/no-mutating-props */
    function closeDialog() {
      props.dialogData.dialogIsOpen = false
      props.dialogData.title = null
      props.dialogData.message = null
      props.dialogData.dialogStatus = DialogStatus.INFO
    }

    return {
      data: props.dialogData,
      closeDialog,
    }
  },
})
</script>
