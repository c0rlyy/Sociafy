import Popover from "./Popover";
import type { UserData, UserResponseDataT } from "../../types/user";
import { usePopoverStore } from "../../store/popover-store.";
import { highNumbersConverter } from "../../utils/helpers";
import FollowersBadge from "../atoms/Badge/FollowersBadge";
import FollowedBadge from "../atoms/Badge/FollowedBadge";
import { useNavigate } from "react-router-dom";
type UserPopoverPropsT = {
  userData: UserData;
  userProfileData: UserResponseDataT;
};
export default function UserPopover({
  userData,
  userProfileData,
}: UserPopoverPropsT) {
  console.log(userData);
  const { closePopover, popoverType } = usePopoverStore();
  const navigate = useNavigate();
  const closeUserPopover = () => {
    if (popoverType === "user-popup") closePopover();
  };
  // To consider: generating unique identifiers
  const navigateIntoUserPage = () => {
    navigate(`/${userData?.user_name}`);
  };
  return (
    <Popover
      className="absolute right-0 top-12 z-20"
      closeHandler={closeUserPopover}
    >
      <Popover.Header>
        <div onKeyDown={closeUserPopover} onClick={navigateIntoUserPage}>
          <span className="cursor-pointer">{userData?.user_name}</span>
        </div>
      </Popover.Header>
      <Popover.Footer>
        <div className="flex items-center justify-center p-2">
          <FollowersBadge
            followers={highNumbersConverter(
              userProfileData?.followCounts?.followers || 0,
            )}
          />
          <FollowedBadge
            followedNum={highNumbersConverter(
              userProfileData?.followCounts?.followed || 0,
            )}
          />
        </div>
      </Popover.Footer>
    </Popover>
  );
}
