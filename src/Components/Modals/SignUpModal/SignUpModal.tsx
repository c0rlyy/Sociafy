import Modal from "../Modal";
import registerModule from "../../../pages/Forms/SignUp/RegisterForm.module.css"
import { registerSchema } from "../../../schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useModalStore from "../../../modalStore/modalStore";
import SociafyLogo from "../../../assets/3x/Obszar roboczy 1@3x.png";
import { addUser } from "../../../api/auth";
import type { AuthorizedT, User } from "../../../types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
function SignUpModal() {
  const navigate=useNavigate()
  const onRegisterSubmit = async (data: User) => {
    try {
      const token:AuthorizedT = await addUser(data);
      console.log(token)
      if (token) {
        Cookies.set("ACCESS_TOKEN", token.access_token)
        navigate("/home")

      }
        throw new Error("Something went wrong");
    } catch (error) {
      console.log(error?.message);
    }
  };
  const { close}=useModalStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterState>({ resolver: zodResolver(registerSchema) });
  const closeModal = () => {
    close()
    reset()
  }
  return (
    <Modal size="lg"  >
      {/* <picture className="size-[300px] place-self-center ">
        <img className="w-full h-full" src={`${SociafyLogo}`} alt="" />
      </picture> */}
      <form
        onSubmit={handleSubmit(onRegisterSubmit)}
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
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div className={registerModule.registerField}>
          <input
            id="username"
            className={registerModule.registerInput}
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
          <label htmlFor="username">Username</label>
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
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <div className={registerModule.registerField}>
          <input
            id="repeatPassword"
            className={registerModule.registerInput}
            type="password"
            placeholder="Repeat Password"
            {...register("repeatPassword")}
          />
          <label htmlFor="password">Repeat Password</label>
          {errors.repeatPassword && <span className="text-red-500 text-xs ">{errors.repeatPassword.message}</span>}

        </div>
        <div className="flex flex-col items-center mb-3 mt-1 border">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" />
            <span className="text-xs" >
            I agree to the <a className="text-blue-700" href="/terms" target="_blank">Terms of Service</a> and <a className="text-blue-700" href="/privacy" target="_blank">Privacy Policy</a>.
            </span>
          </div>
            { errors.terms && <span className="text-red-500 text-xs">{errors.terms.message}</span>}
        </div>
        <div className="w-full flex  justify-center gap-2 ">
        <button
          className={` ${isSubmitting ? "bg-opacity-50":"bg-opacity-100"}  items-center justify-center rounded-md p-2 bg-sky-600 hover:bg-sky-800 transition duration-300  text-white w-1/2 flex`}
          type="submit"
          disabled={isSubmitting}
        >
            { isSubmitting ? <Loader/>:""}
          <span>Sign up</span>
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
  )
}
export default SignUpModal
