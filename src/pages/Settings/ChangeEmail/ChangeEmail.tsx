import React from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../../store/UserProfile-context";
type changeEmailData = {
  password: string;
  new_email: string;
};
const ChangeEmail = () => {
  const { changeEmail } = useProfile();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data: changeEmailData) => {
    const ChangedEmail = await changeEmail(data.password, data.new_email);
    return ChangedEmail;
  };
  return (
    <React.Fragment>
      <form
        className=" flex flex-col items-center gap-3 p-3"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <p>Password</p>
        <input
          className="rounded-sm border border-gray-300 px-4 py-2 outline-none"
          type="password"
          {...register("password")}
          id=""
        />
        <p htmlFor="">New Email</p>
        <input
          className="rounded-sm border border-gray-300 px-4 py-2 outline-none"
          type="text"
          {...register("new_email")}
          name="new_email"
        />
        <button className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangeEmail;
