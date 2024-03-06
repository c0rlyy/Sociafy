import "./Loader.css";
import { FaReact } from "react-icons/fa";

function Loader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <FaReact size={"50%"} />
    </div>
  );
}
export default Loader;
