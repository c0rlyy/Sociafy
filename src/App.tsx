// import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";

import MainPage from "./pages/ContentPage/MainPage";
// import styled, { ThemeProvider } from "styled-components";
// import { useState } from "react";
import RegisterForm from "./pages/Forms/SignUp/RegisterForm";
// import useLoading from "./customHooks/useLoading";
// import Loader from "./pages/Loader";
import UserProfile from "./pages/UserProfile/UserProfile";
import { FetchPosts } from "./Components/Post/Post";
import fetchUsers from "./pages/Fetch/fetchUsers";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      loader: fetchUsers,
    },
    { path: "/Register", element: <RegisterForm /> },
    {
      path: "/MainPage",
      loader: FetchPosts,
      element: <MainPage />,
    },
    {
      path: "/User",
      element: <UserProfile />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
