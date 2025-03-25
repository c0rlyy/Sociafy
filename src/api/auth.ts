import axios, { AxiosError, AxiosPromise, isAxiosError } from "axios";
import { authURL } from "../constants";
import type {  AuthorizedT, User } from "../types";

const { loginURL, registerURL } = authURL;
export const login = async (userData: User):Promise<AuthorizedT | undefined> => {
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
export const addUser = async (data: User): Promise<AuthorizedT | undefined> => {
  try {
    const response = await axios.post(registerURL, {
      email: data.email,
      password: data.password,
      user_name: data.username,
    });
    return response?.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(`Axios Error: ${error.message}`);
    }
    throw new Error(`Unexpected error occurred: ${String(error)}`);
  }
};
