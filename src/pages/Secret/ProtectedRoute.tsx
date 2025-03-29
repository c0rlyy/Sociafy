import React, { ReactNode, useEffect } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
