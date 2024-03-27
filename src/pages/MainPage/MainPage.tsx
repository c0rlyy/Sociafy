import Post from "../../Components/Post/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useState } from "react";
import Recommended from "../../Components/Recommended/Recommended";
import HeaderNavigation from "../../Components/FooterMenu/HeaderNavigation/HeaderNavigation";
function MainPage() {
  const [isDark] = useState(false);
  return (
    <div
      className={`${
        isDark ? "dark-mode" : ""
      } grid grid-cols-layout grid-rows-layout h-[100vh] overflow-hidden`}
    >
      <HeaderNavigation />
      <Post posts={[]} />
      <FooterMenu />
      <Recommended />
    </div>
  );
}
export default MainPage;
