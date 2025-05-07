import DefaultAvatar from "../../atoms/Avatar/Avatar";

import { Box } from "../../atoms/Container/Container";
import { Image } from "../../atoms/Image/Image";
import { Stack } from "../../atoms/Stack/Stack";
import { Paragraph } from "../../atoms/Typography/Typography";
import BadgeList from "../BadgeList/BadgeList";
type UpdateNotificationT = {
  username: string;
  caption: string;
  avatarUrl: string;
  topics: string[];
  description: string;
  imageUrls: string[];
};
export default function UpdateNotification({
  username,
  caption,
  topics,
  imageUrls,
  description,
}: UpdateNotificationT) {
  return (
    <Box shadow="md" padding="md" className="w-full gap-2 ">
      <Box>
        <Stack direction="row" justify="center" align="center">
          <Box className="relative aspect-square size-36">
            {imageUrls.map((url, index) => (
              <Box className="absolute right-0 top-0 h-full w-full ">
                <Image src={url} alt={`image-${index}`} />
              </Box>
            ))}
          </Box>
          <Box>
            <Stack direction="col" justify="start" align="start" gap="sm">
              <Paragraph className="h-full w-[20ch] truncate text-xl font-bold">
                {caption}
              </Paragraph>
              <BadgeList topics={topics} />
              <Box className="w-[35ch] ">
                <Paragraph size="sm" className="w-full truncate">
                  {description}
                </Paragraph>
              </Box>
              <Box className="flex items-center gap-2">
                <Stack direction="row" justify="center" align="center">
                  <DefaultAvatar variant="default" />
                  <Paragraph size="sm">{username}</Paragraph>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
