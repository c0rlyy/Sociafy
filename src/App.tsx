// import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";

import MainPage from "./pages/MainPage/MainPage";
// import styled, { ThemeProvider } from "styled-components";
// import { useState } from "react";
import RegisterForm from "./pages/Forms/SignUp/RegisterForm";
import UserProfile from "./pages/UserProfile/UserProfile";
import ThemeProvider from "./store/themeContext";
import { AuthProvider, useAuth } from "./store/AuthContext";
import ProtectedRoute from "./pages/Secret/ProtectedRoute";
import PostsProvider from "./store/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfileProvider from "./store/UserProfile-context";
import MyProfile from "./pages/MyProfile/MyProfile";
import Settings from "./pages/Settings/Settings";
import ChangeEmail from "./pages/Settings/ChangeEmail/ChangeEmail";
import ChangeUsername from "./pages/Settings/ChangeUsername/ChangeUsername";
import ChangePassword from "./pages/Settings/ChangePassword/ChangePassword";
import ModalManager from "./Components/Modals/ModalManager";
import { Toaster } from "react-hot-toast";
function App() {
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
      path: "/home",
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
              <ModalManager/>
              <Toaster/>
              <RouterProvider router={router} />
            </UserProfileProvider>
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
