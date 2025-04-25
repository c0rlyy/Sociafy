import Icon from "./Icon";

export default function MessageIcon() {
  return (
    <Icon className="size-6">
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
      >
        <path strokeWidth="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 9h-1a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -2h-1" />
        <path d="M12 14v-11" />
        <path d="M9 6l3 -3l3 3" />
      </svg>
    </Icon>
  );
}
