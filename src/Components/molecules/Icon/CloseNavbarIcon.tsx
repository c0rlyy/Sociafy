import Icon from "./Icon";

export default function CloseNavbarIcon({
  closeNavbarHandlerProp,
}: {
  closeNavbarHandlerProp: () => void;
}) {
  return (
    <Icon
      className="absolute left-0 top-0 m-3 cursor-pointer"
      handler={closeNavbarHandlerProp}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline icon-tabler-x"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </Icon>
  );
}
