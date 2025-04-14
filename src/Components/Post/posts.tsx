import posts from "../../mocks/posts.json";
import { Post, UserT } from "../../types/auth";
import PostItem, {PostItemPropsT} from "./PostItem";

type PostsProps = {
  posts:PostItemPropsT[]
}

export default function Posts({posts}:PostsProps) {
  return (
    <main className="flex h-[780px] flex-col px-2 py-3">
      <article className="grid grid-cols-1 gap-2  overflow-y-scroll border-red-500 p-3 ">
        {/* {posts.map((post) => (
          <PostItem
            key={post.postId}
            postId={post.postId}
            imageFiles={post.imageFiles}
            username={post.username}
            description={post.description}
            avatarFileId={post.avatarFileId}
            countOfComments={post.countOfComments}
            countOfLikes={post.countOfLikes}
          />
        ))} */}
      </article>
    </main>
  );
}
