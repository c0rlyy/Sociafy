import type { ReactNode } from "react";
export default function Icon({ children }: {children:ReactNode}){
  return (
    <div className="size-8  flex justify-center items-center rounded-full">
      { children}
    </div>
  )
}
