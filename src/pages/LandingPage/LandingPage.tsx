import LoginForm from "../Forms/LoginForm/LoginForm";
import { useMediaQuery } from "react-responsive";
import React from "react";
import TypeAnimation from "../Animations/TypeAnimation";
import { useNavigation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
// Fetching Users

const LandingPage: React.FC = () => {
  const navigateLandingStatus = useNavigation();
  console.log(navigateLandingStatus.state);
  if (navigateLandingStatus.state == "submitting") {
    return <Loader />;
  }
  // const [curSlide, setCurSlide] = useState(0);
  const mdScreen = useMediaQuery({
    query: `(min-width:1024px)`,
  });
  return (
    <div className=" grid grid-cols-landing gap-1/2 border relative border-slate-500 items-center h-screen justify-items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <TypeAnimation mdScreen={mdScreen} />
      <LoginForm mdScreen={mdScreen} />
      <footer className="flex items-center gap-3 absolute bottom-0 text-white tracking-normal italic p-3 text-sm">
        <h2>c0rly-Back-End</h2>
        <h2>rovgart-Front-End</h2>
      </footer>
    </div>
  );
};
export default LandingPage;
