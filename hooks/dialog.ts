import { reactive } from '@nuxtjs/composition-api'

import DialogData from '@/models/component-models/DialogData'

export function useDialog() {
  const dialogData = reactive<DialogData>({
    dialogIsOpen: false,
    title: null,
    message: null,
  })

  function closeDialog() {
    dialogData.dialogIsOpen = false
    dialogData.title = null
    dialogData.message = null
  }

  function openDialog(title: string, message: string) {
    dialogData.dialogIsOpen = true
    dialogData.title = title
    dialogData.message = message
  }

  return {
    dialogData,
    closeDialog,
    openDialog,
  }
}
