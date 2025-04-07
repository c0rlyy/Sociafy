import posts from "../../mocks/posts.json"
import Dot from "../Dots/dot"
import PostItem from "./post-item"
export default function Posts() {
  return (
    <main className="flex flex-col px-4 py-6 h-[900px] bg-gray-100 rounded-md m-6">
      <h1 className="text-4xl ">Friend's Posts</h1>
      <article className="grid grid-cols-1 gap-2   m-4 overflow-y-scroll  ">
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
