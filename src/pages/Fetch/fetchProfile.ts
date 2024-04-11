import { Cookies } from "react-cookie";
import FetchMyPosts from "./fetchMyPosts";

export type UserProps = {
  email: string;
  user_name: string;
  id: number;
  profile: ProfileProps[];
};
type ProfileProps = {
  description: string;
  profile_id: number;
  picture_id: number;
};

const fetchProfile = async (): Promise<UserProps> => {
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchProfile;
