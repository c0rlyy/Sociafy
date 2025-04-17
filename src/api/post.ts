import api from "../axios-instance/axios";
import { ProfilePost } from "../types/profile";

export async function fetchProfilePosts(
  profileId: number,
  page: number,
  limit: number = 10,
): Promise<ProfilePost[]> {
  try {
    const res = await api.get(
      `/profile-posts/${profileId}?skip=${(page - 1) * 10}&limit=${limit}`,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
