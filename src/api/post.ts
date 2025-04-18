import api from "../axios-instance/axios";
import { postURLs } from "../constants";

export type PostDataT = {
  uploaded_files: File[];
  data: string;
};
export const createPost = async (postData: PostDataT) => {
  const { createPostURL } = postURLs;
  const response = await api.post(
    "/posts/create-optional-file",
    {
      uploaded_files: postData.files,
      data: postData.caption,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  console.log(postData);
  return response.data;
};
