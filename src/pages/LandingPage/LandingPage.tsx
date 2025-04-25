import LoginForm from "../Forms/LoginForm/LoginForm";
import { useMediaQuery } from "react-responsive";
import React, { useEffect } from "react";
import TypeAnimation from "../Animations/TypeAnimation";
import { useAuthStore } from "../../store/auth-store.";
import { useNavigate } from "react-router-dom";
function Test() {
  return <h1> i love me some pussy</h1>;
}

const LandingPage: React.FC = () => {
  const { isLogged } = useAuthStore();
  const navigate = useNavigate();
  const mdScreen = useMediaQuery({
    query: "(min-width:1024px)",
  });
  useEffect(() => {
    if (isLogged) {
      console.log("Is logged", isLogged);
      navigate("/home");
    }
  }, [isLogged, navigate]);
  return (
    <div className="relative grid max-h-full min-h-screen items-center justify-items-center overflow-hidden border border-slate-500 bg-gradient-to-r from-cyan-500 to-blue-500 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-landing">
      {mdScreen ? (
        <>
          <TypeAnimation mdScreen={mdScreen} />
          <LoginForm mdScreen={mdScreen} />
        </>
      ) : (
        <>
          <TypeAnimation mdScreen={mdScreen} />
          <LoginForm mdScreen={mdScreen} />
        </>
      )}

      <footer className="absolute bottom-0 flex items-center gap-3 p-3 text-sm italic tracking-normal text-white">
        <h2>c0rlyy-Back-End</h2>
        <h2>rovgart-Front-End</h2>
      </footer>
    </div>
  );
};

export default LandingPage;
