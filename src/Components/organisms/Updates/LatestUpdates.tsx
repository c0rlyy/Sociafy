import { latestUpdates } from "../../../mocks/latest-updates.json";
import { Box } from "../../atoms/Container/Container.tsx";
import { GridItem } from "../../atoms/GridItem/GridItem.tsx";
import UpdateNotification from "./UpdateNotification.ts.tsx";
export default function LatestUpdates() {
  return (
    <GridItem className=" overflow-scroll" colStart={2} colEnd={3}>
      <Box className=" h-full w-full overflow-scroll ">
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
      </Box>
    </GridItem>
  );
}
