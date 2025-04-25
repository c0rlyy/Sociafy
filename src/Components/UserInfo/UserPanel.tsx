import { UserResponseDataT } from "../../types/user";
import { highNumbersConverter } from "../../utils/helpers";
import DefaultAvatar from "../Avatar/Avatar";
import UserImage from "../Avatar/UserImage";
import Badge from "../Badge/Badge";
import { useEffect, useRef, useState } from "react";
import { UserMe, UserT } from "../../types/auth";
import { getImageUrlFromBlob } from "../Post/PostItem";
import { useError } from "../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../utils/error";
import { getFileBlobData } from "../../api/file";
import { getProfileFollowCounts } from "../../api/follow";
import UserAvatar from "./UserAvatar";
import { FollowCounts } from "../../types/follow";
import { useNavigate } from "react-router-dom";

type UserInfoCardProps = {
  user: UserMe;
};

export default function UserPanel({ user }: UserInfoCardProps) {
  const [followCounts, setFollowCounts] = useState<FollowCounts>({
    followers: 0,
    followed: 0,
  });
  const navigate = useNavigate();
  const { showError } = useError();

  useEffect(() => {
    const fetchFollowCounts = async () => {
      try {
        if (!user.profile) throw Error("Error while fetching user data");
        const counts = await getProfileFollowCounts(user.profile.profile_id);
        setFollowCounts(counts);
      } catch (error) {
        tryCatchErrorHandler(error, showError);
      }
    };

    fetchFollowCounts();
  }, [user.profile, showError]);

  return (
    <div className="absolute right-0 top-10 z-10 flex flex-col gap-4 rounded-md bg-white px-2 py-4">
      <span
        onClick={() => navigate("/profile/:id")}
        className="cursor-pointer bg-white font-semibold"
      >
        {user?.user_name}
      </span>
      <span>followed: {highNumbersConverter(followCounts.followed || 0)}</span>
      <span>
        followers: {highNumbersConverter(followCounts.followers || 0)}
      </span>
    </div>
  );
}
