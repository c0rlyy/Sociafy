export default function Badge({
  badgeText,
  className = ""
}: {
  badgeText: string;
  className?: string;
}) {
  return (
    <div className={`px-3 bg-[#D9D9D9] rounded-lg ${className}`}>
      <span className="text-sm truncate text-ellipsis">{badgeText}</span>
    </div>
  );
}
