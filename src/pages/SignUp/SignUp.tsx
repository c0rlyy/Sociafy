import React from "react";
import RegisterForm from "../Forms/SignUp/RegisterForm";
import SignUpLogo from "./SignUpLogo";
const SignUp = () => {
  return (
    <div className="grid h-[100vh] grid-cols-SignUpLayout overflow-hidden ">
      <RegisterForm />
      <SignUpLogo />
    </div>
  );
};

export default SignUp;
