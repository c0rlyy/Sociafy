import Layout from "../../Components/Layout/Layout";
import HomeButton from "../../Components/Buttons/HomeButton";
import MessagesButton from "../../Components/Buttons/MessagesButton";
import AddButton from "../../Components/Buttons/AddButton";
import LogoutButton from "../../Components/Buttons/LogoutButton";
import Logo from "../../../public/assets/Icons/SFy.png"
import SettingsButton from "../../Components/Buttons/SettingsButton";
import DefaultAvatar from "../../Components/Avatar/Avatar";
import UserInfo from "../../Components/UserInfo/UserInfo";
const MainPage = () => {
  return (
      <Layout>
      <main className=" w-64 p-2.5 h-screen  flex flex-col justify-center ">
        <div className="flex flex-col h-auto gap-4 justify-center">
          <picture className="size-full ">
              <img className="w-full h-full" src={Logo} alt="" />
          </picture>
          <HomeButton/>
          <MessagesButton/>
          <AddButton/>
          <LogoutButton/>
          <SettingsButton/>
        </div>
      </main>
      <aside className=" w-full border ">
        <header className="flex items-center border border-slate-500">
          <UserInfo/>
        </header>
      </aside>
      </Layout>
  );
};
export default MainPage;
