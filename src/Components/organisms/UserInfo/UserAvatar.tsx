import { useAuthStore } from "../../../store/auth-store.";
import Avatar from "../../atoms/Avatar/Avatar";

type UserAvatarProps = {
  clickHandler?: () => void;
};

export default function UserAvatar({ clickHandler }: UserAvatarProps) {
  const { profilePictureUrl } = useAuthStore();

  return (
    <>
      {profilePictureUrl ? (
        <Avatar
          hasNotificationDot
          size="md"
          onClickHandler={clickHandler}
          variant="user"
          imageUrl={profilePictureUrl}
        />
      ) : (
        <Avatar hasNotificationDot variant="default" />
      )}
    </>
  );
}
