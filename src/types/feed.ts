import { Post } from "./post";

export interface PostWithImage {
  post_id: number;
  post_title: string;
  post_description: string;
  post_files: any[]; // or more specific
  imageUrl: string;
  // ...other fields
}

export interface FeedStoreT {
  userPosts: PostWithImage[];
  page: number;
  hasMoreUserPosts: boolean;
  isLoadingUserPosts: boolean;
  fetchUserPosts: (
    profile_id: number,
    page: number,
    limit: number,
  ) => Promise<void>;
  setPosts: (posts: PostWithImage[]) => void;
  clearUserPosts: () => void;
}
