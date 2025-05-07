import { Box } from "../../atoms/Container/Container";

type SwitchPropsT = {
  on: boolean;
  onChange?: () => void;
  disabled?: boolean;
};

export default function Switch({
  on,
  onChange,
  disabled = false,
}: SwitchPropsT) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  return (
    <Box
      className={`
        relative 
        h-6 
        w-11 
        rounded-full 
        transition-colors 
        duration-300 
        ${on ? "bg-primary-500" : "bg-gray-300"} 
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
      onClick={handleClick}
    >
      <Box
        className={`
          absolute 
          top-1 
          ${on ? "left-6" : "left-1"} 
          h-4 
          w-4 
          rounded-full 
          bg-white 
          shadow-md 
          transition-all 
          duration-300
        `}
      />
    </Box>
  );
}
