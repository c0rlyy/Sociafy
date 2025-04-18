import api from "../axios-instance/axios";

export const fetchLikesCount = async (
  postId: number,
): Promise<FetchLikeCountRes> => {
  try {
    const response = await api.get(`/count-likes/post/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
