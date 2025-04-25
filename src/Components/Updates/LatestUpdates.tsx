import { latestUpdates } from "../../mocks/latest-updates.json";
import UpdateNotification from "./update-notification";
export default function LatestUpdates() {
  return (
    <aside className="flex h-full flex-col gap-4 px-2 py-3 ">
      <div className=" h-full overflow-y-scroll">
        {latestUpdates.map((notific) => (
          <UpdateNotification
            description={notific.caption}
            key={notific.id}
            username={notific.username}
            caption={notific.caption}
            avatarUrl={notific.avatarUrl}
            topics={notific.topics}
            imageUrls={notific.imageUrls}
          />
        ))}
      </div>
    </aside>
  );
}
