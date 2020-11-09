<template>
  <v-row justify="center">
    <v-dialog v-model="dialog.dialogIsOpen" max-width="400">
      <v-card>
        <v-card-title class="headline white--text" :class="dialog.dialogStatus">
          {{ dialog.title }}
        </v-card-title>

        <v-card-text class="subtitle-1 mt-5">{{ dialog.message }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeDialog">TUTUP</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType, UnwrapRef } from '@nuxtjs/composition-api'

import DialogData, { DialogStatus } from '@/models/component-models/DialogData'

export default defineComponent({
  props: {
    dialogData: {
      type: Object as PropType<UnwrapRef<DialogData>>,
      required: true,
    },
  },
  setup(props) {
    function closeDialog() {
      props.dialogData.dialogIsOpen = false
      props.dialogData.title = null
      props.dialogData.message = null
      props.dialogData.dialogStatus = DialogStatus.INFO
    }

    return {
      dialog: props.dialogData,
      closeDialog,
    }
  },
})
</script>
