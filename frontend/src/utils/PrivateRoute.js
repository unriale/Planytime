import UserPage from "../pages/userPage";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ Component }) => {
  let { user } = useContext(AuthContext);
  console.log("PRIVATE ROUTE, USER = ", user);
  if (Component.type.name === "Home") {
    console.log("IN PRIVATE ROOT, HOME");
    return user ? <UserPage /> : Component;
  }
  return user ? <Navigate to={"/"} /> : Component;
};

export default PrivateRoute;
