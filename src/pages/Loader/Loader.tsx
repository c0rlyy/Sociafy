import "./Loader.css";
import { FaReact } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <FaReact size={"50%"} />
    </div>
  );
}
export default Loader;
