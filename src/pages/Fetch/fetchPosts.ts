import { Cookies } from "react-cookie";
import { redirect } from "react-router-dom";
import fetchReels from "./fetchReels";
export type CurrentUserPostProps = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: PostFilesProps[];
  username: string;
};
export type PostFilesProps = {
  path: string;
  file_type: string;
  file_id: number;
};
export type CurrentUserPost = {
  posts: CurrentUserPost[];
  theme: string;
  darkProps: string;
  lightProps: string;
};
export const fetchPosts = async (): Promise<
  CurrentUserPostProps[] | null | undefined
> => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
  } else {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/posts?skip=0&limit=100",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data: CurrentUserPostProps[] = await response.json();
      if (!response.ok) {
        console.log(
          `HTTP Response Error ${response.status}:${response.statusText}`,
        );
        return [];
      }
      if (data) {
        console.log(data);
        return data;
      }
      return null;
    } catch (error: any) {
      console.log(error?.message);
    }
  }
};

export default fetchPosts;
