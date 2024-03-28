import React from "react";
import RegisterForm from "../Forms/SignUp/RegisterForm";
import SignUpLogo from "./SignUpLogo";
const SignUp = () => {
  return (
    <div className="grid grid-cols-SignUpLayout overflow-hidden h-[100vh] ">
      <RegisterForm />
      <SignUpLogo />
    </div>
  );
};

export default SignUp;
