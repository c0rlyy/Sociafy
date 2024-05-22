import React from "react";
import { Outlet } from "react-router-dom";
import SettingsBar from "./SettingsBar/SettingsBar";

type Props = {};

const Settings = () => {
  return (
    <div className="sm:grid-cols-settingsLayout grid grid-cols-1 grid-rows-2">
      <SettingsBar />
      <div className=" col-[2/3] bg-inherit">
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
