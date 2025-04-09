import Badge from "../Badge/Badge";
import DefaultAvatar from "../Avatar/Avatar";
import { useAuthStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../pages/Loader/Loader";
import Popover from "../Popover/Popover";
import {
  FollowCounts,
  getFileBlobData,
  getProfileFollowCounts,
  getUserProfileWithPosts,
  UserProfileWithPosts,
} from "../../api/auth";
import UserInfoCard from "./UserInfoCard";
import UserPopover from "../Popover/UserPopover";
import { usePopoverStore } from "../../store/popoverStore";

export interface UserPorfilePostsWithFollowsCount {
  userProfileData: UserProfileWithPosts;
  followCounts: FollowCounts;
}

export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const userLoading = useAuthStore((state) => state.loadingUserData);
  const [userProfileData, setUserProfileData] = useState<
    UserPorfilePostsWithFollowsCount | undefined
  >();
  const {popoverType, isPopoverOpened }=usePopoverStore()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user && user.profile) {
        const profilePostData = await getUserProfileWithPosts(
          user.profile.profile_id,
        );
        const profileFollowCounts = await getProfileFollowCounts(
          user.profile.profile_id,
        );
        console.log(user)
        const fullData = {
          followCounts: profileFollowCounts,
          userProfileData: profilePostData,
        } as UserPorfilePostsWithFollowsCount;
        console.log(fullData);
        setUserProfileData(fullData);
      }
    };
    fetchUser();
  }, []);

  if (userLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className=" self-end h-full center flex ">
      {popoverType ==="user-popup" && isPopoverOpened && <UserPopover userData={user} userProfileData={userProfileData}/> }
      <UserInfoCard  user={user} userProfileData={userProfileData}/>
      {/* This code below should be implemented inside of /userProfile page  */}


      {/* <div className="ml-4  flex-1 overflow-y-auto">
        {userProfileData?.userProfileData?.posts.map((post) => (
          <div key={post.post_id} className="mb-4 rounded-md border p-2">
            <p className="font-bold">{post.post_title}</p>
            <p className="text-sm">{post.post_description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.post_files.map((file) => {
                const isImage =
                  file.file_type.startsWith("i") ||
                  file.file_type.startsWith("p");
                const isVideo =
                  file.file_type.startsWith("m") ||
                  file.file_type.startsWith("v");
                return (
                  <div key={file.file_id}>
                    {isImage && (
                      <img
                        src={`http://localhost:8000/api/v1/file-retrive/${file.file_id}`}
                        alt="post image"
                        className="mt-1 h-32 w-32 rounded-md object-cover"
                      />
                    )}
                    {isVideo && (
                      <video
                        controls
                        className="mt-1 h-32 w-32 rounded-md object-cover"
                      >
                        <source
                          src={`http://localhost:8000/api/v1/file-retrive/${file.file_id}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
