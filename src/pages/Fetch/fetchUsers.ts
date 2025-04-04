import { Cookies } from "react-cookie";

export type UserProfileProps = {
  email: string;
  user_name: string;
  id: number;
  profile: {
    description: string | null;
    profile_id: number;
    picture_id: number | null;
  };
};
const fetchUsers = async (): Promise<UserProfileProps> => {
  const cookies = new Cookies();
  try {
    const resp = await fetch("http://127.0.0.1:8000/me/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: cookies.get("token"),
        cors: "Access-Control-Allow-Origin",
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }

    const users = await resp.json();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default fetchUsers;
