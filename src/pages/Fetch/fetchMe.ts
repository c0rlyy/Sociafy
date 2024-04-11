import React from "react";

export type UserProfileProps = {
  email: string;
  user_name: string;
  id: number;
  profile: {
    description: string;
    profile_id: number;
    picture_id: number;
  };
};
type UserPictureProp = {
  picture_url: string;
};
export const fetchMePicture = async (picture_id: number) => {
  try {
    const response = await fetch(
      `http://localhost:8000/file-retrive/{${picture_id}}`
    );
    const data: UserPictureProp = await response.json();
    if (!response.ok) {
      throw new Error("Something unusual happened");
    } else {
      console.log("Successfull fetched picture url");
      console.log(data);
    }
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchMe = async (): Promise<UserProfileProps> => {
  try {
    const response = await fetch("http://localhost:8000/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data: UserProfileProps = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      throw new Error();
    }
    if (data) {
      await fetchMePicture(data.profile.picture_id);
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
export default fetchMe;
