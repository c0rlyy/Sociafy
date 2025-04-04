import UserImage from "../../../public/assets/Icons/User.png"
export default function DefaultAvatar() {
  return (
    <picture className="rounded-full size-8 bg-gray-400">
      <img className="w-full h-full" src={UserImage} alt="user" />
    </picture>
  )
}
