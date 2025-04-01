export type User = {
  email?:string|null
  username:string | null
  password:string |null
}
export type AuthorizedT = {
  access_token:string ,
  refresh_token:string,
}
type ModalDataT = {
  [key: string]: string
} | "";
export type ModalType ="sign-up"|""
export interface ModalStore {
  open:(modalType:ModalType)=>void
  isOpen:boolean,
  onConfirm:()=>void
  setModalData:(data:ModalDataT)=>void,
  modalType:ModalType,
  close:()=>void

}
