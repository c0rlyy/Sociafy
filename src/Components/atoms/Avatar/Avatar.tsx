import { ReactElement } from "react";
import { Box } from "../Container/Container";
import { Image } from "../Image/Image";
import { Stack } from "../Stack/Stack";

type AvatarPropsT = {
  variant: "default" | "user";
  imageUrl?: string;
  hasNotificationDot?: boolean;
  notificationAmount?: number;
  size?: "sm" | "lg" | "md";
  className?: string;
  onClickHandler?: () => void;
};

type NotificationDotPropsT = {
  position?: "left" | "right";
  amount?: number;
};

function NotificationDot({
  position = "right",
  amount,
}: NotificationDotPropsT) {
  const getPositionClasses = () => {
    if (position === "left") return "top-0 left-0";
    if (position === "right") return "top-0 right-0";
    return "top-0 right-0"; // fallback
  };

  const baseClass =
    "absolute flex items-center justify-center w-2 h-2 rounded-full bg-thistle-200 text-xs text-white";
  const notificationDotClasses = [baseClass, getPositionClasses()].join(" ");

  return (
    <div className={notificationDotClasses}>
      {amount !== undefined && amount > 0 ? <span>{amount}</span> : null}
    </div>
  );
}

export default function Avatar({
  variant,
  imageUrl,
  hasNotificationDot,
  notificationAmount,
  size = "sm",
  onClickHandler,
  className,
}: AvatarPropsT) {
  const sizeAvatarClasses = {
    sm: "size-6",
    md: "size-8",
    lg: "size-12",
  };
  const avatarBaseClasses =
    "relative rounded-full overflow-hidden bg-background";
  const avatarClasses = [
    avatarBaseClasses,
    sizeAvatarClasses[size],
    className,
  ].join();

  return (
    <Box onClick={onClickHandler} className={avatarClasses}>
      <Stack justify="center" align="center">
        {hasNotificationDot && <NotificationDot amount={notificationAmount} />}
        {variant === "default" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-user"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        ) : imageUrl ? (
          <Box className={sizeAvatarClasses[size]}>
            <Image src={imageUrl} />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
}
