import axios, { AxiosError, AxiosPromise, isAxiosError } from "axios";
import { authURL } from "../constants";
import type {  AuthorizedT, User } from "../types";
import toast from "react-hot-toast";

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
    if (error instanceof AxiosError)
    {
      toast.error(error.response?.data.detail)
      throw error.response?.data.detail
    }
      toast.error("Server Error")
      throw new Error('Server error')
  }
};
export const addUser = async (data: User): Promise<AuthorizedT> => {
  try {
    const response = await axios.post(registerURL, {
      email: data.email,
      password: data.password,
      user_name: data.username,
    });
    console.log(response.data)
    toast.success("Successfully registered account !")
    return response?.data
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.detail)
      throw new Error(error?.response?.data?.detail);
    }
    throw new Error(`Unexpected error occurred: ${String(error)}`);
  }
};
