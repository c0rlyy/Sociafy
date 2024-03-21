import React from "react";
interface HeaderLogo {
  mdScreen: boolean;
}
const HeaderLogo: React.FC<HeaderLogo> = () => {
  return (
    <div className="flex items-center gap-2 tracking-wide">
      {/* <h1
        className={`text-xl md:text-3xl
         text-black  font-logoFont`}
      >
        Sociafy
      </h1> */}
    </div>
  );
};
export default HeaderLogo;
