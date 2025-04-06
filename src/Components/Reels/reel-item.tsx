import User from "../../../public/assets/Icons/User.png"
export default function ReelItem(){
  return (
    <div className="relative size-12 rounded-full">
      <picture className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 to-blue-500">
        <img
          className="w-full h-full object-cover rounded-full bg-gray-200"
          src={ User}
          alt="Profile" />
      </picture>
    </div>
  )
}
