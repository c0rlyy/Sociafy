import { UserResponseDataT } from "../../types/user";
import { highNumbersConverter } from "../../utils/helpers";
import DefaultAvatar from "../Avatar/Avatar";
import UserImage from "../Avatar/UserImage";
import Badge from "../Badge/Badge";
import type { UserData } from "../../types/user";
import FollowedBadge from "../Badge/FollowedBadge";
import FollowersBadge from "../Badge/FollowersBadge";
import { usePopoverStore } from "../../store/popover-store.";
type UserInfoCardProps={
  user:UserData,
  userProfileData:UserResponseDataT
}
export default function UserInfoCard({ user, userProfileData }:  UserInfoCardProps ) {

  return (
    <div  className="absolute top-0 right-0 items-center justify-center flex-col px-1  py-3 gap-2">
      <div className="flex items-center gap-2 ">
      {user?.profile?.picture_id ? (
          <UserImage apiUrl={`http://localhost:8000/api/v1/file-retrive/${user?.profile?.picture_id}`} />
      ) : (
        <DefaultAvatar />
      )}
      {/* <div className="md:flex flex-col  gap-2 hidden">
        <span className="font-semibold text-xs">{user?.user_name}</span>
        <Badge badgeText="Photographer" />
        <span className="text-gray-300 text-xs ">Fashion Designer</span>
      </div>
      </div>
      <div className="md:flex flex-col hidden">
        <div className="flex items-center gap-2 ">
      <FollowedBadge followedNum={highNumbersConverter(userProfileData?.followCounts?.followers || 0)}/>
      <FollowersBadge followers={highNumbersConverter(userProfileData?.followCounts.followers || 0)}/>
        </div> */}
      </div>
    </div>
  );
}
