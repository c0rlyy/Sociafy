import Button from "../Button/Button";
import { Box } from "../Container/Container";

import { Image } from "../Image/Image";
import { Stack } from "../Stack/Stack";
export default function PreviewImage({
  url,
  removeFileHandlerProp,
}: {
  url: string;
  removeFileHandlerProp: () => void;
}) {
  return (
    <Box rounded="lg" className="relative size-32">
      <Box className="relative h-full w-full">
        <Stack
          className="h-full w-full"
          direction="col"
          justify="center"
          gap="sm"
        >
          <Image src={url} />
          <Button
            type="button"
            onClick={removeFileHandlerProp}
            size="sm"
            variant="secondary"
            className="w-full"
          >
            Remove
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
