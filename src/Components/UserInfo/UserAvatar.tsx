import DefaultAvatar from "../Avatar/Avatar";
import { useAuthStore } from "../../store/auth-store.";

type UserAvatarProps = {
  clickHandler?: () => void;
};

export default function UserAvatar({ clickHandler }: UserAvatarProps) {
  const { profilePictureUrl } = useAuthStore();

  return (
    <div className="cursor-pointer " onClick={clickHandler}>
      {profilePictureUrl ? (
        <div className="flex size-10 items-center overflow-hidden rounded-full  border-gray-400">
          <img
            src={profilePictureUrl}
            className=" flex h-full w-full items-center justify-center object-cover"
            alt="User Avatar"
          />
        </div>
      ) : (
        <DefaultAvatar />
      )}
    </div>
  );
}
