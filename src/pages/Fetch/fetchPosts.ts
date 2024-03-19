import { Cookies } from "react-cookie";
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
    const cookies = new Cookies();
    const response = await fetch("http://127.0.0.1:8000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: cookies.get("token"),
      },
    });
    if (!response.ok) {
      console.log("Something went wrong");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Cos sie wyjebalo");
  }
};
export default fetchPosts;
