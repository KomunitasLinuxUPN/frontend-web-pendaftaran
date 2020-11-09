export enum DialogStatus {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
}

export default interface DialogData {
  dialogIsOpen: boolean
  title: string | null
  message: string | null
  dialogStatus: DialogStatus
}
