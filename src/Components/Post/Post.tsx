import { useContext, useReducer, useState } from "react";
import PostContext from "../../store/post-context";
import PostItem from "./PostItem";
import { useLoaderData } from "react-router";
import classes from "./Post.module.css";
type initStateTypes = {
  author: string;
  content: string;
  contentImg: string;
  title: string;
};
const INIT_STATE: initStateTypes = {
  author: "",
  content: "",
  contentImg: "",
  title: "",
};
const reducerFunc = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        author: action.payload.createdBy,
        content: action.payload.content,
        contentImg: action.payload.contentImg,
        title: action.payload.title,
      };
    case "FETCH_FAILED":
      throw new Error("Failed fetching data");
    default:
      return state;
  }
};
// Fetching Posts
function Post() {
  const [serverResponse, setServerResponse] = useState(false);
  const postCtx = useContext(PostContext);
  const postsArr: [] = [];
  return (
    <>
      <div className="order-2 h-1/2 flex-col flex  gap-9 p-4"></div>
    </>
  );
}
export default Post;
