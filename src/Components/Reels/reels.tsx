import reels from "../../mocks/reels.json"
import ReelItem from "./reel-item"
export default function Reels(){
  return (
    <article className="flex w-full self-center h-full overflow-x-scroll justify-center items-center px-2 py-3 gap-3 ">
      <div className="w-full lg:w-1/2 flex gap-2 p-4  overflow-x-scroll no-sc px-2 py-3">
      { reels.map((reel)=>(
        <ReelItem key={reel.id} username={reel.username}/>
      ))}
      </div>
    </article>
  )
}
