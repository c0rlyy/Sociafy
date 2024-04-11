import { createContext } from "react";
import kubaPng from "../assets/kubus.jpg";
import rafalPng from "../assets/rafal.jpg";
import ja_wyciety from "../assets/Ja_wyciety.png";
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
      id: 1,
      author: "dundunek1",
      email: "dundunek1@yahoo.com",
      authorImg: kubaPng,
      postImage: kampus,
      postTitle: "Dlaczego uwielbiam ćwiczyć o 8.00 rano",
      postContent: "Such a beautifull landscapes",
      likes: 1000,
    },
    {
      postImage: rafalPng,
      id: 2,
      author: "rafalstawarz69",
      email: "rafalstawarz69@interia.pl",
      authorImg: rafalPng,
      postTitle: "Frekwencja to moje drugie imię",
      postContent:
        "Jestem bardzo punktualnym studentem, polecam również Tobie.",
      likes: 578,
    },
    {
      postImage: ja_wyciety,
      id: 3,
      author: "rovgart",
      authorImg: ja_wyciety,
      email: "rovgarth@onet.pl",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
  ],
});
export default PostContext;
//
