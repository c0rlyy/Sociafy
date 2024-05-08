import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { PostFilesProps } from "./fetchPosts";
export type CurrentUserProfilePosts = {
  post_title: string;
  post_id: number;
  post_description: string;
  profile_id: number;
  user_id: number;
  post_files: [] | PostFilesProps[];
  post_photo: "";
};
const FetchMyPosts = async ({
  params,
}): Promise<CurrentUserProfilePosts | null> => {
  try {
    const resp = await fetch(
      `http://localhost:8000/posts/me?skip=0&limit=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      },
    );
    if (!resp.ok) {
      console.log(`FetchMyPosts failed:${resp.status}:${resp.statusText} `);
      return null;
    }
    const data = await resp.json();
    console.log(data);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export default FetchMyPosts;
