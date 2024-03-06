import Header from "../../Components/Header/Header";
import Post from "../../Components/Post/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useState } from "react";
function MainPage() {
  const [isDark] = useState(false);
  return (
    <div className={`${isDark ? "dark-mode" : ""}`}>
      <Header />
      <div className="sm:flex gap-3 ">
        <Post />
        <FooterMenu />
      </div>
    </div>
  );
}
export default MainPage;
