import { Cookies } from "react-cookie";

export type UserProfileProps = {
  user_id: number;
  profile_id: number;
  user_name: string;
  exp: number;
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
