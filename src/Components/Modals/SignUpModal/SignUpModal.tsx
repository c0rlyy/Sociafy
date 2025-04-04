import Modal from "../Modal";
import registerModule from "../../../pages/Forms/SignUp/RegisterForm.module.css";
import { registerSchema } from "../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import useModalStore from "../../../modalStore/modalStore";
import { addUser } from "../../../api/auth";
import type { AuthorizedT, User } from "../../../types";
import Cookies from "js-cookie";

import ButtonLoader from "../../Loader/Loader";
import { BrowserRouter, useNavigate } from "react-router-dom";
function SignUpModal() {
  // const nav = useNavigate();
  const { modalType, close } = useModalStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const onSubmit: SubmitHandler<User> = async (data: User) => {
    const token: AuthorizedT = await addUser(data);
    console.log(token);
    if (token) {
      Cookies.set("access_token", token.access_token);
      // nav("/home");
    }
  };
  if (modalType !== "sign-up") {
    return null;
  }
  const closeModal = () => {
    close();
    reset();
  };
  return (
      <BrowserRouter>
    <Modal size="lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={registerModule.registerForm}
      >
        <div className={registerModule.registerField}>
          <input
            id="email"
            className={registerModule.registerInput}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <label htmlFor="email">Email</label>
          {errors.email && (
            <span className={registerModule.registerError}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={registerModule.registerField}>
          <input
            id="username"
            className={registerModule.registerInput}
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          <label htmlFor="username">Username</label>
          {errors.username && (
            <span className={registerModule.registerError}>
              {errors.username.message}
            </span>
          )}
        </div>
        <div className={registerModule.registerField}>
          <input
            id="password"
            className={registerModule.registerInput}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <label htmlFor="password">Password</label>
          {errors.password && (
            <span className={registerModule.registerError}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={registerModule.registerField}>
          <input
            id="repeatPassword"
            className={registerModule.registerInput}
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword")}
          />
          <label htmlFor="password">Repeat password</label>
          {errors.repeatPassword && (
            <span className={registerModule.registerError}>
              {errors.repeatPassword.message}
            </span>
          )}
        </div>
        <div className="relative mb-3 flex flex-col items-center ">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" {...register("terms")} />
            <span className="text-xs">
              I agree to the{" "}
              <a
                className="text-blue-700"
                href="/terms"
                rel="noreferer"
                target="_blank"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-blue-700" href="/privacy" target="_blank">
                Privacy Policy
              </a>
              .
            </span>
          </div>
          {errors.terms && (
            <span className={registerModule.registerError}>
              {errors.terms.message}
            </span>
          )}
        </div>
        <div className="flex w-full justify-center gap-6 p-4 ">
          <button
            className={` ${isSubmitting ? "bg-opacity-50" : "bg-opacity-100"}  flex w-1/2 items-center justify-center gap-2 rounded-md bg-sky-600 p-2  text-white transition duration-300 hover:bg-sky-800`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <ButtonLoader />}
            Sign up
          </button>
          <button
            className="w-1/2 rounded-md bg-red-500 p-2 text-white transition  duration-300 hover:bg-red-800"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
      </BrowserRouter>
  );
}
export default SignUpModal;
