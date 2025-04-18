export type FollowedUsersResT = {
  username: string;
  user_id: string;
  profile_description: string | null;
  picture_id: number | null;
  profile_id: number;
  follower_id: number;
};

export type FollowersUsersResT = {
  username: string;
  user_id: string;
  profile_description: string | null;
  picture_id: number | null;
  profile_id: number;
  follows_profile_id: number;
};

export interface FollowCounts {
  followers: number;
  followed: number;
}
