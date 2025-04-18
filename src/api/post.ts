import api from "../axios-instance/axios";
import { ProfilePost } from "../types/profile";
import { postURLs } from "../constants";

export type PostDataT = {
  uploaded_files: File[];
  data: string;
};
export const createPost = async (postData: PostDataT) => {
  const { createPostURL } = postURLs;

  // Create FormData object for multipart/form-data request
  const formData = new FormData();

  // Add the JSON data as a field
  formData.append(
    "data",
    JSON.stringify({
      post_title: postData.data,
    }),
  );
  if (postData.uploaded_files) {
    postData.uploaded_files.forEach((file) => {
      formData.append("uploaded_files", file);
    });
  }

  // If you have files to upload, you would add them like this:
  // formData.append('uploaded_files', fileObject);

  // Empty array for uploaded_files (if needed)

  const response = await api.post("/posts/create-optional-file", formData);

  console.log(response.data);
  return response.data;
};
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
