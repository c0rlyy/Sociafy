import { Cookies } from "react-cookie";

export type CurrentUserProfilePosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
};
const FetchMyPosts = async (): Promise<CurrentUserProfilePosts | null> => {
  try {
    const resp = await fetch(
      `http://localhost:8000/posts/me?skip=0&limit=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await resp.json();
    console.log(data);
    if (!resp.ok) {
      console.log("Something went wrong");
    }
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export default FetchMyPosts;
