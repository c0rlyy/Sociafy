import { Cookies } from "react-cookie";

const fetchPosts = async () => {
  try {
    const cookies = new Cookies();
    const response = await fetch("http://localhost:8000/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: cookies.get("token"),
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Cos sie wyjebalo");
  }
};
export default fetchPosts;
