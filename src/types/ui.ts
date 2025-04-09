export type popoverStoreT={
  isPopoverOpened:boolean,
  popoverData:string,
  setPopoverData:(data:any)=>void,
  popoverType:"user-popup" | "",
  openPopover:()=>void,
  closePopover:()=>void,
}
