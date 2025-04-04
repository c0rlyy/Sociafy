import LoginForm from "../Forms/LoginForm/LoginForm";
import { useMediaQuery } from "react-responsive";
import React, { useEffect } from "react";
import TypeAnimation from "../Animations/TypeAnimation";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
const LandingPage: React.FC = () => {
  const {isLogged }=useAuthStore()
  const navigate=useNavigate()
  const mdScreen = useMediaQuery({
    query: '(min-width:1024px)',
  });
  useEffect(() => {
    if (isLogged) {
      console.log("Is logged", isLogged)
      navigate("/home")
    }
  },[isLogged,navigate])
  return (
    <div className="relative grid min-h-screen max-h-full overflow-hidden lg:grid-cols-landing md:grid-cols-1 sm:grid-cols-1 items-center justify-items-center border border-slate-500 bg-gradient-to-r from-cyan-500 to-blue-500">
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
        <h2>c0rly-Back-End</h2>
        <h2>rovgart-Front-End</h2>
      </footer>
    </div>
  );
};

export default LandingPage;
