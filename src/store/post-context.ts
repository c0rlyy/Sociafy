import { createContext } from "react";
import kubaPng from "../assets/kubus.jpg";
import rafalPng from "../assets/rafal.jpg";
import ja_wyciety from "../assets/Ja_wyciety.png";
type PostType = "colorful" | "default";
type Post = {
  id: string;
  author: string;
  email: string;
  authorImg: unknown;
  postTitle: string;
  postContent: string;
  likes: number;
  postType: PostType;
};
type PostContextTypes = {
  posts: Post[];
};
const PostContext = createContext<PostContextTypes>({
  posts: [
    {
      id: "1",
      author: "dundunek1",
      email: "dundunek1@yahoo.com",
      authorImg: kubaPng,
      postTitle: "Dlaczego uwielbiam ćwiczyć o 8.00 rano",
      postContent:
        "WSiZ jako jedna z najlepszych uczelni w Polsce oferuje atrakcyjną jakoś kształcenia pod względem Wychowania Fizycznego, umożliwiając studentom rozwinięcie swoich zdolności fizycznych jak np chodzenie na czworaka.",
      likes: 1000,
      postType: "default",
    },
    {
      id: "2",
      author: "rafalstawarz69",
      email: "rafalstawarz69@interia.pl",
      authorImg: rafalPng,
      postTitle: "Frekwencja to moje drugie imię",
      postContent:
        "Jestem bardzo punktualnym studentem, polecam również Tobie.",
      likes: 578,
      postType: "default",
    },
    {
      id: "3",
      author: "rovgart",
      authorImg: ja_wyciety,
      email: "rovgarth@onet.pl",
      postTitle: "Kocham naszą uczelnie",
      postContent: "Kocham Wsiz",
      likes: 1,
      postType: "default",
    },
  ],
});
export default PostContext;
//
