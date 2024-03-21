import Post from "../../Components/Post/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useState } from "react";
import Recommended from "../../Components/Recommended/Recommended";
function MainPage() {
  const [isDark] = useState(false);
  return (
    <div className={`${isDark ? "dark-mode" : ""} grid grid-cols-layout`}>
      <Post />
      <FooterMenu />
      <Recommended />
    </div>
  );
}
export default MainPage;
