import { usePopoverStore } from "../../store/popover-store."
export default function UserImage({apiUrl }:{apiUrl:string}) {
  const {openPopover, popoverType }=usePopoverStore()
  const openPopoverHandler=()=>{
  if(popoverType==="user-popup"){
    openPopover()
  }
  }
  return (
    <picture onClick={openPopoverHandler} className="size-8 rounded-full flex items-center ">
      <img className="w-full h-full" src={apiUrl} alt="user-image" />
    </picture>
  )
}
