<template>
  <v-row justify="center">
    <v-dialog v-model="dialog.dialogIsOpen" max-width="290">
      <v-card>
        <v-card-title class="headline primary white--text">
          Terjadi Kesalahan
        </v-card-title>

        <v-card-text class="subtitle-1 mt-5">{{ dialog.message }}</v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="$emit('close-dialog')">
            Tutup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

import DialogData from '@/models/component-models/DialogData'

export default defineComponent({
  props: {
    dialogData: {
      type: Object as PropType<DialogData>,
      required: true,
    },
  },
  emits: ['close-dialog'],
  setup(props) {
    return {
      dialog: props.dialogData,
    }
  },
})
</script>
