import DefaultAvatar from "../Avatar/Avatar"
import Badge from "../Badge/Badge"

type UpdateNotificationT = {
  username:string,
  caption:string,
  avatarUrl:string,
  topics:string[],
  description:string,
  imageUrls:string[],
}
export default function UpdateNotification({
  username,
  caption,
  topics,
  imageUrls,
  description

}:UpdateNotificationT) {
  return (
    <div className="flex gap-2 px-2 py-4 border-b min-h-[152px]  ">
      <div className="size-20 relative aspect-square">
      { imageUrls.map((url,index)=>(
        <picture key={index} className="w-full h-full cursor-pointer absolute top-0 ">
          <img className="w-full h-full" src={url} alt="" />
        </picture>
      ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="w-[20ch] text-xl  font-bold h-full truncate">{caption }</h2>
        <div className="flex gap-2 items-center flex-wrap">
        { topics.map((topic,index)=>(
          <Badge key={index} badgeText={topic}/>
        ))}
        </div>
        <span className="truncate">{ description}</span>
        <div className="flex items-center gap-2">
          <DefaultAvatar/>
          <span className="text-sm">{ username}</span>
        </div>
      </div>
    </div>
  )
}
