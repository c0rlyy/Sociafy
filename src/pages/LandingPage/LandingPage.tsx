import LoginForm from "../Forms/LoginForm/LoginForm";
import { useMediaQuery } from "react-responsive";
import React from "react";
import TypeAnimation from "../Animations/TypeAnimation";
import { useNavigation } from "react-router-dom";
// Fetching Users

const LandingPage: React.FC = () => {
  const navigateLandingStatus = useNavigation();
  console.log(navigateLandingStatus.state);
  // if (navigateLandingStatus.state == "submitting") {
  //   return <Loader />;
  // }
  // const [curSlide, setCurSlide] = useState(0);
  const mdScreen = useMediaQuery({
    query: `(min-width:1024px)`,
  });
  return (
    <div className=" gap-1/2 relative grid h-screen grid-cols-landing items-center justify-items-center border border-slate-500 bg-gradient-to-r from-cyan-500 to-blue-500">
      <TypeAnimation mdScreen={mdScreen} />
      <LoginForm mdScreen={mdScreen} />
      <footer className="absolute bottom-0 flex items-center gap-3 p-3 text-sm italic tracking-normal text-white">
        <h2>c0rly-Back-End</h2>
        <h2>rovgart-Front-End</h2>
      </footer>
    </div>
  );
};
export default LandingPage;
