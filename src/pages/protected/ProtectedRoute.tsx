import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useShallow } from "zustand/react/shallow";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const loading = useAuthStore(useShallow((state) => state.loading));
  const isLogged = useAuthStore(useShallow((state) => state.isLogged));

  useEffect(() => {
    console.log(isLogged, loading);
    if (!isLogged) {
      nav("/");
    }
  }, [isLogged, nav, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
