import React from "react";
import SociafyLogo from "../../assets/3x/Obszar roboczy 1@3x.png";
type ErrorProps = {
  errorName: string;
};

const Error: React.FC<ErrorProps> = ({ errorName }) => {
  return (
    <main className="flex flex-col items-center justify-center">
      <img src={`${SociafyLogo}`} alt="" />
      <h1>{errorName}</h1>
    </main>
  );
};

export default Error;
