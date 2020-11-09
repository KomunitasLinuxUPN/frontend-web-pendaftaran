import { reactive } from '@nuxtjs/composition-api'

import DialogData, { DialogStatus } from '@/models/component-models/DialogData'

export function useDialog() {
  const dialogData = reactive<DialogData>({
    dialogIsOpen: false,
    title: null,
    message: null,
    dialogStatus: DialogStatus.INFO,
  })

  return {
    dialogData,
  }
}
