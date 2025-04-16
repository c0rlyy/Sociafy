import Modal from "../Modal";
import registerModule from "../../../pages/Forms/SignUp/RegisterForm.module.css"
import { registerSchema } from "../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import  { SubmitHandler, useForm } from "react-hook-form";
import useModalStore from "../../../modalStore/modalStore";
import { addUser } from "../../../api/auth";
import type { AuthorizedT, User } from "../../../types";
import Cookies from "js-cookie";

import ButtonLoader from "../../Loader/Loader";
import { BrowserRouter,  } from "react-router-dom";
function SignUpModal() {
  const { modalType, close } = useModalStore();
  const closeModal=()=>{
    close()
    reset()
  }

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
        {errors.repeatPassword && <span className={ registerModule.registerError}>{errors.repeatPassword.message}</span>}
        </div>
        <div className="flex flex-col items-center relative mb-3 ">
          <div className="flex items-center gap-2">
            <input
            type="checkbox"
            id="terms"
            {...register("terms")}/>
            <span className="text-xs" >
            I agree to the <a className="text-blue-700" href="/terms" rel="noreferer" target="_blank">Terms of Service</a> and <a className="text-blue-700" href="/privacy" target="_blank">Privacy Policy</a>.
            </span>
          </div>
          {errors.terms && <span className={registerModule.registerError }>{errors.terms.message}</span>}
        </div>
        <div className="w-full p-4 flex justify-center gap-6 ">
        <button
          className={` ${isSubmitting ? "bg-opacity-50":"bg-opacity-100"}  items-center justify-center rounded-md p-2 bg-sky-600 hover:bg-sky-800 transition duration-300  text-white w-1/2 flex gap-2`}
          type="submit"
          disabled={isSubmitting}
          >
            { isSubmitting && <ButtonLoader/>}
          Sign up

          </button>
        <button
        className="rounded-md p-2 bg-red-500 hover:bg-red-800 transition duration-300  text-white w-1/2"
        type="button"
        onClick={closeModal}
        >
          Cancel
        </button>
        </div>
      </form>
    </Modal>
    </BrowserRouter>
  )
}
export default SignUpModal
