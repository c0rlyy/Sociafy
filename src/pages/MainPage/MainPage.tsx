import Post from "../../Components/Post/PostLayout/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useContext, useEffect, useState } from "react";
import Recommended from "../../Components/Recommended/Recommended";
import HeaderNavigation from "../../Components/FooterMenu/HeaderNavigation/HeaderNavigation";
import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useTheme } from "../../store/themeContext";
const MainPage: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Layout>
      <HeaderNavigation children={undefined} />
      <Post theme={theme} posts={[]} />
      <FooterMenu />
      <Recommended />
    </Layout>
  );
};
export default MainPage;
