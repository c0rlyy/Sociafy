import React from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../../store/UserProfile-context";
type changePasswordData = {
  old_password: string;
  new_password: string;
};
const ChangePassword = () => {
  const { changePassword } = useProfile();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data: changePasswordData) => {
    const ChangedEmail = await changePassword(
      data.old_password,
      data.new_password,
    );
    return ChangedEmail;
  };
  return (
    <React.Fragment>
      <form
        className="flex flex-col items-center gap-3 p-3"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <p htmlFor="">Old Password</p>
        <input
          className="rounded-sm border border-gray-300 px-4 py-2 outline-none"
          type="password"
          {...register("password")}
          id=""
        />
        <p htmlFor="">New Password</p>
        <input
          className="rounded-sm border border-gray-300 px-4 py-2 outline-none"
          type="text"
          {...register("new_username")}
          name="new_username"
        />
        <button className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangePassword;
