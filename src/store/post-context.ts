import { createContext } from "react";
import sampleReel1 from "../assets/sampleReel1.jpg";
import sampleReel2 from "../assets/sampleReel2.jpg";
import sampleReel3 from "../assets/sampleReel3.jpg";
import sampleReel4 from "../assets/sampleReel4.jpg";
import kampus from "../assets/kampus.jpg";

type PostType = "colorful" | "default";
type Post = {
  id: number;
  author: string;
  email: string;
  authorImg: string;
  postTitle: string;
  postContent: string;
  likes: number;
  postImage: string;
};
type PostContextTypes = {
  posts: Post[];
};
const PostContext = createContext<PostContextTypes>({
  posts: [
    {
      postImage: sampleReel1,
      id: 3,
      author: "BeautyWorld",
      authorImg: sampleReel1,
      email: "c0rly@backend.com",
      postTitle: "Surrounded by wonder",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
    {
      id: 1,
      author: "WorldOfOurs",
      email: "dundunek1@yahoo.com",
      authorImg: sampleReel2,
      postImage: sampleReel2,
      postTitle: "Such a beautifull landscapes",
      postContent: "Such a beautifull landscapes",
      likes: 1000,
    },
    {
      postImage: sampleReel3,
      id: 2,
      author: "WondersofNature",
      email: "rafalstawarz69@wp.pl",
      authorImg: sampleReel3,
      postTitle: "Frekwencja to moje drugie imię",
      postContent:
        "Jestem bardzo punktualnym studentem, polecam również Tobie.",
      likes: 578,
    },

    {
      postImage: sampleReel4,
      id: 3,
      author: "StunningViews",
      authorImg: sampleReel4,
      email: "rovgarth@onet.pl",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
  ],
});
export default PostContext;
//
