import reels from "../../mocks/reels.json"
import ReelItem from "./reel-item"
export default function Reels(){
  return (
    <article className="flex justify-start items-center px-2 py-3 border gap-3 ">
      { reels.map((reel)=>(
        <ReelItem key={reel.id}/>
      ))}
    </article>
  )
}
