import { FollowCounts } from "./follow";
import { Post } from "./post";

export interface UserProfileWithPosts {
  description: string | null;
  profile_id: number;
  posts: Post[];
}

export interface UserPorfilePostsWithFollowsCount {
  userProfileData: UserProfileWithPosts;
  followCounts: FollowCounts;
}
