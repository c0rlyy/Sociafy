import axios, { isAxiosError } from "axios";
import api from "../axios-instance/axios";
import { FollowCounts } from "../types/auth";
import { FollowedUsersResT, FollowersUsersResT } from "../types/follow";



export async function fetchFollowed(
  profileId: number,
  page: number = 0,
): Promise<FollowedUsersResT> {
  try {
    const res = await axios.get(
      `follows/profile-followed/${profileId}?skip=${page}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function fetchFollowers(
  profileId: number,
  page: number = 0,
): Promise<FollowersUsersResT> {
  try {
    const res = await axios.get(
      `follows/profile-followers/${profileId}?skip=${page}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
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
