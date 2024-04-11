import AddPostModal from "../FooterMenu/AddPostOverlay";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import {
  useState,
  MouseEventHandler,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";
import PostOverlay from "../FooterMenu/AddPostOverlay.module.css";
interface AddPostType {
  onClose: MouseEventHandler<SVGAElement>;
}
type addPostStateProps = {
  image: string[];
  textData: null | string;
};
const AddPost: React.FC<AddPostType> = ({ onClose }) => {
  const [addPostState, setAddPostState] = useState<addPostStateProps>({
    image: [],
    textData: null,
  });
  const { image, textData } = addPostState;
  const fileRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setAddPostState((prev) => ({
          ...prev,
          image: image.push(fileReader?.result as string),
        }));
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    fileRef.current?.click();
  };
  const dataTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddPostState((prev) => ({ ...prev, textData: e.target.value }));
  };
  const addPostSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const image = e.currentTarget.image.files?.[0];
    setAddPostState((prev) => ({ ...prev }));

    if (image) {
      formData.append("uploaded_files", image);
      await addPostFetch(formData, addPostState?.textData as string);
      console.log(formData);
    } else {
      console.error("No image selected or empty text field");
    }
  };
  return (
    <AddPostModal>
      <IoMdClose
        size={"2rem"}
        className="absolute left-3 top-0 "
        onClick={onClose}
      />
      <div
        onClick={handleClick}
        className={`col-[1/2] ${image ? "hidden" : ""}`}
      >
        <CiImageOn size={"100%"} />
      </div>
      {image && (
        <picture className="max-h-full max-w-full justify-self-center">
          <img className={PostOverlay.addPostImage} src={image} alt="" />
        </picture>
      )}
      <form
        method="POST"
        onSubmit={addPostSubmitHandler}
        className={PostOverlay.form}
      >
        <div className={PostOverlay.user__container}>
          <picture className={PostOverlay.userImg}>
            <img src="" alt="" />
            <span>Danielek</span>
          </picture>
        </div>
        <textarea
          onChange={dataTextHandler}
          className={PostOverlay.textField}
          name="textAddPost"
          id=""
          placeholder="Description"
          value={textData}
        ></textarea>
        <input
          onChange={handleImageChange}
          className=" "
          type="file"
          ref={fileRef}
          name="image"
          id="file-upload"
          style={{ display: "none" }}
        />
        <button
          className="h-1/4 w-1/2 self-start rounded-lg bg-[rgb(77,181,249)] px-2 py-2 text-white md:self-center md:justify-self-center"
          type="submit"
          name="submitB"
        >
          Add
        </button>
      </form>
    </AddPostModal>
  );
};
const addPostFetch = async (formData: FormData, textData: string) => {
  const submission = {
    uploaded_files: formData,
    data: textData,
  };
  console.log(submission);
  try {
    const response = await fetch(
      "http://localhost:8000/posts/create-optional-file",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: submission,
      },
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("Your post cannot be added");
    } else {
      alert("Added post :)");
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export default AddPost;
