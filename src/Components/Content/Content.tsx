import Posts from "../Post/posts";
import UpdateNotification from "../Updates/update-notification";
import LatestUpdates from "../Updates/updates";

export default function Content(){
  return (
    <article className="grid lg:grid-cols-[1fr_358px] md:grid-cols-1 ">
      <Posts/>
      <LatestUpdates/>
    </article>
  )
}
