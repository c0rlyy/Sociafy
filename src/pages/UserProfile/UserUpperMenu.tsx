import { useState } from "react";
import ChooseImg from "./ChooseImg";
import "./UserProfile.css";
import { useLoaderData } from "react-router-dom";
import { UserProfileProps } from "../Fetch/fetchUsers";
const UserUpperMenu = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModalHandler = () => {
    setIsOpenModal(true);
  };
  const userData = useLoaderData();
  const userName = (userData as UserProfileProps).user_name;
  return (
  
  );
};
export default UserUpperMenu;
