import login from "../LoginForm/LoginForm.module.css";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SociafyLogo from "../../../assets/SVG 2/Sociafy.svg";
import { loginForm, useAuth } from "../../../store/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
type loginFormScreen = {
  mdScreen: boolean;
};
export type LoginProps = {
  access_token: string;
  token_type: string;
};
type loginType = {
  username: string;
  password: string;
};
const LoginForm: React.FC<loginFormScreen> = ({ mdScreen }) => {
  const { loginAction } = useAuth();
  const [formValidation, setformValidation] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState(false);
  const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });
  const navigation = useNavigate();
  // Validation before redirecting to /MainPage
  const onSubmit = async (data: loginForm) => {
    try {
      const token = await loginAction(data);
      if (token) {
        navigation("/MainPage");
        console.log("Successfully logged in");
      } else {
        throw new Error("Sorry, something went wrong");
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };
  return (
    <div
      className={` ${
        mdScreen ? "col-[3/4]" : "col-[1/-1]"
      } flex h-full w-screen flex-col items-center gap-3 rounded-lg bg-[#F3F4F6] p-3 shadow-md  shadow-[#329CE5] lg:h-auto lg:w-3/4 lg:justify-start `}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={login.loginForm}>
        <picture className={login.logoContainer}>
          <img className={login.logo} src={`${SociafyLogo}`} alt="" />
        </picture>
        <div className={login.inputs}>
          <div className={login.loginField}>
            <input
              className={login.loginInput}
              type="text"
              {...register("username")}
            />
            <label htmlFor="email" className={login.label}>
              Username
            </label>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          <div className={login.loginField}>
            <input
              className={login.loginInput}
              type="password"
              {...register("password")}
            />
            <label className={login.label} htmlFor="password">
              Password
            </label>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="self-center justify-self-center">
            <input
              className="w-full bg-[#009fe3] p-2 font-bold text-white"
              type="submit"
              value={"Sign In"}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </form>
      <div className={login.loginButtonsContainer}>
        <Link to={"/Register"}>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md bg-[#BFBFBF] p-2 text-center text-[clamp(.8rem,1.3vw,1rem)] font-bold text-white"
            value={"Sign Up"}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
