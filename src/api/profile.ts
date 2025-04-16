
import api from "../axios-instance/axios";
export const getUserProfileWithPosts = async (
  profileId: number,
  page: number = 0,
): Promise<UserProfileWithPosts> => {
  try {
    const response = await api.get(`/profile/${profileId}/posts?skip${page}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error);
    throw error;
  }
};
