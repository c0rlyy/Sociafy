import User from "../../../public/assets/Icons/User.png";

// There is no need to write types for this, because backend hasn't been implemented for that yet
type ReelItemT = {
  username: string;
  url?: string;
};

export default function ReelItem() {
  return (
    <div className="relative size-12 rounded-full">
      <picture className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 p-[2px]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-user"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
        </div>
      </picture>
    </div>
  );
}
