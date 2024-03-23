import { Cookies } from "react-cookie";
import fetchReels from "./fetchReels";
export type CurrentUserPostProps = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
};
export type CurrentUserPost = {
  posts: CurrentUserPost[];
};
const fetchPosts = async (): Promise<CurrentUserPostProps[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error({ message: "Posts hadn't been fetched." });
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default fetchPosts;