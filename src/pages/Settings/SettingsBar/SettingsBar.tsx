import React, { useRef } from "react";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { TbPassword } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
type Props = {};
import Settings from "./Settings.json";
import { useAuth } from "../../../store/AuthContext";
const SettingsBar = (props: Props) => {
  const ref = useRef(null);
  const handleChange = () => {
    console.log(ref.current);
  };
  const { logoutHandler } = useAuth();
  return (
    <div
      onClick={handleChange}
      ref={ref}
      className="grid-[1/2] relative flex h-screen flex-col gap-2 border-r border-gray-400  pl-2 pt-4 "
    >
      <Link to={"/Settings/ChangeEmail"}>
        <div className="flex items-center gap-2">
          <picture className="size-10 overflow-hidden rounded-full border border-slate-500">
            <MdOutlineEmail className="h-full w-full object-cover" />
          </picture>
          <p>Change Email</p>
        </div>
      </Link>
      <Link to={"/Settings/ChangeUsername"}>
        <div className="flex items-center gap-2">
          <picture className="size-10 overflow-hidden rounded-full border border-slate-500">
            <FaUserAlt className="h-full w-full object-cover" />
          </picture>
          <p>Change Username</p>
        </div>
      </Link>
      <Link to={"/Settings/ChangePassword"}>
        <div className="flex items-center gap-2">
          <picture className="size-10 overflow-hidden rounded-full border border-slate-500">
            <TbPassword className="h-full w-full object-cover" />
          </picture>
          <p>Change Password</p>
        </div>
      </Link>
      <div className="absolute bottom-0 left-0 p-4">
        <Link to={"/"}>
          <IoMdArrowBack onClick={logoutHandler} size={"2rem"} />
        </Link>
      </div>
    </div>
  );
};

export default SettingsBar;
