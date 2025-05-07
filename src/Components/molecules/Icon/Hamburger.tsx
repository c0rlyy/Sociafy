export default function Hamburger({
  visibilityHandler,
  isVisible,
}: {
  visibilityHandler: () => void;
  isVisible: boolean;
}) {
  return (
    <div
      onClick={visibilityHandler}
      className={` z-10 m-2 hidden aspect-square size-8 cursor-pointer  items-center justify-center rounded-full transition-all hover:bg-blue-400 hover:bg-opacity-55 lg:block ${
        isVisible ? "invisible" : "visible"
      }`}
    >
      <div className="flex size-full items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3d8cf6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </div>
    </div>
  );
}
