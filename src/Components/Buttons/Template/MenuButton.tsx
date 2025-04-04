import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../Icon/Icon";
type MenuButtonT = {
  nameProp: string;
  iconProp?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  to?: string;
  color?:string
}
function MenuButton(
  { nameProp,
    iconProp,
    children,
   onClick,
   color,
   type,
  to,
  }: MenuButtonT ) {
    const navigate=useNavigate()
  const handleClick = () => {
    if(onClick) onClick()
    if(to) navigate(to)
  }
  return (
    <button onClick={handleClick} type={type} className={`${color ? `bg-[${color}]`:""} w-auto h-[42px] border-2 px-3 py-2.5  rounded-lg flex items-center justify-center`}>
      {iconProp && <Icon nameProp={iconProp} />}
      {children}
      <span className="w-[100px] ">
      {nameProp}
      </span>
    </button>
  )
}
export default MenuButton
