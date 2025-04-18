import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store.";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const nav = useNavigate();
  const loading = useAuthStore((state) => state.loading);
  const isLogged = useAuthStore((state) => state.isLogged);

  useEffect(() => {
    if (!isLogged) {
      nav("/");
    }
  }, [isLogged, nav]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLogged) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
