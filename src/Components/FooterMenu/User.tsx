import classes from "./User.module.css";
interface UserProps {
  userImage: string;
  userName: string;
  userEmail: string;
}
function User({ userImage, userName }: UserProps) {
  const userEm = `@${userName}`;
  return (
    <div className="flex  gap-3 ">
      <div className="flex w-1/4  justify-start  ">
        <img
          className=" max-w-w-full h-auto rounded-full object-fill "
          src={userImage}
          alt=""
        />
      </div>
      <div className=" flex h-full w-full flex-col justify-center">
        <h1 className={classes["username"]}>{userName}</h1>
        <span className={classes["userlink"]}>{userEm}</span>
      </div>
    </div>
  );
}
export default User;
