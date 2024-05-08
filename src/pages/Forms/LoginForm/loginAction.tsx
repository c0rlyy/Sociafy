import { Navigate, redirect, useNavigate } from "react-router-dom";
import { LoginProps } from "./LoginForm";
type loginForm = {
  username: string;
  password: string;
};
const loginAction = async (data: loginForm) => {
  console.log(data);
  const fetchValidation = async (): Promise<LoginProps | undefined> => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/login/access-token",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: `${data.username}`,
            password: `${data.password}`,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(
          `HTTP Bad Request: ${response.status}: ${response.statusText}`,
        );
      }
      const loginData: LoginProps = await response.json();
      if (!loginData) {
        alert("Failed to login, Try Again");
      }
      return loginData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchValidationResult = await fetchValidation();
  if (!fetchValidationResult) {
    return null;
  }
  localStorage.setItem("access_token", fetchValidationResult.access_token);
  localStorage.setItem("token_type", fetchValidationResult.token_type);

  console.log(fetchValidationResult);
};
export default loginAction;
