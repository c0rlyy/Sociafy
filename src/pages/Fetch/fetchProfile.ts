import { Cookies } from "react-cookie";
import FetchMyPosts from "./fetchMyPosts";

export type ProfileProps = {
  user_id: number;
  profile_id: number;
  user_name: string;
  exp: number;
};

const fetchProfile = async (): Promise<ProfileProps> => {
  const cookies = new Cookies();
  try {
    const response = await fetch("https://localhost:8000/me/user", {
      headers: {
        "Content-Type": "Application/json",
        token: cookies.get("token"),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    } else {
      await FetchMyPosts();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchProfile;
