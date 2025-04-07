export default function Badge({
  badgeText,
  className = ""
}: {
  badgeText: string;
  className?: string;
}) {
  return (
    <div className={`px-[4px] py-[3px] bg-[#D9D9D9] rounded-lg ${className} transition-all hover:bg-opacity-60 cursor-pointer flex justify-center`}>
      <span className="text-xs truncate text-ellipsis">{badgeText}</span>
    </div>
  );
}
