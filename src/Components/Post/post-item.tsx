import DefaultAvatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import Dots from "../Dots/dots"
type PostItemPropsT={
  username:string,
  avatarUrl:string,
  imageUrls:string[],
  caption:string,
  likes:number,
  comments:number,
  createdAt:string,
  location:string,
  isLiked: boolean;
}
export default function PostItem({
  username,
  avatarUrl,
  imageUrls,
  caption,
  likes,
  comments,
  createdAt,
  location,
  isLiked
}:PostItemPropsT) {
  return (
    <div className="flex h-[500px]  justify-between flex-col relative border-8 border-slate-800 gap-4">
        <main className=" w-full h-full relative ">
          <div className="flex relative h-2/3 w-full aspect-square border-4 border-green-400">
        {imageUrls.map((url,index)=>(
          <picture key={index} className=" absolute top-0 left-0 h-full w-full">
            <img className="w-full h-full object-cover" src={ url} alt="" />
          </picture>
        )) }
          </div>
          {/* <Dots/> */}
          <div className=" flex flex-col  gap-2 border-4 border-blue-500 px-1 py-3">
          <span className="truncate text-ellipsis">{ caption}</span>
          <Badge className="w-[100px] items-center px-2" badgeText={location } />
          <div className="flex items-center gap-2 border-2 border-yellow-500">
          <DefaultAvatar/>
            <span className="text-sm font-bold">{ username}</span>
          </div>
          </div>
        </main>
    </div>

  )
}
