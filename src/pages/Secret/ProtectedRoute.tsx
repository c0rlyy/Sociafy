import React, { ReactNode, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const { isLogged, loading } = useAuth();

  useEffect(() => {
    if (!isLogged) {
      nav("/");
    }
  }, [isLogged]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
