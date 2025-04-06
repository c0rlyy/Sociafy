import Badge from "../Badge/Badge";
import DefaultAvatar from "../Avatar/Avatar";
import { useAuthStore } from "../../store/authStore";

export default function UserInfo() {
  const {user }=useAuthStore()
  console.log(user)
  return (
    <div className="flex gap-4 justify-end items-center  w-full  ">

        <DefaultAvatar/>
      <div className="flex gap-1 flex-col justify-center border px-2 py-3">
        <span>John Doe</span>
        <span>{ user?.username}</span>
        <Badge badgeText="Photographer"/>
        <span className="text-gray-300 font-light text-sm">Fashion Designer</span>
      </div>
    </div>
  )
}
