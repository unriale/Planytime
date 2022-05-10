import UserPage from "../pages/userPage";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ Component }) => {
  let { user } = useContext(AuthContext);
  if (Component.type.name === "Home") {
    return user ? <UserPage /> : Component;
  }
  return user ? <Navigate to={"/"} /> : Component;
};

export default PrivateRoute;
