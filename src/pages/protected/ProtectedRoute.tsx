import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  const nav = useNavigate();
  const { isLogged, loading } = useAuthStore()

  useEffect(() => {
    console.log(isLogged,loading)
    if (!isLogged) {
      nav("/");
    }
  }, [isLogged,nav,loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
