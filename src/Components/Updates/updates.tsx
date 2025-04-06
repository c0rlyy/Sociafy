import latestupdates from "../../mocks/latest-updates.json"
import UpdateNotification from "./update-notification"
export default function LatestUpdates() {
  return (
    <aside className="flex flex-col px-2 py-3 gap-4">
      <h1 className="text-4xl">Latest Updates</h1>
      { latestupdates.map((notific)=>(
        <UpdateNotification
          key={notific.id}
          username={notific.username}
          caption={ notific.caption}
          avatarUrl={ notific.avatarUrl}
          topics={notific.topics}
          imageUrls={notific.imageUrls}
        />
      ))}
    </aside>
  )
}
