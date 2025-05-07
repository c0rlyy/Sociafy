import { useEffect, useState } from "react";
import Content from "../../Components/organisms/Content/Content";

import MobileMenu from "../../Components/organisms/Menu/MobileMenu";
import Layout from "../../Components/template/mainPageLayout";
import NavbarMotion from "../../Components/organisms/NavbarMotion";
import Header from "../../Components/organisms/Header/Header";
import CookieConsent from "../../Components/organisms/CookieConsent/CookieConsent";

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Layout>
      <CookieConsent />
      <Header isMenuOpen={isMenuOpen} handleToggleMenu={handleToggleMenu} />
      <NavbarMotion
        isMenuOpen={isMenuOpen}
        handleToggleMenu={handleToggleMenu}
      />
      <Content isMenuOpen={isMenuOpen} />
      <MobileMenu />
    </Layout>
  );
};

export default MainPage;
