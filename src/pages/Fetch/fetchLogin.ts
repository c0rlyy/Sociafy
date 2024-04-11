import React from "react";
import { LoginProps } from "../Forms/LoginForm/LoginForm";

export const fetchLogin = async (): Promise<LoginProps> => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoia3drMTIzIiwiZW1haWwiOiJrd0BvcC5wbCIsInByb2ZpbGVfaWQiOjEsImV4cCI6MTcxMjY1Mjk2OX0.1YfLO6xQfxljrGxax6d7Ys8VbI8g0cni0SPQQhgxfU0",
      },
    });
    const data = await response.json();
    const objectData = {
      access_token: data?.access_token,
      token_type: data?.token_type,
    };
    console.log(objectData);
    if (response.ok) {
      console.log("Successfully logged in");
    } else {
      console.log(objectData);
      throw new Error("Error occured");
    }
    if (data) {
      return objectData;
    }
  } catch (error) {
    console.log(error);
  }
};

export default fetchLogin;
