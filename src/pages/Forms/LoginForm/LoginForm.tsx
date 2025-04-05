import loginCSSModule from "../LoginForm/LoginForm.module.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import SociafyLogo from "../../../../public/assets/SVG 2/Sociafy.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../api/auth";
import { loginSchema } from "../../../schemas/schemas";
import useModalStore from "../../../modalStore/modalStore";
import toast from "react-hot-toast";
import type { UserT } from "../../../types/auth";
import { useAuthStore } from "../../../store/authStore";
type loginFormScreen = {
  mdScreen: boolean;
};
const LoginForm: React.FC<loginFormScreen> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { setToken, getUser,user}=useAuthStore()
  const navigation = useNavigate();
  const { open}=useModalStore()
  const onSubmit = async (data: UserT) => {
      const token = await login(data);
      if (token) {
        setToken(token.access_token)
        toast.success("Successfully Authorized")
        await getUser()
        console.log(user)
        navigation("/home")
      }
  };
  return (
    <div
      className={"lg:col-[3/4] col-[1/-1] flex h-1/2 w-screen flex-col items-center gap-3 rounded-lg bg-[#F3F4F6] p-3 m-4 shadow-md  shadow-[#329CE5] lg:h-1/2 lg:w-full md:w-1/2 sm:w-1/2 lg:justify-start "}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={loginCSSModule.loginForm}>
        <picture className={loginCSSModule.logoContainer}>
          <img className={loginCSSModule.logo} src={`${SociafyLogo}`} alt="sociafy-logo" />
        </picture>
        <div className={loginCSSModule.inputs}>
          <div className={loginCSSModule.loginField}>
            <input
              className={loginCSSModule.loginInput}
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            <label htmlFor="email">
              Username
            </label>
          </div>
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          <div className={loginCSSModule.loginField}>
            <input
              className={loginCSSModule.loginInput}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <label htmlFor="password">
              Password
            </label>
          </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
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
              type="button"
              className="w-1/2 cursor-pointer rounded-md bg-[#33BFFF] hover:bg-[#005F8A] p-2 text-center text-md font-normal hover:bg-[#A6A6A6] transition duration-300 text-white"
              value={"Sign Up"}
              onClick={()=>open("sign-up")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
