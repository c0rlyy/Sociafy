export default function Hamburger({visibilityHandler}:{visibilityHandler:()=>void}){
  return (
    <picture onClick={visibilityHandler} className="size-8  rounded-full hover:bg-blue-400 m-2 hover:bg-opacity-55 aspect-square absolute top-0 left-0  flex items-center justify-center cursor-pointer transition-all z-10 hidden lg:block  ">
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="#3d8cf6"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg>
    </picture>
  )
}
