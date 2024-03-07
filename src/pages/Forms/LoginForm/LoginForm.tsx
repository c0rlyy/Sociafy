import classes from "./LoginForm.module.css";
import { Link, Form, redirect, useActionData } from "react-router-dom";
import { Cookies } from "react-cookie";
import useInputs from "../../../CustomHooks/useInputs";
type LoginFormProps = {
  mdScreen: boolean;
  email?: string;
  password?: string;
};
function LoginForm({ mdScreen }: LoginFormProps) {
  const { inputs, inputHandler } = useInputs({
    email: "",
    password: "",
  });
  const loginData = useActionData();
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
        mdScreen ? "col-start-3 col-end-4" : "col-start-2 col-end-4"
      } items-center h-full lg:h-auto w-screen lg:w-3/4 shadow-black shadow-sm lg:justify-start  gap-3 flex flex-col p-3 `}
    >
      <Form
        // onSubmit={formSubmitHandler}
        className="  lg:shadow-sm lg:w-full lg:h-auto lg:p-7 flex flex-col gap-4 mt-2"
        action={"/"}
        method="post"
      >
        <h1 className="font-logoFont text-center text-3xl">InstaClone</h1>
        <div className={classes.field}>
          <input
            onChange={inputHandler}
            className={classes.login}
            type="text"
            name="email"
            id=""
            value={inputs.email}
          />
          <label htmlFor="username" className={classes.label}>
            Login
          </label>
        </div>
        <div className={classes.field}>
          <input
            onChange={inputHandler}
            className={classes.password}
            type="password"
            name="password"
            value={inputs.password}
            id=""
          />
          <label className={classes.label} htmlFor="">
            Password
          </label>
        </div>
        <div className="flex gap-3 self-center justify-center  w-1/2">
          <button
            className={`${classes["signIn"]} py-1 px-1 rounded-lg`}
            type="submit"
            value="Sign In"
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center items-center self-center w-full ">
          <div className={classes.line} />
          <p className="">OR</p>
          <div className={classes.line} />
        </div>
        <div className="flex justify-center self-center w-1/2 text-white font-normal">
          <button className=" bg-red-400 px-2 py-1 rounded-md w-full">
            <Link to={"/Register"}>Sign Up</Link>
          </button>
        </div>
      </Form>
      {loginData && loginData.error && <p>{loginData.error}</p>}
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const loginAction = async ({ request }: { request: Request }) => {
  const data = await request.formData();

  const submission = {
    email: data?.get("email") || "",
    password: data?.get("password") || "",
  };
  // Post request
  // const handleSuccess = async (response: Response) => {
  //   const userValid = await response.json();

  //   console.log("Success!");
  // };
  const fetchValidation = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          email: submission.email,
          password: submission.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        const cookies = new Cookies();
        cookies.set("token", data.token, {
          sameSite: "lax",
          secure: true,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(submission);

  const fetchValidationResult = await fetchValidation();

  if (submission.email.length < 10) {
    return { error: "No i co, nie działa xD" };
  }

  if (fetchValidationResult) {
    return redirect("/MainPage");
  } else {
    return { error: "Login failed" };
  }
};
export default LoginForm;
