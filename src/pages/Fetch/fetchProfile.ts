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

const fetchProfile = async (id): Promise<UserProps> => {
  try {
    const response = await fetch(`https://localhost:8000/profile/{${id}}`, {
      headers: {
        "Content-Type": "Application/json",
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
