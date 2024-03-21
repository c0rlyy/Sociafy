import { Cookies } from "react-cookie";

export type CurrentUserProfilePosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
};
const FetchMyPosts = async (): Promise<CurrentUserProfilePosts> => {
  const cookies = new Cookies();
  try {
    const resp = await fetch(`http://127.0.0.1:8000/me/posts`, {
      headers: {
        "Content-Type": "application/json",
        token: cookies.get("token"),
      },
    });
    const data = await resp.json();
    console.log(data);
    if (!resp.ok) {
      console.log("Something went wrong");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default FetchMyPosts;
