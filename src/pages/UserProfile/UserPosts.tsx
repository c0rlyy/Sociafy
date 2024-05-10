import React from "react";
import UserProfileProps from "../Fetch/fetchUsers";
import { CurrentUserProfilePosts } from "../Fetch/fetchMyPosts";
import PostPreview from "./PostModal/PostPreview";
import { useProfile } from "../../store/UserProfile-context";
import { useQuery } from "@tanstack/react-query";
import userProfile from "./UserProfile.module.css";
export type UserProfilePostProps = {
  postIMAGEID: number;
  postID: number;
  userID: number;
  profileID: number;
  postDESCRIPTION: string;
  postIMAGE: string;
  isOpened: boolean;
  postFILMS: string;
  profileIMAGE: string;
  postTITLE: string;
  profileUSERNAME: string;
  profileFILM: string;
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
  profileIMAGE,
  profileUSERNAME,
  postTITLE,
}) => {
  const { openState } = useProfile();
  return (
    <>
      <picture
        data-id={postID}
        className={userProfile.profile__image_container}
      >
        {postIMAGE && (
          <img
            className={userProfile.profile__image_film}
            src={postIMAGE}
            alt=""
          />
        )}
        {postFILMS && (
          <img
            controls
            src={postFILMS}
            playsInline
            className={userProfile.profile__image_film}
            title="Post Film"
            loop
          />
        )}
      </picture>
    </>
  );
};

export default UserPosts;
