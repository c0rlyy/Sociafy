import { UserPorfilePostsWithFollowsCount, UserT } from "../../types/auth";
import DefaultAvatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";

type UserInfoCardProps = {
  user: UserT;
  userProfileData: UserPorfilePostsWithFollowsCount;
};

export default function UserInfoCard({
  user,
  userProfileData,
}: UserInfoCardProps) {
  return (
    <div className="flex h-screen">
      {user?.profile?.picture_id ? (
        <img
          src={`http://localhost:8000/api/v1/file-retrive/${user?.profile?.picture_id}`}
          className="max-h-10"
        ></img>
      ) : (
        <DefaultAvatar />
      )}
      <div className="flex flex-col">
        <span>{user?.user_name}</span>
        <span>followed: {userProfileData?.followCounts.followed}</span>
        <span>followers: {userProfileData?.followCounts.followers || 0}</span>
        <Badge badgeText="Photographer" />
        <span className="text-grey-300">Fashion Designer</span>
      </div>
    </div>
  );
}
