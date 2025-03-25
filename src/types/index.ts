export type User = {
  email?:string|null
  username:string | null
  password:string |null
}
export type AuthorizedT = {
  access_token:string | null,
  refresh_token:string | null
}
type ModalDataT = {
  [key: string]:string
}
export interface ModalStore {
  isOpen:boolean,
  open:()=>void
  close: () => void
  onConfirm:()=>void
  modalType: string
  modalData: string,
  setModalData:()=>void

}
