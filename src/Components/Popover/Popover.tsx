import React, { ReactElement, Children, isValidElement } from "react"
import { usePopoverStore } from "../../store/popover-store."
import Icon from "../Icon/Icon"
import { motion } from "framer-motion"
type PopoverHeaderProps = { children: React.ReactNode }
type PopoverBodyProps = { children: React.ReactNode }
type PopoverFooterProps = { children: React.ReactNode }

const PopoverHeader = ({ children }: PopoverHeaderProps) => (
  <div className="px-4 py-2 font-semibold border-b">{children}</div>
)

const PopoverBody = ({ children }: PopoverBodyProps) => (
  <div className="px-4 py-2">{children}</div>
)

const PopoverFooter = ({ children }: PopoverFooterProps) => (
  <div className="px-4 py-2 border-t text-right">{children}</div>
)
type RequiredChildren = {
  Header: ReactElement<typeof PopoverHeader>
  Body: ReactElement<typeof PopoverBody>
  Footer: ReactElement<typeof PopoverFooter>
}

type PopoverProps = {
  children: [
    RequiredChildren["Header"],
    RequiredChildren["Body"],
    RequiredChildren["Footer"]
  ]
  closeHandler?:()=>void
  className?:string
}

const Popover = ({ children,  className }: PopoverProps) => {
  return (
    <motion.div initial={{y:0}} animate={{y:7}} className={`${className} rounded-lg border shadow-lg w-64 flex flex-col bg-white`}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null
        return child
      })}
    </motion.div>
  )
}

// Compound attachment (HeroUI style)
Popover.Header = PopoverHeader
Popover.Body = PopoverBody
Popover.Footer = PopoverFooter

export default Popover
