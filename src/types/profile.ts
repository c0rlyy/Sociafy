import { File } from "./file";
import { Post } from "./post";

export interface UserProfileWithPosts {
  description: string | null;
  profile_id: number;
  posts: Post[];
}

export interface ProfilePost {
  post_title:string,
  post_description:string,
  post_id:number,
  profile_id:number
  user_id:number,
  post_files:File[]
}
