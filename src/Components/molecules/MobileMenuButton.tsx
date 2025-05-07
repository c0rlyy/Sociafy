import { Stack } from "../atoms/Stack/Stack";
import { Paragraph } from "../atoms/Typography/Typography";
import Icon from "./Icon/Icon";

export default function MobileMenuButton({
  buttonName,
  children,
  handler,
}: {
  buttonName: string;
  children: React.ReactNode;
  handler?: () => void;
}) {
  return (
    <Stack direction="col" align="center" gap="sm">
      <Icon handler={handler}>{children}</Icon>
      <Paragraph size="sm" className="text-center">
        {buttonName}
      </Paragraph>
    </Stack>
  );
}
