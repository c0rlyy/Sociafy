import { ChangeEvent, useState } from "react";
import Modal from "../../Components/Modal/Modal";
function ChooseImg() {
  const [, setSelectedImage] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; //?. Optionl chaining czyli mozliwosc ze zmienna moze byc undefined

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;
        setSelectedImage(dataUrl);
        localStorage.setItem("userImage", dataUrl || "");
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Modal>
      <input type="file" accept="/*image" onChange={handleImageChange} />
    </Modal>
  );
}
export default ChooseImg;
