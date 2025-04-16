
import api from "../axios-instance/axios";
export const getFileBlobData = async (fileId: number): Promise<Blob> => {
  try {
    const response = await api.get(`/file-retrive/${fileId}`, {
      responseType: "blob",
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error);
    throw error;
  }
};
