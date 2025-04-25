import { z } from "zod";
import type { postSchema } from "../schemas/schemas";

export type Post = {
  id: number;
  author: string;
  email: string;
  authorImg: string;
  postTitle: string;
  postContent: string;
  likes: number;
  postImage: string;
};
export type likePostResult = {
  post_id: number;
  profile_id: number;
  profile_likes: number;
};

export type ReadComments = {
  username: string;
  user_id: number;
  profile_id: number;
  profile_description: string | null;
  profile_picture_id: number | null;
  post_id: number;
  comment_content: string;
};

type ValidationErrors = {
  [K in keyof PostData]?: string;
};
type PostData = z.infer<typeof postSchema>;

export interface PostStoreT {
  postData: PostData;
  errors: ValidationErrors;
  updateField: <K extends keyof PostData>(field: K, value: PostData[K]) => void;
  removePostFile: (index: number) => void;
  flushPostData: () => void;
}

export interface UserPostData {
  post_title: string;
  post_description: string;
  post_id: number;
  profile_id: number;
  user_id: number;
  post_files: File[];
}
