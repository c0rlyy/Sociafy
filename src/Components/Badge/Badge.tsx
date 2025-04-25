export default function Badge({
  badgeText,
  className = "",
}: {
  badgeText: string;
  className?: string;
}) {
  return (
    <div
      className={`flex cursor-pointer justify-center rounded-lg bg-[#D9D9D9] px-[4px] py-[3px] transition-all hover:bg-opacity-60 ${className}`}
    >
      <span className="truncate text-ellipsis text-xs">{badgeText}</span>
    </div>
  );
}
