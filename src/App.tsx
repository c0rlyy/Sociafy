// import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import MainPage from "./pages/MainPage/MainPage";
// import styled, { ThemeProvider } from "styled-components";
// import { useState } from "react";
import RegisterForm, {
  registerAction,
} from "./pages/Forms/SignUp/RegisterForm";
// import useLoading from "./customHooks/useLoading";
// import Loader from "./pages/Loader";
import UserProfile from "./pages/UserProfile/UserProfile";
import fetchPosts from "./pages/Fetch/fetchPosts";
import SignUp from "./pages/SignUp/SignUp";
import ThemeProvider from "./store/themeContext";
import fetchMe from "./pages/Fetch/fetchMe";
import FetchMyPosts from "./pages/Fetch/fetchMyPosts";

import { AuthProvider, useAuth } from "./store/AuthContext";
import ProtectedRoute from "./pages/Secret/ProtectedRoute";
import User from "./Components/FooterMenu/User";
import PostsProvider from "./store/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfileProvider from "./store/UserProfile-context";
import MyProfile from "./pages/MyProfile/MyProfile";
import Settings from "./pages/Settings/Settings";
import ChangeEmail from "./pages/Settings/ChangeEmail/ChangeEmail";
import ChangeUsername from "./pages/Settings/ChangeUsername/ChangeUsername";
import ChangePassword from "./pages/Settings/ChangePassword/ChangePassword";

// import { loginAction } from "./pages/Forms/LoginForm/loginAction";
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
  const { loginAction } = useAuth();
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/Register",
      element: <RegisterForm />,
    },
    {
      path: "/MainPage",
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/User/:user_id",
      element: (
        <ProtectedRoute>
          <UserProfileProvider>
            <UserProfile />
          </UserProfileProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/User/Me",
      element: (
        <ProtectedRoute>
          <UserProfileProvider>
            <MyProfile />
          </UserProfileProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/Settings",
      element: (
        <ProtectedRoute>
          <UserProfileProvider>
            <Settings />
          </UserProfileProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/Settings/ChangeEmail",
          element: <ChangeEmail />,
        },
        {
          path: "/Settings/ChangeUsername",
          element: <ChangeUsername />,
        },
        {
          path: "/Settings/ChangePassword",
          element: <ChangePassword />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <UserProfileProvider>
              <RouterProvider router={router} />
            </UserProfileProvider>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
