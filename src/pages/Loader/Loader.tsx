import "./Loader.css";
import { InfinitySpin } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center opacity-50">
      <InfinitySpin color="#009fe3" />
    </div>
  );
}
export default Loader;
