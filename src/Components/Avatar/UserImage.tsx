export default function UserImage({apiUrl }:{apiUrl:string}) {
  return (
    <picture className="size-8 rounded-full flex items-center ">
      <img className="w-full h-full" src={apiUrl} alt="user-image" />
    </picture>
  )
}
