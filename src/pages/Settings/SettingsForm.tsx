import React, { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useProfile, User } from "../../store/UserProfile-context";

type Props = {
  inputValue: string;
  children: ReactNode;
  onSubmitFc: (data) => Promise<User | null>;
};
const { handleSubmit, register } = useForm();
const SettingsForm = ({ children, inputValue, onSubmitFc }: Props) => {
  const onSubmit = async (data: FormData) => {
    onSubmitFc(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      {children}
    </form>
  );
};

export default SettingsForm;
