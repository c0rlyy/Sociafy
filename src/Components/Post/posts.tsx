import posts from "../../mocks/posts.json"
import Dot from "../Dots/dot"
import PostItem from "./post-item"
export default function Posts() {
  return (
    <main className="flex flex-col px-2 py-3 h-[780px]">
      <h1 className="text-4xl">Friend's Posts</h1>
      <article className="grid grid-cols-1 gap-2  border-red-500 p-3 overflow-y-scroll ">
        { posts.map((post)=>(
        <PostItem key={post.id}
          imageUrls={post.imageUrls}
          username={post.username}
          avatarUrl={post.avatarUrl}
          caption={post.caption}
          likes={post.likes}
          comments={post.comments}
          createdAt={post.createdAt}
          location={post.location}
          isLiked={ post.isLiked}
          />
      ))}
      </article>


    </main>
  )
}
