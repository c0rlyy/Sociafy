import React, { ReactNode, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigate();
  // const { logged } = useAuth();
  // useEffect(() => {
  //   const isLogged = () => {
  //     if (!logged) {
  //       console.log("No logged bro...");
  //       return navigation("/");
  //     }
  //   };
  //   isLogged();
  // }, [logged]);
  return <>{children}</>;
};

export default ProtectedRoute;
