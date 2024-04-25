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
  post_photo: string;
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
const fetchPosts = async (): Promise<CurrentUserPost | []> => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return redirect("/");
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
      const data = await response.json();
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
    } catch (error) {
      console.log(error?.message);
    }
  }
};

export default fetchPosts;
