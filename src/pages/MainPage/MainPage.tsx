import Post from "../../Components/Post/PostLayout/Post";
import FooterMenu from "../../Components/FooterMenu/FooterMenu";
import { useContext, useEffect, useState } from "react";
import Recommended from "../../Components/Recommended/Recommended";
import HeaderNavigation from "../../Components/FooterMenu/HeaderNavigation/HeaderNavigation";
import React from "react";
import Layout from "../../Components/Layout/Layout";
import { useTheme } from "../../store/themeContext";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Policy from "../../policy/Policy";
import { AuthContext, useAuth } from "../../store/AuthContext";
import ProtectedRoute from "../Secret/ProtectedRoute";
import PostProvider, { PostContext } from "../../store/PostContext";
import { useProfile } from "../../store/UserProfile-context";

const MainPage: React.FC = () => {
  const { autoScroll } = useProfile();
  const { theme } = useTheme();
  autoScroll();
  return (
    <Layout>
      <HeaderNavigation children={undefined} />
      <Post theme={theme} posts={[]} darkProps={""} lightProps={""} />
      <Recommended />
      <Policy />
      <Outlet />
    </Layout>
  );
};
export default MainPage;
