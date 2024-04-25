import login from "../LoginForm/LoginForm.module.css";
import { Link, Form, redirect } from "react-router-dom";
import React from "react";
import SociafyLogo from "../../../assets/SVG 2/Sociafy.svg";
import { useAuth } from "../../../store/AuthContext";
type loginFormScreen = {
  mdScreen: boolean;
};
export type LoginProps = {
  access_token: string;
  token_type: string;
};
const LoginForm: React.FC<loginFormScreen> = ({ mdScreen }) => {
  // const [inputs, setInputs] = useState({
  //   email: "",
  //   password: "",
  // });
  // const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const nextState = {
  //     ...inputs,
  //     [e.target.name]: e.target.value,
  //   };
  //   setInputs(nextState);
  // };

  // const formSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
  //   fetchValidation();
  //   e.preventDefault();
  //   resetInputs();
  // };

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Validating...");
  //   }, 100);
  //   return () => {
  //     clearTimeout(identifier);
  //     console.log("CLEANUP");
  //   };
  // }, [inputs.email, inputs.password, email, password]);
  return (
    <div
      className={` ${
        mdScreen ? "col-[3/4]" : "col-[1/-1]"
      } flex h-full w-screen flex-col items-center gap-3 rounded-lg bg-[#F3F4F6] p-3 shadow-md  shadow-[#329CE5] lg:h-auto lg:w-3/4 lg:justify-start `}
    >
      <Form
        // onSubmit={formSubmitHandler}
        className={login.loginForm}
        action={"/"}
        method="post"
      >
        <picture className={login.logoContainer}>
          <img className={login.logo} src={`${SociafyLogo}`} alt="" />
        </picture>
        <div className={login.inputs}>
          <div className={login.loginField}>
            <input
              className={login.loginInput}
              type="text"
              name="username"
              id=""
            />
            <label htmlFor="email" className={login.label}>
              Email
            </label>
          </div>
          <div className={login.loginField}>
            <input
              className={login.loginInput}
              type="password"
              name="password"
              id=""
            />
            <label className={login.label} htmlFor="password">
              Password
            </label>
          </div>
          <div className="self-center justify-self-center">
            <button
              className="w-full bg-[#009fe3] p-2 font-bold text-white"
              type="submit"
              value="Sign In"
            >
              Sign In
            </button>
          </div>
        </div>
      </Form>
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
// eslint-disable-next-line react-refresh/only-export-components
export const loginAction = async ({ request }: { request: Request }) => {
  const data = Object.fromEntries(await request.formData());

  const submission = {
    username: data?.username,
    password: data?.password,
  };

  const fetchValidation = async (): Promise<LoginProps | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
            username: `${submission.username}`,
            password: `${submission.password}`,
          }),
        },
      );
      const data = await response.json();
      console.log(data);
      const result = {
        access_token: data?.access_token,
        token_type: data?.token_type,
      };
      if (response.ok) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("token_type", result.token_type);

        console.log("Request working");
        return result.access_token, result.token_type;
      }
      if (data.acces_token) {
        return result;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(submission);

  const fetchValidationResult = await fetchValidation();
  if (fetchValidationResult) {
    return redirect("/MainPage");
  } else {
    alert("Niepoprawne dane logowania");
    return null;
  }
};
export default LoginForm;
