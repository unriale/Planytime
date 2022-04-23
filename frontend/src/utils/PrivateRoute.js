import UserPage from "../pages/userPage";
import Home from "../pages/index";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const auth = true;
  if (Component.type.name === "Home") {
    return auth ? <UserPage /> : Component;
  }
  return auth ? <Navigate to={"/"} /> : Component;
};

export default PrivateRoute;
