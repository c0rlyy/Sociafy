import { ChangeEvent } from "react";
import classes from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import useInputs from "../../../CustomHooks/useInputs";
type LoginFormProps = {
  mdScreen: boolean;
  email?: string;
  password?: string;
};
function LoginForm({ mdScreen }: LoginFormProps) {
  const { inputs, inputHandler, resetInputs } = useInputs({
    email: "",
    password: "",
  });
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

  const fetchValidation = async () => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });
      console.log(inputs);
      console.log(response);
      if (response.ok) {
        handleSuccess(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSuccess = (response: Response) => {
    const userValid = response.json();
    console.log(response);
    const cookies = new Cookies();
    cookies.set("token", userValid);
    console.log("Success!");
  };
  const formSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    fetchValidation();
    console.log(inputs);
    e.preventDefault();
    resetInputs();
  };

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
      <form
        onSubmit={formSubmitHandler}
        className="  lg:shadow-sm lg:w-full lg:h-auto lg:p-7 flex flex-col gap-4 mt-2"
        action=""
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
            placeholder="email"
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
            placeholder="password"
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
      </form>
    </div>
  );
}
export default LoginForm;
