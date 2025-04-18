import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import MainPage from "./pages/MainPage/MainPage";
import ThemeProvider from "./store/themeContext";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalManager from "./Components/Modals/ModalManager";
import { Toaster } from "react-hot-toast";
import UserPage from "./pages/UserPage/userPage";
import { ErrorProvider } from "./store/ErrorContext";
import UserInfo from "./Components/UserInfo/UserInfo";
function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <MainPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/:user",
      element: (
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/userProfile",
      element: (
        <ProtectedRoute>
          <UserInfo />
        </ProtectedRoute>
      ),
    },
  ]);
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ModalManager />
          <Toaster />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorProvider>
  );
}

export default App;
