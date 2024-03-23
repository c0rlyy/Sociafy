import AddPostModal from "../FooterMenu/AddPostOverlay";
// import Modal from "../Modal/Modal";
// import bgPost_default from "../../assets/bgPost_default.jpg";
// import bgPost1 from "../../assets/bg_post1.jpg";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useState, useEffect, MouseEventHandler } from "react";
import FileUploader from "./FileUploader";
import Modal from "../Modal/Modal";
interface AddPostType {
  onClose: MouseEventHandler<SVGAElement>;
}
const AddPost: React.FC<AddPostType> = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDesc(e.target.value);
  };
  const setFile = (file: any) => {
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
  };
  function NextStepPost() {
    return (
      <>
        <Modal>
          <div className="grid grid-cols-fileUploaderLayout">
            <div className="w-1/2 h-1/2 border border-slate-500">
              <img className="w-full h-full" src={selectedImage} alt="" />
            </div>
            <div className="border border-slate-500">
              <input
                className="h-full w-full"
                onChange={descriptionHandler}
                type="text"
                name=""
                id=""
                placeholder="Wstaw tytul"
              />
              <button
                className="bg-[rgb(77,181,249)] rounded-lg px-2 py-2 text-white w-full"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
  return (
    <AddPostModal>
      <IoMdClose
        size={"2rem"}
        className="absolute top-0 left-3 "
        onClick={onClose}
      />
      <div className=" flex self-center">
        <CiImageOn size={"100%"} />
      </div>
      <FileUploader setFile={setFile} />
      {selectedImage ? <NextStepPost /> : ""}
    </AddPostModal>
  );
};
export default AddPost;