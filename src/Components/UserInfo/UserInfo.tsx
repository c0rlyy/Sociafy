import { useAuthStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../pages/Loader/Loader";
import {
  getProfileFollowCounts,
  getUserProfileWithPosts,
} from "../../api/auth";
import UserInfoCard from "./UserInfoCard";
import PostItem from "../Post/PostItem";
import { UserPorfilePostsWithFollowsCount, UserT } from "../../types/auth";

export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));
  const [userProfileData, setUserProfileData] = useState<
    UserPorfilePostsWithFollowsCount | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  //TODO handle error in a better way coz it fucking sucks
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (!user?.profile) throw Error("error while fetching user");

        const profileId = user.profile.profile_id;
        const [userProfileData, followCounts] = await Promise.all([
          getUserProfileWithPosts(profileId),
          getProfileFollowCounts(profileId),
        ]);

        setUserProfileData({
          userProfileData,
          followCounts,
        } as UserPorfilePostsWithFollowsCount);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="flex h-screen w-max overflow-scroll">
      <UserInfoCard
        user={user as UserT}
        userProfileData={userProfileData as UserPorfilePostsWithFollowsCount}
      ></UserInfoCard>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {userProfileData?.userProfileData.posts.map((post) => {
          return (
            <PostItem
              avatarFileId={user?.profile?.picture_id}
              username={user?.user_name as string}
              description={
                userProfileData?.userProfileData.description as string
              }
              imageFiles={post.post_files}
              postId={post.post_id}
              key={post.post_id}
            ></PostItem>
          );
        })}
      </div>
    </div>
  );
}
