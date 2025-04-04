import { ReactNode } from "react";

export default function Icon({ children }: {children:ReactNode}){
  return (
    <div className="size-8">
      { children}
    </div>
  )
}
