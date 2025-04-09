import { useRef } from "react";
import Icon from "../../Icon/Icon";
import Modal from "../Modal";

export default function PostModal(){
  const fileRef=useRef(null)
  return (
    <Modal size="full">
      <form className="grid grid-cols-1 md:grid-cols-2  w-full h-full" >
        {/* File input */}
        <main className="w-full  items-center justify-center  flex flex-col p-4 ">
          <div className="bg-black bg-opacity-10 w-full h-full sm:h-3/4 rounded-md">
          <input
          className=" w-full h-full hidden"
          type="file"
          ref={fileRef}
          />
          <div className="flex flex-col items-center justify-center w-full h-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
            <span className="text-6xl text-black text-opacity-25">Insert File</span>
          </div>
          </div>


        </main>
        {/* Form Controls */}
        <main className="flex flex-col h-full gap-4 py-1 px-3 justify-center">
        <div className=" w-full hidden md:flex flex-col gap-6 items-center justify-center">
          <span className="text-4xl font-bold">Post Details</span>
          <span className="text-lg" >Fill in the details for your new post </span>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Title
            </label>
            <input className="px-4 py-2 text-sm border border-black border-opacity-10" type="text " placeholder="Enter Post Title" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="content">
              Content
            </label>
            <input className="px-4 py-2 text-sm border border-black border-opacity-10" type="text " placeholder="Write your post content" />
            <span className="text-sm text-black text-opacity-50">Max 500 characters</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category">
              Category
            </label>
            <input className="px-4 py-2 text-sm border border-black border-opacity-10" type="text " placeholder="Search for category" />
          </div>
          <div className="w-full flex justify-center items-center ">
          <button className="bg-black items-center justify-center text-lg flex h-auto w-[246px] max-w-[246px] text-white p-3 rounded-md font-medium" type="submit">Publish</button>
          </div>
        </div>
        </main>
      </form>
    </Modal>
  )
}
