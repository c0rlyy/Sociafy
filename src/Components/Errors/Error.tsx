import React from "react";
import SociafyLogo from "../../assets/3x/Obszar roboczy 1@3x.png";
import { useRouteError } from "react-router-dom";
type ErrorProps = {
  error: Error;
};

const Error: React.FC<ErrorProps> = () => {
  let error = useRouteError();
  return (
    <main className="flex flex-col items-center justify-center">
      <img src={`${SociafyLogo}`} alt="" />
    </main>
  );
};

export default Error;
