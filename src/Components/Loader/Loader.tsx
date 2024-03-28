import React from "react";
import loader from "./Loader.module.css";
import sociafyLogo from "../../../public/sociafy_1.svg";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import { Audio, Circles, LineWave } from "react-loader-spinner";
import LoaderModal from "../Modal/LoaderModal/LoaderModal";

function Loader() {
  return (
    <LoaderModal>
      <LineWave width={"100%"} height={"100%"} color="#009fe3" />
    </LoaderModal>
  );
}

export default Loader;
