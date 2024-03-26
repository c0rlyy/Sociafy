import React from "react";
import RegisterForm from "../Forms/SignUp/RegisterForm";
import SignUpLogo from "./SignUpLogo";
const SignUp = () => {
  return (
    <div className="grid grid-cols-SignUpLayout ">
      <RegisterForm />
      <SignUpLogo />
    </div>
  );
};

export default SignUp;
