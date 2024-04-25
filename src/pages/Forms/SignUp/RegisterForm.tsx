import React, { useEffect, useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import register from "../SignUp/RegisterForm.module.css";
import SociafyLogo from "../../../assets/3x/Obszar roboczy 1@3x.png";
type RegisterState = {
  email?: string;
  username?: string;
  password?: string;
};
const RegisterForm: React.FC<RegisterState> = () => {
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = {
      ...userForm,
      [e.target.name]: e.target.value,
    };
    setUserForm(nextState);
  };
  const [userValid, setUserValid] = useState<boolean>(false);
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("TYPING...");
      if (userForm.email.includes("@")) {
        setUserValid(true);
      } else {
        setUserValid(false);
      }
    }, 500);
    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [userForm.email]);
  return (
    <div className={register.registerFormLayout}>
      <div className={register.registerLogo}>
        <img src={`${SociafyLogo}`} alt="" />
      </div>
      <Form className={register.registerForm} method="POST" action="/Register">
        <div className={register.registerField}>
          <input
            className={register.registerInput}
            type="email"
            onChange={inputChangeHandler}
            value={userForm.email}
            name="email"
            id=""
          />
          <label htmlFor="email">Email</label>
          {!userValid ? <p className="text-red-500">Wrong Email</p> : ""}
        </div>
        <div className={register.registerField}>
          <input
            className={register.registerInput}
            type="text"
            onChange={inputChangeHandler}
            name="username"
            value={userForm.username}
            id=""
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={register.registerField}>
          <input
            className={register.registerInput}
            type="password"
            onChange={inputChangeHandler}
            name="password"
            value={userForm.password}
          />
          <label htmlFor="password">Password</label>
        </div>
        <input
          className="rounded-sm bg-sky-600 text-white"
          type="submit"
          value="Next"
        />
      </Form>
      <div className="row-[-2/-1] mt-5 text-center text-sm text-gray-400 ">
        <span>
          Already have an account ? <Link to={"/"}>Click</Link>
        </span>
      </div>
    </div>
  );
};
export const registerAction = async ({ request }: { request: Request }) => {
  const data = Object.fromEntries(await request.formData());
  const submission = {
    email: data.email,
    user_name: data.username,
    password: data.password,
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
      const data = await response.json();
      if (data) {
        alert("Successfull Profile Created :)");
        const receivedTokenData = {
          access_token: data?.access_token,
          token_type: data?.token_type,
        };
        localStorage.setItem("access_token", receivedTokenData?.access_token);
        localStorage.setItem("token_type", receivedTokenData?.token_type);
        return receivedTokenData;
      }
    } catch (error) {
      console.log(error);
    }
  };
  await fetchAddUser();
  return redirect("/MainPage");
};
export default RegisterForm;
