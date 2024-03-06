import { useState } from "react";
import user from "../../assets/rafal.jpg";
import ChooseImg from "./ChooseImg";
import "./UserProfile.css";
type UserUpperMenuProps = {
  chooseImg: React.FC;
};
const UserUpperMenu = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  return (
    <div className="flex items-center justify-around p-5">
      <div className="flex items-center gap-5">
        <div className=" circle-container flex items-center border border-slate-500">
          <div
            onClick={openModalHandler}
            className="w-full h-full flex items-center justify-center rounded-full border"
          >
            <img
              className="w-full h-full rounded-full"
              src={localStorage.getItem("userImage") ?? ""} //Nullish coalescent operator zwraca "" jezeli null or undefined po lewej stronie
              alt=""
            />
          </div>
          {isOpenModal ? <ChooseImg /> : ""}
        </div>
        <h1 className="font-bold">{localStorage.getItem("username")}</h1>
      </div>

      <div className="flex items-center gap-5 ">
        <div className="flex items-center gap-3">
          <span>0</span>
          <h2>Followers</h2>
        </div>
        <div className="flex items-center gap-3">
          <span>0</span>
          <h2>Followers</h2>
        </div>
      </div>
    </div>
  );
};
export default UserUpperMenu;
