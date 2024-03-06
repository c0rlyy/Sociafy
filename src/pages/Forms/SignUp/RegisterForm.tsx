import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../LoginForm/LoginForm.module.css";
type RegisterState = {
  email?: string;
  username?: string;
  password?: string;
};
const RegisterForm: React.FC<RegisterState> = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextState = {
      ...userForm,
      [e.target.name]: e.target.value,
    };
    setUserForm(nextState);
  };
  const fetchAddUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/users/", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: userForm.email,
          password: userForm.password,
          user_name: userForm.username,
        }),
      });
      if (response.ok) {
        alert("Pomyślnie załozono konto");
        navigate("/MainPage");
        console.log(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FormRegisterSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAddUser();
    console.log(userForm);
  };
  return (
    <div className="flex flex-col border-slate-500 border  items-center w-1/6 mx-auto m-0 gap-4 p-3 lg:h-screen">
      <h1 className="text-3xl font-logoFont">InstaClone</h1>
      <form
        className="flex flex-col gap-2 p-2"
        onSubmit={FormRegisterSubmitHandler}
        method="POST"
      >
        <div className={classes.field}>
          <input
            type="email"
            onChange={inputChangeHandler}
            value={userForm.email}
            name="email"
            id=""
            placeholder="email"
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={classes.field}>
          <input
            type="text"
            onChange={inputChangeHandler}
            name="username"
            value={userForm.username}
            id=""
            placeholder="username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={classes.field}>
          <input
            type="password"
            onChange={inputChangeHandler}
            name="password"
            value={userForm.password}
            id=""
            placeholder="password"
          />
          <label className={classes.label} htmlFor="password">
            Password
          </label>
        </div>
        <input className={classes["signIn"]} type="submit" value="Next" />
        <div className="text-sm mt-5 text-center text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
          iure quo? Voluptatibus perferendis itaque autem laborum. Animi aperiam
          incidunt tempora temporibus molestiae delectus quidem doloremque sequi
          veniam, officia debitis nobis provident sed.
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
