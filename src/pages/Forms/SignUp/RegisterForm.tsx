import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate, useNavigation } from "react-router-dom";
import SociafyLogo from "../../../assets/3x/Obszar roboczy 1@3x.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import registerModule from "../SignUp/RegisterForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginForm, useAuth } from "../../../store/AuthContext";
export type RegisterState = {
  email?: string;
  username?: string;
  password?: string;
};
export type SuccessfullRegister = {
  access_token: string;
  token_type: string;
};
const Schema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
});
const RegisterForm: React.FC<RegisterState> = () => {
  const { registerAction } = useAuth();
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterState>({ resolver: zodResolver(Schema) });
  const navigate = useNavigate();
  const onRegisterSubmit = async (data: loginForm) => {
    try {
      const token = await registerAction(data);
      if (token) {
        console.log("Wstaje rano ale nie do pracy");
        return navigate("/MainPage");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <div className={registerModule.registerFormLayout}>
      <div className={registerModule.registerLogo}>
        <img src={`${SociafyLogo}`} alt="" />
      </div>
      <form
        onSubmit={handleSubmit(onRegisterSubmit)}
        className={registerModule.registerForm}
        method="POST"
      >
        <div className={registerModule.registerField}>
          <input
            className={registerModule.registerInput}
            type="email"
            {...register("email")}
          />
          <label htmlFor="email">Email</label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={registerModule.registerField}>
          <input
            className={registerModule.registerInput}
            type="text"
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <label htmlFor="username">Username</label>
        </div>
        <div className={registerModule.registerField}>
          <input
            className={registerModule.registerInput}
            type="password"
            {...register("password")}
          />
          <label htmlFor="password">Password</label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <input
          className="rounded-sm bg-sky-600 text-white"
          type="submit"
          value="Next"
          disabled={isSubmitting}
        />
      </form>
      <div className="row-[-2/-1] mt-5 text-center text-sm text-gray-400 ">
        <span>
          Already have an account ? <Link to={"/"}>Click</Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
