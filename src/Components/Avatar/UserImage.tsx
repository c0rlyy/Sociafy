import { usePopoverStore } from "../../store/popover-store.";

export default function UserImage({ apiUrl }: { apiUrl: string }) {
  const { openPopover, popoverType } = usePopoverStore();
  const openPopoverHandler = () => {
    if (popoverType === "user-popup") {
      openPopover();
    }
  };
  return (
    <picture
      onClick={openPopoverHandler}
      className="flex size-8 items-center rounded-full "
    >
      <img className="h-full w-full" src={apiUrl} alt="user-image" />
    </picture>
  );
}
