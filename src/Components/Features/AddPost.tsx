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
import { redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useProfile } from "../../store/UserProfile-context";
import { useQuery } from "@tanstack/react-query";
import AddPostPopover from "../Dialogs/AddPostPopover";
interface AddPostType {
  onClose: MouseEventHandler<SVGAElement>;
}
type addPostStateProps = {
  images: File[];
  textData: null | string;
};
// Adding Post Logic
const AddPost: React.FC<AddPostType> = ({ onClose }: { onClose: () => {} }) => {
  const [addPostState, setAddPostState] = useState<addPostStateProps>({
    images: [],
    textData: "",
  });
  const [isSuccessfullyAdded, setIsSuccessfullyAdded] = useState(false);

  const [isSelected, setIsSelected] = useState(false);
  const [isSubmissionError, setIsSubmissionError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
    if (textData?.length === 0) {
      setIsSuccessfullyAdded(false);
      setIsSubmissionError(true);
      throw new Error("Fill the gap bro");
    }
    images.forEach((image, index) => {
      formData.append(`uploaded_files`, image);
    });
    formData.append("data", JSON.stringify({ post_title: `${textData}` }));
    const FetchedData = await addPostFetch(formData);
    if (FetchedData) {
      setIsSuccessfullyAdded(true);
      setIsSubmissionError(false);
      setOpenModal(true);
    }
  };
  const closeButtonPostScreen = useMediaQuery({
    query: "(max-width:600px)",
  });
  const { userProfile, fetchMe, getUserProfilePicUrl } = useProfile();
  const { data: myData, isLoading: loadingBro } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const profileData = await fetchMe();
      return profileData;
    },
  });
  if (isSuccessfullyAdded) {
    return (
      <AddPostPopover
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    );
  }
  // useEffect(() => {
  //   if (isSuccessfullyAdded) {
  //     return;
  //   }
  // }, [isSuccessfullyAdded]);
  return (
    <AddPostModal onClosePropFc={onClose}>
      {closeButtonPostScreen && (
        <IoMdClose
          onClick={onClose}
          size={"2rem"}
          className="absolute left-0 top-0 text-black"
        />
      )}
      <div
        onClick={handleClick}
        className={`col-[1/2] row-[1/2] ${isSelected ? "hidden" : "block"}`}
      >
        <CiImageOn z={100} size={"100%"} fill={"black"} />
      </div>
      {isSelected ? (
        <picture className="h-full w-full justify-self-center  ">
          {addPostState.images.map((image: File, index: number) => (
            <img
              className=" h-full w-[540px] object-cover"
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
          <picture className={PostOverlay.userImgPictureBox}>
            <img
              className={PostOverlay?.userImg}
              src={myData?.profile_picture}
              alt=""
            />
          </picture>
          <span>{myData?.username}</span>
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
          className="h-full w-full rounded-lg bg-[rgb(77,181,249)] px-2 py-2 text-white  "
          type="submit"
          name="submitB"
        >
          Add
        </button>
        {isSubmissionError && (
          <p className="text-red-500 ">
            No image inserted or description is empty
          </p>
        )}
      </form>
    </AddPostModal>
  );
};
const addPostFetch = async (formData: FormData) => {
  // FormData musi być stringowanym JSONem (?) (JSON.stringify(textData))**
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(4000);
  console.log(formData);
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/posts/create-optional-file",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) {
      throw new Error("Your post cannot be added");
    }
    const data = await response.json();
    console.log(data);
    if (data) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export default AddPost;
