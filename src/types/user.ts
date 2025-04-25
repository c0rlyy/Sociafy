import type { Post } from "../api/auth"
import { ProfileT } from "./auth"
type followCountsT={
  followers:number,
  followed:number,
}
type UserProfileDataT={
  description:string | null,
  profile_id:number,
  posts:Post[] | []
}
export interface UserResponseDataT {
  followCounts: followCountsT,
  userProfileData:UserProfileDataT
}
export interface UserData {
  email:string,
  user_name:string,
  id:number,
  profile:ProfileT
}
