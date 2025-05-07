import Badge from "../../atoms/Badge/Badge";
import { Box } from "../../atoms/Container/Container";
import { Stack } from "../../atoms/Stack/Stack";

interface BadgeListPropsT {
  topics: string[];
}
export default function BadgeList({ topics }: BadgeListPropsT) {
  return (
    <Box>
      <Stack direction="row" justify="center">
        {topics.map((topic) => (
          <Badge variant="info" size="medium" text={topic} />
        ))}
      </Stack>
    </Box>
  );
}
