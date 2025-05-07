import posts from "../../../mocks/posts.json";
import Dot from "./dot";

export default function Dots() {
  return (
    <div className="absolute bottom-5">
      {posts?.imageUrls?.map((dot) => <Dot />)}
    </div>
  );
}
