import type { ReactNode } from "react";
export default function Icon({ children, className, handler }: {children:ReactNode, className?:string,handler?:()=>void}){
  return (
    <div className={`${className } size-8  flex justify-center items-center rounded-full`}>
      { children}
    </div>
  )
}
