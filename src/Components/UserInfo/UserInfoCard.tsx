import { useEffect, useRef, useState } from "react";
import { UserMe, UserT } from "../../types/auth";
import DefaultAvatar from "../Avatar/Avatar";
import { getImageUrlFromBlob } from "../Post/PostItem";
import { useError } from "../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../utils/error";
import { getFileBlobData } from "../../api/file";
import { getProfileFollowCounts } from "../../api/follow";
import UserAvatar from "./UserAvatar";
import { FollowCounts } from "../../types/follow";

type UserInfoCardProps = {
  user: UserMe;
};

export default function UserInfoCard({ user }: UserInfoCardProps) {
  const followedRefs = useRef<HTMLSpanElement>(null);
  const followersRefs = useRef<HTMLSpanElement>(null);
  const { showError } = useError();

  useEffect(() => {
    try {
      if (!user.profile) throw Error("error while fetchiung user data");
      getProfileFollowCounts(user.profile.profile_id).then((res) => {
        if (followedRefs.current && followersRefs.current) {
          followersRefs.current.innerText = `followers: ${res.followers || 0}`;
          followedRefs.current.innerText = `followed: ${res.followed || 0}`;
        }
      });
    } catch (e) {
      tryCatchErrorHandler(e, showError);
    }
  }, []);

  return (
    <div className="flex ">
      <UserAvatar profilePicutreId={user.profile?.picture_id}></UserAvatar>
      <div className="flex flex-col">
        <span>{user?.user_name}</span>
        <span ref={followedRefs}>followed: </span>
        <span ref={followersRefs}>followers: </span>
      </div>
    </div>
  );
}
