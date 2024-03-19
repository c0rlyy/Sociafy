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
import React from "react";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      action: loginAction,
    },
    { path: "/Register", element: <RegisterForm />, action: registerAction },
    {
      path: "/MainPage",
      element: <MainPage />,
      loader: async () => await fetchPosts(),
    },
    {
      path: "/User",
      element: <UserProfile />,
      loader: fetchUsers,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
