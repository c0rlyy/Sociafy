export default function Badge({ badgeText }: {badgeText:string}) {
  return (
    <div className="px-3  bg-[#D9D9D9] rounded-lg">
      <span className="text-sm">{ badgeText}</span>
    </div>
  )
}
