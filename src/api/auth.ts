import axios, { AxiosError } from "axios";
import { authURL } from "../constants";
import type {  User } from "../types";
export const login = async (userData: User) => {
  const { loginURL } = authURL;
  try {
    const response = await axios.post(
      loginURL,
      new URLSearchParams(userData).toString(), // Convert to x-www-form-urlencoded
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`)
    }
      throw new Error(`Error occurred: ${error}`,)
  }
};
