import { Cookies } from "react-cookie";

const fetchReels = async () => {
  const cookies = new Cookies();
  try {
    const response = await fetch("https:localhost:8000/me/reels", {
      headers: {
        "Content-Type": "application/json",
        token: cookies.get("token"),
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchReels;
