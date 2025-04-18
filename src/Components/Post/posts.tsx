import posts from "../../mocks/posts.json";
import PostItem from "./post-item";
export default function Posts() {
  // Temporary mocks applied
  return (
    <main className="m-6 flex h-[900px] flex-col rounded-md bg-gray-100 px-4 py-6">
      <h1 className="text-4xl ">Friend's Posts</h1>
      <article className="m-4 grid grid-cols-1   gap-2 overflow-y-scroll  ">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            images={post.imageUrls.map((url) => new File([url], "image.jpg"))}
            username={post.username}
            avatarUrl={post.avatarUrl}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
            createdAt={post.createdAt}
            location={post.location}
            isLiked={post.isLiked}
          />
        ))}
      </article>
    </main>
  );
}
