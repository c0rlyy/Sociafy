// import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import MainPage from "./pages/MainPage/MainPage";
// import styled, { ThemeProvider } from "styled-components";
// import { useState } from "react";
import { registerAction } from "./pages/Forms/SignUp/RegisterForm";
// import useLoading from "./customHooks/useLoading";
// import Loader from "./pages/Loader";
import UserProfile from "./pages/UserProfile/UserProfile";
import { loginAction } from "./pages/Forms/LoginForm/LoginForm";
import fetchPosts from "./pages/Fetch/fetchPosts";
import SignUp from "./pages/SignUp/SignUp";
import ThemeProvider from "./store/themeContext";
import fetchMe from "./pages/Fetch/fetchMe";
function App() {
  // useEffect(() => {
  //   const removeTokenOnUnload = () => {
  //     return localStorage.removeItem("access_token");
  //   };
  //   window.addEventListener("beforeunload", removeTokenOnUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", removeTokenOnUnload);
  //   };
  // }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      action: loginAction,
    },
    { path: "/Register", element: <SignUp />, action: registerAction },
    {
      path: "/MainPage",
      element: <MainPage />,
      loader: fetchPosts,
    },
    {
      path: "/User",
      element: <UserProfile />,
      loader: fetchMe,
    },
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
