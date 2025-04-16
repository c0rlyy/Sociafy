import { useEffect, useRef } from "react";
import {
  UserMe,
  UserT,
} from "../../types/auth";
import DefaultAvatar from "../Avatar/Avatar";
import { getImageUrlFromBlob } from "../Post/PostItem";
import { useError } from "../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../utils/error";
import { getFileBlobData } from "../../api/file";
import { UserPorfilePostsWithFollowsCount } from "../../types/profile";

type UserInfoCardProps = {
  user: UserMe;
  userProfileData: UserPorfilePostsWithFollowsCount;
};

export default function UserInfoCard({
  user,
  userProfileData,
}: UserInfoCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const { showError } = useError();

  useEffect(() => {
    if (!user?.profile?.picture_id) return;
    try {
      getFileBlobData(user.profile.picture_id).then((blob) => {
        const url = getImageUrlFromBlob(blob);
        if (imgRef.current) {
          imgRef.current.src = url;
        }
      });
    } catch (e) {
      tryCatchErrorHandler(e, showError);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {user.profile?.picture_id ? (
        <img ref={imgRef} className="max-h-10"></img>
      ) : (
        <DefaultAvatar />
      )}
      <div className="flex flex-col">
        <span>{user?.user_name}</span>
        <span>followed: {userProfileData?.followCounts.followed || 0}</span>
        <span>followers: {userProfileData?.followCounts.followers || 0}</span>
      </div>
    </div>
  );
}
