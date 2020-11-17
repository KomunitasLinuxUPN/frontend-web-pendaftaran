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

export default defineComponent({
  props: {
    dialogData: {
      type: Object as PropType<UnwrapRef<InfoDialogData>>,
      required: true,
    },
  },
  setup(props) {
    function closeDialog() {
      /* eslint-disable vue/no-mutating-props */
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
