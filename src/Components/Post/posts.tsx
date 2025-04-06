import posts from "../../mocks/posts.json"
import Dot from "../Dots/dot"
import PostItem from "./post-item"
export default function Posts() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-8 h-screen border-red-500 ">
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

    </main>
  )
}
