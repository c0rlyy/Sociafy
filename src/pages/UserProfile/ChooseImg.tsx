import { Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { Form } from "react-router-dom";
import AddProfileImageModal from "../../Components/Dialogs/AddProfileImageModal";
import AddPostModal from "../../Components/FooterMenu/AddPostOverlay";
import Modal from "../../Components/Modals/Modal";
import { useProfile } from "../../store/UserProfile-context";
function ChooseImg({ onClose }: { onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [HandleSubmitSuccess, setHandleSubmitSuccess] = useState(false);
  const { delay } = useProfile();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; //?. Optionl chaining czyli mozliwosc ze zmienna moze byc undefined
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setSelectedImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const image = event.currentTarget.image.files?.[0];
    if (image) {
      formData.append("profile_pic", image);
      console.log(image);
      const AddedProfilePic = await AddProfilePicture(formData);
      if (AddedProfilePic) {
        setHandleSubmitSuccess(true);
      }
    } else {
      console.error("No image selected");
    }
  };
  if (HandleSubmitSuccess) {
    return (
      <AddProfileImageModal
        open={!closeModal}
        handleClose={() => setCloseModal(true)}
      />
    );
  }
  return (
    <Modal onCloseProp={onClose}>
      {selectedImage && (
        <picture className="size-[300px]">
          <img
            className="h-full w-full object-cover"
            src={selectedImage}
            alt=""
          />
        </picture>
      )}
      <form
        className="flex flex-col justify-center"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input
          name="image"
          id="image"
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
        />
        <Button
          className="rounded-sm bg-[#009fe3] px-1 py-3 text-white"
          type="submit"
          value="Add"
          variant={selectedImage ? "contained" : "outlined"}
          disabled={!selectedImage}
        >
          Add
        </Button>
      </form>
    </Modal>
  );
}
async function AddProfilePicture(formData: FormData) {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(4000);
  const submission = [];
  submission.push(formData);
  console.log(submission);
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/profile/add-profile-pic",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PATCH",
        body: formData,
      },
    );
    if (!response.ok) {
      throw Error(
        `Failed to add ProfilePicture :${response.status}: ${response.statusText}`,
      );
    }
    const data = await response.json();
    console.log("Successfully added photo:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Network error occurred");
  }
}
export default ChooseImg;
