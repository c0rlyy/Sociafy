type FollowedNum = {
  followedNum: number;
};
export default function FollowedBadge({ followedNum }: FollowedNum) {
  return (
    <div className="flex items-center">
      <div className="flex h-8 w-8 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-3 2.928m-5.5 3.5a8916.99 8916.99 0 0 0 -6.5 -6.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          <path d="M15 19l2 2l4 -4" />
        </svg>
      </div>
      <div>
        <span className="font-medium">{followedNum}</span>
      </div>
    </div>
  );
}
