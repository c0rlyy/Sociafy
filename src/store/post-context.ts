import { createContext } from "react";
import kubaPng from "../assets/kubus.jpg";
import rafalPng from "../assets/rafal.jpg";
import ja_wyciety from "../assets/Ja_wyciety.png";
import kampus from "../assets/kampus.jpg";
import miloszPng from "../assets/milosz.jpg";
import mePng from "../assets/me.jpeg";
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
      postImage: kampus,
      id: 3,
      author: "c0rly",
      authorImg: miloszPng,
      email: "c0rly@backend.com",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
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
      email: "rafalstawarz69@wp.pl",
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
      authorImg: mePng,
      email: "rovgarth@onet.pl",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
    },
  ],
});
export default PostContext;
//
