import { useEffect, useState } from "react";
import { UserMe } from "../../types/auth";
import { ProfilePost } from "../../types/profile";
import { fetchProfilePosts } from "../../api/post";
import { tryCatchErrorHandler } from "../../utils/error";
import { useError } from "../../store/ErrorContext";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import Loader from "../../pages/Loader/Loader";
import { AxiosError } from "axios";
import PostItem from "../Post/PostItem";
export interface UserPostsProps {
  user: UserMe;
}

export default function UserPosts({ user }: UserPostsProps) {
  const [profilePosts, setProfilePosts] = useState<ProfilePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useError();

  const fetchPaginationData = async (page: number) => {
    try {
      if (!user.profile?.profile_id) throw Error("error while fetching user");
      console.log("i happend here wtf", page);

      const res = await fetchProfilePosts(user.profile.profile_id, page);
      setProfilePosts((prev) => [...prev, ...res]);
    } catch (error) {
      if (error instanceof AxiosError) {
        error.response?.status === 404;
        return;
      }
      console.log(error);

      tryCatchErrorHandler(error, showError);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginationData(1);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (profilePosts.length === 0) {
    return <h1>no post avalible</h1>;
  }

  const mapFn = (v: ProfilePost) => {
    useEffect(() => {
      console.log(v);
    }, [v]);
    return (
      <PostItem
        username={user.user_name}
        avatarUrl={user.profile?.picture_id}
        description={v.post_title}
        imageFiles={v.post_files}
        postId={v.post_id}
        userId={v.user_id}
        key={v.post_id}
      ></PostItem>
    );
  };

  return (
    <InfiniteScroll
      fetchData={fetchPaginationData}
      itemsList={profilePosts}
      mapFn={mapFn}
    />
  );
}
