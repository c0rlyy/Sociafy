import { createContext, ReactNode, useContext, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { LoginProps } from "../pages/Forms/LoginForm/LoginForm";
import {
  RegisterState,
  SuccessfullRegister,
} from "../pages/Forms/SignUp/RegisterForm";
export type loginForm = {
  username: string;
  password: string;
};
type AuthContextType = {
  getTokenFromLS: () => string | null | redirect;
  setTokenToLS: (
    server_token: string,
    token_type: string,
  ) => { access_token: void; token_type: void };
  logoutHandler: () => void;
  logged: boolean;
  setIsLogged: (value: boolean) => void;
  loginAction: (data: loginForm) => Promise<LoginProps | null>;
  registerAction: (
    formData: RegisterState,
  ) => Promise<SuccessfullRegister | Response | undefined>;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
// In future automation of headers authorization needs to be provide
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [logged, setIsLogged] = useState<boolean>(false);
  const setTokenToLS = (server_token: string, token_type: string) => {
    const token = {
      access_token: localStorage.setItem("access_token", server_token),
      token_type: localStorage.setItem("token_type", token_type),
    };
    return token;
  };
  const getTokenFromLS = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return redirect("/");
    }
    return token;
  };
  const logoutHandler = () => {
    setIsLogged(false);
    localStorage.clear();
    return redirect("/");
  };
  const loginAction = async (data: loginForm) => {
    console.log(data);
    const fetchValidation = async (): Promise<
      LoginProps | undefined | null
    > => {
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
          alert("Incorrect username or password");
          return null;
        }
        const loginData: LoginProps = await response.json();
        if (loginData) {
          return loginData;
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchValidationResult = await fetchValidation();
    if (!fetchValidationResult) {
      return null;
    }
    setTokenToLS(
      fetchValidationResult.access_token,
      fetchValidationResult.token_type,
    );
    setIsLogged(true);
    return fetchValidationResult;
  };
  const registerAction = async (
    formData: RegisterState,
  ): Promise<SuccessfullRegister | Response| undefined> => {
    const submission = {
      email: formData.email,
      user_name: formData.username,
      password: formData.password,
    };
    console.log(submission);
    const fetchAddUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: submission?.email,
            password: submission?.password,
            user_name: submission?.user_name,
          }),
        });
        if (!response.ok) {
          throw new Error(
            `HTTP Failed to create Profile ${response.status}: ${response.statusText}`,
          );
        }
        const data: SuccessfullRegister = await response.json();
        if (data) {
          return data;
        }
      } catch (error: any) {
        console.error(error?.message);
      }
    };
    const fetchAddUserValid= await fetchAddUser()
    if(fetchAddUserValid){
      setTokenToLS(fetchAddUserValid.access_token, fetchAddUserValid.token_type);
    }
    return fetchAddUserValid;
  };

  return (
    <AuthContext.Provider
      value={{
        getTokenFromLS,
        setTokenToLS,
        logoutHandler,
        logged,
        setIsLogged,
        loginAction,
        registerAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
