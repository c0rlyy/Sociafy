// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

import MainPage from "./pages/ContentPage/MainPage";
// import styled, { ThemeProvider } from "styled-components";
// import { useState } from "react";
import RegisterForm, {
  registerAction,
} from "./pages/Forms/SignUp/RegisterForm";
// import useLoading from "./customHooks/useLoading";
// import Loader from "./pages/Loader";
import UserProfile from "./pages/UserProfile/UserProfile";
import fetchUsers from "./pages/Fetch/fetchUsers";
import { loginAction } from "./pages/Forms/LoginForm/LoginForm";
import fetchPosts from "./pages/Fetch/fetchPosts";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      loader: fetchUsers,
      action: loginAction,
    },
    { path: "/Register", element: <RegisterForm />, action: registerAction },
    {
      path: "/MainPage",
      loader: fetchPosts,
      element: <MainPage />,
    },
    {
      path: "/User",
      element: <UserProfile />,
      loader: fetchPosts,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
