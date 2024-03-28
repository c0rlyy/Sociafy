import login from "../LoginForm/LoginForm.module.css";
import { Link, Form, redirect } from "react-router-dom";
import { Cookies } from "react-cookie";
import buttons from "../FormButtons/FormButtons.module.css";
import React from "react";
import SociafyLogo from "../../../assets/SVG/Obszar roboczy 1.svg";
type loginFormScreen = {
  mdScreen: boolean;
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
      } items-center h-full lg:h-auto w-screen lg:w-3/4 rounded-lg shadow-[#329CE5] shadow-md lg:justify-start bg-[#F3F4F6]  gap-3 flex flex-col p-3 `}
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
              name="email"
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
              className="w-full p-2 font-bold text-white bg-[#009fe3]"
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
            className="bg-[#BFBFBF] text-center cursor-pointer w-full p-2 font-bold rounded-md text-[clamp(.8rem,1.3vw,1rem)] text-white"
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
    email: data.email,
    password: data.password,
  };

  const fetchValidation = async (): Promise<true | false | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: submission.email,
          password: submission.password,
        }),
      });
      const data = await response.json();
      console.log(data.token);
      if (response.ok) {
        const cookies = new Cookies();
        cookies.set("token", data.token, {
          sameSite: "lax",
          secure: true,
        });
        return true;
      } else {
        return false;
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
    return { error: "Login failed" };
  }
};
export default LoginForm;
