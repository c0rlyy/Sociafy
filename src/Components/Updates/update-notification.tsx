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
    <div className="flex gap-2 px-2 py-4">
      <div className="size-20 relative aspect-square">
      { imageUrls.map((url,index)=>(
        <picture key={index} className="w-full h-full absolute top-0 ">
          <img className="w-full h-full" src={url} alt="" />
        </picture>
      ))}
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="w-full truncate text-ellipsis">{caption }</h2>
        <div className="flex gap-2 items-center">
        { topics.map((topic,index)=>(
          <Badge key={index} badgeText={topic}/>
        ))}
        </div>
        <span>{ description}</span>
        <div className="flex items-center gap-2">
          <DefaultAvatar/>
          <span>{ username}</span>
        </div>
      </div>
      <hr/>
    </div>
  )
}
