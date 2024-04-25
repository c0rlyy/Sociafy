import React, { useEffect, useState } from "react";
import { CurrentUserProfilePosts } from "../pages/Fetch/fetchMyPosts";
import useToken from "./useToken";

type Props = {};

const useFetchMyPost = () => {
  const token = useToken();
  const [userPosts, setUserPosts] = useState<CurrentUserProfilePosts[] | null>(
    null,
  );
  useEffect(() => {
    const fetchMePosts = async (): Promise<boolean> => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/posts/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Failed to fetchUserPosts: ${response.status}: ${response.statusText}`,
          );
        }
        const data: CurrentUserProfilePosts = await response.json();
        if (data) {
          setUserPosts(data);
          return true;
        }
      } catch (error) {
        console.error(error?.message);
      }
    };
    fetchMePosts();
  });
  return { userPosts };
};

export default useFetchMyPost;
