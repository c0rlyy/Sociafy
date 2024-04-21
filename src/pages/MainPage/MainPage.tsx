import Post from "../../Components/Post/PostLayout/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useContext, useEffect, useState } from "react";
import Recommended from "../../Components/Recommended/Recommended";
import HeaderNavigation from "../../Components/FooterMenu/HeaderNavigation/HeaderNavigation";
import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useTheme } from "../../store/themeContext";
import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Policy from "../../policy/Policy";
const MainPage: React.FC = () => {
  const navState = useNavigation();
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      redirect("/");
    }
  }, []);
  if (navState.state === "loading") {
    return <Loader />;
  }
  const { theme } = useTheme();
  return (
    <Layout>
      <HeaderNavigation children={undefined} />
      <Post theme={theme} posts={[]} darkProps={""} lightProps={""} />
      <Recommended />
      <Policy />
    </Layout>
  );
};
export default MainPage;
