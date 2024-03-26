import AddPostModal from "../FooterMenu/AddPostOverlay";
// import Modal from "../Modal/Modal";
// import bgPost_default from "../../assets/bgPost_default.jpg";
// import bgPost1 from "../../assets/bg_post1.jpg";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import { useState, useEffect, MouseEventHandler } from "react";
import FileUploader from "./FileUploader";
import Modal from "../Modal/Modal";
import PostModal from "../Post/PostModal/PostModal";
import PostModalModule from "../Post/PostModal/PostModal.module.css";
import { Cookies } from "react-cookie";
import PostSuccess from "./PostSuccess/PostSuccess";
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
        <PostModal>
          <picture className={PostModalModule.addPostImageContainer}>
            <img
              className={PostModalModule.addPostImage}
              src={selectedImage}
              alt=""
            />
          </picture>
          <form className={PostModalModule.addPostForm}>
            <textarea
              className={PostModalModule.textarea}
              onChange={descriptionHandler}
              type="text"
              name="textarea"
              id=""
              placeholder="Wstaw tytul"
            ></textarea>
            <button
              className="bg-[rgb(77,181,249)] self-start rounded-lg px-2 py-2 text-white w-1/2 h-1/4 md:self-center md:justify-self-center"
              type="submit"
              name="submitB"
            >
              Add
            </button>
          </form>
        </PostModal>
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
export const CreatePostAction = async ({ request }: { request: Request }) => {
  const addPostData = Object.entries(await request.formData());
  const submission = {
    uploaded_file: addPostData?.textarea,
  };
  const createPost = async (): Promise<boolean | undefined> => {
    try {
      const cookies = new Cookies();
      const response = await fetch(
        "http://localhost:8000/posts/create-optional-file",
        {
          headers: {
            multipart: "form-data",
            token: cookies.get("token"),
          },
          body: JSON.stringify({
            uploaded_file: submission.uploaded_file,
          }),
        }
      );
      if (!response.ok) {
        alert("Your post cannot be added. Try again ");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createPostValid = await createPost();
  if (createPostValid) {
    setInterval(() => {
      return <PostSuccess />;
    }, 3000);
  }
};
export default AddPost;
