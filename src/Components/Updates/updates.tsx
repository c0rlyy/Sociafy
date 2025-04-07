import { latestUpdates} from "../../mocks/latest-updates.json"
import UpdateNotification from "./update-notification"
export default function LatestUpdates() {
  return (
    <aside className="flex flex-col px-2 py-3 gap-4 h-[873px]  min-h-[152px] ">
      <h1 className="text-4xl">Latest Updates</h1>
      <div className="h-full overflow-y-scroll ">
      { latestUpdates.map((notific)=>(
        <UpdateNotification
          key={notific.id}
          username={notific.username}
          caption={ notific.caption}
          avatarUrl={ notific.avatarUrl}
          topics={notific.topics}
          imageUrls={notific.imageUrls}
        />
      ))}
      </div>
    </aside>
  )
}
