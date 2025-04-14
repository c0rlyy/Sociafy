import { isAxiosError } from "axios";
import api from "../axios-instance/axios";
import toast from "react-hot-toast";

interface FetchLikeCountRes {
  post_likes_count: number;
}

interface FetchCommentCountRes {
  post_comments_count: number;
}

export const fetchLikesCount = async (
  postId: number,
): Promise<FetchLikeCountRes> => {
  try {
    const response = await api.get(`/count-likes/post/${postId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.detail);
      throw new Error(error?.response?.data?.detail);
    }
    throw new Error(`Unexpected error occurred: ${String(error)}`);
  }
};

export const fetchCommentsCount = async (
  postId: number,
): Promise<FetchCommentCountRes> => {
  try {
    const response = await api.get(`/comment-count/post/${postId}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.detail);
      throw new Error(error?.response?.data?.detail);
    }
    throw new Error(`Unexpected error occurred: ${String(error)}`);
  }
};
