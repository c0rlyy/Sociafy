import { AxiosError, isAxiosError } from "axios";
import api from "../axios-instance/axios";
import type {
  AuthorizedT,
  FollowCounts,
  UserMe,
  UserProfileWithPosts,
  UserT,
} from "../types/auth";
import toast from "react-hot-toast";

export const login = async (
  userData: UserT,
): Promise<AuthorizedT | undefined> => {
  try {
    const response = await api.post(
      "/login/access-token",
      {
        username: userData.username,
        password: userData.password,
      },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.detail);
      throw error.response?.data.detail;
    }
    toast.error("Server Error");
    throw new Error("Server error");
  }
};

export const addUser = async (data: UserT): Promise<AuthorizedT> => {
  try {
    const response = await api.post("/users", {
      email: data.email,
      password: data.password,
      user_name: data.username,
    });

    console.log(response.data);
    toast.success("Successfully registered account !");
    return response?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.detail);
      throw new Error(error?.response?.data?.detail);
    }
    throw new Error(`Unexpected error occurred: ${String(error)}`);
  }
};
export const getUserData = async (): Promise<UserMe> => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const getUserDataById = async (id: number): Promise<UserMe> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const getUserProfileWithPosts = async (
  profileId: number,
): Promise<UserProfileWithPosts> => {
  try {
    const response = await api.get(`/profile/${profileId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error);
    throw error;
  }
};

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

export const getProfileFollowCounts = async (
  profileId: number,
): Promise<FollowCounts> => {
  try {
    const response = await api.get(`follows/follow-counts/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile posts:", error);
    throw error;
  }
};
