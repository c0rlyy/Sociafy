import { File } from "./file";

export type likePostResult = {
  post_id: number;
  profile_id: number;
  profile_likes: number;
};
export type UpdatedPosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: PostFilesProps[];
  username: string | undefined;
  post_photo: string;
  post_film: string;
  profile_picture: string;
  post_likes: number;
  post_comments: ReadComments[];
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

export interface UserPostData {
  post_title: string;
  post_description: string;
  post_id: number;
  profile_id: number;
  user_id: number;
  post_files: File[];
}

export interface Post {
  post_title: string;
  post_description: string;
  post_id: number;
  profile_id: number;
  user_id: number;
  post_files: File[];
}
