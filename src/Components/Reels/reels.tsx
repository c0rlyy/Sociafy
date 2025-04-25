import reels from "../../mocks/reels.json";
import ReelItem from "./reel-item";
export default function Reels() {
  return (
    <article className="flex w-full items-center justify-center gap-3 self-center overflow-x-scroll border-2 border-blue-500 px-2 py-3 ">
      <div className="no-sc flex w-full gap-2 overflow-x-scroll  p-4 px-2 py-3 lg:w-1/2">
        {reels.map((reel) => (
          <ReelItem key={reel.id} username={reel.username} />
        ))}
      </div>
    </article>
  );
}
