// ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as Theme);
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
