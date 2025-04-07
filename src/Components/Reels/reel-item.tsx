// There is no need to write types for this, because backend hasn't been implemented for that yet
type ReelItemT ={
  username:string,
  url?:string,

}
export default function ReelItem({ username,url}:ReelItemT){
  return (
    <div className="flex flex-col  items-center cursor-pointer">
    <div className="relative size-12 rounded-full flex flex-col ">
      <picture className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-sky-400 to-blue-500">
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />z
        </svg>
        </div>
      </picture>
    </div>
          <span className="truncate w-[6ch]  text-xs ">{ username}</span>
    </div>
  )
}
