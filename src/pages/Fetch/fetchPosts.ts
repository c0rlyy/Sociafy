import { Cookies } from "react-cookie";
import fetchReels from "./fetchReels";
export type CurrentUserPostProps = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: PostFilesProps[];
};
type PostFilesProps = {
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
const fetchPosts = async (): Promise<CurrentUserPost | null> => {
  try {
    const response = await fetch(
      "http://localhost:8000/posts?skip=0&limit=100",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      console.log("Successfully posts loaded");
      console.log(data);
      return data;
    } else {
      return new Error("Error occured");
    }
  } catch (error) {
    console.log(error?.message);
  }
};
export default fetchPosts;
