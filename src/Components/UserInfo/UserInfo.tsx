import Badge from "../Badge/Badge";
import DefaultAvatar from "../Avatar/Avatar";
import { useAuthStore } from "../../store/authStore";

export default function UserInfo() {
  const {user }=useAuthStore()
  console.log(user)
  return (
    <div className="flex gap-4 justify-end items-center border w-full ">
      <DefaultAvatar/>
      <div className="flex gap-1 flex-col justify-center">
        <span>John Doe</span>
        <span>{ user?.username}</span>
        <Badge badgeText="Photographer"/>
        <span className="text-grey-300">Fashion Designer</span>

      </div>
    </div>
  )
}
