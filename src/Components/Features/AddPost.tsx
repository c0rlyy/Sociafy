import AddPostModal from "../FooterMenu/AddPostOverlay";
import { IoMdClose } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";
import {
  useState,
  MouseEventHandler,
  useRef,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import PostOverlay from "../FooterMenu/AddPostOverlay.module.css";
import useMe from "../../Hooks/useMe";
interface AddPostType {
  onClose: MouseEventHandler<SVGAElement>;
}
type addPostStateProps = {
  images: File[];
  textData: null | string;
};
// Adding Post Logic
const AddPost: React.FC<AddPostType> = ({ onClose }) => {
  // CurrentUser
  const { currentUser } = useMe();

  const [addPostState, setAddPostState] = useState<addPostStateProps>({
    images: [],
    textData: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    if (selectedFiles) {
      setIsSelected(true);
      const fileReader = new FileReader();
      Array.from(selectedFiles).forEach((file) => {
        fileReader.onloadend = () => {
          setAddPostState((prev) => ({
            ...prev,
            images: [...prev.images, file],
          }));
        };
        fileReader.readAsDataURL(file);
      });
    }
  };
  useEffect(() => {
    console.log(addPostState.images);
    console.log(isSelected);
  }, [isSelected]);
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    fileRef.current?.click();
  };
  const dataTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddPostState((prev) => ({ ...prev, textData: e.target.value }));
  };
  const addPostSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const { images, textData } = addPostState;
    images.forEach((image, index) => {
      formData.append(`uploaded_files`, image);
    });
    formData.append("data", JSON.stringify({ post_title: `${textData}` }));
    await addPostFetch(formData);
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
        className={`col-[1/2] row-[1/2] ${isSelected ? "hidden" : "block"}`}
      >
        <CiImageOn z={100} size={"100%"} fill={"black"} />
      </div>
      {isSelected ? (
        <picture className="max-h-full max-w-full  justify-self-center pt-2 ">
          {addPostState.images.map((image, index) => (
            <img
              className="h-full w-full object-cover"
              key={index}
              src={URL.createObjectURL(image)}
              alt=""
            />
          ))}
        </picture>
      ) : (
        <span className="text-sm font-extralight italic">
          {" "}
          No image inserted
        </span>
      )}
      <form
        method="POST"
        onSubmit={addPostSubmitHandler}
        className={PostOverlay.form}
      >
        <div className={PostOverlay.user__container}>
          <picture className={PostOverlay.userImg}>
            <img src="" alt="" />
            <span>{currentUser?.user_name}</span>
          </picture>
        </div>
        <textarea
          onChange={dataTextHandler}
          className={PostOverlay.textField}
          name="textAddPost"
          id=""
          placeholder="Description"
          value={addPostState.textData}
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
const addPostFetch = async (formData: FormData) => {
  // FormData musi być stringowanym JSONem (?) (JSON.stringify(textData))**
  console.log(formData);
  try {
    const response = await fetch(
      "http://localhost:8000/posts/api/v1/posts/create-optional-file",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: formData,
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
