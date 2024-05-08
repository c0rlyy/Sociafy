import React from "react";
import UserProfileProps from "../Fetch/fetchUsers";
import { CurrentUserProfilePosts } from "../Fetch/fetchMyPosts";
import PostPreview from "./PostModal/PostPreview";
import { useProfile } from "../../store/UserProfile-context";
import { useQuery } from "@tanstack/react-query";
export type UserProfilePostProps = {
  postIMAGEID: number;
  postID: number;
  userID: number;
  profileID: number;
  postDESCRIPTION: string;
  postIMAGE: string;
  isOpened: boolean;
  postFILMS: string;
};
const UserPosts: React.FC<UserProfilePostProps> = ({
  postIMAGEID,
  postID,
  userID,
  profileID,
  postDESCRIPTION,
  postIMAGE,
  postFILMS,
  isOpened,
}) => {
  return (
    <>
      <picture data-id={postID} className="h-full w-full">
        {postIMAGE && (
          <img
            className="h-full w-full overflow-hidden object-cover"
            src={postIMAGE}
            alt=""
          />
        )}
        {postFILMS && (
          <video
            controls
            src={postFILMS}
            playsInline
            className="h-full w-full"
            title="Post Film"
            loop
          ></video>
        )}
        {isOpened ? (
          <PostPreview
            postIMAGEID={postIMAGEID}
            postID={postID}
            userID={postID}
            profileID={profileID}
            postDESCRIPTION={postDESCRIPTION}
            postIMAGE={postIMAGE}
            isOpened={false}
            postFILMS={postFILMS}
          />
        ) : (
          ""
        )}
      </picture>
    </>
  );
};

export default UserPosts;
