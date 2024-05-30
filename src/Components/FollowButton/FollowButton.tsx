import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProfile } from "../../store/UserProfile-context";

type Props = {};
const FollowButton = ({ profileID }: { profileID: number | null }) => {
  const { followedProfiles, followUserHandler } = useProfile();
  //   const [isUserFollowed, setIsUserFollowed] = useState(false);
  //   const isUserFollowed=()=>{
  //     // Map through followed
  //     //
  //   }
  useEffect(() => {
    if (followedProfiles) {
      console.log(followedProfiles);
    }
  }, [followedProfiles]);
  return (
    <>
      <Button
        onClick={() => followUserHandler(profileID)}
        className="col-[2/3] row-[3] w-1/4 self-start bg-blue-400"
        style={{ padding: 8 }}
        variant={`${followedProfiles[profileID]?.isFollowed ? "outlined" : "contained"}`}
      >
        {followedProfiles[profileID]?.isFollowed ? "Followed" : "Follow"}
      </Button>
    </>
  );
};

export default FollowButton;
