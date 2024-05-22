import React, { ReactNode, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // const { logged } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(logged);
  //   if (logged === false) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate, logged]);
  return <>{children}</>;
};

export default ProtectedRoute;
