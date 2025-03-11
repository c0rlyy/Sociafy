import login from "../LoginForm/LoginForm.module.css";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SociafyLogo from "../../../assets/SVG 2/Sociafy.svg";
import { loginForm, useAuth } from "../../../store/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError, z } from "zod";
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
  const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
  });
  const navigation = useNavigate();
  const onSubmit = async (data: loginForm) => {
    try {
      console.log(isSubmitting)
      const token = await loginAction(data);
      if (token) {
        navigation("/MainPage");
        console.log("Successfully logged in");
      } else {
        throw new Error("Sorry, something went wrong");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(`Check if your credentials met requirements: ${error}`)
      }
      else {
        throw new Error(error)
      }
    }
  };
  return (
    <div
      className={" lg:col-[3/4] md:col-[3/3] sm:col-[1/-1] col-[1/-1] flex h-1/2 w-screen flex-col items-center gap-3 rounded-lg bg-[#F3F4F6] p-3 shadow-md  shadow-[#329CE5] lg:h-1/2  lg:w-full lg:justify-start "}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={login.loginForm}>
        <picture className={login.logoContainer}>
          <img className={login.logo} src={`${SociafyLogo}`} alt="sociafy-logo" />
        </picture>
        <div className={login.inputs}>
          <div className={login.loginField}>
            <input
              className={login.loginInput}
              type="text"
              {...register("username")}
            />
            <label htmlFor="email">
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
            <label htmlFor="password">
              Password
            </label>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex  w-full gap-2  p-4 justify-center ">
            <button
              className={` ${isSubmitting ? "bg-opacity-50": "bg-opacity-100"} bg-[#009fe3] w-1/2 px-4 py-2 rounded-md font-normal text-white text-md hover:bg-[#0080b5] transition duration-300 border`}
              type="submit"
              value={"Sign In"}
              disabled={isSubmitting}
            >
              Sign In
          </button>
            <button
              type="submit"
              className="w-1/2 cursor-pointer rounded-md bg-[#33BFFF] hover:bg-[#005F8A] p-2 text-center text-md font-normal hover:bg-[#A6A6A6] transition duration-300 text-white"
              value={"Sign Up"}
            >
          <Link to={"/Register"}>
              Sign Up
          </Link>
            </button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
