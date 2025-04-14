import { useEffect, useRef } from "react";
import { UserPorfilePostsWithFollowsCount, UserT } from "../../types/auth";
import DefaultAvatar from "../Avatar/Avatar";
import { getFileBlobData } from "../../api/auth";
import { getImageUrlFromBlob } from "../Post/PostItem";

type UserInfoCardProps = {
  user: UserT;
  userProfileData: UserPorfilePostsWithFollowsCount;
};

export default function UserInfoCard({
  user,
  userProfileData,
}: UserInfoCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);

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
      console.log(e);
    }
  }, [user?.profile?.profile_id]);

  return (
    <div className="flex h-screen">
      {user.profile?.picture_id ? (
        <img ref={imgRef} className="max-h-10"></img>
      ) : (
        <DefaultAvatar />
      )}
      <div className="flex flex-col">
        <span>{user?.user_name}</span>
        <span>followed: {userProfileData?.followCounts.followed}</span>
        <span>followers: {userProfileData?.followCounts.followers || 0}</span>
      </div>
    </div>
  );
}
