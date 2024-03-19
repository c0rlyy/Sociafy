import { Cookies } from "react-cookie";
type createPostProps={
    token:string;
    post_title:string;
}
const createPost = async ({params}:{params:string}) => {
  const cookies = new Cookies();
  const response = await fetch("http://localhost:8000/posts/", {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("token"),
      post_title:params
    }),
  });
};

export default createPost;