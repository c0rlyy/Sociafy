
import api from "../axios-instance/axios";
import { FetchCommentCountRes } from "../types/comment";



export const fetchCommentsCount = async (
  postId: number,
): Promise<FetchCommentCountRes> => {
  try {
    const response = await api.get(`/comment-count/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error)
    throw error
  }
};
