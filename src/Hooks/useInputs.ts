import { useState } from "react";
type inputs = {
  email?: string;
  username?: string;
  password?: string;
};
const useInputs = (initialValue: inputs) => {
  const [inputs, setInputs] = useState(initialValue);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const resetInputs = () => {
    setInputs(initialValue);
  };
  return { inputs, inputHandler, resetInputs };
};
export default useInputs;
