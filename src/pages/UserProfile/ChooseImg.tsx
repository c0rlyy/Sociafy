import { ChangeEvent, useState } from "react";
import { Cookies } from "react-cookie";
import { Form } from "react-router-dom";
import AddPostModal from "../../Components/FooterMenu/AddPostOverlay";
import Modal from "../../Components/Modals/Modal";
function ChooseImg({ onClose }: { onClose: () => void }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [closeModal, setCloseModal] = useState(false);

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
      await AddProfilePicture(formData);
    } else {
      console.error("No image selected");
    }
  };
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
        <button
          className="rounded-sm bg-[#009fe3] px-1 py-3 text-white"
          type="submit"
          value="Add"
        >
          Add
        </button>
      </form>
    </Modal>
  );
}
async function AddProfilePicture(formData: FormData) {
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
    if (response.ok) {
      const data = await response.json();
      console.log("Successfully added photo:", data);
      return data;
    } else {
      const errorData = await response.json();
      console.error("Failed to add photo:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Network error occurred");
  }
}
export default ChooseImg;
