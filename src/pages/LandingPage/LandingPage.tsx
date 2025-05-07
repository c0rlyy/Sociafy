import LoginForm from "../Forms/LoginForm/LoginForm";
import { useMediaQuery } from "react-responsive";
import React, { useEffect } from "react";
import { useAuthStore } from "../../store/auth-store.";
import { useNavigate } from "react-router-dom";
import TypingAnimation from "../Animations/TypeAnimation";
import LandingLayout from "../../Components/template/landingLayout";
import { Container } from "../../Components/atoms/Container/Container";
import Icon from "../../Components/atoms/Icon/Icon";
import MainPageImage from "../../Components/molecules/MainPageImage";
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
    <LandingLayout>
      <MainPageImage />
      <LoginForm mdScreen={mdScreen} />
    </LandingLayout>
  );
};

export default LandingPage;
