// export const fetchUserData = async () => {
//   try {
//     const response = await fetch(
//       "costam",
//       JSON.stringify({
//         followers: response.foll,
//         followings: response.follw,
//       })
//     );
//     const data = await response.json();
//   } catch (error) {
//     console.log(error.message);
//   }
// };
import UserLowerMenu from "./UserLowerMenu";
import UserUpperMenu from "./UserUpperMenu";
function UserProfile() {
  return (
    <div>
      <UserUpperMenu />
      <UserLowerMenu />
    </div>
  );
}
export default UserProfile;
