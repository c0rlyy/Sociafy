import { LineWave } from "react-loader-spinner";
import LoaderModal from "../Modal/LoaderModal/LoaderModal";

function Loader() {
  return (
    <LoaderModal>
      <LineWave width={"100%"} height={"100%"} color="#009fe3" />
    </LoaderModal>
  );
}

export default Loader;
