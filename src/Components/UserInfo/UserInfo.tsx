import { useAuthStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import Loader from "../../pages/Loader/Loader";
import {} from "../../api/auth";
import UserInfoCard from "./UserInfoCard";
import PostItem from "../Post/PostItem";
import { useError } from "../../store/ErrorContext";
import { tryCatchErrorHandler } from "../../utils/error";
import { getProfileFollowCounts } from "../../api/follow";
import { getUserProfileWithPosts } from "../../api/profile";
import { UserPorfilePostsWithFollowsCount } from "../../types/profile";

export default function UserInfo() {
  const getUser = useAuthStore((state) => state.getUser);
  const user = useAuthStore(useShallow((state) => state.user));

  const [userProfileData, setUserProfileData] = useState<
    UserPorfilePostsWithFollowsCount | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();

  //TODO mayvbe move state down
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
        tryCatchErrorHandler(error, showError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!user || !userProfileData) {
    showError({ error: "error while getting user data, logging out" });
    return;
  }

  return (
    <div className="flex h-screen w-max overflow-scroll">
      <UserInfoCard
        user={user}
        userProfileData={userProfileData}
      ></UserInfoCard>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
        {userProfileData?.userProfileData.posts.map((post) => {
          return (
            <PostItem
              avatarFileId={user?.profile?.picture_id}
              description={userProfileData?.userProfileData.description}
              imageFiles={post.post_files}
              postId={post.post_id}
              key={post.post_id}
              userId={post.user_id}
            ></PostItem>
          );
        })}
      </div>
    </div>
  );
}
