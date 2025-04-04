import React from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../../store/UserProfile-context";
import SettingsForm from "../SettingsForm";

type Props = {};
type changeUsernameData = {
  password: string;
  new_username: string;
};
const ChangeUsername = (props: Props) => {
  const { changeUsername } = useProfile();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data: changeUsernameData) => {
    const ChangedUsername = await changeUsername(
      data.password,
      data.new_username,
    );
    return ChangedUsername;
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
        <p htmlFor="">New Username</p>
        <input
          className="rounded-sm border border-gray-300 px-4 py-2 outline-none"
          type="text"
          {...register("new_username")}
          name="new_email"
        />
        <button className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600">
          Change
        </button>
      </form>
    </React.Fragment>
  );
};

export default ChangeUsername;
