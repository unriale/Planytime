import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const UserPage = () => {
  let { logoutUser } = useContext(AuthContext);
  return (
    <div>
      <p>User page, hello</p>
      <p onClick={logoutUser}>Logout</p>
    </div>
  );
};

export default UserPage;
