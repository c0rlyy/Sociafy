import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  email: string;
  user_name: string;
  id: number;
  profile: {
    description: string | null;
    profile_id: number;
    picture_id: string | null;
  };
};

type AuthContextType = {
  getTokenFromLS: () => string | undefined;
  setTokenToLS: (server_token: string) => string | null | undefined;
  logoutHandler: () => void;
  isLogged: boolean | undefined;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  getUser: () => Promise<User | undefined | null>;
  user: User | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// In future automation of headers authorization needs to be provided
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState<boolean>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getTokenFromLS = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLogged(false);
      return;
    }
    return token;
  };

  const setTokenToLS = (token: string) => {
    localStorage.setItem("access_token", token);
    return token;
  };

  const logoutHandler = () => {
    console.log(isLogged," im from logouthandler")
    localStorage.removeItem("access_token");
    setIsLogged(false);
  };

  const getUser = async () => {
    const token = getTokenFromLS();
    if (!token) throw Error("no token in the local storage");

    try {
      const res = await fetch("http://localhost:8000/api/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const user = (await res.json()) as User;
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTokenFromLS()}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = (await response.json()) as User;
          setUser(data);
          setIsLogged(true);
        } else {
          console.log("im in else");
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getTokenFromLS,
        setTokenToLS,
        logoutHandler,
        isLogged,
        setIsLogged,
        getUser,
        user,
        loading,
      }}
    >
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
