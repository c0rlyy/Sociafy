import { createContext, ReactNode, useContext } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getTokenFromLS = (server_token: string) => {
    return localStorage.setItem("token", server_token);
  };
  return (
    <AuthContext.Provider value={{ getTokenFromLS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
